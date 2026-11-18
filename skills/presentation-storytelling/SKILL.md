---
name: presentation-storytelling
description: Build the narrative arc, structure, and rhythm for a presentation or deck BEFORE writing any slides -- the story a set of facts should tell, not just the facts themselves. Grounded in Nancy Duarte's "big idea" and Sparkline (what-is/what-could-be) framework, Randy Olson's And-But-Therefore narrative structure, and the classic 3-act arc. Use this whenever the user wants a deck, pitch, or presentation to be "compelling," "immersive," to "grab attention from the first slide," or to have a real storyline instead of a list of slides -- ideally before any slide is designed. Pairs with internal-comms-writing-style (line-level prose) and brand-deck-builder (visual execution).
---

# Presentation storytelling

A deck built slide-by-slide from a content outline reads as a list of
facts. A deck built from a story reads as an argument the audience wants to
follow. This skill is the step *before* slide design: turn a subject and a
pile of facts into a shaped narrative with one throughline, then hand that
shape to slide design.

**This is the opt-in path, not the default.** `brand-deck-builder` now
defaults every deck to descriptive mode (`internal-comms-writing-style`
§7) — state what the thing is and how it works, in the sequence a reader
needs, no held-back reveal. Reach for this skill only when a story was
actually asked for (a pitch, something "compelling," moving an audience
from one belief to another), not because the material could support one.
Most decks that explain a mechanism, a decision, or a status update want
the descriptive default instead, even when they're substantial.

## Step 1: Find the one big idea

Before structuring anything, write a single sentence — Nancy Duarte calls
this the **big idea** — that the entire deck exists to prove. Every slide
either supports it or gets cut. If you can't compress the deck's purpose
into one sentence, the deck doesn't have a point yet, it has a topic.

A useful test: the big idea should be a claim someone could disagree with,
not a description. "Our Q3 results" is a topic. "The thing that fixed our
copilot wasn't a better model, it was better grounding" is a big idea.

## Step 2: Shape the arc with what-is / what-could-be

Duarte's research across hundreds of great talks found they all move in
contrast: alternating between **what is** (the world as it currently is —
the problem, the pain, the status quo, made specific and felt) and **what
could be** (the possibility, the fix, the future state). The gap between
the two is the tension that keeps an audience leaning in — collapse it too
early and the rest of the deck has nowhere to go.

Map this onto a classic 3-act shape:

- **Act 1 — What is.** Establish the world as it stands. Make the problem
  concrete and specific enough that the audience feels the stakes, not just
  understands them intellectually. Resist the urge to preview the fix here.
- **Act 2 — The turn.** What changed, what was tried, what the actual
  tension/conflict was. This is where the work of the story happens — don't
  skip straight from problem to result.
- **Act 3 — What could be.** The new state, proven with evidence, plus
  where it points next. End facing forward, not just wrapping up.

## Step 3: Wire the logic with And-But-Therefore (ABT)

Randy Olson's ABT is the connective tissue that turns a sequence of facts
into a narrative with momentum, at two levels:

- **The whole deck's logline**, one sentence: `[situation], AND [it kept
  going/held], BUT [something broke the pattern], THEREFORE [what follows
  now].` Write this before structuring sections — it's a compressed version
  of the 3-act arc above.
- **Between consecutive sections or slides.** If you can connect
  section N to section N+1 with "and," you're still listing. If the
  connector is "but" or "therefore," you have a story. Check a handful of
  your section transitions against this — a deck that's all "and, and, and"
  needs a turn somewhere in the middle, not just at the very end.

## Step 4: Open with a hook, not an agenda

The first slide is not the place for a title and a bulleted agenda — that's
where most decks lose the room before they've said anything. Open on the
single most characteristic, surprising, or human fact in the whole story:
the number that shouldn't be possible, the moment things broke, the
before/after that makes the stakes real. State the big idea near the top,
then let Act 1 unfold — don't make the audience wait for the point.

## Step 5: Give it rhythm, not a flat feed of facts

Vary pace deliberately rather than presenting every slide at the same
density and tone:

- A dense data slide earns a breather: a single big number, a short quote,
  a stark statement, before the next data-heavy slide.
- Not every slide is the climax. Save the most dramatic contrast (the
  biggest before/after, the sharpest turn) for the actual turning point in
  Act 2/3 — if every slide tries to be the highlight, none of them land as
  one.
- This is the same instinct behind alternating light/dark backgrounds in
  `brand-deck-builder`'s design system: that's the *visual* expression of
  this same what-is/what-could-be rhythm, not a separate decision. Choose
  each slide's background based on its role in the arc you just built, not
  mechanically.

## Step 6: One metaphor, used consistently

Pick a single central image or metaphor for the whole story (a turnaround,
a flywheel, a bridge, a compounding curve) and let it show up in language
across section titles and transitions. Mixing metaphors (a "turnaround"
that later becomes a "journey" that later becomes a "flywheel") dilutes all
of them — pick one early and reuse it.

## Step 7: Land on the big idea, not a thank-you slide

Close by returning to the big idea from Step 1, now proven, plus a
concrete next step or ask. A generic "Thank You" / "Questions?" slide spends
the story's last moment on nothing — spend it on the point instead.

## Step 8: Tag each beat with the SHAPE of its evidence

A beat that names its fact still leaves slide design guessing at how to
draw it. Naming the *shape* removes the guess, and it feeds a table that
already exists: the "Pick the layout from the shape of the evidence" index
in `brand-deck-builder`'s `references/design-system.md` maps each shape
below to a built, worked layout.

Tag every beat with one of these:

- **one percentage of a whole** (2-3 parts)
- **one claim + 3-4 supporting numbers**
- **one claim + one picture of a transformation**
- **one claim + four peer parts**
- **one claim + an ordered 3-5 point sequence**
- **a quantity changing over time**, one period being the point
- **a stage-based conversion or process**
- **3-5 causes or levers building to one outcome**
- **a 2-4 step process**, each step self-contained
- **two states overlapping**
- **a metrics dashboard**, one figure the headline
- **an overview**, one claim anchoring three tracks
- **a section opener or a closer**
- **a cover or section title**

Two things follow from doing this, and they are the reason it belongs in
the story step rather than in slide design:

- **A beat whose shape is not on the list is a beat to reshape**, not a
  layout to invent. "Several loosely related observations" is not a shape.
  Split it into beats that are, or cut it.
- **Three shapes are budgeted per deck.** One or two "picture of a
  transformation" beats, on the turn, because that is the loudest slide
  the system draws. And AT MOST ONE beat that is either "four peer parts"
  or "an ordered 3-5 point sequence", because those are the only two dense
  layouts and a deck gets one. If the brief wants three of them, the arc
  is carrying too much and the fix is upstream in Step 3, not in design.

Do NOT name layouts here. Name shapes. The mapping is design's call and it
changes as the catalogue grows; the shapes do not.

## Output shape

When this skill runs ahead of slide generation, its output should be a
short **story brief**, not slides:
1. The big idea (one sentence).
2. The logline (one ABT sentence).
3. A numbered list of beats (5-10, not one per eventual slide necessarily),
   each tagged with its act (1/2/3), its role (hook / build / turn / climax
   / resolution / ask), the ONE fact, number, or image that beat is built
   around, and its **evidence shape** from Step 8.

Hand that brief to slide design (`brand-deck-builder` for visual execution,
`internal-comms-writing-style` for the actual copy) rather than a flat
content outline — the beats already carry the narrative role that slide
design needs to know before it can choose light/dark, a hero moment vs. a
dense grid, or which single number deserves to be huge.
