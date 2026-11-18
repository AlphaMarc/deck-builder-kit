// Slide numbers, added at render time rather than written into each slide.
//
// A number typed into the HTML goes stale the first time a slide moves, and
// decks get reordered a lot during review. So the number comes from the
// slide's position in the sorted file list, the same order every script
// already uses: the first file (the title slide) gets no number, the second
// shows 2, and so on. That keeps the printed number equal to the slide
// number that cross-references in the copy use ("the table on slide 22").
//
// All three scripts call this: screenshot_slides.mjs (review shots and PDF),
// render_slides.mjs (pptx background + overlay JSON) and build_preview.mjs
// (the stitched preview). The number carries data-overlay, so in the pptx it
// becomes a real text box like the logo and the corner tag.
//
// Opt-outs, both rare: put data-no-number on the .slide div to drop the
// number from one slide, or write your own .frame-num element into a slide
// and the script leaves it alone.

export const NUMBER_CSS = `
.frame-num {
  position: absolute; bottom: 52px; right: 64px;
  font-size: 21px; letter-spacing: 0.5px; font-variant-numeric: tabular-nums;
  z-index: 5;
}
.slide.dark .frame-num { color: var(--dark-body, #98A2B3); }
.slide.light .frame-num { color: var(--light-muted, #8A94A6); }
`;

// index is the slide's position in the full sorted list, 0-based
export function slideNumber(index) {
  return index === 0 ? null : index + 1;
}

// For a page loaded in Playwright. Call after load and before any overlay
// extraction, so render_slides.mjs picks the number up as overlay text.
export async function injectIntoPage(page, n) {
  if (n == null) return;
  await page.evaluate(({ n, css }) => {
    const slide = document.querySelector(".slide");
    if (!slide || slide.hasAttribute("data-no-number") || slide.querySelector(".frame-num")) return;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    const el = document.createElement("div");
    el.className = "frame-num";
    el.setAttribute("data-overlay", "slide-number");
    el.textContent = String(n);
    slide.appendChild(el);
  }, { n, css: NUMBER_CSS });
}

// For build_preview.mjs, which works on HTML strings. The .slide div is the
// last element closed before </body> in every slide file this skill writes.
export function injectIntoHtml(html, n) {
  if (n == null) return { html, ok: true };
  if (/<div[^>]*class="slide[^"]*"[^>]*data-no-number/.test(html) || /class="frame-num/.test(html)) {
    return { html, ok: true };
  }
  const closing = /<\/div>(\s*)<\/body>/;
  if (!closing.test(html)) return { html, ok: false };
  const num = `<div class="frame-num" data-overlay="slide-number">${n}</div>`;
  html = html.replace(closing, `${num}</div>$1</body>`);
  html = html.includes("</head>")
    ? html.replace("</head>", `<style>${NUMBER_CSS}</style></head>`)
    : `<style>${NUMBER_CSS}</style>` + html;
  return { html, ok: true };
}
