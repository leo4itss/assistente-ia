import type { Source, SourceConnectionMeta } from "@/app/types/assistantConfig";

const MOCK_DELAY_MS = 900;

export type TestConnectionResult =
  | { ok: true; message: string; meta: SourceConnectionMeta }
  | { ok: false; message: string; meta: SourceConnectionMeta };

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function containsFailToken(...values: string[]) {
  return values.some((v) => v.toLowerCase().includes("fail"));
}

function missingRequired(source: Source): string | null {
  if (source.kind === "documents") {
    if (!source.connection_string.trim()) return "Informe a string de conexão antes de testar.";
    return null;
  }
  if (source.kind === "database") {
    if (!source.database) return "Selecione o banco de dados antes de testar.";
    if (!source.connection_string.trim()) return "Informe a string de conexão antes de testar.";
    if (source.use_mcp && !source.mcp_host.trim()) return "Informe o host MCP antes de testar.";
    return null;
  }
  if (!source.url.trim()) return "Informe a URL do servidor MCP antes de testar.";
  if (!source.transport) return "Selecione o transporte antes de testar.";
  return null;
}

function mockWouldFail(source: Source): boolean {
  if (source.kind === "documents") {
    return containsFailToken(source.connection_string);
  }
  if (source.kind === "database") {
    return containsFailToken(
      source.connection_string,
      source.mcp_host,
      source.mcp_secret_key,
    );
  }
  return containsFailToken(source.url, source.secret_key);
}

/**
 * Mock de teste de conexão (protótipo).
 * - Falha imediata se campos obrigatórios estiverem vazios.
 * - Falha se algum campo de conexão contiver a substring "fail" (case-insensitive) — útil para demo.
 * - Caso contrário, sucesso após um delay curto.
 */
export async function testSourceConnection(source: Source): Promise<TestConnectionResult> {
  await delay(MOCK_DELAY_MS);

  const missing = missingRequired(source);
  if (missing) {
    return {
      ok: false,
      message: missing,
      meta: {
        connection_status: "failed",
        connection_tested_at: new Date().toISOString(),
        connection_error: missing,
      },
    };
  }

  if (mockWouldFail(source)) {
    const message = "Não foi possível conectar. Verifique os dados e tente novamente.";
    return {
      ok: false,
      message,
      meta: {
        connection_status: "failed",
        connection_tested_at: new Date().toISOString(),
        connection_error: message,
      },
    };
  }

  const message = "Conexão testada com sucesso.";
  return {
    ok: true,
    message,
    meta: {
      connection_status: "connected",
      connection_tested_at: new Date().toISOString(),
      connection_error: null,
    },
  };
}

/** Reseta o status quando credenciais mudam (badge deixa de refletir o teste anterior). */
export function untestedConnectionMeta(): SourceConnectionMeta {
  return {
    connection_status: "untested",
    connection_tested_at: null,
    connection_error: null,
  };
}
