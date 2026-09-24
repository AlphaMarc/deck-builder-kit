#!/usr/bin/env node
// Screenshots slide .html files WITH their text visible, for visual review
// during Phase 1.
//
// This is NOT render_slides.mjs. That one deliberately hides every
// [data-overlay] element so the PNG can serve as a pptx *background* with the
// text re-added as editable boxes on top. Its output is therefore useless for
// judging a design: you get furniture and empty chips with no words in them.
// Reviewing a deck needs the opposite, which is what this script produces.
//
// Usage:
//   node screenshot_slides.mjs <html_dir> <out_dir> [--only 07] [--scale 0.5]
//
// --scale shrinks the returned image (default 0.5, so a 2560x1440 slide comes
// back at 1280x720). Keep it at or below 0.5 when reading many slides in one
// pass; go to 1 only to inspect fine detail on a single slide.

import { chromium } from "playwright";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = { scale: 0.5, only: null };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--scale") args.scale = parseFloat(argv[++i]);
    else if (argv[i] === "--only") args.only = argv[++i];
    else positional.push(argv[i]);
  }
  [args.htmlDir, args.outDir] = positional;
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.htmlDir || !args.outDir) {
  console.error("usage: node screenshot_slides.mjs <html_dir> <out_dir> [--only 07] [--scale 0.5]");
  process.exit(1);
}

await mkdir(args.outDir, { recursive: true });

const files = (await readdir(args.htmlDir))
  .filter((f) => f.endsWith(".html"))
  .filter((f) => !args.only || f.includes(args.only))
  .sort();

if (!files.length) {
  console.error(`no .html files in ${args.htmlDir}${args.only ? ` matching "${args.only}"` : ""}`);
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 2560, height: 1440 },
  deviceScaleFactor: args.scale,
});

for (const f of files) {
  await page.goto("file://" + path.resolve(args.htmlDir, f));
  // let webfonts settle before shooting, or type metrics shift and every
  // line-wrap judgement made from the screenshot is wrong
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const out = path.join(args.outDir, f.replace(/\.html$/, ".png"));
  await page.screenshot({ path: out });
  console.log(`shot ${f} -> ${path.basename(out)}`);
}

await browser.close();
