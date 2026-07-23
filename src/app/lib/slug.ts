// Faixa Unicode das marcas diacríticas combinantes (pós-normalização NFD) — construída via
// charCode em vez de literal no código-fonte pra evitar caracteres invisíveis no arquivo.
const COMBINING_MARKS_RE = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, "g");

/** Deriva um ID (snake_case, 2 primeiras palavras) a partir de um rótulo — ex.: "Jira MCP (tools → knowledge)" → "jira_mcp". */
export function slugifyLabel(label: string): string {
  const words = label
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS_RE, "") // remove acentos
    .replace(/[^a-z0-9\s]/g, "") // remove pontuação/símbolos
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.slice(0, 2).join("_");
}
