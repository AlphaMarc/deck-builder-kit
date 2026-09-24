# Deck template library

One slide per layout the `brand-deck-builder` system can draw, kept as a
deck so a new pattern can be looked at in place rather than described.
Every slide here is a real slide built from the shared `deck-system.css`,
not a mockup, so anything on show can be copied into a live deck as-is.

Preview: https://claude.ai/code/artifact/2ff5aada-35bc-48fd-b816-6f30eae7e267

## Slides

| # | Layout | Where it lives in the system |
|---|---|---|
| 01 | Statement frame + scatter→order, light | `.corner-note`, `.hero-statement`, `.scatter-field`, `.flow-arrow`, `.order-grid` |
| 02 | Same, dark, glow at full strength | as above, plus `.dot.chaos.on-dark` / `.flow-arrow.on-dark` |
| 03 | Stat rail, four numbers, light | `.stat-rail`, `.rail-col`, `.rail-label` |
| 04 | Stat rail, three numbers, dark | as above; shows that dropping a column removes it from the LEFT and the survivors keep their x positions |
| 05 | Share split, two shares, dark | `.unit-field`, `.unit`, `.share-num`, `.share-note` |
| 06 | Share split, three shares, dark | as above, plus `.unit.second` / `.share-num.second` for the middle share in the `--orb-green-*` ramp |
| 07 | Split lede + quad grid, light | `.lede`, `.quad-grid`, `.quad`, `.quad-num`, plus `.tex-streak` / `.tex-fins` |
| 08 | Lit card stack, green light, 4 cards | `.band-field.lit-corner`, `.field-blob`, `.band.top-only`, `.card-stack`, `.stack-num`, `.frame-tag.on-lit` |
| 09 | Same, blue light, 3 cards | as above plus `.field-blob.blue` |

Open 03 and 04 side by side: the three rules on 04 land on the same pixels
as the last three on 03. That is the point of anchoring the rail right.

On 05 and 06 the circle field is 100 circles filled **column-major**, so
the shares stand side by side as vertical blocks and one circle is one
percent. Check it on 06: the 54 blue are ten full columns plus four, the
teal end clean on column 17, and the 15 grey are the last three columns.
One column is 5%, so a share that is not a multiple of five leaves a
one-circle notch at the bottom of its partial column. That is where the
real number falls; do not round the data to straighten it.

Both the stat rail and the share split start their bottom half at the same
**52%** line. That is on purpose: a deck using both gets one horizon.

07 and 08 are the two dense layouts, and a deck gets at most one of them.
The quad grid wants four peer parts and reads as a matrix; the card stack
wants an ordered sequence of 3-5 and reads as a list. 08 is also the dark
option, since 07 is light-only.

On 08 and 09 the light is a **blob**, not a left-to-right ramp: one wide
oval screened over the bands, so brightness falls off from a centre in
every direction. Measured down the field on 08: 91 → 140 → 138 → 95 → 60.
The bands themselves are flat and dark; their job is the vertical
structure the light falls across.

Twenty bands run from x960, so four of them cross the midline. Those four
carry `.band.top-only`, a staggered downward fade, so they show in the top
strip and nowhere else — at y300 the leftmost has already gone (22 against
a ground of 21) while the fourth is still at 47.

The cards are dark-tinted glass, so the field shows through them muted:
compare the inside of a card with the gap between two. That inverts the
usual glass tint and is what lets the field be genuinely bright without
making the copy unreadable.

09 is the same layout with a blue light and three cards. Four cards is the
default; three is generous and centres its copy with slack, which is how
the reference looks. Five would need a one-line body.

07 is light-only because its two textured quadrants read as dark windows
cut into a light grid, which does not invert. Its textures are generated in CSS
rather than photographed, so they re-colour to the accent in one place and
stay sharp at any cell size.

## Adding a layout from a new reference image

A layout only counts as added once all four of these are done. Doing the
slide and skipping the rest means the pattern exists but never gets
reached for.

1. **Components into `references/deck-system.css`** in the
   `brand-deck-builder` skill, with the construction notes in a comment
   above them. The rule of thumb for what belongs there rather than in
   the slide's own `<style>`: anything reusable is a class, anything
   positional is a local coordinate.
2. **A worked example into `references/examples/`**, named
   `{light,dark}-<pattern>.html`, listed in the layout-catalogue table in
   `references/design-system.md`.
3. **The techniques into `references/design-system.md`** — specifically
   the detail that is easy to get wrong, and any failure that only shows
   up in the render.
4. **A trigger into `SKILL.md`** under the rhythm-map rules, saying which
   kind of beat should reach for it and what it should NOT be used for.
   Without this the pattern is documented but invisible at design time.
5. **A row in the "Pick the layout from the shape of the evidence" table**
   in `design-system.md`, naming the beat shape it answers, its classes
   and its example file. If that shape is new, add the matching bullet to
   Step 8 of the `presentation-storytelling` skill so the two vocabularies
   stay identical — they are checked against each other, and a shape in
   one and not the other is drift. This is the step that makes a layout
   reachable by an agent planning a storyline rather than only by one
   already designing slides.

Then a slide in here, light and dark if both read well, using copy from
the reference image adapted to `references/copy-discipline.md`.

## Rebuilding

```bash
SKILL=~/.claude/skills/brand-deck-builder/scripts
node $SKILL/screenshot_slides.mjs . shots --scale 0.5
node $SKILL/build_preview.mjs . deck-system.css out/preview.html --title "Deck template library"
```

`deck-system.css` here is a copy. Re-copy it from the skill's
`references/` after changing components there; never edit only the copy.
