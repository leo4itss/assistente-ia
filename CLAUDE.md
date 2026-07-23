# CLAUDE.md

Guidance for **Claude Code** in this repository.

## Source of truth

All development rules, conventions, session workflow, and Definition of Done live in **`AGENTS.md`**.  
This file only adds Claude Code–specific pointers. If anything conflicts, **`AGENTS.md` wins**.

Tokens → `DESIGN.md`. Product (Customização IA) → `docs/capacidades.md`.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # Production build → dist/ (required before commit — see DoD in AGENTS.md)
npm run design:lint  # Only when changing DESIGN.md / tokens
```

There is no `lint`, `test`, or `preview` script — do not invoke them.
