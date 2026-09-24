# Design system: principles, not templates

This deck style has a recognizable DNA. The goal of this reference is to let
you apply that DNA to *whatever layout the content actually calls for* —
never to force content into one of the example layouts just because it's
the one on hand.

Design quality and PowerPoint-editability are two separate concerns —
get the HTML looking right first (fast to iterate, easy to preview), and
only convert to `.pptx` once that's approved. Sections 1-8 below apply
always. The "overlay-text convention" and font-limitation sections near
the end only matter once you're in the pptx-conversion phase — see
SKILL.md for how the two phases fit together.

## The DNA

1. **Type-scale contrast creates depth, and it comes from SIZE, not
   weight.** A title next to its supporting sentence should look like two
   different design systems if you squint — a 90px title against a 28px
   caption. Inside a stat card the number runs roughly 4-6x the size of
   its label. Timid, evenly-sized type is the single fastest way to make
   this look generic.

   **Titles are LIGHT (300), not bold.** That is the deck's voice: the
   size does the asserting and the weight stays calm. An 800-weight title
   at 90px shouts on every slide, and twenty slides of shouting is
   exhausting however good each one is. Card titles (600) and stats (800)
   stay heavier — they sit lower in the hierarchy and are doing a
   different job, and the contrast between a light title and a bold figure
   is part of the effect. See `.title` / `.subtitle` / `.stat` /
   `.stat-label` in `deck-system.css`.

1b. **The type scale is calibrated for a 2560x1440 canvas. Do not shrink
   it.** Body copy sits at roughly 2% of slide height, which is 28px here,
   not the 16px that would look right in a browser window. The single most
   common way this system goes wrong is writing slide type at web sizes:
   every element then looks correct in isolation while the slide as a whole
   reads as a tiny island of text floating in dead space, and no amount of
   repositioning fixes it. If you are hand-setting a size, sanity-check it
   as a percentage of 1440 against these: eyebrow 1.5%, body 2.0%, card
   title 2.2%, **lede 2.9%**, section title 6.3%, hero title 9.0%. (Light
   type needs to run a little larger than bold to hold the same presence,
   which is why those last two are up from 5.8% and 7.8%.)

   `.lede` fills the wide gap between card title and section title. Use it
   for the one paragraph on a slide that carries the argument itself
   rather than captioning something else -- the prose block under a title
   in a split layout, where it is the only text in its column and has to
   hold that column alone. At body size the same paragraph reads as a
   caption that lost its picture. Give it a shorter measure than the title
   above it; a paragraph and a display line want different measures, and
   matching them is what makes a lede wrap to two lines when it wants
   three.

   **Attach a lede to its title with a margin, never with its own
   position.** It goes inside the title's block with a `margin-top` of
   about 0.6 of the title's line height. A lede floated to its own
   vertical coordinate stops reading as the title's paragraph and starts
   reading as a second, unrelated element parked mid-column -- and the
   absolute top is silently wrong the moment the copy changes, opening a
   hole when the title drops to two lines and colliding with it at four.
   This generalises: any element that belongs to another one is positioned
   *by* it, not beside it on the canvas.

   The corollary matters just as much: **when you override a size on one
   slide, re-derive it from the scale rather than picking a number that
   looks right next to the element beside it.** A hard-coded 19px caption
   sitting next to a 28px body is the tell that a size was guessed.

   The same principle runs the other direction too: **`.eyebrow` carries
   its own `margin-bottom` (20px) in the reference sheet, so a title
   stacked under it in normal flow already has clearance.** The failure
   mode this prevents is a cramped hero where the eyebrow's line box
   touches the title -- easy to miss on one slide, and then five slides
   later someone is patching the same gap in by hand because the default
   was never fixed. It only helps when the eyebrow and title are actual
   siblings in flow inside one `.hero` block; a layout that positions an
   eyebrow and title as two independently-`position:absolute` elements
   (a "hero-eyebrow" / "hero-title" split with each given its own `top`)
   opts back out of the default and has to set the gap between their two
   `top` values by hand -- keep that gap at 20px or more rather than
   eyeballing it, for the same reason a lede is attached by margin.

2. **Minimal corner framing, always.** A small logo top-left, and
   optionally a small metadata tag top-right (date, section label, page
   number). Keep both genuinely small and quiet — they orient the viewer,
   they are never a design element competing for attention. `.frame-logo`
   / `.frame-tag`.

3. **The glow is a light source, not a decoration.** One large, heavily
   blurred radial gradient blob (`.glow`), placed behind a cluster of shapes
   (circles, a diagram, a chart) — never behind body text, which it would
   make illegible. It's what gives flat vector shapes a sense of depth and
   premium finish. Use it once or twice per deck at most; if every slide
   glows, none of them do.

   Center it on the cluster it lights. A glow offset from its own shapes
   reads as a stain on the background rather than as light.

   `.glow` is not the only background move available, and it is the most
   overused one. `.band-field` (a row of gradient strips anchored to one
   corner) gives a slide depth without putting a soft blob behind
   anything, and `.bg-wash-right` gives an ambient edge glow. On a slide
   whose content is type rather than shapes, reach for the band field
   first — there is no shape cluster for a glow to be the light source
   *for*, which is exactly when a glow starts looking decorative.

4. **Accent color is a spotlight, used sparingly.** The brand accent
   (Nexthink blue, `--accent-*`) marks the one or two things per slide that
   matter most — a stat number, a highlighted bar/pill, the "after" side of
   a comparison. Everything else stays neutral (white/black/gray). A slide
   that's mostly blue has lost the plot.

5. **Cards are quiet containers, not the star.** Light card fill, thin
   border, soft shadow on light backgrounds; slightly lighter fill and a
   faint border (no heavy shadow) on dark backgrounds. Generous internal
   padding. See `.card`.

6. **Backgrounds alternate on purpose, not mechanically.** Dark backgrounds
   suit big-statement/vision/momentum slides; light backgrounds suit
   detailed breakdowns and data. Choose per-slide based on the content's
   role in the narrative — don't just alternate light/dark/light/dark down
   the deck.

7. **Custom-drawn data shapes beat generic chart styling — but a flat div
   with a solid fill is not custom-drawn, it's just a plain rectangle.**
   Every shape carries the same depth cues the rest of the system uses.
   If your chart would look identical with its shadows and gradients
   deleted, it's under-built.

   **A bar is a recessed well, not a slab.** An internal gradient lighter
   at the top, an INSET shadow so it reads as cut into the slide, a light
   hairline border, and a small corner radius. The inset shadow is the one
   doing most of the work — an outer drop shadow makes a bar look like a
   sticker instead. The highlighted bar swaps the dark fill for the lit
   ramp in `--bar-lit-*`: a muted yellow-green through green to a pale
   base, deliberately desaturated, and with NO outer glow — its value
   comes from being the only lit object in a row of dark ones, and a glow
   around it just muddies the row. Values ride above in a chip
   (`.bar-value-pill`), the series name sits inside at the base
   (`.bar-label-inside`), and on the lit bar that label has to flip dark
   because its base is pale. See `.bar` in `deck-system.css` and
   `references/examples/dark-bar-chart.html`.

8. **Fill the canvas with intent — don't leave accidental gaps.** Generous
   negative space around a hero moment (a title breathing on an otherwise
   empty dark background) is the DNA; a card or grid cell that's mostly
   empty because its content just didn't reach the bottom is a bug, not
   minimalism, and it's the fastest way to make a deck look unfinished.
   Two ways to catch this before you screenshot a slide:
   - **Look at the whole canvas, not each element in isolation.** After
     writing a slide, mentally trace its silhouette: is there one clear
     zone of intentional emptiness (fine), or several smaller awkward gaps
     scattered across cards (fix it)?
   - **Size containers to their content, don't stretch content to fill a
     container.** If a card in a grid has less to say than its neighbor,
     make the card shorter (`align-content: start` on the grid, or give
     it its own height) rather than letting it stretch and leaving a
     void between its body copy and its stat number. If a stat truly
     belongs anchored at a card's bottom, either keep the card short
     enough that this doesn't create a gap, or fill the middle with
     something real (a sparkline, a supporting line of text, a divider) —
     don't rely on `justify-content: space-between` to paper over empty
     space by construction.

## Composing a layout

Don't pick from a fixed list of "slide types." Instead, think in terms of
**zones** and fill them with whatever's needed:

- A **hero zone** (title + eyebrow + subtitle) — usually top-left or
  centered, sized by how much the moment calls for impact.
- A **content zone** — one big element (a diagram, a chart, a large card)
  or a grid of smaller ones (an asymmetric "bento" grid of 2-4 cards works
  well and reads as more crafted than a uniform grid — try one card
  spanning two rows next to two stacked smaller ones).
- Optional **support zone** — a caption, a legend, a row of small pills.

## Layout catalogue — reuse these verbatim, or remix them

Every pattern below is a fully worked file in `references/examples/`, not
just a description — open the file, copy the structure, swap the content.
They exist so a layout the reference deck actually uses doesn't have to be
reinvented each time, while nothing stops you from composing a new zone
layout for content that doesn't fit any of these.

| Pattern | File | Use it for |
|---|---|---|
| Split hero + asymmetric bento grid | `light-split-metrics.html` | A title/subtitle on one side, 2-4 uneven stat cards on the other. |
| Dark glow + Venn pair | `dark-glow-diagram.html` | A two-state comparison (before/after, old/new) as overlapping circles with a glow behind them. |
| Bar chart, one bar highlighted | `dark-bar-chart.html` | A trend over time where one period (usually "now") is the point. |
| Connected numbered step list | `dark-step-list.html` | A sequence of 3-5 causes/levers/steps that built toward one outcome. |
| Bento B: split hero + 2+3 dashboard | `dark-unit-economics.html` | A metrics dashboard: tall anchor card beside two stacked cards, over a row of three. Column split 1.19:1. |
| 3D stacked funnel + legend grid | `dark-funnel.html` | Any stage-based conversion or process (leads→customers, awareness→purchase). |
| Overlapping process-circle chain | `dark-process-chain.html` | A short (2-4 step) process where each step's circle holds its own text, the circles growing rightward and the last blurring away. |
| Bento A: centred header + three tracks | `light-solution-overview.html` | An overview slide: centred title over two small cards, a wide card beneath them, and an anchor card spanning both rows at the same width as the pair. |
| Frosted glass panel + tinted lens discs + divider-list | `dark-glass-panels.html` | A more atmospheric alternative to the opaque card system -- an ambient background wash, translucent overlapping discs tinted grey→teal→blue, and a hairline-divided list instead of a card grid. |
| Stepped glass shape with concave fillets | `dark-glass-cutout.html` | The second glass layout: one continuous stepped surface, an upper-left block stepping down to a wider lower-right block that carries a four-column grid. |
| Atmospheric cover: one lit form + grain | `dark-cover-atmospheric.html` | A cover or section title: one enormous soft-lit circle mostly off-canvas, crisp hairline arcs over it, film grain, and light-weight type in the dark corner. |
| Corner band field + three-column opener | `dark-opener-bands.html` | A section opener or closer: one claim, a supporting line, and three ways into it under a hairline-divided row. |
| Statement frame + scatter→order dots | `light-chaos-to-order.html` | A claim that something brings structure to a mess. Small detail note top-left, one hero claim bottom-right, loose grey dots → hairline arrow → lit accent grid across the middle. |
| Stat rail: one claim over 3-4 numbers | `light-stat-rail.html` | An assertion backed by numbers and nothing else. Claim top-left, then hairline columns each holding a small label over a large number. The calmest evidence layout here: no cards, no fills. |
| Split lede + quad grid, two textured cells | `light-quad-grid.html` | The dense slide. Title plus a lede paragraph on the left, a 2x2 grid of numbered breakdowns on the right, two of the four carrying an abstract texture. Light only. |
| Lit card stack: blob-lit band field + glass cards | `dark-lit-card-stack.html`, `dark-lit-card-stack-blue.html` | The other dense slide. Title plus a lede on the left, 3-5 dark-tinted glass cards on the right standing on a band field lit by an oval blob, green or blue. |
| Share split: 2-3 numbers over 100 unit circles | `dark-share-split.html` | ONE percentage made countable. Big bright number left, muted remainder right (a third share goes in the middle, in teal), over a field of 100 circles with the shares painted left to right. |

## Pick the layout from the SHAPE OF THE EVIDENCE

The catalogue above is indexed by what each layout looks like. This table
indexes it by what a beat *contains*, which is the question you actually
have when a story brief lands on your desk. Read the middle column as the
answer to "this beat is one claim plus four peer parts -- what draws that?"

`presentation-storytelling` tags every beat with its evidence shape for
exactly this handoff, so the left column is the vocabulary the two skills
share. If a beat's shape is not in this list, that is a signal to reshape
the beat, not to invent a layout.

| The beat's evidence is | Layout | Classes | Example |
|---|---|---|---|
| ONE percentage of a whole, 2-3 parts | share split | `.unit-field` `.unit` `.share-num` `.share-note` | `dark-share-split.html` |
| ONE claim + 3-4 supporting numbers | stat rail, or split hero + bento when each number needs a sentence of context | `.stat-rail` `.rail-col` `.rail-label` / `.card` `.stat` `.stat-label` | `light-stat-rail.html`, `light-split-metrics.html` |
| ONE claim + one picture of a transformation | statement frame + scatter→order | `.corner-note` `.hero-statement` `.scatter-field` `.order-grid` `.flow-arrow` | `light-chaos-to-order.html` |
| ONE claim + four peer parts | quad grid | `.quad-grid` `.quad` `.quad-num` `.quad-text` `.tex-streak` `.tex-fins` | `light-quad-grid.html` |
| ONE claim + an ordered 3-5 point sequence | lit card stack | `.band-field.lit-corner` `.field-blob` `.band.top-only` `.card-stack` `.stack-num` `.stack-title` `.stack-body` | `dark-lit-card-stack.html`, `dark-lit-card-stack-blue.html` |
| a quantity changing over time, one period is the point | bar chart | `.bar` `.bar-col` `.bar-value-pill` `.bar-label-inside` | `dark-bar-chart.html` |
| a stage-based conversion or process | 3D funnel | `.funnel` `.funnel-stage` `.pill-badge` | `dark-funnel.html` |
| 3-5 causes or levers building to one outcome | connected step list | `.step-circle` `.step-connector` | `dark-step-list.html` |
| a 2-4 step process, each step self-contained | process chain | `.process-chain` `.process-step` `.step-fill` | `dark-process-chain.html` |
| two states overlapping | Venn + glow | `.glow` `.orbit-ring` | `dark-glow-diagram.html` |
| a metrics dashboard, one figure is the headline | bento B | `.card` `.donut-track` `.donut-value` `.stat-accent-part` | `dark-unit-economics.html` |
| an overview, one claim anchoring three tracks | bento A | `.card` `.orbit-ring` | `light-solution-overview.html` |
| a section opener or closer | corner band field | `.band-field` `.divider-list.cols` | `dark-opener-bands.html` |
| a cover or section title | atmospheric cover | `.lit-form` `.thin-arc` `.grain-mid` `.grain-dark` | `dark-cover-atmospheric.html` |

The glass surfaces are the one entry that is NOT an evidence shape.
`.glass-panel`, `.glass-lens` and `.cut-shape` (`dark-glass-panels.html`,
`dark-glass-cutout.html`) are a surface *preference* that can re-skin
several of the layouts above, so they are chosen for mood rather than
matched to a beat. They are deliberately absent from the storytelling
vocabulary for that reason: a story beat never has "wants to feel
atmospheric" as its content.

**Three of these are budgeted, and the budget is per deck, not per slide.**
The statement frame is the loudest shape here: one or two, on the turn.
The quad grid and the lit card stack are the only dense layouts: at most
ONE of the two, with a LOW slide either side. Everything else is
unbudgeted. A rhythm map that spends more than that has stopped being a
rhythm.

## Bento arrangements: there is more than one, and the proportions matter

"Bento grid" is not a single layout. At least two distinct arrangements
recur, they are not interchangeable, and each has proportions that have to
be kept -- a bento with arbitrary track sizes reads as a plain table with
rounded corners. Both sets below are measured off reference slides and
scaled to 2560x1440.

**A -- centred header over three tracks** (`light-solution-overview.html`)

| | value |
|---|---|
| grid box | 164, 434 → 2240 x 896 |
| left two tracks | 540 each |
| right track | 1100 |
| rows | two equal |
| gap | 30 |

The right card spans both rows; the bottom-left card spans both left
tracks. The number that matters is that the left *region* (1110) and the
right card (1100) are almost exactly **1:1** — that balance is what stops
the right card reading as a sidebar bolted onto a 2x2.

**B -- split hero, then a 2+3 dashboard** (`dark-unit-economics.html`)

| | ratio |
|---|---|
| left track : right track | 1.19 : 1 |
| top block : bottom strip | 1.92 : 1 |
| right track's two cards | near equal |
| bottom strip | three equal tracks |

A tall anchor card on the left beside two stacked cards, over a row of
three. Here the columns are deliberately **unequal at 1.19:1** — make them
equal and the whole thing flattens into a 2x3 and the tall card stops
reading as the anchor. This arrangement wants a hero text block beside it
rather than a header above it.

Neither is the "default". Pick by what the content is: A for an overview
where one claim needs an anchor, B for a metrics dashboard where one
figure is the headline and the rest are supporting.

## The statement frame: a third whole-slide composition

Neither bento nor a header-over-content slide. Three things on the canvas
and nothing else: a **small block of detail in the top-left corner**, **one
diagram across the middle band**, and **the slide's claim at hero size in
the bottom-right**, right-aligned. See `.corner-note` / `.hero-statement`
in `deck-system.css` and `light-chaos-to-order.html`.

It is the highest-impact slide shape in the system and it only works when
the content is genuinely one claim plus one picture. Use it for the deck's
turn or its closing assertion, once or twice per deck. Four rules:

- **The claim goes bottom-right and the detail top-left, in that order.**
  Detail, then the thing itself, then the verdict last and largest, along
  the reading diagonal. Flip the corners and the verdict is where the eye
  starts, which leaves the diagram illustrating something already
  concluded. `.corner-note.right` / `.hero-statement.left` mirror it for
  the rare slide where something else already pulls the eye right first.
- **Nothing sits in the middle of the canvas except the diagram.** No
  eyebrow over the claim, no subtitle under it, no legend. The empty
  middle is what makes the two text blocks read as opposite ends of a
  diagonal rather than as a header and a footer.
- **The claim is one sentence with a period, two lines at `.title.xl`.**
  It gets no supporting line, because there is nothing else on the slide
  competing with it and anything added reads as a hedge.
- **The note is a `.subtitle` and stays under 20 words.** It is the one
  place on the slide for the mechanism or the qualifier that the claim
  deliberately leaves out.

Both halves of the diagonal sit on the margins the rest of the deck uses
(160px in from the left, 160px in from the right), and the diagram's own
vertical centre line is what all three zones share.

## The stat rail: a claim over 3-4 numbers, and nothing else

The fourth whole-slide composition, and the one that is most about
proportion rather than about shapes. A claim at hero size top-left, and
under it a row of columns each carrying a small label, a large number, and
a hairline down its left edge linking the two. No cards, no fills, no
icons: the entire slide is type plus four hairlines. See `.stat-rail` in
`deck-system.css` and `light-stat-rail.html`.

Its whole effect is the vertical rhythm, so those values are measured, not
chosen. As percentages of slide height:

| | % of height | at 1440 |
|---|---|---|
| claim cap top | 12.6 | 182 |
| rule top, and every column's top | **52.0** | 748 |
| label cap top | 54.1 | 780 |
| number baseline | 91.4 | 1317 |
| rule bottom | 100 | bleeds off the slide |

Four things about that table are load-bearing:

- **The rule starts at 52%.** The numbers own the whole bottom half and the
  claim owns the top. Close that gap and the slide becomes a title with a
  stat strip under it, which is an ordinary slide.
- **The void between label and number is 27% of slide height** — the
  largest empty area on the canvas, and deliberate. This is the one place
  `justify-content: space-between` is right rather than the failure in §8
  above: there the gap is accidental, left over because content did not
  reach the bottom of a container it was stretched into. Here the label is
  pinned to its column's top and the number to its bottom, the distance is
  identical in every column, and that shared distance is what makes four
  columns read as one object. Put a sparkline or a note in it and the
  layout collapses.
- **The rule runs past the number and off the bottom edge.** Stop it under
  the number and each column closes into a box; four boxes is a card grid
  with the fills deleted.
- **One left edge.** The claim and the leftmost rule share it (160px), the
  rightmost column ends on its mirror, and the labels and numbers are
  indented a constant 42px from their own rule. Nothing else on the slide
  gets a different left edge.

**Dropping to three numbers or two removes columns from the LEFT.** The
rail is anchored right with a fixed column width, so the survivors keep
the exact x positions they had, and the vacated column becomes breathing
room under the claim. Re-flowing three columns across the full width
instead changes the pitch, and a deck whose rails have a different pitch
slide to slide loses the one thing this layout is for.

**Keep the numbers even, and spend the accent on one character.** Their
sameness is the point, so a single `.stat-accent-part` on the unit
character of the one number the claim actually leans on is the whole
accent budget for the slide.

## The share split: a percentage you can count

The fifth whole-slide composition, and the answer to a specific problem: a
bare percentage is abstract in a way an audience cannot picture. Two or
three big numbers across the top, and under them a field of 100 circles
with the shares painted in left to right. Sixty-nine circles lit out of a
hundred is a quantity someone can actually see. See `.unit-field` /
`.share-num` in `deck-system.css` and `dark-share-split.html`.

Use it for a distribution of **two or three parts of one whole** — queries
that run against queries that do not, or easy / medium / complex. Four
parts and the field stops being readable at a glance; a change over time
is a bar chart instead.

**The field is 100 circles, 5 rows of 20, and that is worth resisting a
prettier grid for.** One circle is one percent, so the boundary between
two shares lands on an exact circle and a viewer can count it. The
reference for this layout used 4 rows of 16 — 64 circles at 1.5625% each —
and its 69% boundary came out as a ragged staircase ending on a different
column in three of the four rows. That stagger is the tell that the
picture and the number disagree.

**Fill COLUMN-MAJOR: down each column, then rightward.** This is the
difference between the layout working and not working, and it is not the
order CSS grid gives you by default. Fill row by row and a 69% share
becomes three full rows, a partial fourth and an empty fifth, which the
eye reads as horizontal *bands* stacked down the slide — a progress bar
wrapped onto five lines. The two populations have to stand side by side as
vertical blocks, because side by side is what "two parts of one whole"
looks like. Use `grid-auto-flow: column` against an explicit
`grid-template-rows`, and give the field an explicit height as well as a
width so the `1fr` rows have something to resolve against.

The consequence to accept: one column is five percent, so only a share
landing on a multiple of five gives a perfectly straight boundary.
Anything else leaves a single one-circle notch at the bottom of the
partial column, which is the honest thing to show — it is where the real
number falls. Do not round the data to straighten the edge.

Brightest share first, remainder last on the right; never distribute a
share across the field or interleave it.

Measured proportions, as percentages of slide height:

| | % of height | at 1440 |
|---|---|---|
| big number digit top | 23.9 | 345 |
| big number baseline | 36.0 | 518 |
| note cap top | 40.6 | 585 |
| field top | **52.0** | 748 |
| field bottom | ~90.5 | 1304 |

That field top is deliberately the same 52% line the stat rail starts its
hairlines on, so a deck using both layouts has one shared horizon rather
than two nearly-equal ones.

The numbers:

- **The bright one is 239px at weight 800** (16.6% of slide height), far
  past `.stat.xl` and correct here. It is the only figure on the slide
  carrying real weight, so it gets all of it — the same reasoning that
  takes the stat rail's four numbers *down* to 500. Stat weight is a
  function of how many stats share the slide.
- **The remainder is the same size and near the background.**
  `--dark-muted`, and its note too. It reads as barely there on purpose:
  it is the share the slide argues against, and making it legible gives it
  equal billing.
- **A third share goes in the MIDDLE, in the `--orb-green-*` ramp.** Three
  values of one blue are much harder to separate at a glance than blue
  against green against grey. That green is `--bar-lit-*` darkened to sit
  level with the blue, so the deck has one green rather than two unrelated
  ones — see the luminance note in "Failures that only appear in the
  render". Centre the number on the canvas rather than over its own run of
  circles: three numbers reading left / centre / right is worth more than
  that alignment, and it does not move when the data does.
- **Notes are two-line blocks with explicit `<br>` breaks.** A single line
  of 28px type under a 239px number looks weedy, and left to wrap on its
  own the line reliably orphans its last word.

## The quad grid: the one layout allowed to be dense

Left column: a title plus a `.lede` paragraph, setting the main point.
Right: a 2x2 grid of quadrants, each with a small index number top-left
and a short title over a short paragraph, breaking that point into four.
Two of the four quadrants carry an abstract texture instead of a fill.
See `.quad-grid` / `.tex-streak` / `.tex-fins` in `deck-system.css` and
`light-quad-grid.html`.

- **The hairlines come from the GAP, not from borders.** The container
  paints the rule colour and carries a 1px gap; each plain quadrant paints
  the slide background over it. One rule per division and no doubled edges
  to reconcile, and a textured quadrant simply covers its share of the
  grid so its own edges disappear. That is what makes the textured cells
  read as windows cut into the grid rather than tiles sitting in it.
- **All four titles align on one line.** The index number is pinned to the
  top and the title sits a *fixed* distance below it. The obvious
  construction — bottom-anchor the text with `margin-top: auto` — gives
  four titles at four different heights the moment one body runs a line
  longer, and that raggedness is exactly the structure this layout sells.
- **The textured quadrants take the diagonal, 02 and 03.** Side by side
  they split the grid into a light half and a dark half.
- **A textured quadrant needs a scrim** — a bottom-weighted dark gradient
  over the texture and under the copy. The texture is at its most active
  where the body sits, and without a scrim the copy is legible in some
  columns of the texture and not others, which no amount of colour picking
  fixes.
- **The title and the grid start on one line** (12.7% of height), and the
  lede hangs off the title rather than being positioned. See the `.lede`
  note in §1b: it belongs to the title, so it is attached to it.
- **The left column needs a footer to close it.** With the lede tucked
  under the title, the column's content ends around 48% of slide height
  while the grid runs to 90%. That leaves over 40% of the lower-left
  empty, which reads as an unfinished column rather than as breathing
  room until something anchors the bottom. `.footer-bar`, pulled in to the
  content margin (160px) so it aligns with the title's left edge and the
  grid's right edge, is enough -- and it is not optional here the way it
  is on a balanced layout.
- **Light only.** The contrast structure is dark textures against a light
  grid and it does not invert: `.tex-fins` is within a few values of
  `--dark-bg`, so on a dark slide that quadrant vanishes. A dark version
  needs light-on-dark textures, which is a separate exercise.

**Density is not an exemption from `copy-discipline.md`.** Hold each
quadrant body to its 25-word ceiling. At 23px in a 460px column that is
still four lines per quadrant, so the slide looks as dense as a reference
carrying twice the words.

## The lit card stack: a band field used as a light source

Sibling of the quad grid, and the other layout allowed to be dense. Same
left column (title plus `.lede`); on the right, 3-5 `.glass-panel` cards
standing on a `.band-field` that is doing a completely different job from
the one it does in the opener. See `.band-field.lit-corner` /
`.card-stack` and `dark-lit-card-stack.html`.

- **The field may reach past the midline, but only as faded bands.**
  `--field-w: 1600px` right-anchored puts twenty bands from x960, four of
  them past centre. Those four take `.band.top-only`, which fades each out
  downward on a staggered schedule so they show in the top strip and
  nowhere else. Un-faded bands past centre put structure into the left
  column and the composition collapses into one busy slide; faded, they
  read as the outer edge of the light. The dark left column against the lit
  right *is* the composition, and this is the only licence it gets.
- **A blue variant swaps `.field-blob.blue` and a blue-grey band ramp.**
  Blue cannot reach the green's luminance at any saturation (pure blue is
  luminance 29), so a blue light is necessarily paler and less saturated
  at matching brightness. Do not correct that by saturating it — it goes
  purple and stops reading as light. It is also not built from
  `--orb-blue-*`: those are deep by design, for a filled disc, and a blue
  at that value cannot be a light source.
- **It runs full height and is cut at the BOTTOM-LEFT CORNER, with a
  radial mask that reaches HIGH.** The obvious reading of "cut the
  bottom-left" is a diagonal linear gradient, and that is wrong: a 215deg
  gradient runs the whole length of the diagonal, so it dims the
  bottom-*right* too and the light stops reaching down the right edge. A
  radial centred on the corner takes out only the corner. Give it a
  vertical radius well over 100% (138% here) so the cut climbs most of the
  slide on the left rather than clipping a small triangle.
- **THE LIGHT IS A BLOB, not the band ramp.** This is the distinction that
  decides whether the field reads as light at all. A monotonic
  left-to-right band ramp can only ever be a gradient: every row of the
  field is equally bright, so there is no source, just a wash that happens
  to be brighter on one side. Put the brightness in one wide OVAL
  (`.field-blob`) screened over the bands, and keep the bands themselves
  comparatively flat and dark — their job is the vertical structure the
  light falls across. Measured down the field: 91 → 140 → 138 → 95 → 60
  top to bottom, which is a falloff from a centre rather than a ramp.
- **Use `mix-blend-mode: screen`, not a translucent overlay.** Screen
  lightens without flattening what is under it, so every band edge
  survives inside the blob. A light-coloured alpha overlay washes those
  steps out and takes the bars with them.
- **Keep the blob's first two stops opaque, and make it large.** A blob
  whose alpha starts dropping at a third of the radius lights a small spot,
  and since the cards cover most of the field a small spot is invisible —
  all of it ends up behind a dark-tinted panel. Size it to reach the top
  edge and die just past the bottom of the card stack; pulling the vertical
  falloff tighter leaves the LAST card on near-black while the others are
  lit, which reads as a mistake rather than as falloff. The lower edge of
  the oval and the bottom-left mask are two halves of one shape.
- **Sixteen bands at 1/32 of the slide width** — the opener's five-band
  1/16 module is too coarse to read as light.
- **The cards carry a DARK tint, and that is what lets the field be
  bright.** The instinct is to cap the field so white copy stays legible on
  it, and that costs the slide the only thing it is for: a capped field is
  a dim strip, not light. Tint the glass dark instead — a translucent dark
  panel still shows the field through it, muted, so the card picks up the
  light while its copy sits on about half the luminance. Measured: card
  interior 40 against 56 in the gaps between cards. The field between the
  cards should be visibly brighter than the field inside them.
- **That inverts the usual glass tint.** `.card` and `.glass-panel` run a
  light tint 0.02 → 0.24 top to bottom; a dark tint has to run the other
  way, heavier at the top, to keep the same lit-at-the-bottom read.
- **The card count sets the card height**, because the stack divides one
  fixed height. Four is the default (265px, snug against a 40px title and
  a two-line body). Three is generous and centres its copy with real slack
  — that is how the reference looks, not a bug. Five leaves 127px of
  content box against 150px of content, so it needs a one-line body or
  tighter padding; check the render before shipping five. What does *not*
  change with the count is body length: at 28px in an 860px measure the
  25-word ceiling is two lines whatever the count, so more cards buys more
  points, never more room per point.

Colours come from the `--bar-lit-*` family, so the light is the same muted
yellow-green the highlighted bar and `--orb-green-*` already use. Do not
reach for a fresh hue.

## Building an abstract texture in CSS

Both textures in `deck-system.css` are generated, not photographed, and
that matters beyond the artifact CSP blocking external images: a gradient
stack re-colours to the brand accent in one place, and it stays sharp at
any cell size, which a bitmap crop does not. Both follow the same rule as
every other surface here — direction and a lit edge, never a flat wash.

- **Run every repeating gradient at TWO coprime periods.** A single period
  combs: the eye locks onto the repeat and a motion texture stops reading
  as motion and starts reading as a barcode. `.tex-streak` runs its bright
  hairlines at 79px and 103px, and its dark smears at 71px and 43px.
- **Dark smears go wide and low-alpha.** Narrow and opaque is a barcode
  however you space it. 16px at 0.34 reads as motion; 9px at 0.55 does not.
- **A second pass at a fractionally different angle gives a ruled pattern
  a wander.** `.tex-fins` lays 121.5deg over 118deg, and that near-miss is
  most of the difference between a photographed surface and a CSS pattern.
- **Vary the lighting across the panel.** Two radial gradients over the
  fins keep it from being uniformly lit, which nothing physical is.
- **Pull the hue from `--accent-*`.** The reference for `.tex-streak` was
  an electric royal blue; built on `--accent-600` and `--accent-500` it
  reads as the same photograph taken on-brand.

## Five more diagram patterns, with no example file yet

These are not in `references/examples/`, so compose them from the notes below.
Each one exists because the catalogue had no match for a shape that keeps
coming up, and each carries the one construction detail that is easy to get
wrong.

- **Ascending step cards, for a maturity or level model.** N cards in a row,
  heights stepping up left to right, all sitting on one hairline floor rule,
  with the current level's card accent-bordered and the target's border
  dashed. The taller cards have more room than their copy needs, and the fix
  is not a flex spacer: give each card an enormous faint numeral bleeding off
  its bottom-right corner (`overflow: hidden`, ~240px, ~6% opacity). It fills
  the height as deliberate decoration, and being untagged it bakes into the
  pptx background for free.
- **Dependency stack, for one small thing bearing a wide load.** A row of
  chips resting directly on a wide slab, that slab balanced on one much
  smaller accent block, over a hairline baseline with a caption. Two details
  carry it: leave only ~8px between the chips and the slab so they read as
  *resting on* it rather than floating above it, and put a deep drop shadow
  under the slab (`0 26px 46px -14px rgba(0,0,0,0.6)`) so it reads as heavy.
  Centre the small block on the slab by computing it, not by eye.
- **Zoned capability curve, for "we are strong in this part of the range."**
  A bell curve over a baseline, the region split into named zones by dashed
  verticals, each zone labelled with a pill under the axis and only the owned
  zone's pill accented. Add a second dashed curve for the intended future
  state so the gap between the two is the argument. The fill is a closed path:
  trace the curve, then `L` back along the baseline and `Z`. Put the y-axis
  caption rotated -90deg (see the collision note below) rather than
  horizontally above the plot.
- **Fan-out, for one capability serving many uses.** One accent node on the
  left, bezier curves fanning to a vertical stack of labelled leaves, with the
  last leaf and its curve dashed and dimmed to mean "and more besides". Give
  every curve the same start point and put both control points at a constant
  x, so the bundle reads as one fan instead of crossing strands.
- **Milestone rail, for a dated plan.** A horizontal hairline with dots on it,
  large release labels above and descriptions below, one dot accented as the
  milestone that matters (a ring of low-opacity accent, `box-shadow: 0 0 0
  10px`, reads better than a bigger dot). Give each milestone a fixed-width
  centred block and position it by its centre with a negative margin, so a
  description that wraps to two lines does not shift the dot it belongs to.

## An optional second palette: light blue / teal / grey "glass"

Everything above assumes the opaque, solid-fill card system with the
Nexthink blue accent. There's a second, valid surface language in this
system: **glass** — translucent panels and discs (`.glass-panel`,
`.glass-lens`, `.panel-fused`), a secondary teal hue (`--teal-*`) used
alongside blue rather than instead of it, an ambient `.bg-wash-right` glow,
and hairline `.divider-list`s instead of card grids. Reach for it when a
deck wants to feel more atmospheric/futuristic than the crisp opaque-card
default — but pick one language per deck (or per slide) and stay
consistent; alternating glass and opaque cards on the same slide reads as
inconsistent, not varied.

Beyond picking a pattern, borrow these specific techniques wherever they fit,
regardless of which layout you're using:

- **Mixed-color stats.** Color only the prefix/suffix character of a
  number (`+83%`, `10.8x`) with `.stat-accent-part`, leaving the digits
  neutral — see `dark-unit-economics.html`. It's a precise, cheap way to
  plant the accent exactly on the character that carries meaning.
- **There is ONE card treatment and it is the glass one.** `.card` runs a
  subtle vertical gradient light at the bottom plus a conic ring for its
  refracting edge, in both dark and light variants. `.glass-panel` is the
  same material; it differs only in being meant for a dark slide with
  something rich behind it. Don't reintroduce an opaque card variant, and
  don't override a card back to a flat `background-color` — that is the
  single fastest way to flatten the system back to "generic AI slide."
- **Scatter→order argues by ARRANGEMENT, and it is the only diagram here
  that does.** Loose dots on the left, a hairline arrow, the same dots in a
  3x3 grid on the right (`.scatter-field` / `.flow-arrow` / `.order-grid`).
  It says "this brings structure" before a word of the slide is read, which
  is why it belongs on the deck's turn. Reach for it only when the claim is
  about structure appearing: a two-state comparison that is really about a
  *quantity* changing wants bars, and one about two things overlapping
  wants the Venn pair. Four details carry it, and the first two are the
  ones that get lost:
  - **Only the ordered side is lit.** Grey against the deep `--orb-blue-*`
    ramp, and the ordered dot is a sphere (off-centre radial origin, inset
    top highlight, drop shadow) while the chaos dot is nearly flat. A
    sphere's lit point runs brighter than a side-lit disc's, which is why
    the radial variant gets its own top stop, `--orb-blue-lit`. Give the
    chaos dots the same radial and they become pale glass marbles — lit
    objects, which is exactly what the ordered side is meant to be the
    only one of. Both sides lit, or both flat, and the diagram says
    nothing.
  - **Same dot size on both sides, one or two more on the scattered
    side, and one of those sitting well away from the cluster.** Same
    size is what makes the eye read a rearrangement of the same
    material; varying the sizes turns it into a chart about magnitude.
  - **No dot touches another.** Place them by real coordinates with
    roughly 120px between centres at 86px dots, then check the render.
    A scatter jittered around a grid still reads as a grid.
  - **The arrow is punctuation, so it stays a hairline** (3px, small open
    chevron). Any weight to it and it becomes the third object on the
    slide, which flattens the composition.
  Centre a `.glow.accent` on the ordered grid and the background itself
  makes the argument. Near full strength on dark; under about 0.18 opacity
  on light, because a blue glow on white goes grey before it goes bright.
- **A donut/ring chart is SVG, not `conic-gradient`.** You need a real
  rounded stroke cap on the filled arc. See the worked math in
  `deck-system.css`'s `.donut-*` comment and `dark-unit-economics.html`
  (circumference for r=80 is 502.65; `stroke-dashoffset` = circumference
  × (1 − value/100)).
- **A 3D funnel stage is an ellipse, never a rounded rectangle.** The
  lit-top-gradient + inset-shadow combination on `.funnel-stage` is what
  makes it read as a stacked physical disc — see `dark-funnel.html`.
- **The atmospheric cover is one form, two hairlines and real grain.**
  `.lit-form` is a circle far larger than the slide, mostly off-canvas, so
  only an arc of its edge crosses the frame -- that arc is the terminator,
  and the form's own blur is what makes it soft. Stack its colour as
  several radial-gradients in the circle's local coordinates. Then
  `.thin-arc`: two circles at the same enormous scale, 2px stroke, NO
  blur. That contrast between one soft mass and a couple of hairlines is
  most of why it reads as expensive -- drop the arcs and it is a gradient.
  All of the circles are CONCENTRIC and differ only in radius; placing
  each one independently gives arcs that cross rather than nest, which
  reads as a mistake. Fit the outer circle by reading three points off
  the reference curve and solving for centre and radius, then derive the
  rest from that same centre.
- **The bright band inside the form is a CRESCENT, not a blob.** Give it
  its own radial-gradient CONCENTRIC with the form, so the bright stop
  sits at a constant radius and the band hugs the terminator all the way
  down -- concave, curving around the dark side. A round radial blob
  inside the form reads convex and immediately looks wrong, and it is the
  easy mistake because a blob is the obvious thing to reach for.
- **Bleed the accent hue into the dark side too.** A soft tinted glow
  behind the form, offset toward the terminator, gives the dark half a
  colour cast instead of leaving it dead black. Put it at z-index 0 under
  the form and the form masks it to the dark region for free; keep the
  far edge of the canvas neutral.
- **Grain needs two layers, and the dark one is the one people forget.**
  `.grain-mid` (overlay blend) bites in the mid-tones and does nothing at
  all on near-black, because overlay multiplies there. `.grain-dark`
  (normal blend, ~0.11) is what puts visible speckle on the dark areas,
  which is exactly where film grain reads most. Both go BELOW the type.
- **A cover may set its title light where the deck sets titles bold.** The
  reference cover's calm comes from a 300-weight title at 130px, not from
  the 800 the rest of the deck uses. Treat that as a deliberate exception
  for covers, not a licence to lighten section titles.
- **Glass is a vertical gradient plus a refracting edge, never a flat fill
  and an even border.** `.glass-panel` runs a subtle grey-to-grey gradient
  top to bottom over a narrow alpha range (`--glass-tint` swaps in a
  colour), and its border is a conic gradient masked to a 2px band so the
  brightness travels round the perimeter and lands on two opposite edges.
  An even 1px border is the single thing that makes glass read as a grey
  box.
- **The glass cutout is ONE stepped shape, not two overlapping panels.**
  Trace the reference outline and it closes as a single path: an
  upper-left block linked to a wider lower-right block by two edges that
  are **angled at about 50 degrees**, not vertical, and filleted far more
  tightly than the outer corners. A vertical link with a generous radius
  reads as two boxes glued together; the diagonal is what makes it one
  object. One surface, so one gradient runs across the whole composite,
  and it runs light at the BOTTOM. Traversing clockwise, convex corners
  take arc sweep-flag 1 and concave ones take 0 -- a wrong concave flag
  bulges the corner outward and the step vanishes.
- **Stack a second sheet behind it.** A dimmer copy of the same path,
  offset down and right (`.cut-ghost`), so only its bottom and right
  contours show past the front one. That offset pair is what reads as
  sheets of glass rather than as a single cut panel.
- **That shape needs an SVG edge, not the masked ring.** The silhouette is
  a `clip-path`, and a mask band follows `border-radius` rather than a
  clip-path, so the concave arcs would come out unbordered. Declare the
  path ONCE as an SVG `<path>` in `<defs>`, clip the fill to it with a
  `<clipPath><use>`, and stroke it with a `<use>` carrying a diagonal
  gradient. Writing the path twice, once for `clip-path` and once for a
  `d` attribute, is how the fill and the edge drift apart the first time
  a size changes. See `dark-glass-cutout.html`.
- **A process chain stacks from the LEFT and grows rightward.** The
  leftmost circle is the smallest and sits on TOP, each one behind the
  last. Layering it the other way round is the easy mistake and it
  reverses the reading order. The second circle's radial origin sits at
  the bottom right rather than the middle; the last circle's fill is
  blurred to a soft glow with no edge at all. Put that blur on
  `.step-fill`, never on `.process-step`, or the text blurs with it --
  which is the whole reason fill and text are separate elements. See
  `dark-process-chain.html`.
- **Glass lenses are narrow oval cylinders, not flat circles.** Each
  `.glass-lens` is two ellipses: a blurred translucent front face over a
  second ellipse nudged sideways, so a crescent of the cylinder wall shows
  past the face. Width around 0.45 of height, shrinking left to right, each
  layered below the one to its right, tinted from the right as light blue,
  teal, grey, then a grey barely there. One faint `.lens-axis` hairline runs
  behind every centre -- never a specular streak inside each lens, because
  with several lenses sharing a centre line those streaks merge into one
  hard rule across the group. See `dark-glass-panels.html`.
- **A divider rule is brighter than a card border.** `--dark-rule` /
  `--light-rule` for hairlines that separate list items, `--dark-border` /
  `--light-border` for a card's own edge. A card reads as an object from
  its fill, so its border can be almost subliminal; a divider rule is the
  only thing separating two items, so it has to be seen.
- **A decorative orbit ring is a bare 1px stroke circle, not a blur.**
  It's a different move from `.glow` — `.orbit-ring` sits directly behind
  a diagram as a quiet halo, no blur filter. See the Venn card in
  `light-solution-overview.html`.
- **A pill can carry its own value badge.** `.pill-badge` +
  `.pill-badge-value` nests a secondary number inside a label pill (e.g.
  a funnel stage reading "Leads · 1000") — see `dark-funnel.html`.
- **A rotated axis label is centred by treating it as horizontal first,
  then rotating around its own centre — never by rotating a corner-anchored
  box and translating the result.** This comes up any time a custom
  diagram needs a y-axis caption (a heatmap's row axis, a chart's units):
  the tempting construction is `transform-origin: left top; transform:
  rotate(-90deg) translateX(-100%)` anchored at one corner of the region,
  and getting that translate right by hand is real trigonometry that is
  easy to get subtly wrong. Do the geometry before any rotation instead —
  author the label as if it were a plain HORIZONTAL bar exactly as wide as
  the span it needs to centre against (e.g. a heatmap's row span in
  pixels), positioned so that ITS OWN centre sits on the point you want
  the finished vertical label centred on, then rotate that box
  `-90deg` around `center center` (the default transform-origin). Centring
  the text inside the box is then a plain `text-align: center`, because
  the rotation preserves the box's own centre point by construction. The
  same trick handles the horizontal companion axis without rotation at
  all: size the label's box to the span of the columns it sits above
  (not the whole grid, if there is a row-label column eating into it)
  and centre with `text-align: center` there too. Give both axis labels
  real clearance from the grid they label -- 30px+ of gap, not the 15-20px
  that looks adequate in isolation. A label sitting close enough to touch
  its column headers or row labels reads as a stray fourth column rather
  than as a caption for the other three, which defeats the point of
  labelling the axis at all.
- **A band field is five equal rectangles, and the gradient inside each one
  is the whole trick.** `.band-field` is five rectangles of equal width,
  touching, each 1/16th of the slide wide. Their base values step darker
  from right to left, and inside each rectangle a small gradient runs
  lighter on the left to darker on the right. That internal gradient puts
  a step up in value at every boundary, which is what defines the vertical
  edges and makes each one read as a lit panel rather than a flat block.
  The field then crops out down the canvas through a mask on the container,
  never per-rectangle stops, tilted a few degrees off vertical so it crops
  higher on the left than on the right. Two plausible-looking constructions both fail:
  one shared colour at varying opacity reads as translucent sheets stacked
  on each other, and stripes with per-rectangle fade depths make a darker
  neighbour look like it continues behind a brighter one -- see
  `dark-opener-bands.html`.

If the user gives you their own reference layout, honor its structure but
still render it through this system's type scale, spacing, glow, and card
rules — that's what "on-brand" means here, not pixel-matching someone
else's deck.

## Failures that only appear in the render

Each of these was found by screenshotting slides and reading the images
(Phase 1 step 4), and none of them is visible in the markup. Check for them
directly rather than rediscovering them.

- **`.bg-wash-right` is teal-tinted.** On a deck whose accent is blue it puts
  a visible green cast across the right half of the slide, which reads as a
  mistake. It belongs to the glass/teal palette. On a blue deck use an accent
  `.glow` positioned on the shape cluster instead.
- **Stock neutral bars vanish on a dark slide.** `.bar.neutral-dark`'s
  `rgba(255,255,255,0.14 → 0.06)` gradient is nearly indistinguishable from
  `--dark-bg`, so a "before" bar in a two-bar comparison disappears and the
  chart looks like it has one bar. Roughly double it — `0.28 → 0.11` with a
  `rgba(255,255,255,0.20)` hairline — and keep the inset shadow at
  `inset 0 10px 28px rgba(0,0,0,0.42)` so it still reads as a recessed well.
- **`--light-border` is too faint for anything that is not a card edge.** A
  step-list dot bordered `1px var(--light-border)` on white is invisible;
  numbered circles need `2px #D5DAE3`, and the connector wire between them
  `3px #DFE3EA`. The divider-rule rule in the technique list above is the
  general form of this: a card reads as an object from its fill, so its border
  can be subliminal, while a dot or a wire has nothing but its stroke.
- **A `flex: 1` spacer inside a double-height card makes the void it was meant
  to fill.** Pushing a footnote to the bottom of a card that spans two grid
  rows leaves a visible hole between the stat and the footnote. The fix is
  structural, not a spacer: give the important metric a card spanning the top
  row's full width, laid out as a row (stat on the left, a vertical hairline,
  the supporting sentence on the right), and put the smaller metrics in
  equal cards beneath. Sizing containers to content beats distributing
  content into containers.
- **A tag positioned with a negative `bottom` offset off a sibling is not
  reliably clear of it.** `bottom: -50px` on a pill reads as "50px of gap
  underneath the thing above it," but `bottom` is measured from the
  pill's OWN bottom edge, so a pill that is itself roughly 50px tall ends
  up with its top edge sitting almost exactly on the other element's
  bottom edge — zero clearance, sometimes visibly overlapping, and the
  markup looks correct because the arithmetic (50px, minus a 50px-tall
  pill) is easy to mis-read as "50px of clearance" rather than "50px
  total, most of which the pill's own height consumes." It reads as fine
  in isolation and only shows up once you screenshot the two elements
  together. The fix is to stop reasoning in negative-`bottom` offsets:
  compute the sibling's actual bottom edge (its `top` plus its real
  rendered height) and give the tag an explicit `top` some clear margin
  below that instead.
- **An explicit `<br>` in a title still re-wraps.** At `.title` (104px, weight
  300) a line holds roughly 19-23 characters. If any line the `<br>` creates
  is longer than its container, it wraps anyway and you get a one-word orphan
  on a third line, which is the tell. Set the container width from the longest
  intended line, or shorten the title — never shrink the font. Check every
  title in the screenshots for orphans; on a first render they are common.
- **A horizontal axis caption above a chart collides with a two-line
  subtitle.** Rotate it instead: `transform: rotate(-90deg)` with
  `transform-origin: left top`, positioned at the chart's bottom-left, so it
  runs up the y-axis and cannot meet the header at all.
- **Corner framing lands on the lit strip and disappears.** A
  `.frame-tag` is white at 0.55 opacity, and on a band measuring luminance
  190 it is simply not in the render — the section tag and the page number
  are gone, and the markup looks perfectly correct. Any slide with a lit
  edge needs the ground under every framing element measured, and the ones
  that sit on it flipped to dark ink (`.frame-tag.on-lit`).
- **A single-period repeating gradient reads as a barcode, and only the
  render shows it.** The CSS for a motion-blur texture and the CSS for a
  striped shirt differ by one number. In markup a `repeating-linear-gradient`
  at 27px with `rgba(0,0,0,0.55)` looks like a reasonable smear; rendered,
  the eye locks onto the repeat instantly and the texture reads as ruling.
  Two coprime periods and wide low-alpha stops fix it. Always look at a
  generated texture at full size before putting copy on it.
- **A wide gradient makes a circle look like it is fading out, and the
  obvious fix lands on stock office blue.** A ramp from `--accent-400` down
  to `700` puts most of each circle's area in navy, so a hundred together
  read as switched off. The tempting correction is to pull the whole ramp
  brighter into the accent mid-tones, and that produces the default chart
  fill in every deck ever made. The actual fix is the other axis: NARROW
  the range and place it a step *deeper* than the accent mid-tones. Three
  stops close enough that no boundary between them shows give a disc
  internal life; a wide bright ramp gives it a swatch. That is what
  `--orb-blue-*` is. The general point holds for any large area of accent
  fill: the value you see in one swatch is not the value a field of them
  averages to.
- **A green and a blue that look comparably dark as hex values are nowhere
  near it on screen.** Green is the hue the eye is most sensitive to, so it
  needs far more darkening than intuition suggests to sit level with a
  blue. Two rounds of this went wrong the same way: `--teal-300` beside
  `--accent-400` inverted the reading order outright, and the second
  attempt — the `--bar-lit-*` ramp at 60% value — still measured luminance
  103 against the blue's 73 and still drew the eye first. **Do not judge
  this by eye. Compute `0.299R + 0.587G + 0.114B` for both ramps** and aim
  for level, which is what `--orb-green-*` at 79 against 73 is. Level, not
  dimmer: two shares of one whole are peer categories, and the ranking
  between them belongs to their numbers.
- **Type in a share's colour needs more value than that share's fill.** Set
  the middle number in the fill's own top stop and it lands within a few
  points of `--dark-muted`, so the second share and the remainder read as
  equally dim and the three-way hierarchy collapses. Set it in
  `--bar-lit-top` and it goes nearly as bright as the white primary while
  looking unrelated to the field beneath it. `--orb-green-type` sits
  between, giving numbers that step 246 / 139 / 100.
- **Four 800-weight stats at hero size bury the light title above them.**
  `.stat` is 800 because a stat is normally ONE figure inside a card,
  competing with that card's own title and body for focus, and weight is how
  it wins. Put four of them at 128px on an otherwise empty canvas and they
  cannot fail to be the focus, so the weight buys nothing and reads as a row
  of black slabs against a 300-weight claim — which is the one thing the
  numbers were supposed to be serving. The stat rail therefore drops its
  numbers to 500 and runs them larger (150px) to compensate, leaving size to
  carry the hierarchy at 4.7x over the label. Treat a stat weight as a
  function of how many stats share the slide, not as a fixed token.
- **`&times;` at stat size reads as a detached blue cross.** The glyph is
  centred on the maths axis, so at 150px it floats mid-height beside the
  digits and looks like an error rather than a unit — especially once
  `.stat-accent-part` colours it. Use a lowercase `x`, which is what the
  mixed-color-stat example in this file has always shown (`10.8x`): it sits
  on the baseline with the digits and reads as part of the number.
- **An accent `.glow` on a LIGHT slide reads as a grey smudge with a visible
  edge.** The markup is identical to the dark case that looks like light. On
  white, blue at any real opacity desaturates toward grey before it
  brightens, so the blob announces itself as a stain around the shapes
  rather than lighting them. Hold it under about 0.18 opacity there, and
  check the ramp by sampling pixels across it rather than by eye — a clean
  glow falls smoothly from the background value with no step, and a
  measurable step is the edge you would otherwise ship.
- **An SVG circle whose radius exceeds half the viewBox is silently clipped.**
  `r="440"` inside `viewBox="0 0 760 760"` loses the top and bottom of the
  ring with no error. Derive the viewBox from `2r` plus stroke width and size
  the container to match, rather than picking the viewBox from how big you
  want the graphic to look.

---

# Phase 2 only: converting an approved deck to .pptx

Everything below only applies once the HTML design itself is approved and
you're converting it to an editable PowerPoint file. Don't worry about any
of this while you're still iterating on the visual design.

## The overlay-text convention (read this before writing HTML)

The pipeline renders your slide HTML to a background image, but any text
tagged `data-overlay="some-id"` gets hidden right before the screenshot and
instead gets rebuilt as a **real, editable PowerPoint text box** at that
element's exact position — matching font size, weight, color and
alignment. This is what makes the final .pptx actually editable instead of
a picture of a slide.

Rules of thumb:
- Tag **titles, subtitles, stat numbers, card titles/body copy, labels,
  pills' text** — basically anything a human would plausibly want to
  click into and retype.
- Do **NOT** tag decorative glyphs, icons, or the glow/shape elements
  themselves — those must stay baked into the background image.
- **A pill/badge/chip is a decorative shape AND a text container at the
  same time — this is the case that actually bites people.** The render
  script hides a tagged element with `visibility:hidden`, which hides
  *everything about it*, fill and border included. If you tag the `.pill`
  span directly, its colored background disappears from the screenshot
  along with its text, and you're left with naked floating text and no
  chip behind it. Always nest: put `data-overlay` on an inner `<span>`
  that holds only the text, inside the untagged pill/badge element that
  provides the shape/fill. Same logic applies to any other element where
  color/fill is doing visual work beyond just being text — a stat number
  with a colored background swatch, a filled progress bar with a label
  inside it, etc.
  ```html
  <!-- wrong: the whole chip (fill + text) vanishes from the background -->
  <span class="pill accent" data-overlay="id">After</span>

  <!-- right: only the text hides; the chip's fill/border stays baked in -->
  <span class="pill accent"><span data-overlay="id">After</span></span>
  ```
  **`.pill-badge-value` is the same trap one level down, and it is easy to
  miss because the outer pill looks correct.** The badge is a second filled
  chip nested inside the pill, so it needs its own inner span too. Tagging
  the badge directly leaves the funnel stage showing a white pill with a
  hole where the darker value chip should be — visible only if you actually
  look at the rendered background PNG, which is why step 3 of Phase 2 tells
  you to.
  ```html
  <!-- wrong: the badge's dark sub-chip disappears from the background -->
  <span class="pill neutral-light pill-badge">
    <span data-overlay="s1-label">Asked</span>
    <span class="pill-badge-value" data-overlay="s1-value">1.4M</span>
  </span>

  <!-- right: both fills stay baked in, both texts stay editable -->
  <span class="pill neutral-light pill-badge">
    <span data-overlay="s1-label">Asked</span>
    <span class="pill-badge-value"><span data-overlay="s1-value">1.4M</span></span>
  </span>
  ```
- Tag the smallest sensible text unit. For a bullet list, tag each `<li>`'s
  text span individually (not the whole `<ul>`) — that way the bullet
  marker/icon can stay in the background image while only the text is
  overlaid, and each line keeps its own exact position.
- If the logo in `.frame-logo` is a text wordmark (no logo image supplied),
  tag it too — it's just text someone may want to correct or retype. If
  it's an `<img>` logo asset, leave it untagged so it bakes into the
  background.
- Give every tag a unique id, e.g. `data-overlay="slide3-stat-1"`. It's
  only used for debugging the sidecar JSON, but unique ids make that much
  easier.
- One element = one visual style. If a paragraph mixes bold and regular
  text, split it into separate tagged spans rather than tagging the whole
  paragraph — the overlay system captures one font-size/weight/color per
  tagged element, not per character.

Example:
```html
<div class="title" data-overlay="s1-title">Solution Overview</div>
<div class="subtitle light" data-overlay="s1-subtitle">
  A single platform to build, run, and monitor your workflows.
</div>

<div class="card light">
  <div class="card-title" data-overlay="s1-card1-title">Workflow Builder</div>
  <div class="card-body light" data-overlay="s1-card1-body">
    Drag-and-drop automation across triggers, conditions, and actions.
  </div>
  <div class="stat accent" data-overlay="s1-card1-stat">50%</div>
</div>
```

## Known limitation: fonts on the machine that opens the .pptx

The background images always render in Inter (loaded from Google Fonts),
so the deck looks correct in the PNGs regardless of viewer. But the
*overlay text boxes* are real PowerPoint text, so they render in whatever
font PowerPoint picks when it opens the file. `build_deck.py` defaults to
requesting `"Inter"` — looks perfect if the viewer's machine has Inter
installed, otherwise PowerPoint silently substitutes a fallback (usually
still clean, just not pixel-identical to the background's typography).

If the deck must look identical on any machine with zero setup, pass
`--font "Calibri"` (bundled with Office on both Windows and Mac) when
running `build_deck.py`, and consider also using Calibri in the HTML's
`--font` variable so background and overlay match. This is a real
trade-off between fidelity and portability — worth surfacing to whoever's
reviewing the deck rather than deciding it silently.
