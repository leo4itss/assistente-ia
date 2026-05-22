export type DatabaseType = "postgresql" | "mysql" | "sqlserver";
export type McpTransport = "stdio" | "http" | "websocket";
export type GlobalMcpTransport = "stdio" | "sse";

export interface ColumnSchema {
  id: string;
  name: string;
  type: string;
  is_null: boolean;
  is_key: boolean;
  comment: string;
}

export interface TableSchema {
  id: string;
  name: string;
  comment: string;
  columns: ColumnSchema[];
}

export interface DbSchema {
  id: string;
  name: string;
  comment: string;
  tables: TableSchema[];
}

export interface DatabaseProvider {
  id: string;
  database: DatabaseType | "";
  connection_string: string;
  system_prompt: string;
  use_mcp: boolean;
  mcp_host: string;
  mcp_port: string;
  mcp_transport: McpTransport | "";
  mcp_secret_key: string;
  mcp_command: string;
  mcp_args: string[];
  metadata: DbSchema[];
}

export interface AgentDatabase {
  id: string;
  type: "agent_database";
  version: "v1" | "v2";
  tools: DatabaseProvider[];
}

export interface Documents {
  id: string;
  connection_string: string;
  system_prompt: string;
}

export interface AgentDocuments {
  id: string;
  type: "agent_documents";
  tools: Documents[];
}

export interface TavilyTool {
  id: string;
  type: "tavily";
  api_key: string;
}

export interface WebSearchTool {
  id: string;
  type: "web_search";
  country: string;
}

export type ResearchToolItem = TavilyTool | WebSearchTool;

export interface AgentResearch {
  id: string;
  type: "agent_research";
  tools: ResearchToolItem[];
}

export type Resource = AgentDatabase | AgentDocuments | AgentResearch;
export type ResourceType = "agent_database" | "agent_documents" | "agent_research";

export interface McpTool {
  id: string;
  type: "mcp";
  url: string;
  transport: GlobalMcpTransport | "";
  secret_key: string;
  system_prompt: string;
}

export interface AzureAiSearchTool {
  id: string;
  type: "azure_ai_search";
  service_name: string;
  api_key: string;
  system_prompt: string;
}

export type GlobalTool = McpTool | AzureAiSearchTool;
export type GlobalToolType = "mcp" | "azure_ai_search";

export interface ValidationErrors {
  [fieldPath: string]: string;
}
