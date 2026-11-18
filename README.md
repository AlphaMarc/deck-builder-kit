# deck-builder-kit

Claude Code skills for building premium, on-brand `.pptx` decks from
HTML/CSS designs, plus a template library showing every layout the
deck builder knows how to draw.

## Contents

- **[`skills/brand-deck-builder/`](skills/brand-deck-builder/)** — the
  main skill: `SKILL.md`, the design system and copy discipline
  references, worked examples, and the build scripts that render HTML
  slides to screenshots/preview and reassemble them into a real,
  editable `.pptx`.
- **[`skills/presentation-storytelling/`](skills/presentation-storytelling/)**
  — builds the narrative arc and beat list before any slide is designed.
- **[`skills/internal-comms-writing-style/`](skills/internal-comms-writing-style/)**
  — the BLUF, assertion-headline writing style used for slide copy.
- **[`skills/slide-copy-review/`](skills/slide-copy-review/)** — the
  line-by-line copy review that gates every deck before `.pptx`
  conversion.
- **[`skills/humanizer/`](skills/humanizer/)** — a third-party skill
  (v2.11.1, © 2025 Siqi Chen, MIT, see its [`LICENSE`](skills/humanizer/LICENSE))
  that strips AI-writing patterns from prose, based on Wikipedia's
  "Signs of AI writing". Included unchanged because the other skills
  call it for an extra copy pass.
- **[`template-library/`](template-library/)** — one real slide per
  layout the deck builder can draw (light and dark variants where both
  read well), plus screenshots and a rendered preview deck. See its own
  README for the layout catalogue and how the library is extended.

The skills call each other by name, so install all five.

## Installing the skills

Copy (or symlink) the skill folders into your Claude Code skills
directory:

```bash
cp -R skills/* ~/.claude/skills/
```

If you already have `humanizer` installed, skip it to keep your own
version:

```bash
cp -R skills/brand-deck-builder skills/presentation-storytelling skills/internal-comms-writing-style skills/slide-copy-review ~/.claude/skills/
```

Then set up its build environment (Playwright for screenshots,
python-pptx for the `.pptx` conversion):

```bash
~/.claude/skills/brand-deck-builder/scripts/setup_env.sh
```

This installs `node_modules` and a `.venv` under `scripts/` — both are
git-ignored and rebuilt locally, not committed here.

## Using the template library

Open `template-library/out/preview.html` in a browser to click through
every layout, or browse the individual numbered `.html` slides and
`shots/*.png` screenshots directly. `template-library/deck-system.css`
is a copy of the skill's design-system stylesheet — after installing
the skill, re-copy it from `skills/brand-deck-builder/references/`
rather than editing the copy in place.
