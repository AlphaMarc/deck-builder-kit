#!/usr/bin/env node
// Stitches a directory of standalone slide .html files into ONE navigable
// HTML page for fast visual review -- no PowerPoint round-trip needed.
// The output is a body-fragment (no <html>/<head>/<body>) suitable for
// handing straight to the Artifact tool.
//
// Each slide renders inside its own <iframe srcdoc="...">, not by copying
// markup into the page. This matters: every slide file is a standalone
// document with its own <style> block, and slides deliberately reuse
// generic class names (.hero, .chart, .grid-zone...) because each one is
// normally loaded in isolation. Extracting just the .slide div's HTML and
// dropping it into a shared page would lose those per-slide <style> rules
// entirely and let same-named classes from different slides collide with
// each other. An iframe gives each slide its own real document and CSSOM,
// so what you see here is exactly what render_slides.mjs will screenshot
// later -- no separate rendering path to drift out of sync.
//
// Usage: node build_preview.mjs <html_dir> <deck_css_path> <output.html> [--title "Deck name"]
//
// Each slide's <link rel="stylesheet" href="...deck-system.css"> gets
// replaced with the actual CSS inlined in a <style> tag. This is required,
// not cosmetic: a srcdoc iframe resolves relative URLs against the PARENT
// document's location, not the slide file's own folder, so the relative
// link would 404 the moment this preview lives somewhere other than
// alongside the slide .html files -- including once it's published as an
// Artifact, which has no local filesystem at all.

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Local images have to travel INSIDE the document, as data URIs.
//
// This is the same trap the deck-system.css note above describes, one level
// down, and it is worse because it is invisible locally: a srcdoc iframe
// resolves relative URLs against the PARENT document, so `../assets/x.png`
// works in a screenshot (render_slides.mjs loads the slide over file://,
// where the path is correct) and 404s in the stitched preview the moment
// that preview is not sitting next to the slide folder. Published as an
// Artifact there is no filesystem at all, and the reviewer sees broken
// images on exactly the slides whose screenshots looked fine.
//
// Rewrites src="..." and CSS url(...) for any path that is not already a
// data:/http(s): URI, and reports the ones it cannot find rather than
// silently shipping a broken reference.
const MIME = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".avif": "image/avif", ".ico": "image/x-icon",
};

async function inlineAssets(html, htmlDir, file) {
  const cache = new Map();
  const missing = [];
  let count = 0;

  const toDataUri = async (ref) => {
    const clean = ref.split("?")[0].split("#")[0];
    if (!clean || /^(data:|https?:|blob:|#)/i.test(clean)) return null;
    if (cache.has(clean)) return cache.get(clean);
    const abs = path.resolve(htmlDir, clean);
    const mime = MIME[path.extname(abs).toLowerCase()];
    if (!mime) return null;
    let uri = null;
    try {
      uri = `data:${mime};base64,${(await readFile(abs)).toString("base64")}`;
    } catch {
      missing.push(`${file} references ${clean}, which does not exist`);
    }
    cache.set(clean, uri);
    return uri;
  };

  // src="..." on img/source/video/audio
  const srcRefs = [...html.matchAll(/\ssrc=["']([^"']+)["']/gi)].map((m) => m[1]);
  // url(...) inside style blocks and style attributes
  const urlRefs = [...html.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map((m) => m[1]);

  for (const ref of new Set([...srcRefs, ...urlRefs])) {
    const uri = await toDataUri(ref);
    if (!uri) continue;
    // replace the reference itself wherever it appears, quoted or bare
    const esc = ref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const before = html;
    html = html.replace(new RegExp(`(?<=["'(])${esc}(?=["')])`, "g"), uri);
    if (html !== before) count++;
  }

  return { html, count, missing };
}

function parseArgs(argv) {
  const args = { title: "Deck preview" };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--title") args.title = argv[++i];
    else positional.push(argv[i]);
  }
  [args.htmlDir, args.cssPath, args.outPath] = positional;
  return args;
}

async function main() {
  const { htmlDir, cssPath, outPath, title } = parseArgs(process.argv.slice(2));
  if (!htmlDir || !cssPath || !outPath) {
    console.error('Usage: node build_preview.mjs <html_dir> <deck_css_path> <output.html> [--title "Deck name"]');
    process.exit(1);
  }

  const deckCss = await readFile(cssPath, "utf8");
  const linkPattern = /<link\s+[^>]*href=["'][^"']*deck-system\.css["'][^>]*>/i;

  const files = (await readdir(htmlDir)).filter((f) => f.endsWith(".html")).sort();
  if (files.length === 0) {
    console.error(`No .html files found in ${htmlDir}`);
    process.exit(1);
  }

  const slideDocs = [];
  let inlined = 0;
  const missing = [];
  for (const file of files) {
    const html = await readFile(path.resolve(htmlDir, file), "utf8");
    if (!linkPattern.test(html)) {
      console.warn(`WARNING: ${file} has no <link ...deck-system.css> tag to inline -- its styles may not appear in the preview.`);
    }
    let doc = html.replace(linkPattern, `<style>${deckCss}</style>`);
    const res = await inlineAssets(doc, path.resolve(htmlDir), file);
    inlined += res.count;
    missing.push(...res.missing);
    slideDocs.push(res.html);
  }
  if (inlined) console.log(`Inlined ${inlined} local asset reference(s) as data URIs`);
  for (const m of missing) console.warn(`WARNING: ${m} -- it will render as a broken image`);

  const frames = slideDocs
    .map(
      (_, i) => `
      <div class="preview-frame" data-index="${i}" ${i === 0 ? "" : "hidden"}>
        <iframe class="preview-canvas" data-index="${i}" width="2560" height="1440" frameborder="0" scrolling="no" title="Slide ${i + 1}"></iframe>
      </div>`
    )
    .join("\n");

  const dots = slideDocs.map((_, i) => `<button class="preview-dot" data-goto="${i}" aria-label="Slide ${i + 1}"></button>`).join("");

  const slidesJson = JSON.stringify(slideDocs).replace(/<\/script/gi, "<\\/script");

  const output = `<title>${title}</title>
<style>
body { background: #05060a; }
.preview-root { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px 0; font-family: 'Inter', -apple-system, sans-serif; }
.preview-stage { position: relative; width: min(92vw, 1600px); aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.5); background: #000; }
.preview-frame { position: absolute; inset: 0; }
.preview-canvas { border: none; width: 2560px; height: 1440px; transform-origin: top left; display: block; }
.preview-controls { display: flex; align-items: center; gap: 20px; color: #cbd2e0; }
.preview-btn { background: #1a1f2b; border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 999px; padding: 10px 20px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; }
.preview-btn:hover { background: #232a38; }
.preview-count { font-size: 14px; font-variant-numeric: tabular-nums; opacity: 0.8; }
.preview-dots { display: flex; gap: 8px; }
.preview-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,0.25); cursor: pointer; padding: 0; }
.preview-dot.active { background: #6E8AD6; }
/* Fullscreen the stage only -- Prev/Next/dots stay outside it on purpose,
   a plain presentation surface with no chrome. Keyboard nav is what has
   to work instead; see the iframe-focus note in the script below. */
.preview-stage:fullscreen { display: flex; align-items: center; justify-content: center; background: #000; }
</style>

<div class="preview-root">
  <div class="preview-stage" id="preview-stage">
    ${frames}
  </div>
  <div class="preview-controls">
    <button class="preview-btn" id="preview-prev">&larr; Prev</button>
    <span class="preview-count"><span id="preview-current">1</span> / ${slideDocs.length}</span>
    <button class="preview-btn" id="preview-next">Next &rarr;</button>
    <button class="preview-btn" id="preview-fullscreen">&#x26F6; Full screen</button>
  </div>
  <div class="preview-dots" id="preview-dots">${dots}</div>
</div>

<script>
(function () {
  const SLIDES = ${slidesJson};
  const total = SLIDES.length;
  let idx = 0;
  const frames = Array.from(document.querySelectorAll(".preview-frame"));
  const iframes = Array.from(document.querySelectorAll(".preview-canvas"));
  const dots = Array.from(document.querySelectorAll(".preview-dot"));
  const stage = document.getElementById("preview-stage");
  const currentLabel = document.getElementById("preview-current");

  // Each slide is a real, separate document (srcdoc), and a keydown fired
  // while focus is inside one of those documents does NOT bubble up to
  // this page's window -- iframes are their own browsing context, not a
  // regular DOM subtree, and that is true with or without fullscreen. So
  // the arrow keys work only until the iframe steals focus (a click on
  // the slide, or entering fullscreen, which focuses the fullscreened
  // element's contents) unless this page's key handler is also attached
  // inside each iframe. srcdoc iframes are same-origin, so contentWindow
  // is reachable directly -- no postMessage plumbing needed.
  iframes.forEach((f, i) => {
    f.srcdoc = SLIDES[i];
    f.addEventListener("load", () => {
      f.contentWindow.addEventListener("keydown", handleKey);
    });
  });

  function layout() {
    // Fit both axes -- in fullscreen the stage fills the viewport at
    // whatever aspect ratio the screen has, not necessarily 16:9, so
    // scaling by width alone can push the canvas taller than the screen.
    const scale = Math.min(stage.clientWidth / 2560, stage.clientHeight / 1440);
    iframes.forEach((f) => { f.style.transform = "scale(" + scale + ")"; });
  }

  function show(i) {
    idx = (i + total) % total;
    frames.forEach((f, j) => { f.hidden = j !== idx; });
    dots.forEach((d, j) => d.classList.toggle("active", j === idx));
    currentLabel.textContent = idx + 1;
  }

  document.getElementById("preview-prev").addEventListener("click", () => show(idx - 1));
  document.getElementById("preview-next").addEventListener("click", () => show(idx + 1));
  dots.forEach((d) => d.addEventListener("click", () => show(parseInt(d.dataset.goto, 10))));

  function handleKey(e) {
    if (e.key === "ArrowRight" || e.key === " ") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "f" || e.key === "F") fsBtn.click();
  }
  window.addEventListener("keydown", handleKey);
  window.addEventListener("resize", layout);

  // Presenter mode: fullscreen the stage only, so the exposed surface is
  // just the current slide -- prev/next/dots stay outside it and Esc (the
  // browser's native handler) exits, no extra UI needed for that.
  const fsBtn = document.getElementById("preview-fullscreen");
  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      const req = stage.requestFullscreen?.();
      req?.catch(() => {
        // Some embedding contexts (e.g. an iframe without the fullscreen
        // permission delegated) reject this silently otherwise -- surface
        // it so "nothing happened" doesn't look like a missing feature.
        fsBtn.textContent = "Full screen blocked here";
        setTimeout(() => { fsBtn.textContent = "⛶ Full screen"; }, 2500);
      });
    } else {
      document.exitFullscreen?.();
    }
  });
  document.addEventListener("fullscreenchange", () => {
    fsBtn.textContent = document.fullscreenElement ? "Exit full screen" : "⛶ Full screen";
    layout();
  });

  dots[0]?.classList.add("active");
  layout();
})();
</script>
`;

  await writeFile(outPath, output);
  console.log(`Wrote ${outPath} (${slideDocs.length} slides stitched, each in its own iframe)`);
}

main();
