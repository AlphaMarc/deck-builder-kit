---
name: brand-deck-builder
description: Build premium, high-end PowerPoint (.pptx) decks in a specific visual style -- soft blur/glow accents behind diagrams, big title/body type-scale contrast, minimal corner framing (small logo + optional date/tag), alternating light/dark backgrounds, and quiet card-based layouts with a sparingly-used brand accent color. Slides are rendered as HTML/CSS for pixel-perfect visuals and then reassembled into a real, editable .pptx with genuine PowerPoint text boxes. Use this whenever the user asks for a pitch deck, investor deck, product deck, sales deck, or any presentation described as "premium," "high-end," "editorial," "on-brand," or matching a set of reference slide images -- even if they don't say "PowerPoint" explicitly, and even if they just say "deck" or "slides." Do not use this for a quick, purely-informational slide dump with no design ambition -- ask if unsure.
---

# Brand deck builder

This skill produces `.pptx` decks with a specific, recognizable visual DNA
(see `references/design-system.md` for the full spec). It generalizes a
*style*, not a fixed set of layouts — read the design system, then design
whatever layout each slide's content actually needs.

## Three phases — don't mix them

Story, copy, visual design, and PowerPoint-editability are four separate
problems. Solve them in order — each phase's output is the next phase's
input, and skipping ahead means redoing work once the skipped step's
answer changes something upstream:

- **Phase 0 — find the words, in descriptive mode by default.** Before
  any slide exists, write with the `internal-comms-writing-style` skill —
  headlines as assertions, BLUF, concrete numbers, no corporate padding —
  and its §7 descriptive mode is the default posture for every deck this
  skill builds: state what the thing is and how it works, in the order a
  reader needs it, with no held-back reveal. Reach for
  `presentation-storytelling`'s narrative arc (a big idea, a turn, a beat
  list built to move an audience from one belief to another) only when
  the user actually asked for a story, a pitch, or something "compelling"
  — not speculatively, because the subject could support one.
- **Phase 1 — design the deck in HTML** and get it approved. Fast to
  iterate, easy to preview (see below), zero pptx concerns.
- **Phase 2 — convert the approved HTML to a real, editable `.pptx`.**
  Mechanical once phase 1 is settled. Don't start this until the person
  you're building for has actually seen and approved the visual design —
  converting early just means redoing the conversion after every design
  round.

## Phase 0: find the story and the words

1. **Get the brief, ask what's missing.** Take the subject/facts/goal the
   user gives you. Before doing anything else, ask any clarifying
   questions you actually need — audience, the one thing they should walk
   away believing, real numbers vs. illustrative ones, tone (all-hands vs.
   exec review vs. external). Don't guess at facts you can just ask for.
   Don't ask whether they want a narrative arc either — descriptive is the
   default (next step), and you'll hear it plainly if they want a story.

2. **Default: work the brief into a plain sequence of facts yourself,
   in descriptive mode.** No separate skill invocation is required for
   this — it's the ordinary case. Order the beats the way a reader needs
   to understand the material (what it is, why it matters or what's
   broken, how it works, the result, the ask), one assertion per beat,
   per `internal-comms-writing-style` §7. Each beat still needs an
   **evidence shape** (a percentage, a claim plus numbers, a 2-4 step
   process, two things overlapping, and so on) — tag it yourself against
   the "Pick the layout from the shape of the evidence" table in
   `references/design-system.md`, which maps each shape to a worked
   example. If a beat's shape isn't in that table, reshape the beat rather
   than inventing a layout for it. This evidence-shape tagging is
   mode-agnostic; only the narrative-role tagging below is specific to
   the opt-in case.

   **Opt-in: invoke `presentation-storytelling` instead, only when the
   user actually asked for a story, a pitch, a persuasive arc, or to move
   an audience from one belief to another.** Its output there is a short
   story brief: one big idea, one ABT logline, and a beat list (5-10
   beats, each tagged with its act, its narrative role, the single
   fact/number/image it's built around, and its evidence shape) — a real
   win when a narrative was actually wanted, and an imposed shape that
   fights the content when it wasn't. Don't reach for it "because the
   subject could support a story"; that's the default this step just
   turned off.

3. **Invoke `internal-comms-writing-style`** for the actual words —
   titles, subtitles, card copy. Write every slide title as an assertion
   (a complete claim, not a topic label) and keep body copy short enough
   to be evidence for that claim, not a paragraph explaining it. This is
   also where "prefer visuals/big numbers over paragraphs" gets decided:
   if a beat's content is a number, a comparison, or a short sequence, it
   belongs in one of `deck-system.css`'s chart/stat/step components (Phase
   1), not a text block — see the layout catalogue below once you're
   there.

4. **Read `references/copy-discipline.md` and hold every line to it.**
   Non-negotiable, and the most common way a visually strong deck still
   fails. It carries the per-element word ceilings (title ≤10 words, card
   body ≤25, max 2 bullets per card), the "fewer words, bigger type" rule,
   and a banned-construction list for the patterns that read as
   machine-written — antithesis (`X, not Y`), forced groups of three,
   trailing `, and ...` clauses, clipped negative openers, em dashes. Run
   the `humanizer` skill over the copy as well. Every line then gets read
   again by the `slide-copy-review` skill at the Phase 2 gate, so write to
   the catalogue now rather than banking on the review to catch it.

Hand the story brief + the written copy into Phase 1 as the content for
each slide. Phase 1 is then a layout problem (which zone, which
component, light or dark) rather than a content problem.

## Phase 1: design in HTML

1. **Plan the deck from the Phase 0 beat list**, not from scratch. For
   each beat, decide roughly what zones it needs (hero text, one big
   visual, a card grid, a diagram). In the default descriptive case,
   drive light vs. dark and visual weight from the beat's **place in the
   sequence** instead of a narrative role: the opening description, the
   limitation/problem, the mechanism, the result, scope/guardrails, the
   closing ask — give the result its heaviest visual and the ask its
   quietest, the same way a narrative deck would treat its climax and its
   ask, per design-system.md's alternation principle. Only substitute the
   actual hook/build/turn/climax/resolution/ask roles when Phase 0 ran in
   the opt-in narrative case.

2. **Write the rhythm map before you write any HTML.** A deck where every
   slide carries the same amount of material is exhausting to sit
   through, however good each slide is on its own. Draw the whole deck as
   one table first and design the *variation*, not just the slides:

   | # | Beat / role | Light or dark | Density | Visual |
   |---|---|---|---|---|
   | 1 | hook | dark | LOW | hero type + glow |
   | 2 | build | dark | MED | quote card |
   | 3 | build | light | MED-HIGH | stat rows |
   | 4 | build | light | MED-LOW | **3D funnel** |
   | 5 | turn | light | VERY LOW | **statement frame + scatter→order** |
   | 6 | build | light | HIGH | **quad grid**, two textured cells |
   |   | *or* | dark | HIGH | **lit card stack**, band field + glass |
   | 7 | build | dark | VERY LOW | **share split**, 100 circles |
   | … | | | | |

   Rules for that table, not suggestions:

   - **Never more than two consecutive HIGH slides.** Every dense run
     gets a breather after it.
   - **At least one LOW or VERY LOW slide per four slides.** A breather is
     a slide carrying *one* thing: one number at hero size, one chart, one
     sentence. Not a lighter version of a dense slide — a different kind
     of slide.
   - **Reach for the layout catalogue rather than another card grid.**
     `references/examples/` holds a donut dashboard, a 3D stacked funnel,
     a bar chart with one bar highlighted, a Venn-with-orbit, overlapping
     process circles, connected step lists, a scatter→order dot diagram,
     a hairline stat rail, a 100-circle share field, a textured quad
     grid, a lit band field under glass cards, and frosted glass panels. These are the most striking things
     this system can draw. If a deck ends up as mostly card grids, the
     rhythm map was not doing its job — go back and convert two or three
     beats into one of those visuals.
   - **Give the most important result the heaviest visual and the ask the
     quietest** (the climax and the ask, in the opt-in narrative case).
   - **The statement frame belongs to the turn, and descriptive decks
     don't have one.** Where a beat is one claim carried by one picture —
     the deck's turn in the narrative case — use the statement frame
     (`light-chaos-to-order.html`): a small detail note top-left, one
     diagram across the middle, the claim at `.title.xl` bottom-right,
     and nothing else on the canvas. It is the loudest slide shape in the
     system, so budget one or two per deck in narrative mode; three of
     them and none of them is the turn any more. In descriptive mode this
     layout's budget is normally zero — reaching for it there re-imports
     the reveal-and-resolve device descriptive mode exists to avoid (see
     `internal-comms-writing-style` §7's "don't dress a limitation up as a
     mystery"). Mark it as VERY LOW density in the table
     even though it is the deck's biggest moment — that is the point of
     it.
   - **Match the diagram to what is actually changing.** These get
     confused because all three are "before and after": a *quantity*
     changing is `dark-bar-chart.html`, two things *overlapping* is
     `dark-glow-diagram.html`'s Venn, and a mess becoming *structured* is
     the scatter→order dots. Reaching for the wrong one is how a slide
     ends up with a diagram that decorates the claim instead of making it.
   - **There are two dense layouts and a deck gets at most one of
     them.** `light-quad-grid.html` (a 2x2 of numbered breakdowns, two
     cells textured) and `dark-lit-card-stack.html` (3-5 glass cards
     standing on a band field lit by a blob, green or blue). Pick by the
     content: the quad grid wants four peer parts and reads as a matrix,
     the card stack wants an ordered sequence of 3-5 and reads as a list.
     The stack is also the one to reach for when the deck needs a second
     dark slide, since the quad grid is light only.
   - **Exactly one slide per deck may be dense.** Where a beat is one claim that genuinely breaks into four
     parts, `light-quad-grid.html` holds all of it: title plus a `.lede`
     on the left, four numbered quadrants on the right, two of them
     textured. It is the only layout here designed to carry four
     paragraphs. Budget ONE per deck and put a LOW slide either side of
     it, because the rhythm map's "never two consecutive HIGH slides"
     rule is doing most of its work around this slide. Four parts
     exactly: three leaves a hole in the 2x2 and five does not fit.
     Density here still does not exempt the copy from its 25-word
     ceilings — see `copy-discipline.md`.
   - **A beat that is ONE percentage is a share split.** A bare percent is
     abstract in a way an audience cannot picture, so a beat whose whole
     content is "69% of X" goes in `dark-share-split.html`: the number at
     239px over a field of 100 circles with 69 of them lit. It is the
     deck's best breather — one fact, countable, no reading required.
     Two or three shares of one whole only; four stops being legible at a
     glance, and a percentage changing over time is a bar chart. Do not
     use it for a percentage that is merely *mentioned* on a slide about
     something else.
   - **A beat that is one claim plus 3-4 numbers is a stat rail, not a
     card grid.** `light-stat-rail.html` is the default for results,
     impact, and adoption beats: a claim top-left over hairline columns of
     label-plus-number. Reach for it before a stat-card grid every time,
     because it says the same thing with no fills, no borders and no
     icons. Two things disqualify it: numbers that need a sentence of
     context each (those want cards), and more than four numbers (a
     fifth column shrinks the pitch below what the type needs).
     Keep one deck's rails to the same column pitch throughout.
   - **Vary the header shape too.** A deck where all eleven slides use the
     same title-left/subtitle-right header reads as a template even when
     the content underneath varies. Mix centred headers, split headers,
     hero-only slides, and the statement frame's no-header diagonal.

   Then fill the map with content. Layout first, copy into it second —
   a breather slide designed around one number stays a breather, whereas
   a dense slide "tightened" later never becomes one.

3. **Write one HTML file per slide** in a working directory, each
   `<link rel="stylesheet" href="deck-system.css">`-ing a copy of
   `references/deck-system.css` (copy it into the same working directory).

   **Copy it from `references/`, never from an older deck's folder.** Decks
   built before the reference scale was recalibrated carry a local
   "DECK-LOCAL SCALE OVERRIDE" block bolted onto a smaller base, and that base
   also sets `.title` to weight 800 — so inheriting one of those copies means
   inheriting bold titles that every slide then has to override by hand. The
   current reference is already calibrated for the 2560x1440 canvas
   (`.title` 90px at weight 300, `.subtitle` 28px, `.card-body` 23px) and
   needs no override at all. If you open a deck whose CSS is ~450 lines and
   ends in that override block, it is a legacy copy; leave it alone if the
   deck is already approved, but do not seed a new deck from it.
   Read `references/design-system.md` first, sections 1-8 — the
   type-scale contrast rule, the glow technique, card/pill styling, the
   canvas-composition rule (don't leave accidental dead space in a card
   or grid), and the chart-depth rule (gradients + shadows, not flat
   divs). Ignore the "Phase 2 only" section at the end for now — the
   `data-overlay` tagging convention only matters once the design is
   approved and you're converting to pptx; don't spend attention on it
   while you're still iterating visually.

   Check the **two indexes** in `references/design-system.md`. "Pick the
   layout from the shape of the evidence" is the one to read first: it
   maps a beat's evidence shape straight to a layout, its classes and its
   example file, which is the lookup you actually have. The **layout
   catalogue** below it indexes the same set by appearance, for when you
   know the look you want — it
   tables every worked example in `references/examples/*.html` (bento
   grids, a donut dashboard, a 3D funnel, a Venn-with-orbit, a connected
   step list, an overlapping process-circle chain...) against what each
   one is for. Reuse a matching pattern verbatim rather than
   re-deriving it, and borrow the specific techniques listed underneath
   the table (mixed-color stats, the SVG donut math, the funnel's
   ellipse+shadow trick) wherever they fit, even inside a layout you're
   composing from scratch.

4. **Look at every slide yourself before showing anyone.** Screenshot them
   with their text visible and read the images:
   ```bash
   node <skill_dir>/scripts/screenshot_slides.mjs <html_dir> <shots_dir> --scale 0.5
   ```
   Do **not** use `render_slides.mjs` for this — it hides every
   `data-overlay` element by design, so you would be reviewing empty chips and
   furniture. Read the PNGs in batches of three and fix what they show, then
   re-shoot. Expect two or three rounds, and check against
   "Failures that only appear in the render" in `references/design-system.md`
   — a teal wash on a blue deck, bars invisible against the dark background,
   one-word orphans in titles, clipped SVG rings. None of those are visible in
   the markup.

5. **Then preview the whole deck as one page for the person you're building
   for:**
   ```bash
   node <skill_dir>/scripts/build_preview.mjs <html_dir> <html_dir>/deck-system.css <preview.html> --title "Deck name"
   ```
   This stitches every slide into one navigable page (prev/next, dot nav,
   arrow keys) sized responsively. Publish `<preview.html>` as an Artifact
   (it's already a body-fragment with its own `<title>`/`<style>`, ready
   to hand to the Artifact tool as-is) so whoever you're building for can
   click through it live, instead of you sending a static image or a
   pptx for every round of feedback.

   **Local images work, and the script is what makes them work.** Slides
   may reference screenshots and other assets by relative path
   (`<img src="../assets/shot.png">`); `build_preview.mjs` rewrites every
   local `src` and CSS `url()` into a base64 data URI as it stitches, and
   prints how many it inlined plus a warning for any file it could not
   find. Read those warnings — a missing asset is a broken image in front
   of your reviewer.

   Do not hand-roll this by pointing slides at absolute paths or by
   skipping the script. A `srcdoc` iframe resolves relative URLs against
   the PARENT document, so a relative path is correct when
   `render_slides.mjs` loads a slide over `file://` and 404s in the preview
   the moment it lives anywhere else — and an Artifact has no filesystem at
   all. The failure is invisible on your side: the screenshots look
   perfect and the published deck shows broken images.

   To verify rather than assume, copy `preview.html` to a directory with no
   assets folder near it, open it, and count images whose `naturalWidth` is
   non-zero. A broken `<img>` is still in the DOM, so counting elements
   proves nothing.

6. **Iterate on the HTML directly** from feedback — this is the whole
   point of doing phase 1 first. Re-run `build_preview.mjs` and republish
   to the same Artifact URL after each round rather than jumping to pptx.

## Phase 2: convert the approved deck to .pptx

Only start here once the HTML design is signed off.

1. **Run the `slide-copy-review` skill over the slide directory. This is a
   gate, not a suggestion.** It is an LLM reading pass: every visible line
   judged against `references/copy-discipline.md`, with a verdict and a
   rewrite for each failure, plus the per-slide checks a script cannot do
   (does the title explain or tease, does a line restate the visual, do
   adjacent slides share one sentence shape, is a card over its word
   ceiling). The regex scanner at the end of `copy-discipline.md` is a
   pre-filter that tells you where to look first — a clean scan is never
   evidence that the copy passed, and must never be reported as if it were.
   Do not proceed to rendering until the review reports every line read and
   every failure fixed.

2. **Add `data-overlay` tags.** Read the "overlay-text convention" section
   of `references/design-system.md` now and annotate the already-finished
   HTML — titles, subtitles, stat numbers, card copy, labels, pill text.
   This is a mechanical annotation pass over settled markup, not a design
   step, which is why it's deferred to here.

   Then check for the pill trap, because it is invisible until you look at a
   rendered background. Any element that both paints something and carries
   `data-overlay` loses that paint from the PNG. Ask the browser, which knows:
   ```bash
   node <skill_dir>/scripts/check_overlay_paint.mjs <html_dir>
   ```
   It reads the computed style of every tagged element and reports any that
   paint a background, a border on any side, or a shadow. Every hit needs the
   nesting fix from the overlay-text convention: the tag moves to an inner
   `<span>` holding only the text, leaving the painting element untagged. The
   script exits non-zero when anything paints, so it can gate the build.

   **Do not substitute a regex over class names for this.** That approach was
   what this skill used to recommend, and it fails in both directions: it fires
   on innocent names (`bar-value-inside` contains `bar`, `frame-tag` contains
   `tag`) while missing the cases that actually bite, which are elements whose
   only paint is a hairline — a `.zone-label` with a `border-bottom`, a
   closing statement with a `border-top`. Those lose their rule silently, and
   the deck just looks like the dividers were never drawn.

3. **Set up the environment once per machine:**
   ```bash
   bash <skill_dir>/scripts/setup_env.sh
   ```
   This installs Playwright's Chromium (for rendering) and a Python venv
   with `python-pptx` + `Pillow`. It's idempotent — safe to call every
   time, it only does real work the first time.

4. **Render every slide's background + extract overlay geometry:**
   ```bash
   node <skill_dir>/scripts/render_slides.mjs <html_dir> <rendered_dir>
   ```
   Name your HTML files so alphabetical order matches slide order (e.g.
   `01-cover.html`, `02-agenda.html`, ...). This writes a `.png` (the
   background, with all `data-overlay` text hidden) and a `.json`
   (position/font/color for every overlay element) per slide into
   `<rendered_dir>`.

   **Look at the PNGs before moving on.** Check that nothing looks broken,
   that hidden overlay text left clean space (no orphaned bullets or
   awkward gaps), and that the glow/gradient effects rendered as intended.
   Fix the HTML and re-render rather than pushing a broken background into
   the final deck.

5. **Assemble the .pptx:**
   ```bash
   <skill_dir>/scripts/.venv/bin/python <skill_dir>/scripts/build_deck.py <rendered_dir> <output.pptx>
   ```
   This places each PNG as a full-bleed slide background, then adds a real
   PowerPoint text box for every overlay entry, matched to its exact
   position, size, font size/weight, color, and alignment.

   Pass `--font "Calibri"` instead of the default `"Inter"` if the deck
   needs to look identical on a machine that doesn't have Inter installed
   — see the font trade-off note at the end of `design-system.md`.

6. **Sanity-check the result.** Confirm the text boxes landed where expected
   and nothing overflows its box:
   ```bash
   <skill_dir>/scripts/.venv/bin/python - << 'PY'
   from pptx import Presentation
   from pptx.util import Emu
   p = Presentation("<output.pptx>"); W, H = p.slide_width, p.slide_height
   tot = 0; issues = []
   for i, s in enumerate(p.slides, 1):
       boxes = [sh for sh in s.shapes if sh.has_text_frame and sh.text_frame.text.strip()]
       tot += len(boxes)
       for sh in boxes:
           t = sh.text_frame.text.strip()[:34]
           if sh.left < 0 or sh.top < 0 or sh.left + sh.width > W + 9144 or sh.top + sh.height > H + 9144:
               issues.append(f"s{i:02d} OUT OF BOUNDS: {t!r}")
           sz = [r.font.size.pt for para in sh.text_frame.paragraphs for r in para.runs if r.font.size]
           if sz and sh.height < Emu(int(max(sz) * 12700 * 0.9)):
               issues.append(f"s{i:02d} box shorter than its type: {t!r}")
   print(f"slides={len(p.slides)} boxes={tot}")
   print("\n".join(issues) if issues else "no geometry issues")
   PY
   ```
   The box count should equal the number of lines the copy review read — if
   it is lower, some text baked into the background instead of becoming
   editable. If something's off, the fix is almost always in the HTML (wrong
   `data-overlay` boundaries, a box too small for its text) — adjust there and
   re-run steps 4-5, don't hand-patch the .pptx XML.

## Design north star

- Type-scale contrast between title and body is the #1 thing that reads
  as "premium" vs. generic — don't undersell it. That contrast comes from
  SIZE: titles are light (300 weight), and the size does the asserting.
- The blur/glow effect is a light source behind shapes, never behind text.
- Accent color (Nexthink blue, `--accent-*` in deck-system.css) marks the
  one or two things that matter most per slide — it is not a background
  color or a wash.
- Corner framing (logo, optional date/tag) stays small always.
- Light vs. dark background is a narrative choice per slide, not a
  mechanical alternation.

Full detail, rationale, and the overlay-text convention: read
`references/design-system.md` before writing your first slide.
