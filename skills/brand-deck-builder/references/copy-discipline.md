# Copy discipline for keynote slides

Read this in Phase 0, before writing a single line of slide copy, and again as
a check before Phase 2. It exists because a deck can be visually strong and
still fail in the room: too many words to absorb at a glance, in prose that
reads as machine-written.

Two separate failures, two separate fixes.

## 1. Density: a slide is not a document

A keynote slide gets about three seconds of reading before the presenter has
moved on. The title carries the point. Everything under it is evidence for
that point, sized so it can be skimmed, never read.

**Word budgets per slide.** Treat these as ceilings, not targets:

| Element | Ceiling | Notes |
|---|---|---|
| Title | 10 words | One line if possible, two at most. |
| Subtitle / lede / deck | 20 words | One or two short sentences. A `.lede` is bigger type, not more words. |
| Card body | 25 words | Two lines of type. Three is already too many. |
| Bullet | 10 words | And no more than 2 bullets per card. |
| Stat label | 12 words | The number does the talking. |
| Diagram / chip label | 5 words | |

**Fewer words, bigger type.** The failure mode is not "too much text," it is
"too much text set small so it fits." When you cut a card body in half, raise
its font size rather than banking the saved space. A slide with four 30px
lines beats one with ten 24px lines, even though both fit.

**Blank space is the design, not leftover.** Aim for roughly 40% of the canvas
carrying no content at all. Do not fill a gap because it is there. What
`design-system.md` §8 forbids is the *accidental* gap inside a card or grid
cell; a large quiet band between the header and the content zone is the
house style working correctly. When copy shrinks, shrink the container to
match and let the surrounding space grow.

**Prefer a drawn thing to a described thing.** If a card body is explaining a
sequence, a comparison, a share, or a set relation, delete the sentence and
draw it with a component from the layout catalogue. A four-row source list
feeding one accent bar says "every request goes through one approval step"
faster than any sentence, and it survives being read from the back of a room.

## 2. Prose: the patterns that read as AI

Run the `humanizer` skill over every line of slide copy. Beyond its list, the
constructions below are the ones that show up hardest in deck writing, where
the compression pressure makes them tempting. Treat them as banned, not
discouraged.

### Banned constructions

**Antithesis / not-X-but-Y.** The single worst offender, because it feels
punchy and it is available for every sentence. Any of these shapes:
`X, not Y` · `not just X, it's Y` · `X rather than Y` · `X instead of Y` ·
`stops being X and becomes Y` · `Not a wrong one. None at all.`

> Bad: "We measure the outcome, not the activity."
> Good: "We measure what the customer received."

> Bad: "A decision, not a meeting."
> Good: "Every meeting ends with a decision written down."

One comparison table with a Today / Next-year column is fine, because that is
a *visual* structure holding two real states. The ban is on the rhetorical
inversion inside a sentence.

**Forced groups of three.** Titles and lists that pad to three for cadence.

> Bad: "Four quarters, four exit criteria, four releases."
> Good: "Every quarter ships and has a number to clear."

> Bad: "Phase 1 cut the cost. Phase 2 cut the wait. Phase 3 makes it self-serve."
> Good: "By the end of phase 3 a customer can do this without us."

A genuine enumeration of three real things (three suppliers, three regions) is
not this pattern. The tell is three clauses in an identical grammatical frame.

**The matched pair.** The two-sentence version of the same defect, and the one
that survives every other check because both halves are ordinary, correct
sentences. Two adjacent sentences share one grammatical frame, usually with the
same opening word: `Fixing the first one is X. Fixing the second one needs Y.`
Rhetoric calls the shape *isocolon* (clauses of matching structure and length)
and the repeated opening *anaphora*. Deployed once by a human writer it is a
flourish; produced by default, three slides running, it is the single most
recognisable machine rhythm, because the second sentence is built to complete a
cadence rather than to move the thought on. It also imposes a false symmetry:
the two halves get equal weight whether or not the content deserves it.

**There are exactly two exits, and the defect is standing between them.** A
matched pair is the middle ground: it keeps full sentence grammar while
offloading the actual work onto the symmetry, so it is neither real prose nor
real structure. Trimming a word or swapping a connective moves it around inside
that middle ground rather than out of it. Commit to one end.

*Exit A, go fully prose.* One flowing sentence, one subject where possible, with
a connective carrying the real relationship, so the reader gets a sequence, a
contrast or a cause instead of a drumbeat.

> Bad: "Fixing the first one is engineering work. Fixing the second one needs
> rules that other teams follow."
> Good: "We are doing the engineering work now and the guardrails for other
> teams after that."

*Exit B, go fully telegraphic.* Drop the sentence frame entirely and let
notation carry the pairing: labels, an arrow, a colon, two columns. This is the
better exit whenever the content genuinely **is** a mapping, because a matched
pair in that case is prose imitating a table. Say it as a table.

> Bad: "Every billing question goes to the finance team, and every outage page
> goes to the on-call engineer."
> Good: "Billing questions &rarr; Finance. Outage pages &rarr; On-call."

The paired diagnostic for exit B: if a matched pair sits above a grid, matrix or
two-column layout that already shows the same pairing, the line is not just
badly shaped, it is redundant (see "the second element that restates the first"
below). Delete it and give the slot a fact the visual cannot carry.

The diagnostic, applied by eye: read the two sentences and ask whether the
second one could be predicted from the first by swapping nouns. If it could,
the frame is doing the writing. Watch for a repeated opening word, a repeated
verb in the same slot, and two halves of near-identical length.

Distinguish it from two neighbours in this list. **The two-sentence punch** is
diagnosed by the second sentence being *short*; here both halves run normal
length and the tell is the matching shape. **Mirrored noun-phrase fragments**
are verbless halves across a comma; here both halves are complete sentences.

**`, and` at all.** Treat every comma-plus-and in slide copy as a defect to be
removed, not merely the escalating kind. It is the single easiest way to keep
writing after a claim is already complete, so it collects the material that had
nowhere better to go, and it reads as padding because that is what it is. Two
sub-cases, one fix each.

*The escalating bolt-on.* A finished sentence, then one more thought welded on.
Cut the second half outright.

> Bad: "...proves every step's scope before the first row is read, and refuses
> any plan it cannot prove."
> Good: "From 2027 the planner resolves them first."

*The two-claim splice.* Two independent clauses that each deserve their own
slot, glued into one line. Decide which claim the slide is making and keep that
one; if both matter, one becomes the title and the other becomes a caption,
chip or card, so the layout carries the relationship. Where the two really are
one thought, rewrite as a single clause with a compound predicate, which needs
no comma.

> Bad: "Signups rose fast, and retention is next."
> Good: "Signups have risen enough to shift onto retention."

> Bad: "We are on the engineering work now, and guardrails for other teams come
> next."
> Good: "We are doing the engineering work now and the guardrails for other
> teams after that."

> Bad: "A test that passes can still ship a bug, and coverage gets its first
> target in October."
> Good: "A test that passes can still ship a bug, which is why coverage gets
> its first target in October."

Note what the last fix does: `, and` asserted nothing about how the two facts
relate, so replacing it with a connective that states the relation is usually
enough on its own. If no such connective is true, the two halves did not belong
in one sentence. The one surviving use is a serial comma in a genuine list of
three or more items, and a list like that generally wants a visual structure
rather than a sentence anyway.

**The unresolvable demonstrative.** `this` · `these` · `both` · `either`
pointing at something the slide does not contain, because it lives on the next
slide or only in the writer's head. It survives every sentence-level check,
reads fine to the author who knows the referent, and strands the audience. Name
the thing, or move the line to the slide that shows it.

> Bad, on a slide charting one metric: "Every team depends on both of these
> numbers."
> Good: "Every team depends on how often the answer is right."

**Antithesis split across two elements.** The banned inversion, with its halves
in a title and a subtitle rather than either side of a comma, so no single line
looks wrong. The second element also carries no information, because the
positive claim already implies the negative one.

> Bad: title "Most of the remaining gap is a training problem" + subtitle "None
> of these are research problems for us."
> Good: same title + subtitle "These are ideas we have yet to sequence."

Read the title and subtitle as one sentence to catch it. If they form `X, not
Y`, the subtitle needs different content.

**Clipped negative openers.** `No big-bang launch.` · `No guessing.` ·
`Today: none.` State the positive claim, or write the full clause.

**The two-sentence punch.** A normal sentence followed by a very short one
(roughly six words or fewer) that exists to land emphasis. This is one of the
most recognisable Claude shapes and it hides everywhere, because each half
looks harmless. Join them into one natural sentence.

> Bad: "A customer asked this in March. We had nothing to give them."
> Good: "We had no answer for the question a customer asked in March."

> Bad: "Verification runs on every answer. A failed check shows as a stated
> limitation."
> Good: "Verification runs on every answer, so a failed check shows up as a
> stated limitation."

> Bad: "Two stages have fired. Both worked."
> Good: "Two stages have fired and both worked."

Two sentences are fine when the second one carries real content and normal
length. The tell is specifically the short trailing beat.

**Mirrored noun-phrase fragments.** Two bare noun phrases balanced across a
comma, with no verb, generating tension instead of saying something. Common in
lists, labels, and card titles because it feels economical. Write the plain
descriptive phrase, using natural verbs.

> Bad: "Two systems, one login" · "A refund, without a phone call" ·
> "One region against the rest"
> Good: "Two systems with no shared login" · "Getting a refund without
> phoning anyone" · "Comparing one region with everyone else"

> Bad: "One form, every department" · "One invoice, one approval"
> Good: "One form across every department" · "One invoice under one approval
> step"

A comma introducing a real qualifying clause is ordinary English and is not
this pattern: "All regions live, with returns holding at 4%" is fine.
The ban is on the two-halves-mirroring-each-other rhythm.

**Dramatic fragment stacks.** Two or more sentence fragments in a row for
effect. One short sentence is emphasis; three is a Claude signature.

**Formulaic sayings.** `X is the Y of Z`, `the language of`, `the architecture
of`, `X becomes a trap`.

> Bad: "The bottleneck is the process."
> Good: "More staff will not clear this queue."

**Em and en dashes.** Zero of them in slide copy. Use a period, a comma, a
colon, or rewrite. This is `humanizer` §14 and it applies without exception
here, including inside quotations you invented yourself.

**Inverted sentences (mechanism first, outcome second).** Almost always
written as `<mechanism>, so <outcome>`. Lead with the thing the reader cares
about and put the mechanism in a `because` clause after it. Treat a `, so `
in slide copy as a defect to be rewritten.

> Bad: "Approvals route by region, so a manager sees only their own team's
> spend."
> Good: "A manager sees only their own team's spend, because approvals route
> by region."

> Bad: "Our 4% counts only the orders that shipped, so we are changing the
> denominator to every order placed."
> Good: "We are changing the denominator to every order placed, because our
> 4% counts only the orders that shipped."

**Elevated verbs where a plain one works.** `carries` · `sits` · `holds` ·
`lands` · `surfaces` · `spans` · `lives` (figurative). These are strong tells
on their own. Use `has`, `is`, `gets`, `shows`.

> Bad: "Every request carries its own approval step."
> Good: "Every request has its own approval step."

> Bad: "Where the limit sits" · "the budget they hold"
> Good: "Where the limit is" · "the budget they control"

**Titles that hint instead of explain.** A title has to state the finding, not
tease the content underneath it. A title that could sit over a different set
of cards is a topic label. This is stricter than "write titles as assertions"
in `internal-comms-writing-style` §2, because a short teasing fragment can
technically be an assertion and still tell the reader nothing.

> Bad: "Three ways this fails." · "What stage three needs from you."
> Good: "Failures that we are on the lookout for." · "We need six engineers
> and two partner teams."

**The punchline title.** A title that only makes sense once the slide has
been read. It is the sibling of the teasing title and it fails the opposite
way: rather than saying too little, it says the *ending*, so the audience
meets a conclusion whose setup they do not have yet. Reviewers describe it
as "this is the first thing we see, it should be the beginning" — the title
is the entry point into the slide, and the body is what delivers the
payoff. The tell is that the title reads as the last line of the story
rather than the first: it names an outcome, a duration, or a verdict that
presupposes facts appearing further down. Rewrite it as the situation the
body then resolves.

> Bad, over a three-step story: "Forty minutes later, Dana had the wrong
> figure."
> Good: "Asked a question by finance, an analyst is on their own."

> Bad, over a rollout timeline: "That is why March slipped."
> Good: "Two of the four migrations depend on one team."

**The mechanic title on a slide whose stake is bigger than its mechanic.**
The title describes what the picture underneath does, when what the room
needs is what it is worth. It passes every other check, because describing
a mechanism accurately is a real assertion. Ask what changes for the
business if the slide is true, and put that in the title; the mechanism is
already visible in the body, so a title spent restating it buys nothing.
This bites hardest on demo slides, capability slides, and any slide whose
body is a screenshot or a diagram of a flow.

> Bad, over two screenshots of a search box: "Both users get a result they
> can read."
> Good: "One sentence now reaches the whole catalogue."

> Bad, over a diagram of three planned capabilities: "The box can do more
> than one job."
> Good: "The next platform work serves the helper and every agent after
> it."

**The same leading word across a set of sibling labels.** Step titles, card
titles and diagram labels are usually written in one sitting, which is how
all of them end up opening on `The`. Each label is fine; the *set* reads as
generated, because a person naming four things by hand would not reach for
one article four times. It is the anaphora defect from "the matched pair"
applied to labels rather than to sentences, and it is invisible line by
line — you have to read the set as a column. Name each label for what
happens in it, and let their grammar differ.

> Bad: "The question" · "The detour" · "The query that ran"
> Good: "What she was asked for" · "High cognitive load and collaboration
> needed" · "A query that may be false"

Parallel form is still right when the set genuinely is one progression
being read left to right, such as the tread labels on a staircase diagram
("Clicking the interface" · "Asking in chat" · "Trusting an agent"). There
the repetition IS the structure. The defect is a repeated *article* or
filler opener carrying no meaning, not a deliberate shared grammar.

**Count-then-distribute.** A title that announces how many things there are,
followed by a line saying each of them does its share. It reads as a template
because the second line carries no information: the reader can already see
there are four cards, and that each one is different. Cut the distributive
line and make the title say what the things actually do. The same shape shows
up compressed into a single sentence (`Two stages ... and both worked`).

> Bad: "Four new checks cover the missing 30%." / "Each one handles a
> different part of the gap."
> Good: "Automating intake and triage closes most of the gap."
> (with no follow-up line at all)

> Bad: "Two stages have fired and both worked."
> Good: "The first two stages worked."

The giveaways: a number in the title paired with `each one` · `each of` ·
`one for each` · `both` · `all of them` · `every one` · `respectively` in the
title or the line under it. A count in a title is fine on its own when it is
the actual ask or finding ("We need six engineers and two partner teams"); the
defect is the count plus the distributive echo.

**The second element that restates the first.** The most common real failure
once the sentence-level tells are gone, and the easiest to miss because every
line passes on its own. Two elements on one slide say the same thing, so the
smaller one is pure padding. Three sub-forms recur:

- A **diagram callout repeating the slide title**. Point the callout at
  something the title does not already carry, usually the consequence.

  > Bad: title "One supplier makes every part we ship" + callout "All our
  > products come from this supplier"
  > Good: same title + callout "A delay here stops the whole line"

- A **delta chip repeating numbers already in the title**. If the title says
  "Margin moved from 12% to 19%", a pill reading "Up from 12% last year" is
  the same fact twice. Either delete the pill or take the movement out of the
  title, never keep both.

- A **card note repeating its own subtitle**. Give the note the consequence
  instead of the same observation in fewer words.

  > Bad: subtitle "Buyers still open by asking something they could answer
  > themselves" + note "They already know the answer."
  > Good: same subtitle + note "Getting it wrong ends the call."

The check: for every slide, read the title, subtitle, chips, callouts and card
notes as one list, and delete any line whose information is already in another.
This is broader than "does a line repeat the title" — annotations, pills and
axis captions restate each other just as often.

**Titles that name a deliverable instead of claiming something.** A bare noun
phrase describing what the reader gets is a topic label wearing a claim's
clothes. Give it a verb and address the reader.

> Bad: "One short report every month"
> Good: "You get one short report every month"

**The same subordinator three slides running.** Each line is correct and the
repetition is still a tell. `X, because Y` is the fix for the banned inverted
`, so` sentence, which means a deck that has just been de-slopped tends to
collect them. Count `because` · `which` · `when` · `with` across the deck, not
just within a slide; three inside four consecutive slides is too many, and one
of them has to be rewritten to carry its causation differently.

> Bad, three slides apart: "The design group gets a dedicated researcher,
> because we split the team in two." / "Turnover fell because the review cycle
> stopped changing." / "Response time is a proxy we trust, because a ticket
> nobody opens cannot be resolved."
> Good: keep two, and turn the weakest into a plain statement, e.g. "Reviewers
> now know which number they are moving."

### Words and phrases to avoid in decks

**Named by the reviewer, never use these:**

`release gate` · `load-bearing` · `slip quietly` · `confidently wrong` ·
`nothing runs until` · `provable` / `prove` (as a flourish) · `alike` ·
`before` (when it carries the whole argument, three or more times in a deck) ·
`receipt` (as a metaphor, more than once)

**The standard AI-marker vocabulary.** These have measurably spiked in
published writing since late 2022 and read as machine-written on sight:

`delve` · `dive into` · `navigate` (figurative) · `underscore` · `bolster` ·
`foster` · `harness` · `leverage` · `unpack` · `shed light on` ·
`pave the way` · `pivotal` · `groundbreaking` · `cutting-edge` ·
`transformative` · `game-changing` · `innovative` · `robust` ·
`comprehensive` · `seamless` · `intricate` · `nuanced` (as empty praise) ·
`vibrant` · `multifaceted` · `holistic` · `testament` · `showcase` ·
`tapestry` · `landscape` (figurative) · `realm` · `crucial` ·
`best-in-class` · `move the needle`

**Stock phrases:**

`In today's fast-paced / rapidly evolving world` · `It's important to note
that` · `It's worth noting that` · `One of the most important` ·
`When it comes to` · `At its core` · `At the end of the day` ·
`This is where X comes in` · `Let's break it down` ·
`plays a crucial role in` · `it cannot be overstated` ·
`underscoring the importance of` · `highlighting the need for` ·
`reflecting a broader trend toward` · `marking a significant shift in` ·
`the real question is`

Sources for the vocabulary and phrase lists:
[Will Francis, "How to stop Claude writing like an AI"](https://willfrancis.com/how-to-stop-claude-writing-like-an-ai/)
and [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
which is also the basis of the `humanizer` skill.

This list is additive. When the reviewer names a new phrase, add it here
rather than remembering it for one deck.

### The gate before Phase 2 is a reading pass, not this script

**Run the `slide-copy-review` skill.** It is an LLM reading pass over every
visible line, and it is the actual gate. It catches what no pattern match can:
a title that teases instead of explaining, a comma holding two mirrored
fragments rather than a real clause, a supporting line that only restates the
visual above it, a card three sentences over its ceiling, and three adjacent
slides that all happen to share one sentence shape.

The script below is a **pre-filter**. Its only job is to tell you which slides
to be most suspicious of first. A clean scan is not evidence that the copy
passed, and reporting one as if it were is a failure of the review. Roughly a
third of the catalogue is undetectable by regex by construction, because
`All regions live, with returns holding at 4%` (fine) and
`Two systems, one login` (banned) are the same shape to a matcher.

Two of its checks are worth knowing the exact reach of, because both were
added after a review where the reading pass found what they cannot:

- `restates` flags two elements on one slide that share a **four-word run**.
  Verified against real defects: it catches a subtitle ending "...something
  they could answer themselves" against a note reading "They already know the
  answer." It does **not** catch a paraphrase (a title and a callout making
  the same point in different words) or a numeric restatement (a title saying
  "moved from 12% to 19%" against a pill saying "Up from 12% last year").
  Both of those shapes scan clean while being real defects, so check 6 of the
  review has to be read, not scanned.
- `matched pair` catches the shape only when both halves sit inside **one**
  tagged element. A title and its subtitle forming a matched pair across two
  elements scans clean, and so does a pair whose halves rhyme in structure
  without repeating a word in the same position ("Cutting the queue took
  tooling. Keeping it short will take rules."). Read every pair of adjacent
  sentences by eye regardless of what this reports.
- `SUBORDINATOR RUN` counts `because` over every window of four consecutive
  slides. Verified: it catches three occurrences spread across four slides. It
  does not track `which` / `when` / `with`, which need the same judgement
  applied by eye.

It reads only the text inside `data-overlay` spans, so it looks at what an
audience actually sees:

```bash
python3 - << 'PY'
import pathlib, re, html
pats = {
  "not-X-but-Y":  r"\b(?:,\s+not\s+\w|not\s+just\b|not\s+only\b|rather than\b|instead of\b)",
  "inversion":    r",\s+so\s+",
  "comma-and":    r",\s+and\b",
  "'before'":     r"\bbefore\b",
  "prove/-able":  r"\bprov(?:e|es|en|able)\b",
  "em/en dash":   r"[—–]",
  "elevated verb": r"\b(?:carr(?:y|ies|ied)|sits|lands|surfaces|spans|holds)\b",
  "named-banned": r"\b(?:release gate|load[- ]bearing|slip quietly|confidently wrong|alike)\b",
  "stock words":  r"\b(?:delve|dive into|navigat\w+|underscor\w+|bolster|foster\w*|harness|leverage|unpack|pave the way|pivotal|groundbreaking|cutting-edge|transformative|game-changing|innovative|robust|comprehensive|seamless|intricate|nuanced|vibrant|multifaceted|holistic|testament|showcas\w+|tapestry|realm|crucial|best-in-class)\b",
  "stock phrase": r"(?:in today's|worth noting|important to note|when it comes to|at its core|at the end of the day|cannot be overstated|plays a crucial role|the real question is)",
}
NUM  = r"\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b"
DIST = r"\b(?:each one|each of|one for each|both|all of (?:it|them)|every one|respectively)\b"
subord = {}
for f in sorted(pathlib.Path(".").glob("*.html")):
    spans = re.findall(r'data-overlay="([^"]+)"[^>]*>(.*?)</', f.read_text(), re.S)
    text  = {o: " ".join(html.unescape(v).split()) for o, v in spans}
    copy  = " ".join(text.values())
    hits = {k: n for k, n in
        ((k, len(re.findall(v, copy, re.I))) for k, v in pats.items()) if n}
    # the two-sentence punch: a trailing sentence of <= 6 words
    for oid, t in text.items():
        if not t or "·" in t: continue
        parts = [x.strip() for x in re.split(r'(?<=[.!?])\s+', t) if x.strip()]
        for nxt in parts[1:]:
            if len(nxt.rstrip(".").split()) <= 6:
                hits.setdefault("punch", []).append(f"{oid}: …{nxt}")
        # the matched pair: adjacent sentences on one grammatical frame --
        # a shared opening word (anaphora), or near-equal length sharing two
        # words in the same position (isocolon)
        for a, b in zip(parts, parts[1:]):
            wa = re.findall(r"[a-z']+", a.lower())
            wb = re.findall(r"[a-z']+", b.lower())
            if not wa or not wb: continue
            same_pos = sum(1 for x, y in zip(wa, wb) if x == y)
            if wa[0] == wb[0] or (abs(len(wa) - len(wb)) <= 2 and same_pos >= 2):
                hits.setdefault("matched pair", []).append(f"{oid}: {a} / {b}")
    # count-then-distribute: a number in the title, a distributive echo nearby
    ttl = next((v for k, v in text.items() if k.endswith("-title")), "")
    sub = next((v for k, v in text.items() if k.endswith("-subtitle")), "")
    if re.search(NUM, ttl, re.I) and re.search(DIST, ttl + " " + sub, re.I):
        hits["count-then-distribute"] = f"{ttl} / {sub}"
    # one element restating another: 4-word overlap between any two elements
    def shingles(s):
        w = re.findall(r"[a-z0-9%]+", s.lower())
        return {tuple(w[i:i+4]) for i in range(len(w) - 3)}
    ids = [(o, t) for o, t in text.items() if len(t.split()) >= 4]
    for a in range(len(ids)):
        for b in range(a + 1, len(ids)):
            if shingles(ids[a][1]) & shingles(ids[b][1]):
                hits.setdefault("restates", []).append(f"{ids[a][0]}~{ids[b][0]}")
    subord[f.name] = len(re.findall(r"\b(?:because)\b", copy, re.I))
    print(f"{f.name:28} {hits or 'clean'}")

# deck-wide: the same subordinator three slides running
names = sorted(subord)
for i in range(len(names) - 3):
    win = names[i:i+4]
    if sum(subord[n] for n in win) >= 3:
        print(f"SUBORDINATOR RUN  'because' x{sum(subord[n] for n in win)} across {', '.join(win)}")
PY
```

A non-empty result is not automatically a defect. Read each hit and decide.
But every hit needs a reason to survive, and "it sounded good" is not one.
Also count words per element against the table in §1; the scanner cannot see
density.
