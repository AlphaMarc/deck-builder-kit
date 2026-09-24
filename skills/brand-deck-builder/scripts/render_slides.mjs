#!/usr/bin/env node
// Renders a directory of slide .html files to background PNGs, and extracts
// the geometry/typography of every [data-overlay] text element into a
// sidecar .json so build_deck.py can re-create that text as a *real*,
// editable PowerPoint text box in exactly the same spot.
//
// Usage: node render_slides.mjs <html_dir> <out_dir> [--width 2560] [--height 1440] [--scale 2]

import { chromium } from "playwright";
import { readdir, mkdir } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  // scale defaults to 2: at scale 1 a 1px CSS hairline is one pixel in a
  // 2560px PNG, and PowerPoint draws that image at roughly half size, so the
  // line averages away to nothing. Rendering at 2x keeps hairlines, rules and
  // thin strokes visible in the exported deck. Overlay geometry is measured in
  // CSS px and is unaffected, so the canvas stays 2560x1440 either way.
  const args = { width: 2560, height: 1440, scale: 2 };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--width") args.width = parseInt(argv[++i], 10);
    else if (argv[i] === "--height") args.height = parseInt(argv[++i], 10);
    else if (argv[i] === "--scale") args.scale = parseFloat(argv[++i]);
    else positional.push(argv[i]);
  }
  args.htmlDir = positional[0];
  args.outDir = positional[1];
  return args;
}

function rgbToHex(rgbString) {
  // getComputedStyle returns "rgb(r, g, b)" or "rgba(r, g, b, a)"
  const m = rgbString.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (!m) return "000000";
  const toHex = (n) => Math.round(parseFloat(n)).toString(16).padStart(2, "0");
  return `${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`.toUpperCase();
}

async function extractOverlays(page) {
  return await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("[data-overlay]"));
    return nodes.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        id: el.getAttribute("data-overlay") || `overlay-${i}`,
        text: el.innerText,
        x: rect.left,
        y: rect.top,
        w: rect.width,
        h: rect.height,
        fontSizePx: parseFloat(cs.fontSize),
        fontWeight: parseInt(cs.fontWeight, 10) || 400,
        fontFamily: cs.fontFamily,
        lineHeightPx: isNaN(parseFloat(cs.lineHeight)) ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight),
        letterSpacing: cs.letterSpacing,
        align: cs.textAlign === "start" ? "left" : cs.textAlign,
        color: cs.color, // resolved to hex below
      };
    });
  }).then((overlays) => overlays.map((o) => ({ ...o, color: rgbToHex(o.color) })));
}

// An element carrying data-animate="move-x:<px>" is kept OUT of the background
// PNG so build_deck.py can place it as its own picture and give it a real
// PowerPoint motion path. Its geometry is recorded in CSS px, like overlays.
async function extractAnimates(page) {
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[data-animate]")).map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.id || `anim-${i}`,
        spec: el.getAttribute("data-animate"),
        x: r.left, y: r.top, w: r.width, h: r.height,
      };
    });
  });
}

async function main() {
  const { htmlDir, outDir, width, height, scale } = parseArgs(process.argv.slice(2));
  if (!htmlDir || !outDir) {
    console.error("Usage: node render_slides.mjs <html_dir> <out_dir> [--width 2560] [--height 1440] [--scale 2]");
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(htmlDir))
    .filter((f) => f.endsWith(".html"))
    .sort();

  if (files.length === 0) {
    console.error(`No .html files found in ${htmlDir}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });

  for (const file of files) {
    const base = path.basename(file, ".html");
    const htmlPath = path.resolve(htmlDir, file);
    await page.goto("file://" + htmlPath);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150); // let blur/gradient paints settle

    const overlays = await extractOverlays(page);
    const animates = await extractAnimates(page);

    // Hide overlay text (visibility, not display, so layout/blur geometry doesn't shift)
    await page.evaluate(() => {
      document.querySelectorAll("[data-overlay]").forEach((el) => {
        el.style.visibility = "hidden";
      });
      // animated elements travel as their own picture, so they must not be
      // burned into the still background
      document.querySelectorAll("[data-animate]").forEach((el) => {
        el.style.visibility = "hidden";
      });
    });

    const pngPath = path.join(outDir, `${base}.png`);
    await page.screenshot({ path: pngPath });

    const jsonPath = path.join(outDir, `${base}.json`);
    await writeFile(
      jsonPath,
      JSON.stringify({ source: file, canvas: { width, height }, renderScale: scale, overlays, animates }, null, 2)
    );

    console.log(`Rendered ${file} -> ${path.basename(pngPath)} @${scale}x (${overlays.length} overlay text elements${animates.length ? `, ${animates.length} animated` : ""})`);
  }

  await browser.close();
}

main();
