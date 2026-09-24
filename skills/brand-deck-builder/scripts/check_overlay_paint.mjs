#!/usr/bin/env node
// Finds the "pill trap": a data-overlay element that ALSO paints something of
// its own. The renderer hides overlay text with visibility:hidden, which hides
// the element's fill, border and shadow too, so that paint disappears from the
// background PNG and the final deck shows naked text with no chip behind it,
// or a divider rule that has silently vanished.
//
// This replaces guessing from class names. A regex over `class="...pill..."`
// both misses cases (a .zone-label whose only paint is a border-bottom, an
// .ambition with a border-top) and fires on innocent ones (bar-value-inside
// merely contains "bar"). Computed style is the ground truth.
//
// Usage: node check_overlay_paint.mjs <html_dir>
// Exits non-zero if anything paints, so it can gate a build.

import { chromium } from "playwright";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node check_overlay_paint.mjs <html_dir>");
  process.exit(2);
}

const files = (await readdir(dir)).filter((f) => f.endsWith(".html")).sort();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2560, height: 1440 } });

let bad = 0;
for (const f of files) {
  await page.goto("file://" + path.resolve(dir, f));
  const hits = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("[data-overlay]")) {
      const cs = getComputedStyle(el);
      const why = [];
      if (cs.backgroundImage !== "none") why.push("bg-image");
      const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const p = m[1].split(",").map(Number);
        if (p.length < 4 || p[3] > 0.01) why.push("bg-colour");
      }
      for (const side of ["Top", "Right", "Bottom", "Left"]) {
        if (parseFloat(cs[`border${side}Width`]) > 0 && cs[`border${side}Style`] !== "none") {
          why.push(`border-${side.toLowerCase()}`);
        }
      }
      if (cs.boxShadow && cs.boxShadow !== "none") why.push("box-shadow");
      if (why.length) {
        out.push({ id: el.getAttribute("data-overlay"), cls: el.className, why: why.join(",") });
      }
    }
    return out;
  });
  for (const h of hits) {
    console.log(`PAINTS  ${f}  ${h.id}  [${h.cls}]  ${h.why}`);
    bad++;
  }
}

await browser.close();

if (bad) {
  console.log(
    `\n${bad} tagged element(s) paint their own fill/border/shadow.\n` +
    `Fix each by nesting: move data-overlay onto an inner <span> holding only\n` +
    `the text, leaving the painting element untagged.\n` +
    `  <div class="zone-label"><span data-overlay="id">Technical</span></div>`
  );
  process.exit(1);
}
console.log("clean: no tagged element paints anything");
