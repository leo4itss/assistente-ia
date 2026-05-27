# Resources e Tools — Documentação de Funcionalidade

## Índice

1. [Visão geral](#visão-geral)
2. [Estrutura da tela](#estrutura-da-tela)
3. [Aba Recursos](#aba-recursos)
   - [Banco de dados](#banco-de-dados-agent_database)
   - [Documentos](#documentos-agent_documents)
   - [Pesquisa](#pesquisa-agent_research)
4. [Aba Ferramentas globais](#aba-ferramentas-globais)
   - [MCP](#mcp)
   - [Azure AI Search](#azure-ai-search)
5. [Aba Avançado (JSON)](#aba-avançado-json)
6. [Fluxo de salvar](#fluxo-de-salvar)
7. [Regras de validação](#regras-de-validação)
8. [Persistência](#persistência)
9. [Cenários de teste e critérios de aceite](#cenários-de-teste-e-critérios-de-aceite)

---

## Visão geral

A tela **Resources e Tools** permite configurar as fontes de dados e ferramentas externas que o assistente de IA pode utilizar. É acessada a partir da tela **Customização IA** (botão "Resource e Tools") e pertence ao fluxo de configuração de um assistente específico.

Toda a configuração é persistida no `localStorage` como strings JSON dentro do objeto do assistente (`resources` e `tools`).

---

## Estrutura da tela

```
┌─────────────────────────────────────────────────────────┐
│  [←]                                                    │  ← Botão voltar (retorna para CustomizationScreen)
├─────────────────────────────────────────────────────────┤
│  Recursos  |  Ferramentas globais  |  Avançado (JSON)   │  ← Abas
├─────────────────────────────────────────────────────────┤
│  Resources e Tools                   [Adicionar ...]    │  ← Título + botão contextual por aba
│  Configure bancos de dados...                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              Conteúdo da aba ativa                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                              [Cancelar]  [Salvar]       │  ← Footer fixo
└─────────────────────────────────────────────────────────┘
```

### Navegação

| Elemento | Comportamento |
|---|---|
| Botão `←` (header) | Volta para `CustomizationScreen` sem salvar |
| Botão `Cancelar` (footer) | Idêntico ao botão `←` |
| Botão `Salvar` (footer) | Fica desabilitado até que alguma alteração seja feita (`isDirty`). Ao clicar, executa validação antes de confirmar |
| Abas | Navegação entre "Recursos", "Ferramentas globais" e "Avançado (JSON)" sem perder dados |

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
| País (código ISO) | Text (máx. 2 chars) | Não | Ex.: `BR`, `US`, `PT`. Campo digitado é convertido automaticamente para maiúsculas |

O botão **"Adicionar ferramenta de pesquisa"** só exibe as opções ainda não adicionadas. Quando ambas já existem no recurso, o botão some.

---

## Aba Ferramentas globais

O botão **"Adicionar ferramenta"** fica no cabeçalho da página (canto superior direito), visível apenas quando a aba "Ferramentas globais" está ativa. Ao clicar, dropdown com:

- **MCP**
- **Azure AI Search**

Diferente dos recursos, ferramentas globais são **transversais** a todos os recursos do assistente.

---

### MCP

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| URL | Text (url) | Sim | Endpoint do servidor MCP. Ex.: `https://mcp.example.com` |
| Transporte | Select | Sim | `stdio` ou `sse` |
| Chave secreta | Password | Não | Autenticação do servidor MCP |
| System prompt | Textarea | Não | Instrui o agente sobre como usar esta ferramenta |

---

### Azure AI Search

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| Nome do serviço | Text | Sim | Identificador do serviço Azure. Ex.: `meu-azure-search` |
| API Key | Password | Sim | Chave de autenticação Azure |
| System prompt | Textarea | Sim | Instrui o agente sobre como usar este índice |

#### Exclusão com confirmação

Ao clicar no ícone de lixeira de qualquer ferramenta global, o cabeçalho do card exibe "Remover? **Sim** / **Não**". A exclusão só é efetivada ao confirmar com "Sim".

---

## Aba Avançado (JSON)

Exibe um preview **somente leitura** do JSON gerado a partir de todos os recursos e ferramentas configurados. Útil para inspecionar a estrutura antes de salvar.

Formato:
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
   "Salvar Resources e Tools?"
        │
   ┌────┴────────────────────────┐
   │ "Cancelar" → fecha diálogo  │
   │ "Salvar" → persiste dados   │
   └────┬────────────────────────┘
        │ Confirmado
        ▼
   Atualiza localStorage
   ("assistants" → campo resources e tools do assistente)
   Dispara evento "assistants-updated"
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

### Ferramentas globais — MCP

| Regra | Mensagem de erro |
|---|---|
| **URL** vazia | "Informe uma URL válida." |
| **Transporte** não selecionado | "Selecione o transporte." |

### Ferramentas globais — Azure AI Search

| Regra | Mensagem de erro |
|---|---|
| **Nome do serviço** vazio | "Informe o nome do serviço." |
| **API Key** vazia | "Informe a API key." |
| **System prompt** vazio | "Descreva como o agente deve usar esta fonte." |

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

**Pré-condição:** Estar na tela Resources e Tools de qualquer assistente.

**Passos:**
1. Adicionar um recurso "Banco de dados" na aba Recursos
2. Clicar na aba "Ferramentas globais"
3. Clicar novamente na aba "Recursos"

**Critério de aceite:**
- O recurso "Banco de dados" adicionado no passo 1 ainda está visível ao retornar
- Nenhum dado é perdido ao trocar de aba

---

### CT-02 — Botão "Salvar" desabilitado sem alterações

**Pré-condição:** Entrar na tela Resources e Tools sem nenhuma mudança pendente.

**Passos:**
1. Observar o botão "Salvar" no footer

**Critério de aceite:**
- O botão "Salvar" está visualmente desabilitado (opacidade reduzida, cursor `not-allowed`)
- Clicar no botão não dispara nenhuma ação

---

### CT-03 — Botão "Salvar" habilitado após alteração

**Pré-condição:** Nenhuma alteração pendente.

**Passos:**
1. Adicionar qualquer recurso ou ferramenta
2. Observar o botão "Salvar"

**Critério de aceite:**
- O botão "Salvar" fica habilitado imediatamente após a alteração
- O botão retorna ao estado desabilitado após salvar com sucesso

---

### CT-04 — Adicionar recurso Banco de dados (caminho feliz)

**Pré-condição:** Aba "Recursos" ativa, sem recursos cadastrados.

**Passos:**
1. Clicar em "Adicionar recurso" no cabeçalho
2. Selecionar "Banco de dados" no dropdown
3. Verificar que um card "Banco de dados" aparece na lista
4. Confirmar que a versão padrão selecionada é "v1"

**Critério de aceite:**
- Card criado imediatamente, sem formulário pré-preenchido
- Versão "v1" marcada por padrão
- Sem conexões listadas ainda (campo de erro "Adicione ao menos uma conexão" só aparece ao tentar salvar)
- Botão "Salvar" é habilitado

---

### CT-05 — Configurar Banco de dados sem MCP (caminho feliz)

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
- Diálogo de confirmação aparece
- Após confirmar, `isDirty` volta a `false` (botão "Salvar" desabilitado)
- Dados persistidos no `localStorage`

---

### CT-06 — Configurar Banco de dados com MCP

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

### CT-07 — Validação: Banco de dados sem campos obrigatórios

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

### CT-08 — Validação: Banco de dados sem conexões

**Pré-condição:** Card "Banco de dados" adicionado, nenhuma conexão criada.

**Passos:**
1. Clicar em "Salvar" com o card vazio (sem conexões)

**Critério de aceite:**
- Erro "Adicione ao menos uma conexão de banco." aparece dentro do card
- Diálogo de confirmação não é aberto

---

### CT-09 — Editor de Metadata (schema)

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

### CT-10 — Adicionar recurso Documentos

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

### CT-11 — Adicionar recurso Pesquisa — Tavily

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

### CT-12 — Adicionar recurso Pesquisa — Web Search

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

### CT-13 — Excluir recurso com confirmação

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

### CT-14 — Ferramentas globais: adicionar MCP (caminho feliz)

**Pré-condição:** Aba "Ferramentas globais" ativa.

**Passos:**
1. Clicar em "Adicionar ferramenta" → "MCP"
2. Preencher "URL" com `https://mcp.example.com`
3. Selecionar "sse" no campo "Transporte"
4. Deixar "Chave secreta" e "System prompt" em branco
5. Salvar

**Critério de aceite:**
- Salva sem erros (chave secreta e system prompt são opcionais para MCP)
- JSON na aba Avançado contém o objeto MCP com os campos preenchidos

---

### CT-15 — Ferramentas globais: validação MCP

**Pré-condição:** Ferramenta MCP adicionada com campos obrigatórios vazios.

**Passos:**
1. Deixar "URL" e "Transporte" vazios
2. Clicar em "Salvar"

**Critério de aceite:**
- Erro "Informe uma URL válida." abaixo do campo URL
- Erro "Selecione o transporte." abaixo do campo Transporte
- Diálogo de confirmação não é aberto

---

### CT-16 — Ferramentas globais: adicionar Azure AI Search (caminho feliz)

**Pré-condição:** Aba "Ferramentas globais" ativa.

**Passos:**
1. Clicar em "Adicionar ferramenta" → "Azure AI Search"
2. Preencher "Nome do serviço" com `meu-azure-search`
3. Preencher "API Key"
4. Preencher "System prompt"
5. Salvar

**Critério de aceite:**
- Salva sem erros
- Dados aparecem corretamente na aba Avançado (JSON)

---

### CT-17 — Excluir ferramenta global com confirmação

**Pré-condição:** Ao menos uma ferramenta global adicionada.

**Passos:**
1. Clicar no ícone de lixeira do card da ferramenta
2. Verificar que aparece "Remover? Sim / Não"
3. Clicar em "Não"
4. Clicar novamente na lixeira e confirmar com "Sim"

**Critério de aceite:**
- "Não" cancela sem remover
- "Sim" remove o card imediatamente
- Botão "Salvar" é habilitado após a remoção

---

### CT-18 — Aba Avançado (JSON) reflete estado atual

**Pré-condição:** Algum recurso ou ferramenta configurado.

**Passos:**
1. Adicionar um recurso "Pesquisa" com Tavily
2. Clicar na aba "Avançado (JSON)"

**Critério de aceite:**
- O JSON exibido contém o recurso recém adicionado
- O campo é somente leitura (não é editável pelo usuário)
- A estrutura segue o formato `{ "resources": [...], "tools": [...] }`

---

### CT-19 — Cancelar descarta alterações

**Pré-condição:** Alguma alteração feita (botão "Salvar" habilitado).

**Passos:**
1. Adicionar um recurso qualquer
2. Clicar em "Cancelar" (ou no botão `←` do header)

**Critério de aceite:**
- A tela fecha e retorna para `CustomizationScreen`
- Nenhum dado é salvo no `localStorage`
- Se retornar à tela, os dados adicionados não aparecem

---

### CT-20 — Persistência entre sessões

**Pré-condição:** Nenhuma configuração salva.

**Passos:**
1. Configurar um recurso "Banco de dados" completo
2. Salvar e confirmar
3. Fechar o navegador e reabrir
4. Navegar novamente até a tela Resources e Tools do mesmo assistente

**Critério de aceite:**
- O recurso "Banco de dados" aparece com todos os dados preenchidos anteriormente
- Nenhuma informação foi perdida entre sessões

---

### CT-21 — Múltiplos recursos de tipos diferentes

**Pré-condição:** Aba "Recursos" vazia.

**Passos:**
1. Adicionar um recurso "Banco de dados"
2. Adicionar um recurso "Documentos"
3. Adicionar um recurso "Pesquisa"
4. Verificar a aba "Avançado (JSON)"

**Critério de aceite:**
- Três cards aparecem na lista, cada um com seu tipo
- O JSON contém um array `resources` com três elementos, cada um com seu `type` correspondente
- A validação de cada tipo é independente

---

### CT-22 — Botões contextuais corretos por aba

**Pré-condição:** Tela Resources e Tools aberta.

**Passos:**
1. Verificar que o botão "Adicionar recurso" aparece na aba "Recursos"
2. Trocar para "Ferramentas globais"
3. Verificar que o botão "Adicionar ferramenta" aparece
4. Trocar para "Avançado (JSON)"

**Critério de aceite:**
- Na aba "Recursos": botão "Adicionar recurso" visível no cabeçalho
- Na aba "Ferramentas globais": botão "Adicionar ferramenta" visível no cabeçalho
- Na aba "Avançado (JSON)": nenhum botão de adição aparece no cabeçalho
