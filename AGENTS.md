# AGENTS.md — Fonte de verdade para agentes

**Este arquivo é a única fonte de verdade** para regras de desenvolvimento, convenções, workflow de sessão e Definition of Done.

`CLAUDE.md`, `.cursor/rules/*` e `README.md` **apenas complementam** o comportamento específico de cada ferramenta (Claude Code, Cursor, onboarding humano). Não redefinem as regras daqui — quando houver conflito, prevalece o `AGENTS.md`.

Baseado no que **de fato existe** no repositório. Não copie tokens de design nem fluxos de produto para cá — consulte os docs certos (tabela abaixo).

---

## Mapa de documentação (leia só o necessário)

| Se a tarefa envolver… | Consulte |
|---|---|
| Como trabalhar neste repo, convenções ou Definition of Done | **este arquivo (`AGENTS.md`)** |
| Tokens, tipografia, cores ou componentes visuais | `DESIGN.md` (+ sync `src/styles/theme-design.css`) |
| Customização IA (Persona, Fontes, Capacidades, Acervo, salvar/excluir…) | `docs/capacidades.md` |
| Regras always-on no Cursor (resumo injetado a cada edição) | `.cursor/rules/project.mdc` |
| Uso via Claude Code | `CLAUDE.md` → aponta para cá |
| Apenas rodar o app (onboarding humano) | `README.md` |

`docs/resources-tools.md` está **obsoleto** (tela antiga removida).

---

## Princípios

- **Reutilização antes de criação** — preferir componentes, hooks, serviços e utilitários já existentes.
- **O código é a fonte da verdade para implementação** — leia o código real; docs e regras não substituem o que está no repo.
- **A documentação deve refletir o comportamento do código** — se o produto mudou, atualize `docs/` (e este arquivo, se a convenção mudou).
- **Evitar duplicação** entre código, documentação de produto e regras dos agentes — uma verdade por tema; o resto só aponta.

---

## Workflow de sessão

1. **Entender a tarefa** — escopo, arquivos e se mexe em produto, design ou só código.
2. **Confirmar Git** — branch, worktree (se houver) e `git status` limpo/esperado **antes** de implementar.
3. **Abrir só a documentação necessária** — use o [Mapa](#mapa-de-documentação-leia-só-o-necessário); não leia `DESIGN.md`/`docs/` por padrão.
4. **Ler o código real** — `App.tsx`, tela/seção alvo; não confiar em exemplos antigos de outros docs.
5. **Verificar reutilização** — antes de criar componente, hook, serviço ou utilitário, busque equivalentes em `src/app/components/` (incl. `ui/`), `lib/`, etc.
6. **Implementar** — seguir convenções deste arquivo; UI: toasts/padrões em `project.mdc`; tokens em `DESIGN.md`.
7. **Validar e fechar** — cumprir o [Definition of Done](#definition-of-done) antes de declarar a tarefa concluída.

---

## Arquitetura (resumo)

- Protótipo React + Vite + Tailwind, **sem router**. Telas via estado em `src/app/App.tsx`.
- Fluxo de telas:
  - `showCreateAssistant` → `CreateAssistantScreen`
  - `showAssistantConfig` → `AssistantConfigScreen` (Customização IA v3)
  - default → chat (`Sidebar` + Header + ChatBar)
- Customização IA: seções `identity` | `sources` | `capabilities` | `builtins` | `config`.
- Estado: `useState` / `useEffect` + `localStorage` + evento `assistants-updated`. Sem Redux/Zustand.
- Config do assistente: tipos em `src/app/types/assistantConfig.ts`; persistência em `Assistant.config` (JSON string). `resources`/`tools` só migração.
- Alias `@/` → `src/`. Assets Figma: `figma:asset/<hash>.png` (não renomear `src/assets/`).

Detalhe de produto da Customização IA → `docs/capacidades.md`.

---

## Stack (orientação)

React 18, TypeScript (transpile Vite/esbuild, sem `tsc`), Vite, Tailwind v4, Radix/shadcn, lucide, sonner, react-hook-form.

**Não** adicionar componentes MUI (está em `dependencies`, mas não é usado).

Versões exatas → `package.json`.

---

## Comandos

```bash
npm run dev          # dev server
npm run build        # obrigatório antes de commit (ver DoD)
npm run design:lint  # só se alterar DESIGN.md / tokens
```

Não existem `lint`, `test` nem `preview` — não invocar.

---

## Convenções de código

- Componentes: `PascalCase.tsx`; shadcn em `ui/`: `kebab-case.tsx`; sem barrels `index.ts`.
- `Assistant` exportado de `App.tsx`; tipos do config v3 em `types/assistantConfig.ts`; tipos de UI locais no próprio arquivo.
- Toasts: `toastSuccess` (`@/app/lib/toast`) / `toast.error` (sonner) — nunca `toast.success()`.
- Preferir primitivos existentes em `src/app/components/ui/`.

---

## Design

Fonte de verdade: **`DESIGN.md`**.  
Alterar token → editar `DESIGN.md` e espelhar em `theme-design.css`; rodar `design:lint`.  
Não editar `theme-design.css` / `theme.css` sem o doc. Hex em `src/imports/` veio do Figma — checar `DESIGN.md` antes de mudar.

---

## Não mexer

| Caminho | Motivo |
|---|---|
| `src/imports/`, `src/assets/` | Figma Make / hashes de asset |
| `src/styles/theme.css`, `theme-design.css`, `default_shadcn_theme.css` | Design system (editar via `DESIGN.md`) |
| `vite.config.ts` | Resolver `figma:asset/` |
| `vercel.json` | Deploy |

---

## Git

- Branch a partir de `dev` (`feat/…` ou ticket).
- Commit: `feat|fix|chore: descrição em português [modelo]`.
- Push/`dev` → deploy Vercel; PR `dev → main` só em release estável.

---

## Definition of Done

Uma tarefa só deve ser considerada concluída quando:

1. **Build** — `npm run build` passa sem erro.
2. **Design (se aplicável)** — `npm run design:lint` ok; `DESIGN.md` ↔ `theme-design.css` sincronizados.
3. **Documentação de produto** — mudança de fluxo/regras/UI/microcopy/persistência → atualizar o doc em `docs/` (Customização IA → `docs/capacidades.md`). Não deixar docs contradizendo o código.
4. **Instruções de agente** — mudança de arquitetura/convenções → atualizar **este** `AGENTS.md` e, se o resumo divergir, `.cursor/rules/project.mdc` / ponteiro em `CLAUDE.md` (sem duplicar o checklist).
5. **Qualidade de UI** — padrões do projeto (`toastSuccess`/`toast.error`, footer no grid, botões conforme tokens/`project.mdc`).
6. **Commit** — mensagem no formato do projeto; sem secrets; escopo coerente com a branch.
