---
name: code-to-figma
description: >-
  Captura telas do Assistente IA no Figma PRIZM a partir do código ou app rodando
  localmente. Use com /code-to-figma para espelhar UI no design, generate_figma_design,
  ou sincronizar telas com o arquivo PRIZM.
paths:
  - "src/**"
disable-model-invocation: true
---

# Code → Figma (Assistente IA / PRIZM)

Captura pixel-perfect de telas do app no arquivo Figma PRIZM via `generate_figma_design`.

## Defaults deste projeto

Use quando o usuário invocar `/code-to-figma` **sem** informar origem ou destino:

| Parâmetro | Default |
|-----------|---------|
| **Destino Figma** | `https://www.figma.com/design/3JwzcildMjhnuBjctl3lRo/-PRIZM--Assistente-IA?node-id=28502-9579` |
| **Origem (local)** | `http://localhost:5173/` — subir com `npm run dev` se não estiver rodando |
| **Tokens** | `@DESIGN.md`, `@src/styles/theme-design.css` |
| **Convenções** | `@AGENTS.md`, `@.cursor/rules/project.mdc` |

## Origem por tela

| Tela | Arquivo | Deep link (captura local) |
|------|---------|---------------------------|
| Chat (shell) | `@src/app/App.tsx` | `http://localhost:5173/` |
| Criar assistente | `@src/app/components/CreateAssistantScreen.tsx` | navegar até a tela no app |
| Customização | `@src/app/components/CustomizationScreen.tsx` | navegar até a tela no app |
| Resources & Tools | `@src/app/components/ResourcesToolsScreen.tsx` | `http://localhost:5173/?screen=resources-tools` |
| Resources — aba Avançado | — | `http://localhost:5173/?screen=resources-tools&tab=avancado` |

Se o usuário citar uma tela pelo nome, mapeie para a linha acima e use o deep link quando existir.

## Entradas

| Parâmetro | Exemplo | Obrigatório |
|-----------|---------|-------------|
| **Origem** | `http://localhost:5173/` ou URL Vercel | Sim (usar default local se omitido) |
| **Destino Figma** | URL com `node-id` | Sim (usar default PRIZM se omitido) |
| **Escopo** | "chat", "customização", "aba avançado" | Não |

## Skills e ferramentas obrigatórias

1. Carregar **figma-generate-design** (workflow de capture).
2. Conectar via MCP **figma** — se falhar autenticação, pedir `mcp_auth` e retentar.
3. Extrair `fileKey` e `nodeId` da URL destino (`node-id` com `-` → `:`).

## Workflow de capture (padrão)

Este é o fluxo validado e preferido para este projeto:

1. **Garantir app rodando**
   - Verificar porta 5173: `lsof -i :5173`
   - Se vazio: `npm run dev` e aguardar `http://localhost:5173/`
2. **Navegar até a tela** — usar deep link da tabela acima ou interagir no browser.
3. **`generate_figma_design`** com `fileKey` e `nodeId` destino → receber `captureId`.
4. **Abrir capture no browser** (macOS):
   ```
   open "http://localhost:5173/<rota>#figmacapture=<captureId>&figmaendpoint=https%3A%2F%2Fmcp.figma.com%2Fmcp%2Fcapture%2F<captureId>%2Fsubmit&figmadelay=2000"
   ```
5. **Poll** `generate_figma_design` com `fileKey` + `captureId` a cada 5s até `completed` (até 10 tentativas).
6. **Confirmar** com o usuário via link retornado (`node-id` do frame capturado).

## Origem: localhost vs Vercel

| Origem | Método | Requisito |
|--------|--------|-----------|
| **localhost** (`npm run dev`) | Hash URL `#figmacapture=...` | Padrão — sempre usar |
| **Vercel / URL externa** | Playwright MCP + script de capture | Playwright MCP instalado no Cursor |

> **Nunca** usar `open <url-externa>#figmacapture=...` — falha silenciosamente sem o script injetado.

Se o usuário pedir Vercel e Playwright não estiver disponível, oferecer fallback para `npm run dev` local.

## Workflow avançado (opcional)

Só quando o usuário pedir componentes do design system em vez de frames crus:

1. Carregar também **figma-use**.
2. Rodar `generate_figma_design` + `use_figma` **em paralelo**.
3. Refinar instâncias contra o capture (spacing, `imageHash` de imagens).
4. Deletar frame de referência do capture após validar.

Telas com imagens (`figma:asset/`, avatares) exigem o capture paralelo — `use_figma` não busca URLs externas.

## Regras

- Não editar `src/imports/` nem `src/assets/`.
- Ao final, resumir: URL capturada, link do frame no Figma, tela/aba capturada.

## Invocação

```
/code-to-figma
```

```
/code-to-figma chat
```

```
/code-to-figma

Origem: http://localhost:5173/?screen=resources-tools&tab=avancado
Destino: https://www.figma.com/design/3JwzcildMjhnuBjctl3lRo/-PRIZM--Assistente-IA?node-id=28502-9579
```
