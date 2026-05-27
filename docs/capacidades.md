# Capacidades — Documentação de Funcionalidade

## Índice

1. [Visão geral](#visão-geral)
2. [Estrutura da tela](#estrutura-da-tela)
3. [Aba Recursos](#aba-recursos)
   - [Banco de dados](#banco-de-dados-agent_database)
   - [Documentos](#documentos-agent_documents)
   - [Pesquisa](#pesquisa-agent_research)
4. [Aba Integrações](#aba-integrações)
   - [MCP](#mcp)
   - [Azure AI Search (oculto)](#azure-ai-search-oculto)
5. [Aba Avançado (JSON)](#aba-avançado-json)
6. [Fluxo de salvar](#fluxo-de-salvar)
7. [Regras de validação](#regras-de-validação)
8. [Persistência](#persistência)
9. [Cenários de teste e critérios de aceite](#cenários-de-teste-e-critérios-de-aceite)

---

## Visão geral

A tela **Capacidades** permite configurar as fontes de dados e integrações externas que o assistente de IA pode utilizar. É acessada a partir da tela **Customização IA** (botão "Capacidades") e pertence ao fluxo de configuração de um assistente específico.

Toda a configuração é persistida no `localStorage` como strings JSON dentro do objeto do assistente (campos `resources` e `tools`).

> **Nomenclatura:** esta tela foi anteriormente chamada de "Resources e Tools". O microcopy foi atualizado em 27/05/2026 para linguagem orientada ao usuário final (admin de sistema, perfil não-técnico). Nomes de variáveis, tipos TypeScript, chaves de objeto e rotas internas **não foram alterados**.

---

## Estrutura da tela

```
┌─────────────────────────────────────────────────────────┐
│  [←]                                                    │  ← Botão voltar (retorna para CustomizationScreen)
├─────────────────────────────────────────────────────────┤
│  Recursos  |  Integrações  |  Avançado (JSON)           │  ← Abas
├─────────────────────────────────────────────────────────┤
│  Capacidades                         [Adicionar ...]    │  ← Título + botão contextual por aba
│  Configure as capacidades do assistente...              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              Conteúdo da aba ativa                      │
│              (max-width: 800px, centralizado)           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                              [Cancelar]  [Salvar]       │  ← Footer fixo, alinhado ao container de 800px
└─────────────────────────────────────────────────────────┘
```

### Navegação

| Elemento | Comportamento |
|---|---|
| Botão `←` (header) | Volta para `CustomizationScreen` sem salvar |
| Botão `Cancelar` (footer) | Idêntico ao botão `←` |
| Botão `Salvar` (footer) | Desabilitado até que alguma alteração seja feita (`isDirty`). Ao clicar, executa validação antes de confirmar |
| Abas | Navegação entre "Recursos", "Integrações" e "Avançado (JSON)" sem perder dados não salvos |

### Layout do footer

Os botões Cancelar e Salvar ficam alinhados à borda direita do container de conteúdo (max-width `800px`, com padding interno de `32px`). A borda direita dos botões coincide com a borda direita dos cards de recurso/integração.

---

## Aba Recursos

O botão **"Adicionar recurso"** fica no cabeçalho da página (canto superior direito), visível apenas quando a aba "Recursos" está ativa. Ao clicar, abre um dropdown com três opções:

- **Banco de dados**
- **Documentos**
- **Pesquisa**

Cada recurso adicionado aparece como um card com cabeçalho, conteúdo do formulário e botão de exclusão com confirmação ("Remover? Sim / Não").

Múltiplos recursos podem coexistir, inclusive do mesmo tipo.

---

### Banco de dados (`agent_database`)

Representa uma conexão do assistente com um banco de dados relacional.

#### Campos do card

**Versão** (radio obrigatório)
- `v1` (padrão) ou `v2`

**Conexões** (pode ter uma ou mais, adicionadas via "Adicionar conexão de banco")

Cada conexão contém:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| Banco de dados | Select | Sim | `postgresql`, `mysql` ou `sqlserver` |
| Usar MCP | Toggle | — | Alterna entre conexão direta e MCP |
| String de conexão | Password input | Sim (se MCP desligado) | Ex.: `postgresql://user:pass@host:5432/db` |
| **Configuração MCP** (visível apenas se "Usar MCP" ligado) | | | |
| Host | Text | Sim (se MCP) | Ex.: `localhost` |
| Porta | Number | Não | Ex.: `3000` |
| Transporte | Select | Não | `stdio`, `http` ou `websocket` |
| Chave secreta | Password | Não | Chave de autenticação MCP |
| Comando MCP | Text | Não | Ex.: `npx mcp-server` |
| Argumentos (mcp_args) | Chips | Não | Digite e pressione Enter ou vírgula para adicionar |
| System prompt | Textarea (máx. 500 chars) | Sim | Instrui o agente sobre como usar este banco |
| Metadata (schema) | Editor expansível | Não | Descreve schemas > tabelas > colunas |

#### Editor de Metadata (schema)

Hierarquia: **Schema → Tabela → Coluna**

Cada nível é um accordion colapsável. Os botões `+ Schema`, `+ Tabela` e `+ Coluna` adicionam novos itens.

| Nível | Campos |
|---|---|
| Schema | Nome (obrigatório se existir), Comentário |
| Tabela | Nome (obrigatório se existir), Comentário |
| Coluna | Nome (obrigatório se existir), Tipo, Toggle `null`, Toggle `key`, Comentário |

---

### Documentos (`agent_documents`)

Representa uma conexão com um repositório de documentos.

Cada item de documento contém:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| String de conexão | Password input | Sim | URL ou string de conexão com o repositório |
| System prompt | Textarea | Sim | Instrui o agente sobre como usar este repositório |

O botão **"Adicionar documentos"** aparece no corpo do card e adiciona novos itens. Cada item tem cabeçalho numerado ("Documentos 1", "Documentos 2"...) e botão de exclusão.

---

### Pesquisa (`agent_research`)

Permite configurar ferramentas de busca web para o assistente.

#### Ferramentas disponíveis (máximo 1 de cada tipo por recurso)

**Tavily**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| API Key | Password input | Sim | Chave da API Tavily (prefixo `tvly-`) |

**Web Search**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| País (código ISO) | Text (máx. 2 chars) | Não | Ex.: `BR`, `US`, `PT`. Convertido automaticamente para maiúsculas |

O botão **"Adicionar ferramenta de pesquisa"** só exibe as opções ainda não adicionadas. Quando ambas já existem no recurso, o botão some.

---

## Aba Integrações

> **Nomenclatura:** anteriormente chamada de "Ferramentas globais".

O botão **"Adicionar integração"** fica no cabeçalho da página (canto superior direito), visível apenas quando a aba "Integrações" está ativa. Ao clicar, dropdown com:

- **MCP**

Diferente dos recursos, integrações são **transversais** a todos os recursos do assistente.

---

### MCP

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| URL | Text (url) | Sim | Endpoint do servidor MCP. Ex.: `https://mcp.example.com` |
| Transporte | Select | Sim | `stdio` ou `sse` |
| Chave secreta | Password | Não | Autenticação do servidor MCP |
| System prompt | Textarea | Não | Instrui o agente sobre como usar esta integração |

#### Exclusão com confirmação

Ao clicar no ícone de lixeira de qualquer integração, o cabeçalho do card exibe "Remover? **Sim** / **Não**". A exclusão só é efetivada ao confirmar com "Sim".

---

### Azure AI Search (oculto)

O Azure AI Search é utilizado internamente pelo sistema e **não é exposto como opção configurável** na aba Integrações.

**Comportamento:**
- A opção não aparece no dropdown "Adicionar integração"
- Cards de `azure_ai_search` não são renderizados na UI
- Dados existentes de `azure_ai_search` no `localStorage` são **preservados** durante a serialização — a lógica de parse/stringify e validação permanecem intactas no código
- O tipo `AzureAiSearchTool` e o componente `AzureForm` existem no codebase mas não são acessíveis pelo usuário

---

## Aba Avançado (JSON)

Exibe e permite editar o JSON completo gerado a partir de todos os recursos e integrações configurados.

### Editor Monaco

A aba utiliza o **Monaco Editor** (o mesmo editor do VS Code), com as seguintes características:

| Configuração | Valor |
|---|---|
| Tema | `figma-json` — herda `vs-dark`, fundo `#0d1117`, borda `rgba(255,255,255,0.1)` |
| Sintaxe | JSON com syntax highlighting colorido |
| Numeração de linhas | Habilitada |
| Folding | Habilitado |
| Font size | 13px |
| Minimap | Desabilitado |
| Altura | Fluida — cresce para preencher todo o espaço disponível entre o header e o footer, com 40px de margem inferior |
| Rolagem | Interna ao editor (sem scroll externo na aba Avançado) |

### Edição direta

O editor é **editável**. Alterações válidas no JSON são refletidas imediatamente nas abas Recursos e Integrações ao retornar a elas.

| Estado | Comportamento |
|---|---|
| JSON válido | Estado `resources` e `tools` atualizado em tempo real; `isDirty = true`; erros limpos |
| JSON inválido | Indicador em vermelho no canto superior direito do editor: "JSON inválido — as alterações não serão salvas." O estado não é corrompido |

### Sincronização bidirecional

- Alterações nos formulários (abas Recursos/Integrações) → refletidas no JSON ao navegar para a aba Avançado
- Alterações no JSON → refletidas nos formulários ao navegar para as outras abas (somente se JSON for válido)
- O editor remonta ao entrar na aba para garantir que exibe o JSON mais recente

### Modal de expansão

O botão **⛶** (canto superior direito do label "JSON") abre o editor em **tela cheia**:

| Configuração | Valor |
|---|---|
| Layout | Ocupa 100% do viewport |
| Font size | 13px |
| Linha de números | Habilitada |
| Folding | Habilitado |
| Comportamento de edição | Idêntico ao inline — alterações válidas atualizam o estado |
| Fechar | Botão `✕` no canto superior direito; ao fechar, o editor inline sincroniza com eventuais mudanças feitas no modal |

### Formato do JSON

```json
{
  "resources": [ ... ],
  "tools": [ ... ]
}
```

---

## Fluxo de salvar

```
Usuário clica em "Salvar"
        │
        ▼
   Executa validação
        │
   ┌────┴────────────────────────┐
   │ Tem erros?                  │
   │ Sim → Exibe mensagem        │
   │ "Corrija os erros antes     │
   │ de salvar." no header       │
   │ Campos com erro ganham      │
   │ mensagem em vermelho        │
   └────┬────────────────────────┘
        │ Não
        ▼
   Abre diálogo de confirmação
   "Salvar capacidades?"
        │
   ┌────┴────────────────────────┐
   │ "Cancelar" → fecha diálogo  │
   │ "Salvar" → persiste dados   │
   └────┬────────────────────────┘
        │ Confirmado
        ▼
   Atualiza localStorage
   ("assistants" → campos resources e tools do assistente)
   Dispara evento "assistants-updated"
   Exibe toast "Capacidades salvas com sucesso."
   Fecha diálogo
   isDirty = false → Salvar desabilitado novamente
```

---

## Regras de validação

### Recursos — Banco de dados (`agent_database`)

| Regra | Mensagem de erro |
|---|---|
| Deve ter ao menos uma conexão | "Adicione ao menos uma conexão de banco." |
| Campo **Banco de dados** não selecionado | "Selecione o tipo de banco." |
| **String de conexão** vazia (MCP desligado) | "Informe a string de conexão ou ative MCP." |
| **System prompt** vazio | "Descreva como o agente deve usar esta fonte." |
| **Host MCP** vazio (MCP ligado) | "Informe o host MCP." |
| **Nome do schema** vazio | "Informe o nome do schema." |
| Schema sem tabelas | "Adicione ao menos uma tabela ao schema." |
| **Nome da tabela** vazio | "Informe o nome da tabela." |
| **Nome da coluna** vazio | "Toda coluna precisa de um nome." |

### Recursos — Documentos (`agent_documents`)

| Regra | Mensagem de erro |
|---|---|
| **String de conexão** vazia | "Informe a string de conexão." |
| **System prompt** vazio | "Descreva como o agente deve usar esta fonte." |

### Recursos — Pesquisa (`agent_research`)

| Regra | Mensagem de erro |
|---|---|
| **API Key** Tavily vazia | "Informe a API key do Tavily." |
| **País** Web Search com mais de 2 caracteres | "Use código ISO (ex.: BR)." |

### Integrações — MCP

| Regra | Mensagem de erro |
|---|---|
| **URL** vazia | "Informe uma URL válida." |
| **Transporte** não selecionado | "Selecione o transporte." |

> **Nota:** Azure AI Search possui validação no código (`service_name`, `api_key`, `system_prompt`), mas como não é exposto na UI, os erros não são exibidos ao usuário.

---

## Persistência

Os dados são salvos no `localStorage` com a chave `"assistants"`. Cada assistente é um objeto com os campos:

```ts
{
  id: string;
  resources: string;  // JSON.stringify(Resource[])
  tools: string;      // JSON.stringify(GlobalTool[])
  updatedAt: string;  // ISO 8601
}
```

Após salvar, o evento `"assistants-updated"` é disparado no `window` para que outros componentes (ex.: Sidebar) atualizem seus dados.

---

## Cenários de teste e critérios de aceite

---

### CT-01 — Navegação entre abas

**Pré-condição:** Estar na tela Capacidades de qualquer assistente.

**Passos:**
1. Adicionar um recurso "Banco de dados" na aba Recursos
2. Clicar na aba "Integrações"
3. Clicar novamente na aba "Recursos"

**Critério de aceite:**
- O recurso "Banco de dados" adicionado no passo 1 ainda está visível ao retornar
- Nenhum dado é perdido ao trocar de aba

---

### CT-02 — Botão "Salvar" desabilitado sem alterações

**Pré-condição:** Entrar na tela Capacidades sem nenhuma mudança pendente.

**Passos:**
1. Observar o botão "Salvar" no footer

**Critério de aceite:**
- O botão "Salvar" está visualmente desabilitado (opacidade reduzida, cursor `not-allowed`)
- Clicar no botão não dispara nenhuma ação

---

### CT-03 — Botão "Salvar" habilitado após alteração

**Pré-condição:** Nenhuma alteração pendente.

**Passos:**
1. Adicionar qualquer recurso ou integração
2. Observar o botão "Salvar"

**Critério de aceite:**
- O botão "Salvar" fica habilitado imediatamente após a alteração
- O botão retorna ao estado desabilitado após salvar com sucesso

---

### CT-04 — Toast de sucesso ao salvar

**Pré-condição:** Alguma alteração pendente (botão Salvar habilitado).

**Passos:**
1. Clicar em "Salvar"
2. Confirmar no diálogo "Salvar capacidades?"

**Critério de aceite:**
- O toast "Capacidades salvas com sucesso." aparece brevemente na tela
- O diálogo fecha automaticamente após a confirmação
- O botão "Salvar" retorna ao estado desabilitado

---

### CT-05 — Adicionar recurso Banco de dados (caminho feliz)

**Pré-condição:** Aba "Recursos" ativa, sem recursos cadastrados.

**Passos:**
1. Clicar em "Adicionar recurso" no cabeçalho
2. Selecionar "Banco de dados" no dropdown
3. Verificar que um card "Banco de dados" aparece na lista
4. Confirmar que a versão padrão selecionada é "v1"

**Critério de aceite:**
- Card criado imediatamente, sem formulário pré-preenchido
- Versão "v1" marcada por padrão
- Sem conexões listadas ainda
- Botão "Salvar" é habilitado

---

### CT-06 — Configurar Banco de dados sem MCP (caminho feliz)

**Pré-condição:** Card "Banco de dados" adicionado.

**Passos:**
1. Clicar em "Adicionar conexão de banco"
2. Selecionar "PostgreSQL" no campo "Banco de dados"
3. Confirmar que o toggle "Usar MCP" está desligado
4. Preencher "String de conexão" com `postgresql://admin:secret@localhost:5432/mydb`
5. Preencher "System prompt" com uma descrição
6. Clicar em "Salvar" → confirmar no diálogo

**Critério de aceite:**
- Nenhum erro exibido
- Diálogo de confirmação aparece com título "Salvar capacidades?"
- Após confirmar, `isDirty` volta a `false` (botão "Salvar" desabilitado)
- Dados persistidos no `localStorage`

---

### CT-07 — Configurar Banco de dados com MCP

**Pré-condição:** Card "Banco de dados" com uma conexão adicionada.

**Passos:**
1. Ligar o toggle "Usar MCP"
2. Confirmar que o campo "String de conexão" **desaparece**
3. Confirmar que o bloco "Configuração MCP" **aparece** com os campos: Host, Porta, Transporte, Chave secreta, Comando MCP, Argumentos
4. Preencher o campo "Host" com `localhost`
5. Preencher "System prompt"
6. Desligar o toggle novamente

**Critério de aceite:**
- "String de conexão" retorna ao desligar o toggle MCP
- Bloco "Configuração MCP" some ao desligar
- Nenhum dado anterior é perdido ao religar o toggle

---

### CT-08 — Validação: Banco de dados sem campos obrigatórios

**Pré-condição:** Card "Banco de dados" adicionado, uma conexão criada, campos vazios.

**Passos:**
1. Deixar os campos obrigatórios ("Banco de dados", "String de conexão", "System prompt") em branco
2. Clicar em "Salvar"

**Critério de aceite:**
- Mensagem "Corrija os erros antes de salvar." aparece no cabeçalho da página
- Cada campo com erro exibe sua mensagem específica em vermelho abaixo do campo
- Diálogo de confirmação **não** é aberto
- Ao preencher todos os campos obrigatórios e clicar em "Salvar" novamente, os erros somem e o diálogo aparece

---

### CT-09 — Validação: Banco de dados sem conexões

**Pré-condição:** Card "Banco de dados" adicionado, nenhuma conexão criada.

**Passos:**
1. Clicar em "Salvar" com o card vazio (sem conexões)

**Critério de aceite:**
- Erro "Adicione ao menos uma conexão de banco." aparece dentro do card
- Diálogo de confirmação não é aberto

---

### CT-10 — Editor de Metadata (schema)

**Pré-condição:** Conexão de banco adicionada no card "Banco de dados".

**Passos:**
1. Clicar em "+ Schema"
2. Preencher o nome do schema
3. Confirmar que uma tabela já existe dentro do schema
4. Preencher o nome da tabela
5. Adicionar uma coluna via "+ Coluna"
6. Preencher nome, tipo e marcar "key"
7. Colapsar e expandir o schema clicando na seta

**Critério de aceite:**
- Schema criado com uma tabela e uma coluna por padrão
- Accordion colapsa/expande sem perder dados
- Ao salvar, o schema inteiro é preservado no JSON

---

### CT-11 — Adicionar recurso Documentos

**Pré-condição:** Aba "Recursos" ativa.

**Passos:**
1. Clicar em "Adicionar recurso" → "Documentos"
2. Clicar em "Adicionar documentos"
3. Preencher "String de conexão"
4. Preencher "System prompt"
5. Clicar em "Adicionar documentos" novamente (segundo item)
6. Tentar salvar com o segundo item em branco

**Critério de aceite:**
- Dois itens aparecem numerados ("Documentos 1", "Documentos 2")
- Erro de validação aparece apenas no segundo item
- Excluir o segundo item e salvar funciona normalmente

---

### CT-12 — Adicionar recurso Pesquisa — Tavily

**Pré-condição:** Aba "Recursos" ativa.

**Passos:**
1. Clicar em "Adicionar recurso" → "Pesquisa"
2. Clicar em "Adicionar ferramenta de pesquisa" → "Tavily"
3. Tentar salvar com o campo "API Key" vazio
4. Preencher com uma key válida (ex.: `tvly-abc123`)
5. Tentar adicionar um segundo "Tavily"

**Critério de aceite:**
- Erro "Informe a API key do Tavily." aparece ao deixar em branco
- Após preencher, erro some
- O botão "Adicionar ferramenta de pesquisa" não exibe a opção "Tavily" quando já existe um

---

### CT-13 — Adicionar recurso Pesquisa — Web Search

**Pré-condição:** Recurso "Pesquisa" adicionado, sem Web Search.

**Passos:**
1. Clicar em "Adicionar ferramenta de pesquisa" → "Web Search"
2. Preencher o campo "País" com `brasil`
3. Confirmar que o campo aceita no máximo 2 caracteres e converte para maiúsculas (`BR`)
4. Salvar

**Critério de aceite:**
- Valor digitado é truncado para 2 caracteres automaticamente
- Caracteres minúsculos são convertidos para maiúsculas em tempo real
- Salvamento ocorre normalmente com `{"country": "BR"}`

---

### CT-14 — Excluir recurso com confirmação

**Pré-condição:** Pelo menos um recurso adicionado.

**Passos:**
1. Clicar no ícone de lixeira do card
2. Confirmar que aparecem os botões "Remover? Sim / Não"
3. Clicar em "Não"
4. Clicar novamente na lixeira e clicar em "Sim"

**Critério de aceite:**
- Clicar "Não" mantém o card na tela
- Clicar "Sim" remove o card imediatamente
- Botão "Salvar" é habilitado após a exclusão

---

### CT-15 — Aba Integrações: dropdown exibe apenas MCP

**Pré-condição:** Aba "Integrações" ativa.

**Passos:**
1. Clicar em "Adicionar integração"
2. Verificar as opções disponíveis no dropdown

**Critério de aceite:**
- O dropdown exibe apenas a opção "MCP"
- A opção "Azure AI Search" **não aparece** no dropdown
- Nenhum card de Azure AI Search é renderizado, mesmo que existam dados de `azure_ai_search` no `localStorage`

---

### CT-16 — Integrações: adicionar MCP (caminho feliz)

**Pré-condição:** Aba "Integrações" ativa.

**Passos:**
1. Clicar em "Adicionar integração" → "MCP"
2. Preencher "URL" com `https://mcp.example.com`
3. Selecionar "sse" no campo "Transporte"
4. Deixar "Chave secreta" e "System prompt" em branco
5. Salvar

**Critério de aceite:**
- Salva sem erros (chave secreta e system prompt são opcionais para MCP)
- JSON na aba Avançado contém o objeto MCP com os campos preenchidos

---

### CT-17 — Integrações: validação MCP

**Pré-condição:** Integração MCP adicionada com campos obrigatórios vazios.

**Passos:**
1. Deixar "URL" e "Transporte" vazios
2. Clicar em "Salvar"

**Critério de aceite:**
- Erro "Informe uma URL válida." abaixo do campo URL
- Erro "Selecione o transporte." abaixo do campo Transporte
- Diálogo de confirmação não é aberto

---

### CT-18 — Integrações: excluir com confirmação

**Pré-condição:** Ao menos uma integração adicionada.

**Passos:**
1. Clicar no ícone de lixeira do card
2. Verificar que aparece "Remover? Sim / Não"
3. Clicar em "Não"
4. Clicar novamente na lixeira e confirmar com "Sim"

**Critério de aceite:**
- "Não" cancela sem remover
- "Sim" remove o card imediatamente
- Botão "Salvar" é habilitado após a remoção

---

### CT-19 — Integrações: empty state correto

**Pré-condição:** Aba "Integrações" ativa, sem integrações cadastradas.

**Passos:**
1. Verificar o conteúdo da aba quando não há integrações

**Critério de aceite:**
- Ícone de ferramenta centralizado na área de conteúdo
- Título: "Nenhuma integração configurada"
- Descrição: "Adicione uma integração MCP para conectar serviços externos."
- Texto **não** menciona "Azure AI Search" nem "ferramentas globais"

---

### CT-20 — Aba Avançado: exibe JSON correto

**Pré-condição:** Algum recurso ou integração configurado.

**Passos:**
1. Adicionar um recurso "Pesquisa" com Tavily
2. Clicar na aba "Avançado (JSON)"

**Critério de aceite:**
- O editor Monaco exibe o JSON com syntax highlighting
- O JSON contém o recurso recém adicionado no array `resources`
- A estrutura segue o formato `{ "resources": [...], "tools": [...] }`
- A altura do editor preenche o espaço disponível até o footer

---

### CT-21 — Aba Avançado: edição direta válida

**Pré-condição:** Aba "Avançado (JSON)" ativa com algum conteúdo.

**Passos:**
1. Editar um campo de texto no JSON (ex.: alterar um `system_prompt`)
2. Navegar para a aba "Recursos"
3. Abrir o card correspondente

**Critério de aceite:**
- O campo alterado reflete o novo valor no formulário
- O botão "Salvar" está habilitado
- Nenhum indicador de erro aparece

---

### CT-22 — Aba Avançado: edição direta inválida

**Pré-condição:** Aba "Avançado (JSON)" ativa.

**Passos:**
1. Apagar uma chave de fechamento `}` para tornar o JSON inválido
2. Observar o indicador de erro

**Critério de aceite:**
- Mensagem "JSON inválido — as alterações não serão salvas." aparece em vermelho no canto superior direito do editor
- O estado interno **não** é corrompido (ao corrigir o JSON e navegar para outra aba, os dados originais estão intactos)
- Ao clicar em "Salvar" com JSON inválido, a validação falha normalmente

---

### CT-23 — Aba Avançado: modal de expansão

**Pré-condição:** Aba "Avançado (JSON)" ativa.

**Passos:**
1. Clicar no botão ⛶ (expandir) no canto superior direito do label "JSON"
2. Editar o JSON no modal
3. Fechar o modal com o botão ✕

**Critério de aceite:**
- Modal ocupa 100% do viewport
- Alterações válidas feitas no modal são refletidas no editor inline ao fechar
- Ao fechar, o editor inline remonta com o JSON atualizado
- O indicador de erro aparece no modal da mesma forma que no editor inline

---

### CT-24 — Aba Avançado: sincronização ao entrar na aba

**Pré-condição:** Recurso configurado na aba Recursos.

**Passos:**
1. Configurar um recurso "Documentos" com uma string de conexão
2. Navegar para a aba "Avançado (JSON)"

**Critério de aceite:**
- O editor exibe o JSON atualizado com o recurso recém configurado
- O conteúdo anterior do editor **não persiste** (o editor remonta ao entrar na aba)

---

### CT-25 — Cancelar descarta alterações

**Pré-condição:** Alguma alteração feita (botão "Salvar" habilitado).

**Passos:**
1. Adicionar um recurso qualquer
2. Clicar em "Cancelar" (ou no botão `←` do header)

**Critério de aceite:**
- A tela fecha e retorna para `CustomizationScreen`
- Nenhum dado é salvo no `localStorage`
- Se retornar à tela, os dados adicionados não aparecem

---

### CT-26 — Persistência entre sessões

**Pré-condição:** Nenhuma configuração salva.

**Passos:**
1. Configurar um recurso "Banco de dados" completo
2. Salvar e confirmar
3. Fechar o navegador e reabrir
4. Navegar novamente até a tela Capacidades do mesmo assistente

**Critério de aceite:**
- O recurso "Banco de dados" aparece com todos os dados preenchidos anteriormente
- Nenhuma informação foi perdida entre sessões

---

### CT-27 — Azure AI Search: dados existentes preservados

**Pré-condição:** Assistente com dados de `azure_ai_search` já salvos no `localStorage`.

**Passos:**
1. Abrir a tela Capacidades desse assistente
2. Verificar a aba Integrações
3. Navegar para a aba "Avançado (JSON)"
4. Salvar sem alterações

**Critério de aceite:**
- Nenhum card de Azure AI Search é renderizado na aba Integrações
- O JSON na aba Avançado **contém** o objeto `azure_ai_search` no array `tools`
- Após salvar, os dados de `azure_ai_search` são preservados no `localStorage`

---

### CT-28 — Alinhamento do footer

**Pré-condição:** Tela Capacidades aberta em cada uma das três abas.

**Passos:**
1. Verificar o alinhamento dos botões "Cancelar" e "Salvar" na aba Recursos
2. Verificar na aba Integrações
3. Verificar na aba Avançado (JSON)

**Critério de aceite:**
- Em todas as três abas, a borda direita do botão "Salvar" está alinhada com a borda direita dos cards/editor de conteúdo
- O alinhamento é consistente entre as abas (mesmo eixo horizontal)

---

### CT-29 — Botões contextuais corretos por aba

**Pré-condição:** Tela Capacidades aberta.

**Passos:**
1. Verificar que o botão "Adicionar recurso" aparece na aba "Recursos"
2. Trocar para "Integrações"
3. Verificar que o botão "Adicionar integração" aparece
4. Trocar para "Avançado (JSON)"

**Critério de aceite:**
- Na aba "Recursos": botão "Adicionar recurso" visível no cabeçalho
- Na aba "Integrações": botão "Adicionar integração" visível no cabeçalho
- Na aba "Avançado (JSON)": nenhum botão de adição aparece no cabeçalho; apenas o botão ⛶ de expandir o editor
