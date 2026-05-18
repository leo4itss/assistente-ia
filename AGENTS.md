# AGENTS.md — Convenções do projeto Assistente IA

Documento de referência para Claude, Codex e Gemini. Baseado no que **de fato existe** no repositório.

---

## Stack

| Camada | Lib / Ferramenta | Versão |
|---|---|---|
| Framework | React | 18.3.1 |
| Build | Vite + @vitejs/plugin-react | 6.3.5 / 4.7.0 |
| Styling | Tailwind CSS v4 (via @tailwindcss/vite) | 4.1.12 |
| UI primitives | Radix UI (suite completa) | 1.x–2.x |
| Componentes prontos | shadcn/ui (Radix + Tailwind) | sem versão própria |
| Ícones | lucide-react | 0.487.0 |
| Toasts | sonner | 2.0.3 |
| Formulários | react-hook-form | 7.55.0 |
| Animações | motion | 12.23.24 |
| Utilitários CSS | clsx + tailwind-merge + class-variance-authority | 2.1.1 / 3.2.0 / 0.7.1 |
| Linguagem | TypeScript (transpilado pelo Vite/esbuild, sem tsc) | — |

> **MUI 7 está em `dependencies` mas não é usado nos componentes ativos.** Não adicione novos componentes MUI.

---

## Estrutura de pastas

```
src/
├── app/
│   ├── App.tsx              # Raiz: estado global, roteamento de telas
│   ├── components/
│   │   ├── ui/              # shadcn/ui — componentes gerados (button, dialog, input…)
│   │   ├── figma/           # Helpers do Figma Make (ImageWithFallback)
│   │   └── *.tsx            # Componentes de tela do projeto (PascalCase)
│   └── constants/
│       └── defaultAssistants.ts   # Dados estáticos de assistentes padrão
├── assets/                  # Imagens referenciadas via `figma:asset/` (não editar nomes)
├── imports/                 # AUTO-GERADO pelo Figma Make — SVG paths e snapshots de design
└── styles/
    ├── index.css            # Entry point: importa fonts, tailwind, theme, theme-design
    ├── theme.css            # CSS variables shadcn + @theme inline (não editar)
    ├── theme-design.css     # Overrides do DESIGN.md sobre o shadcn (não editar — gerado manualmente)
    ├── tailwind.css         # Diretivas @import "tailwindcss"
    └── fonts.css            # @font-face declarations
```

---

## Design System

**`DESIGN.md` é a fonte da verdade para tokens de design** (cores, tipografia, radius, spacing, componentes).  
`src/styles/theme-design.css` aplica esses tokens como overrides sobre as CSS variables do shadcn.

**Comandos:**
```bash
npm run design:lint      # Valida DESIGN.md (0 errors obrigatório antes de commitar)
npm run design:export    # Referência: exporta tokens em formato Tailwind v3 JSON (não usado ativamente)
```

**Regras:**
- Para mudar uma cor do projeto: edite o `DESIGN.md` e atualize `src/styles/theme-design.css` manualmente (o CLI `@google/design.md` ainda não suporta export para Tailwind v4 CSS).
- Nunca editar `src/styles/theme-design.css` sem também atualizar o `DESIGN.md` — os dois devem estar em sincronia.
- Novos componentes devem referenciar tokens do `DESIGN.md` (`{colors.primary}`, `{rounded.sm}`…).
- Componentes gerados pelo Figma Make contêm hex hardcoded — não altere ao refatorar sem checar o `DESIGN.md` primeiro.
- Antes de criar um componente do zero, verifique `src/app/components/ui/` — button, input, textarea, dialog, slider, card, tabs e outros já existem.

---

## Convenções de código

**Imports:**
```ts
// Alias @/ → src/ (configurado no vite.config.ts)
import CustomizationScreen from "@/app/components/CustomizationScreen";
import { DEFAULT_ASSISTANTS } from "@/app/constants/defaultAssistants";
import svgPaths from "@/imports/svg-vtaynlf815";

// Assets Figma Make (resolver customizado no Vite)
import imgAvatar from "figma:asset/cfa90523740b88f37cf837b3a4b69c4f932d514c.png";
```

**Naming:**
- Arquivos de componentes: `PascalCase.tsx` (ex: `EditAssistantScreen.tsx`)
- shadcn/ui em `ui/`: `kebab-case.tsx` (ex: `dialog.tsx`) — padrão gerado, manter
- Constantes e utilitários: `camelCase.ts`
- Sem `index.ts` barrel files — import direto pelo caminho

**Tipos:**
- Interface do modelo principal (`Assistant`) vive em `src/app/App.tsx` e é exportada: `export interface Assistant { … }`
- Tipos locais ficam no próprio arquivo do componente
- Sem pasta `types/` separada

**Estado:**
- Estado local com `useState` / `useEffect`
- Persistência via `localStorage` + eventos customizados (`window.dispatchEvent(new Event("assistants-updated"))`)
- Sem gerenciador de estado global (Redux, Zustand, etc.)

---

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Build de produção → dist/
```

> `lint` e `preview` **não existem** no `package.json`. Não os invoque.

---

## Não mexer

| Arquivo / Pasta | Motivo |
|---|---|
| `default_shadcn_theme.css` | Sincronizado com o Figma Make — marcado com `KEEP_IN_SYNC` |
| `src/styles/theme.css` | Espelho do `default_shadcn_theme.css`; alterar quebra o design system inteiro |
| `src/styles/theme-design.css` | Overrides do DESIGN.md — editar o `DESIGN.md`, não este arquivo diretamente |
| `vercel.json` | Configuração de deploy Vercel (força npm, output dir) |
| `vite.config.ts` | Contém o resolver `figma:asset/` — remover quebra todos os assets |
| `src/imports/` | Auto-gerado pelo Figma Make — não editar manualmente |
| `src/assets/` | Assets referenciados por hash — não renomear arquivos |

---

## Fluxo de trabalho

1. **Uma branch por feature** a partir de `dev` (`git checkout -b feat/nome-da-feature`)
2. **Commits pequenos e descritivos** com prefixo do modelo no final:
   ```
   feat: adiciona contador de uso na tela Persona [claude]
   fix: corrige layout dos botões no EditAssistantScreen [codex]
   chore: atualiza dependências [gemini]
   ```
3. **Sempre rodar `npm run build` antes de commitar** — confirma que não há erros de transpilação
4. **Push para `dev`** — deploy automático na Vercel a partir dessa branch
5. PRs de `dev → main` apenas para releases estáveis
