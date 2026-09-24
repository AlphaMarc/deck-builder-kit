# deck-builder-kit

A Claude Code skill for building premium, on-brand `.pptx` decks from
HTML/CSS designs, plus a template library showing every layout the
skill knows how to draw.

## Contents

- **[`skills/brand-deck-builder/`](skills/brand-deck-builder/)** — the
  Claude Code skill itself: `SKILL.md`, the design system and copy
  discipline references, worked examples, and the build scripts that
  render HTML slides to screenshots/preview and reassemble them into a
  real, editable `.pptx`.
- **[`template-library/`](template-library/)** — one real slide per
  layout the skill can draw (light and dark variants where both read
  well), plus screenshots and a rendered preview deck. See its own
  README for the layout catalogue and how the library is extended.

## Installing the skill

Copy (or symlink) the skill folder into your Claude Code skills
directory:

```bash
cp -R skills/brand-deck-builder ~/.claude/skills/brand-deck-builder
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
