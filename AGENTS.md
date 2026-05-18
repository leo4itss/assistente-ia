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
    ├── index.css            # Entry point: importa fonts, tailwind, theme
    ├── theme.css            # Tokens CSS + bloco @theme inline (fonte da verdade)
    ├── tailwind.css         # Diretivas @import "tailwindcss"
    └── fonts.css            # @font-face declarations
```

---

## Design system

**Fonte da verdade:** `src/styles/theme.css` (e seu espelho `default_shadcn_theme.css`).  
Tokens disponíveis como variáveis CSS (`--background`, `--foreground`, `--primary`, `--destructive`, `--border`, `--radius`…) e como classes Tailwind semânticas (`bg-background`, `text-foreground`, `border-border`, `rounded-lg`…) via bloco `@theme inline`.

**Regras:**
- Novos componentes devem usar classes semânticas Tailwind (`bg-card`, `text-muted-foreground`, `border-border`) em vez de hex hardcoded.
- Componentes gerados pelo Figma Make (em `src/imports/` e componentes de tela) **contêm hex hardcoded** — não altere esses valores ao refatorar; só troque intencionalmente ao ajustar um componente.
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
| `src/styles/theme.css` | Espelho dos tokens; alterar quebra o design system inteiro |
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
