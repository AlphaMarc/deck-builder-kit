---
name: slide-copy-review
description: |
  Read every line of a deck's slide copy and judge it, line by line, against
  the AI-tell catalogue and the per-element word ceilings. Produces a verdict
  and a rewrite for each failing line, then applies the fixes. Use this as the
  mandatory gate before converting an approved deck to .pptx, after any copy
  edit to a deck, and whenever asked to review, tighten, or de-slop slide copy
  or short-form headline text. This is a reading task performed by the model,
  not a search task -- a regex scan can never substitute for it.
license: MIT
---

# Slide copy review

A regex can find `, so ` and `carries`. It cannot tell whether a title
explains or teases, whether a comma is holding a real subordinate clause or
two mirrored fragments, or whether a card is carrying three sentences where
one would do. Those are the failures that actually make a deck read as
machine-written, and they need a reader.

**So this review is done by you, reading. The scanner is a pre-filter that
narrows where to look first. It is never the gate, and a clean scan is never
evidence that the copy passed.**

## Step 1: load the catalogue

Read `brand-deck-builder/references/copy-discipline.md` in full. It is the
single source of truth for both halves of the check:

- §1, the density budget: per-element word ceilings, "fewer words, bigger
  type," the blank-canvas target.
- §2, the banned constructions and the two word lists.

Do not work from a remembered version of the list. It is additive, and the
reviewer adds to it after every deck.

## Step 2: extract every visible line

Only text a viewer actually reads counts. In a `brand-deck-builder` deck that
is the text inside `data-overlay` spans:

```bash
python3 - << 'PY'
import pathlib, re, html
for f in sorted(pathlib.Path(".").glob("*.html")):
    print(f"\n=== {f.name} ===")
    for m in re.finditer(r'data-overlay="([^"]+)"[^>]*>(.*?)</', f.read_text(), re.S):
        t = " ".join(html.unescape(m.group(2)).split())
        if t: print(f"  {m.group(1):18} | {len(t.split()):3}w | {t}")
PY
```

Optionally run the scanner at the end of `copy-discipline.md` first, to know
which slides deserve the most suspicion. Then ignore its verdict and read
everything anyway.

## Step 3: judge every line

Walk the extracted list one line at a time. For each line, ask in order:

1. **Is it over its word ceiling?** (title 10, subtitle 20, card body 25,
   bullet 10, stat label 12, chip 5.) Over means rewrite, not shrink the font.
2. **Does it match a banned construction?** Antithesis, forced group of three,
   trailing `, and`, clipped negative opener, two-sentence punch, mirrored
   noun-phrase fragments, fragment stack, formulaic saying, em dash, inverted
   `, so`, elevated verb, hint-title, count-then-distribute.
3. **Does it use a banned word or stock phrase?**
4. **Would a person write it this way?** Read it aloud. This catches the
   patterns not yet in the catalogue, which is the whole reason a model does
   this pass instead of a script.

Then check each slide as a whole:

5. **Does the title explain rather than tease?** Cover the cards with your
   hand. If the title alone tells the reader nothing they could act on, it is
   a topic label.
6. **Does any element repeat any other element on the same slide?** Read the
   title, subtitle, chips, diagram callouts, axis captions and card notes as
   one flat list and delete whichever line's information is already carried by
   another. Not just "does a line repeat the title" (`humanizer` §29) — a
   callout restating the title, a delta pill restating the title's numbers, and
   a card note restating the subtitle are the three that actually recur. See
   "The second element that restates the first" in `copy-discipline.md`. This
   is usually the largest category of real findings once sentence-level tells
   are clean, so budget the most reading time here.
7. **Does a supporting line add information, or restate what the visual
   already shows?** A line the reader can derive from the cards is deletable.
   Delete it. That is a density win and a tell removed at once.
8. **Do adjacent slides reuse the same sentence shape?** Three slides whose
   subtitles are all `<clause>, because <clause>` is its own tell, even though
   every line passes individually.
9. **On a statement-frame slide, are there exactly two lines?** The shape is
   one `.corner-note` and one `.hero-statement` claim, with nothing else on
   the canvas. Two failures recur and neither trips any check above, because
   the two lines are at opposite corners and read as unrelated:
   - **A third line has appeared** — an eyebrow over the claim, a subtitle
     under it, a caption on the diagram. Delete it. The slide's whole
     argument is that one sentence needs no support.
   - **The note is the claim again, longer.** Check 6 catches this when the
     wording overlaps; here it usually does not, because the note was
     written as a paraphrase. Ask instead whether the note carries a fact
     the claim does not: the mechanism, the scope, the qualifier the claim
     deliberately leaves out. If it does not, rewrite it to carry one.

## Step 4: report, then fix

Report as a table, most severe first. One row per failing line:

| Slide | Element | Pattern | Current | Rewrite |
|---|---|---|---|---|

State explicitly how many lines you read and how many passed, so the reader
knows this was a full pass and not a spot check. Then apply the rewrites to
the HTML, re-extract, and confirm the new lines are clean, including against
the patterns your own rewrites might have introduced.

Two failure modes to avoid in your own rewrites:

- **Trading one tell for another.** Unwinding a `, so` inversion into a
  `, and` appendage fixes nothing. Check the rewrite against the full list.
- **Over-correcting.** A comma introducing a real subordinate clause is
  ordinary English. "All regions live, with returns holding at 4%" is
  fine. Flag the mirrored-fragment shape, not every comma.

## Step 5: hand the additions back

If the reviewer named a pattern that is not yet in the catalogue, append it to
`copy-discipline.md` with a before/after example, and to §6 of
`internal-comms-writing-style` if it applies to prose generally. The catalogue
growing is the point; a fix that lives only in one deck will be rewritten from
scratch next time.

**Generalise the example before you write it down.** Take the shape from the
deck you just fixed and re-express it on a neutral subject, so the catalogue
stays usable for a deck on any topic. A pattern illustrated with one project's
product names, metrics and jargon leaks that project into every future deck
built from this skill, and the reader has to decode the domain before they can
see the pattern. Keep the example concrete — invented specifics teach better
than abstractions — just not *this* client's specifics. Project-specific facts
belong in a skill or doc for that project, never in the shared catalogue.
