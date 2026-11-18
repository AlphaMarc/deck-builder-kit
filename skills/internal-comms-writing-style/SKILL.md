---
name: internal-comms-writing-style
description: Write or edit professional internal company communication -- status updates, exec/leadership updates, project memos, announcements, and presentation/slide copy -- in a clear, confident, BLUF-first style instead of generic corporate-speak. Grounded in the Minto Pyramid Principle, Amazon's narrative-memo culture, Google's plain-language style guide, and the research-backed "assertion-evidence" slide format. Use this whenever the user asks to write, tighten, or review internal comms, a status update, a leadership memo, or the copy/headlines for a presentation deck -- even if they just say "make this sound more professional" or "tighten this up."
---

# Internal comms writing style

Most "professional-sounding" internal writing is actually corporate padding —
it sounds important while saying little. This skill is the opposite move:
say the real thing, first, in as few words as it takes, backed by a number.

## 1. Bottom line up front (BLUF / Minto Pyramid)

State the conclusion or ask in the first sentence. Then support it. Never
build up to the point — a reader who stops after sentence one should still
have the answer.

```
Wrong (builds up):  "Over the past quarter, the team has been focused on
improving reliability across several workstreams, and as a result of this
work..."

Right (BLUF):        "Checkout latency dropped 40% this quarter. Here's what
drove it and what's next."
```

This is the Pyramid Principle (Barbara Minto, ex-McKinsey) and the backbone
of Amazon's internal narrative-memo culture: conclusion → supporting
arguments → data, top-down, never the reverse.

## 2. Write headlines as assertions, not topics

A topic labels a subject ("Q3 Performance"). An assertion is a complete
sentence that states the actual point ("Latency dropped 40% in Q3"). This
isn't stylistic preference — Michael Alley's assertion-evidence research
(Penn State) found audiences given assertion-style headlines with visual
evidence understood *and retained* more than audiences given topic-style
headlines with bullet points, at lower cognitive load. Every heading you
write — a memo section, a slide title, an email subject — should pass this
test: could someone who reads only the headlines still follow the whole
argument? If a heading could sit unchanged over completely different
content, it's a topic, not an assertion. Rewrite it as a claim.

## 3. Plain language, active voice, no padding

- Short sentences. One idea per sentence.
- Active voice: "The team shipped the fix," not "The fix was shipped by the
  team."
- Say "you"/"we" where natural — write to a person, not at an audience.
- Cut hedging: "we believe," "kind of," "to some extent," "in general" —
  either you know it or you're citing a source; say which.
- Cut corporate filler. If a word could be deleted with no loss of meaning,
  delete it. Common offenders worth banning outright: *leverage, synergy,
  circle back, utilize, going forward, at the end of the day, deep-dive,
  bandwidth (for capacity), align (as a verb meaning "agree"), robust,
  seamless, best-in-class, move the needle.* Use the plain word instead
  (use, follow up, revisit, time/capacity, agree).
- Avoid idioms and figurative language that don't translate cleanly for a
  global or non-native-English audience — say the literal thing.

This mirrors Google's own developer-documentation style guide: plain text
over jargon, short unambiguous sentences, conversational over formal.

## 4. Concrete beats abstract, always

Replace vague magnitude words with the actual number, name, or date:

| Vague | Concrete |
|---|---|
| "significant improvement" | "up 40%" |
| "in the near future" | "by end of Q1" |
| "the team" | "the platform team" (or name the owner) |
| "several customers reported" | "12 customers reported, 3 of them enterprise" |

If you don't have the concrete number, that's a signal to go find it before
writing the sentence, not to reach for a vaguer word.

## 5. Before you finish: run the SUCCESs check

From Chip & Dan Heath's *Made to Stick* — the six traits that make a message
actually land, worth running as a checklist on anything important:

- **S**imple — is there one core message, or three competing ones?
- **U**nexpected — does it break an assumption the reader had? (Bland
  confirmation of expectations gets skimmed and forgotten.)
- **C**oncrete — real numbers/names/images, not abstractions (see §4).
- **C**redible — is there a source, a citable number, a named owner?
- **E**motional — does the reader have a reason to care, stated plainly?
- **S**tory — is there a throughline, or just a list of facts? (Pair with
  the `presentation-storytelling` skill for anything longer than a memo.)

## 6. Banned constructions

BLUF and concrete numbers get the substance right. These are the sentence
shapes that still make correct writing read as machine-written. Treat them as
banned rather than discouraged, because each one feels punchy in isolation and
becomes a signature when repeated.

- **Antithesis.** `X, not Y` · `not just X, it's Y` · `X rather than Y` ·
  `X instead of Y` · `stops being X and becomes Y`. Say the positive claim on
  its own. "We measure what the customer received," not "measured on the
  outcome, not the activity."
- **Forced groups of three.** Three clauses in the same grammatical frame,
  padded for cadence. A real list of three things is fine; the tell is the
  matching frame. "Every quarter ships and has a number to clear," not "Four
  quarters, four exit criteria, four releases."
- **The matched pair.** Two adjacent sentences built on one grammatical frame,
  usually opening with the same word: "Fixing the first one is engineering
  work. Fixing the second one needs rules that other teams follow." Rhetoric
  calls the shape *isocolon*, and the repeated opening *anaphora*; used once by
  a human it is a flourish, produced by default it is the most recognisable
  machine rhythm, because the second sentence exists to complete a cadence
  rather than to advance the point. It also forces equal weight onto two things
  that rarely deserve it. The test: if the second sentence could be predicted
  from the first by swapping nouns, the frame is writing for you.

  There are exactly two exits and the defect is standing between them, keeping
  full sentence grammar while the symmetry does the work. Trimming a word moves
  it around inside that middle ground rather than out of it, so commit to one
  end. **Go fully prose**: one flowing sentence, one subject where possible,
  the connective carrying the real relationship. "We are doing the engineering
  work now and the guardrails for other teams after that." **Or go fully
  telegraphic**: drop the sentence frame and let notation carry the pairing.
  "Billing questions → Finance. Outage pages → On-call."
  Telegraphic is the better exit whenever the content genuinely is a mapping,
  because a matched pair in that case is prose imitating a table, so write the
  table. This is not the two-sentence punch below, which is diagnosed by a
  *short* trailing beat; here both halves run normal length.
- **`, and` at all.** Every comma-plus-and is a defect, not just the escalating
  kind. It is the easiest way to keep writing after a claim is already
  complete, so it collects whatever had nowhere better to go, and it reads as
  padding because that is what it is. If it bolts an extra thought onto a
  finished sentence, cut that thought. If it splices two real claims, keep the
  one you are actually making and give the other its own sentence or its own
  slot in the layout. If the two halves are genuinely one thought, rewrite as a
  single clause with a compound predicate, which needs no comma: "We are doing
  the engineering work now and the guardrails after that," not "We are on the
  engineering work now, and guardrails come next." The useful diagnostic is
  that `, and` asserts nothing about how the halves relate, so naming the real
  relation usually fixes the line by itself: "A query that runs can still
  answer wrong, which is why correctness gets a number in October." When no
  such connective is true, the halves did not belong in one sentence. Only a
  serial comma in a real list of three or more items survives.
- **Clipped negative openers.** `No big-bang launch.` · `No guessing.` ·
  `Today: none.` Write the full clause.
- **The two-sentence punch.** A normal sentence followed by a very short one
  (six words or fewer) placed there for emphasis. One of the most recognisable
  machine shapes, and easy to miss because each half looks harmless. Join them.
  "We had no answer for the question a customer asked in March," not "A
  customer asked this in March. We had nothing to give them." A second sentence
  of normal length carrying real content is fine; the tell is the short beat.
- **Mirrored noun-phrase fragments.** Two bare noun phrases balanced across a
  comma with no verb, creating tension instead of saying something. "Two
  systems with no shared login," not "Two systems, one login." A comma
  introducing a real qualifying clause is ordinary English and is not this
  pattern.
- **Inverted sentences.** Almost always `<mechanism>, so <outcome>`. Lead with
  what the reader cares about and put the mechanism in a `because` clause. "A
  manager sees only their own team's spend, because approvals route by
  region," not "Approvals route by region, so a manager sees only their own
  team's spend." Treat `, so ` as a defect.
- **Elevated verbs where a plain one works.** `carries` · `sits` · `holds` ·
  `lands` · `surfaces` · `spans` · `lives` (figurative). "Every step has its
  own approval step," not "carries."
- **Headings that hint instead of explain.** A heading has to state the
  finding, not tease what follows. This is stricter than §2: a short teasing
  fragment can be an assertion and still tell the reader nothing. "Failures
  that we are on the lookout for," not "Three ways this fails."
- **The punchline heading.** The opposite failure to the one above, and the
  more common one in a well-written draft: the heading is the *ending* of the
  section, so it only makes sense once the section has been read. A heading is
  the entry point, and the body is what delivers the payoff. The tell is a
  heading naming an outcome, a duration or a verdict that depends on facts
  appearing underneath it. "Asked a question by finance, an analyst is on
  their own," not "Forty minutes later, Dana had the wrong figure."
- **The mechanic heading where the stake is bigger than the mechanic.** The
  heading describes what the thing underneath does, when the reader needs to
  know what it is worth. It survives every other check, because describing a
  mechanism accurately is a real assertion. Ask what changes for the business
  if the section is true and put that in the heading; the mechanism is already
  in the body. "One sentence now reaches the whole catalogue," not "Both users
  get a result they can read."
- **The same leading word across a set of sibling labels.** Section headings,
  list labels and table row names written in one sitting all end up opening on
  `The`. Each is fine and the set reads as generated, because a person naming
  four things by hand would not reach for one article four times. This is the
  matched pair's anaphora applied to labels, and it is invisible line by line:
  read the set as a column. "What she was asked for / High cognitive load and
  collaboration needed / A query that may be false," not "The question / The
  detour / The query that ran." A deliberately shared grammar is still right
  when the set is one progression being read in order; the defect is a
  repeated article carrying no meaning.
- **Count-then-distribute.** A heading announcing how many things there are,
  then a line saying each of them does its share. The second line carries no
  information, so cut it and make the heading say what the things do.
  "Automating intake and triage closes most of the gap," not "Four new checks
  cover the missing 30%. / Each one handles a different part of the gap." Watch for a number paired with `each one` · `each of` ·
  `one for each` · `both` · `all of them` · `respectively`. A count is fine
  when it is the actual ask; the defect is the distributive echo after it.
- **Dramatic fragment stacks.** One short sentence is emphasis. Three in a row
  is a tell.
- **Formulaic sayings.** `X is the Y of Z` · `the language of` · `the
  architecture of` · `X becomes a trap`.
- **The second element that restates the first.** A subheading that repeats
  its section's opening line, a callout that repeats the heading above it, a
  summary line that repeats the number in the sentence before. Each reads fine
  alone, which is why this survives a line-by-line edit. Read a section's
  heading, opening sentence and any pull-quote or caption as one list, and cut
  whichever carries no information the others don't. "Up from 12% last year"
  adds nothing under a heading that already says "moved from 12% to 19%."
- **Headings that name a deliverable instead of claiming something.** A bare
  noun phrase describing what the reader gets is a topic label in a claim's
  clothing. Give it a verb and address the reader. "You get one short report
  every month," not "One short report every month."
- **The same subordinator three paragraphs running.** `X, because Y` is the
  correct fix for the inverted `, so` sentence above, so a draft that has just
  been cleaned up tends to collect them. Count `because` · `which` · `when` ·
  `with` across the whole piece, not within a paragraph; three in four
  consecutive paragraphs means rewriting one to carry its causation plainly.
- **Em and en dashes.** None. Use a period, comma, colon, or rewrite.

Words that are overused to the point of being a signature: `release gate` ·
`load-bearing` · `slip quietly` · `confidently wrong` · `nothing runs until` ·
`provable` / `prove` as a flourish · `before` as the whole argument ·
`alike` · `delve` · `dive into` · `navigate` (figurative) · `underscore` ·
`bolster` · `foster` · `harness` · `leverage` · `unpack` · `shed light on` ·
`pave the way` · `pivotal` · `groundbreaking` · `cutting-edge` ·
`transformative` · `game-changing` · `innovative` · `robust` ·
`comprehensive` · `seamless` · `intricate` · `nuanced` · `vibrant` ·
`multifaceted` · `holistic` · `testament` · `showcase` · `tapestry` ·
`landscape` (abstract) · `realm` · `crucial` · `best-in-class` ·
`move the needle`.

Stock phrases: `In today's fast-paced world` · `It's worth noting that` ·
`It's important to note that` · `When it comes to` · `At its core` ·
`At the end of the day` · `This is where X comes in` · `Let's break it down` ·
`plays a crucial role in` · `it cannot be overstated` ·
`underscoring the importance of` · `the real question is`.

This list is additive. When a reviewer names a new phrase, add it here.

For the fuller catalogue of AI writing patterns, run the `humanizer` skill
over the draft. For slide copy specifically, `brand-deck-builder`'s
`references/copy-discipline.md` adds per-element word ceilings and a scanner.

## 7. Descriptive mode is the default — don't make it a mystery

Most internal writing explains a mechanism or a decision; it isn't sold as
a story. **Descriptive mode is the default posture for this skill, not a
special instruction that only applies when someone asks for it.** Reach
for the alternative, narrative mode, only when a story, a pitch, or
something "compelling" was actually asked for — not because the material
could support one. This is more specific than plain language (that's §3
already); it's a choice between two different shapes for the same
material, and the shape has to be chosen on purpose rather than defaulted
into by habit:

- **Descriptive mode (the default)**: say what the thing is, then how it
  works, in the order a reader needs to understand it. No held-back
  reveal, no slide or paragraph whose only job is building tension before
  the next one resolves it.
- **Narrative mode (opt-in — `presentation-storytelling`)**: open on a gap
  or a tension, delay the fix, spend a slide or a section on the turn.
  Earns its place when the goal is moving an audience from one belief to
  another and that was the actual ask.

Descriptive mode is not lower-effort prose stuffed inside the narrative
shape; it changes the shape itself.

- **State the mechanism in the title, immediately.** A descriptive title
  never withholds the answer to build toward it. "Summarize now reads
  dimensions from the included timeseries" is descriptive. "One change
  unlocks everything" is narrative regardless of how plainly the words
  are chosen.
- **Drop the turn slide.** A statement-frame reveal, a before/after Venn
  with a labelled gap, a slide whose whole job is "and here's the twist"
  — these are narrative devices. In descriptive mode the same information
  is just the next fact in sequence: what's needed, why it doesn't work
  today, what changes, the result.
- **Don't dress a limitation up as a mystery.** "The system can't do X
  today" stated plainly, with the concrete example right under it, is
  descriptive. Framing the same limitation as two circles that almost
  touch with a pill reading "missing" in the gap between them borrows a
  narrative device (the reveal) even though no individual sentence in it
  breaks a copy rule.
- **The two modes share every sentence-level rule.** BLUF, assertion
  titles, and every ban in §6 still apply in descriptive mode. It's a
  structural choice about the deck or section, not a licence to write
  topic labels instead of assertions.

Worked contrast, same underlying fact:

> Narrative: a Venn of two circles ("Anchor on the record" / "Break down by
> activity") with a pill reading "Both, at once" in the overlap, followed
> three slides later by a reveal slide that finally names the fix.
>
> Descriptive: "The system supports only one dimension today." as the
> title, with a subtitle naming the two dimensions and a small stat card
> showing the flattened number underneath it.

Both are accurate. Only the second is descriptive, and descriptive is
where every draft starts. Switch to `presentation-storytelling`'s beat
list only on an explicit signal that a story was wanted — building the
narrative arc first and flattening it afterward throws away that pass and
rewrites most of the deck's copy anyway, which is the expensive direction
to discover the mismatch in.

## Worked example

**Brief:** tell the org that the self-serve onboarding flow's completion
rate improved.

**Corporate-speak (avoid):**
> "As part of our ongoing commitment to customer excellence, the team has
> been leveraging a variety of initiatives to drive meaningful improvements
> in onboarding performance, and we're pleased to share that significant
> progress has been made going forward."

**BLUF + assertion + concrete (target):**
> "Onboarding completion went from 61% to 94% this quarter, which is the
> difference between a flow people abandon and one they finish. Most of the
> gain came from pre-filling company details off the signup domain. Cutting
> two optional screens did the rest. Next is a saved-progress link,
> targeting 97% by Q1."

Same facts. One version pads; the other states, supports, and moves on.
