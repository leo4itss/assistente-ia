# Configuração de IA (v3) — Documentação de Funcionalidade

> **Escopo:** documenta a tela atual `AssistantConfigScreen` (Customização IA).  
> A tela anterior **Resources e Tools / Capacidades** (abas Recursos | Integrações | Avançado) foi **removida**. O arquivo legado `docs/resources-tools.md` está obsoleto.

## Índice

1. [Visão geral](#visão-geral)
2. [Estrutura da tela](#estrutura-da-tela)
3. [Persona](#persona)
4. [Fontes](#fontes)
   - [Documentos e Acervo](#documentos-e-acervo)
   - [Banco de dados](#banco-de-dados)
   - [MCP](#mcp)
5. [Capacidades](#capacidades)
6. [Recursos Nativos e Configurações](#recursos-nativos-e-configurações)
7. [Preview JSON](#preview-json)
8. [Fluxo de salvar e excluir](#fluxo-de-salvar-e-excluir)
9. [Persistência](#persistência)
10. [Cenários de aceite (desta feature)](#cenários-de-aceite-desta-feature)

---

## Visão geral

A **Customização IA** é a tela única de configuração do assistente. É aberta a partir do chat (ação de customização) e renderiza `AssistantConfigScreen`.

O modelo v3 separa:

| Camada | Função |
|---|---|
| **Persona** (`identity`) | Quem é o assistente (nome, avatar, personalidade, restrições) |
| **Fontes** (`sources`) | Catálogo físico de conexões (Documentos, Banco, MCP) |
| **Capacidades** (`capabilities`) | Opt-in semântico: vínculo com uma fonte + roteamento + instruções |
| **Recursos Nativos** (`builtins`) | Ferramentas da plataforma (ativo por padrão) |
| **Configurações** (`config`) | Sobrescritas de runtime vs defaults da plataforma |

A configuração completa é um JSON `AssistantConfig` persistido em `assistant.config` (string). Campos legados `resources` / `tools` só entram na leitura/migração.

---

## Estrutura da tela

```
┌──────────────┬──────────────────────────────────────────┐
│ Customização │  [☰]  [Seletor de assistente]   [Ver JSON]│
│ IA      [◫]  ├──────────────────────────────────────────┤
│              │  Título da seção + descrição             │
│ Voltar chat  │                                          │
│              │           Conteúdo (max 640px)           │
│ ASSISTENTE   │                                          │
│  Persona     ├──────────────────────────────────────────┤
│ CATÁLOGO     │  [Excluir]*                    [Salvar]  │  ← footer fixo
│  Fontes      │  * só em Persona                         │
│  Capacidades └──────────────────────────────────────────┘
│ PLATAFORMA
│  Recursos Nativos
│  Configurações
└──────────────
```

### Sidebar

| Elemento | Comportamento |
|---|---|
| Título **Customização IA** + ícone `PanelLeft` | Recolhe a sidebar (`w-[256px]` → `w-0`, com transição) |
| Com sidebar recolhida | O mesmo ícone aparece no header principal para expandir |
| **Voltar para o chat** | Retorna ao chat; se houver alterações (`isDirty`), pede confirmação (“Sair sem salvar?”) |
| Itens de navegação | Trocam a seção ativa sem perder alterações não salvas |

### Header principal

- Seletor de assistente (popover) + atalho para criar assistente
- Botão **Ver JSON** / **Ocultar JSON** abre o painel lateral de preview

### Layout do conteúdo e footer

- Conteúdo e footer usam o mesmo grid: `max-w-[640px]` com `px-[32px]`
- Bordas esquerda/direita dos botões do footer alinham com o formulário

---

## Persona

**Descrição da seção:** *Defina quem é o assistente: nome, avatar, personalidade, apresentação e restrições de comportamento.*

### Abas

- **Dados do assistente** — campos editáveis
- **Dados do sistema** — somente leitura (IDs de plataforma / schema)

### Campos (Dados do assistente)

| Campo | Observação |
|---|---|
| Avatar | Upload de imagem |
| Nome do Assistente | Obrigatório; espelhado em `Assistant.name` ao salvar |
| Descrição da persona | Personalidade, tom de voz, estilo e propósito |
| Apresentação Resumida | Texto curto de apresentação |
| Link de Apresentação em Vídeo | URL opcional |
| Restrições | Cards adicionáveis (título, instrução, resposta padrão, palavras) |

---

## Fontes

**Descrição da seção:** *Catálogo físico de conexões. As capacidades é que decidem quando usar cada fonte.*

Botões diretos para adicionar: **Documentos**, **Banco de dados**, **MCP**.

Badges de tipo (português): **DOCUMENTOS**, **BANCO DE DADOS**, **MCP**.

### Documentos e Acervo

Campos da source:

| Campo | Obrigatório | Descrição |
|---|---|---|
| Rótulo | Sim | Nome legível; autopreenche o ID enquanto o ID não for editado manualmente |
| ID | Sim | Identificador (`external_id`) |
| String de conexão | Sim | Conexão física da base (PGVector). O conteúdo do acervo **não** é definido neste campo |
| Acervo desta source | — | Resumo `N arquivo(s) · M link(s)` (+ erros) e botão **Abrir acervo** |

#### Modal **Acervo de documentos**

Ordem vertical do conteúdo:

1. Barra de stats (total, arquivo(s), link(s), ready, indexing/queued quando houver, com erro)
2. **Adicionar ao acervo** (upload + links) — **acima** da busca
3. **BUSCAR NO ACERVO** (texto + filtros de tipo e status)
4. Tabela

**Adicionar**

- Upload (drag-and-drop ou clique): extensões `pdf, docx, doc, txt, md, csv, xlsx`; até 25MB
- Link via campo URL + **Adicionar link** (extração/web scraping no fluxo real; no protótipo o pipeline é simulado)
- Validação inválida (extensão, tamanho, URL) → status `error` imediato
- Itens válidos entram no **topo** da lista

**Status (ciclo de vida)**

```
queued → indexing → ready
                 ↘ error (validação de cliente)
```

| Status | Badge | Observação |
|---|---|---|
| `queued` | QUEUED | Na fila |
| `indexing` | INDEXING | Indexando… |
| `ready` | READY | Pronto; preenche **Chunks** |
| `error` | ERRO | Motivo exibido na linha |

No protótipo o avanço `queued → indexing → ready` é simulado no cliente (sem backend real).

**Filtros de status:** todos / ready / indexing / queued / error.

**Tabela**

| Coluna | Comportamento |
|---|---|
| Tipo | FILE / LINK |
| Nome / URL | Nome do arquivo ou URL |
| Tamanho | Arquivos; links exibem `—` |
| Status | Badge |
| Chunks | Número quando `ready`; caso contrário `—` |
| Atualizado | Data; botão de ordenação ao lado do título (padrão: mais recentes primeiro) |

Limite de renderização: 100 linhas visíveis; acima disso a busca/filtro devem ser refinados.

### Banco de dados

Source de conexão direta ou via MCP (toggle **Usar MCP**), com campos de string de conexão / host / porta / transport / secret e estrutura opcional.

### MCP

Source genérica MCP: ID, Rótulo, URL, transport, secret key. Badge **MCP**.

---

## Capacidades

**Descrição da seção:** *Opt-in do tenant: se não estiver aqui, o supervisor não enxerga. Vínculo com fonte + roteamento para o supervisor + instruções para o motor.*

Tipos adicionáveis (rótulos PT): **Banco de dados**, **Documentos**, **Pesquisa** (FAQ existe no modelo; fora do fluxo ativo desta etapa).

Badges do card: **BANCO DE DADOS**, **DOCUMENTOS**, **PESQUISA**, **FAQ**.

### Campos comuns

| Campo UI | Descrição |
|---|---|
| ID | Identificador semântico da capacidade |
| Fonte (vínculo) | Select das sources compatíveis; vazio mostra **sem fonte** |
| Roteamento · descrição | O que o supervisor lê para decidir acionar |
| Roteamento · exemplos (um por linha) | Exemplos de perguntas/temas |
| Instruções | Instruções do motor |
| Escopo (schema → tabelas/views) | Só banco — recorte schema/tabelas |

Empty state: orienta cadastrar fonte em **Fontes** e depois criar a capacidade que faz o **vínculo**.

Compatibilidade de vínculo:

| Capacidade | Fontes compatíveis |
|---|---|
| Banco de dados | Banco de dados |
| Documentos | Documentos |
| Pesquisa | MCP |
| FAQ | (sem vínculo a fonte) |

---

## Recursos Nativos e Configurações

- **Recursos Nativos:** toggles da plataforma (não removíveis / não adicionáveis pelo usuário).
- **Configurações:** sobrescritas de temperatura, answer depth, models, etc. Campos omitidos usam default da plataforma.

---

## Preview JSON

- Painel lateral (**Ver JSON**) com editor Monaco somente leitura do `AssistantConfig` atual
- Botão de expandir abre modal em tela cheia
- Na modal: importar JSON / copiar JSON; importação marca a tela como dirty e pede Salvar

---

## Fluxo de salvar e excluir

### Salvar

1. Botão **Salvar** desabilitado enquanto `!isDirty`
2. Validação; em erro, navega para a seção correspondente
3. Diálogo **Salvar configuração?**
4. Persiste no `localStorage` e exibe toast *Configuração salva com sucesso.*

### Excluir assistente

- Botão **Excluir assistente** no footer, à **esquerda** (oposto ao Salvar)
- Visível **apenas** na seção **Persona**, com assistente selecionado
- Abre `DeleteAssistantModal` (confirma digitando o nome)
- Remove o assistente do `localStorage`, ajusta `selectedAssistantId` e volta ao chat

---

## Persistência

| Chave | Conteúdo |
|---|---|
| `assistants` | Lista de assistentes; cada um com `config` (JSON string do `AssistantConfig`) e campos de identidade espelhados |
| `selectedAssistantId` | Assistente ativo |
| Evento `assistants-updated` | Sincroniza UI após salvar / excluir / criar |

Query param `?section=` aceita: `identity` | `sources` | `capabilities` | `builtins` | `config` (default: `identity`).

---

## Cenários de aceite (desta feature)

### CA-01 — Layout do Acervo

- **Adicionar ao acervo** aparece acima de **BUSCAR NO ACERVO**
- Novos arquivos/links válidos entram no topo
- Coluna **Atualizado** tem controle de ordenação (padrão: mais recentes primeiro)
- Coluna **Chunks** exibe valor só em `ready`

### CA-02 — Status do Acervo

- Item válido inicia em `queued`, passa por `indexing` e chega em `ready` (protótipo simulado)
- Filtro de status lista: todos, ready, indexing, queued, error
- Extensão/tamanho/URL inválidos vão direto para `error`

### CA-03 — Microcopy Persona / Capacidades / Fontes

- Descrição de Persona: *Defina quem é o assistente: nome, avatar, personalidade, apresentação e restrições de comportamento.*
- Labels: **Fonte (vínculo)**, **Roteamento · …**, **Escopo (…)**, badges **DOCUMENTOS** / **BANCO DE DADOS** / **PESQUISA**

### CA-04 — Footer e sidebar

- Em Persona: **Excluir assistente** à esquerda e **Salvar** à direita, alinhados ao grid `640 + 32`
- Nas demais seções: botão de excluir **não** aparece
- Ícone da sidebar recolhe/expande a navegação lateral
