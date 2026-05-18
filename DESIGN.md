---
version: alpha
name: Assistente IA
description: Interface dark-first para assistente virtual com múltiplas personas. Gerada a partir do Figma via Figma Make e ajustada manualmente.

colors:
  background: "#030712"
  surface: "#111827"
  surface-overlay: "#1f2937"
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  foreground: "#f9fafb"
  muted-foreground: "#9ca3af"
  destructive: "#f87171"
  destructive-hover: "#ef4444"
  border: "#1f2937"
  input-surface: "#0d1117"

typography:
  display:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1
  heading:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
  body-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 16px

rounded:
  sm: 8px
  md: 10px
  lg: 14px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: 36px

  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"

  button-secondary:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.foreground}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: 36px

  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: 36px

  button-destructive-hover:
    backgroundColor: "{colors.destructive-hover}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"

  input:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: 36px

  input-placeholder:
    textColor: "{colors.muted-foreground}"

  textarea:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: 64px

  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "24px"

  card-border:
    backgroundColor: "{colors.border}"

  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"

  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"

  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    width: 256px

  sidebar-item-active:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: 32px

  avatar:
    backgroundColor: "{colors.surface-overlay}"
    rounded: "{rounded.full}"
---

## Overview

Interface dark-first para um assistente virtual configurável. O estilo é minimalista e funcional: fundo quase-preto (`#030712`), superfícies em cinza escuro (`#111827`), texto claro sobre fundo escuro, e azul (`#2563eb`) como único accent de ação.

Os componentes foram originalmente gerados pelo **Figma Make** e por isso carregam cores hardcoded nos arquivos de `src/imports/` e nas telas de `src/app/components/`. Os tokens aqui documentados são a referência para novos componentes e refatorações.

> **Dois sistemas coexistem:** o `src/styles/theme.css` define variáveis CSS light/dark do shadcn (não usadas diretamente nos componentes Figma Make). O DESIGN.md documenta o que os componentes **de fato renderizam**.

---

## Colors

Paleta dark-first com superfícies em escala de cinza escuro e um único accent azul.

- **background** `#030712` — fundo de toda a aplicação; use em wrappers de tela
- **surface** `#111827` — sidebar, cards, modais; primeira camada acima do fundo
- **surface-overlay** `#1f2937` — inputs, estados ativos na sidebar, superfícies de hover
- **primary** `#2563eb` — botão de ação principal, tab ativa, slider fill
- **primary-hover** `#1d4ed8` — estado hover do primary; nunca use diretamente como cor base
- **foreground** `#f9fafb` — todo texto sobre fundo escuro
- **muted-foreground** `#9ca3af` — placeholders, texto secundário, descrições
- **destructive** `#f87171` (60% opacidade nos botões) — ações destrutivas (deletar)
- **destructive-hover** `#ef4444` — estado hover de botões destrutivos
- **border** `#1f2937` — separadores e bordas (na prática: `rgba(255,255,255,0.1)` sobre fundo escuro)
- **input-surface** `#0d1117` — aproximação sólida de `rgba(255,255,255,0.05)` sobre background

---

## Typography

Família única: **Inter**. Quatro pesos em uso: 400, 500, 600, 700.

| Token | Size | Weight | Line Height | Uso |
|---|---|---|---|---|
| `display` | 20px | 700 | 1 | Títulos de página (ex: "Persona", "Criar Persona") |
| `heading` | 16px | 600 | 1 | Títulos de cards (ex: "Controle de Criatividade") |
| `body-medium` | 14px | 500 | 20px | Labels de campos, botões, itens de menu |
| `body` | 14px | 400 | 20px | Conteúdo de inputs, texto de paragráfo |
| `caption` | 14px | 400 | 16px | Textos auxiliares pequenos (ex: "0" e "1" do slider) |

Não há escala de tamanhos além de 14px e 20px nos componentes ativos.

---

## Layout

Grid base de **8px**. Todos os espaçamentos nos componentes são múltiplos de 4px.

| Token | Valor | Onde aparece |
|---|---|---|
| `xs` | 4px | Gap entre ícone e texto em itens de menu |
| `sm` | 8px | Padding interno de botões e menu items |
| `md` | 12px | Padding de inputs e textareas |
| `lg` | 16px | Padding horizontal do header |
| `xl` | 24px | Padding interno de cards |
| `2xl` | 32px | Padding das áreas de formulário |

Sidebar fixa: **256px**. Formulários centralizados com `max-width: 640px`. Header fixo: **64px** de altura.

---

## Components

### Botões

Três variantes de botão, todas com `height: 36px`, `rounded: 8px`, `padding: 8px 16px`:

- **button-primary** — `{colors.primary}` · ação principal (Salvar, Editar)
- **button-secondary** — superfície translúcida · ações secundárias (Cancelar, Voltar)
- **button-destructive** — `{colors.destructive}` a 60% · ações destrutivas (Deletar)

Estados desabilitados: `opacity: 0.5`, `cursor: not-allowed`.

### Inputs e Textareas

Fundo `rgba(255,255,255,0.05)`, borda `rgba(255,255,255,0.15)`, `rounded: 8px`. Placeholder em `{colors.muted-foreground}`. Focus aumenta opacidade da borda para 0.3.

### Card (Controle de Criatividade)

`backgroundColor: {colors.surface}`, `rounded: 14px`, borda `rgba(255,255,255,0.1)`, padding `24px`. Usado para agrupar controles relacionados.

### Dialog (Modal de Exclusão)

`backgroundColor: {colors.surface}`, `rounded: 10px`, sombra com `drop-shadow`. Overlay de fundo: `rgba(0,0,0,0.5)` com `backdrop-blur`.

### Sidebar

256px de largura, `backgroundColor: {colors.surface}`. Item ativo recebe `backgroundColor: {colors.surface-overlay}` e `rounded: 8px`.

### Avatar

`size: 48px` nos formulários, `size: 20px` no header combobox. Sempre `rounded: full`. Fundo fallback: `{colors.surface-overlay}`.
