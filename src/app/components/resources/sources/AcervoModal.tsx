import { useState, useMemo, useRef } from "react";
import { TextInput } from "@/app/components/resources/fields/Fields";
import type { SourceDocuments, DocumentFile, DocumentLink } from "@/app/types/assistantConfig";

const ALLOWED_EXTENSIONS = ["pdf", "docx", "doc", "txt", "md", "csv", "xlsx"];
const MAX_FILE_SIZE_MB = 25;
/** Acima disso a tabela deixa de renderizar tudo — busca/filtro passam a ser obrigatórios para achar um item. */
const VISIBLE_CAP = 100;

function newId() {
  return Math.random().toString(36).slice(2);
}

function nowIso() {
  return new Date().toISOString();
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

function getExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

type Row = { kind: "file"; item: DocumentFile } | { kind: "link"; item: DocumentLink };

function StatusBadge({ status }: { status: "ready" | "error" }) {
  const isReady = status === "ready";
  return (
    <span
      className="inline-flex items-center gap-[6px] font-['Inter:Medium',sans-serif] font-medium text-[11px] tracking-[0.3px] px-[8px] py-[3px] rounded-full"
      style={{ color: isReady ? "#6ee7b7" : "#f87171", backgroundColor: isReady ? "rgba(16,185,129,0.15)" : "rgba(248,113,113,0.15)" }}
    >
      <span className="size-[6px] rounded-full shrink-0" style={{ backgroundColor: isReady ? "#6ee7b7" : "#f87171" }} />
      {isReady ? "READY" : "ERRO"}
    </span>
  );
}

function TypeBadge({ kind }: { kind: "file" | "link" }) {
  const isFile = kind === "file";
  return (
    <span
      className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] tracking-[0.5px] px-[7px] py-[2px] rounded-[4px] shrink-0"
      style={{ color: isFile ? "#93c5fd" : "#c4b5fd", backgroundColor: isFile ? "rgba(37,99,235,0.15)" : "rgba(139,92,246,0.15)" }}
    >
      {isFile ? "FILE" : "LINK"}
    </span>
  );
}

interface Props {
  source: SourceDocuments;
  onChange: (updated: SourceDocuments) => void;
  onClose: () => void;
}

export default function AcervoModal({ source, onChange, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "file" | "link">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "ready" | "error">("all");
  const [linkInput, setLinkInput] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const files = source.files;
  const links = source.links;

  const setFiles = (updated: DocumentFile[]) => onChange({ ...source, files: updated });
  const setLinks = (updated: DocumentLink[]) => onChange({ ...source, links: updated });

  const handleFilesPicked = (picked: FileList | File[]) => {
    const incoming: DocumentFile[] = Array.from(picked).map((f) => {
      const extension = getExtension(f.name);
      const updatedAt = nowIso();
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        return { id: newId(), name: f.name, size: f.size, extension, status: "error", error: `Extensão .${extension} não suportada.`, updatedAt };
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return { id: newId(), name: f.name, size: f.size, extension, status: "error", error: `Arquivo excede ${MAX_FILE_SIZE_MB}MB.`, updatedAt };
      }
      return { id: newId(), name: f.name, size: f.size, extension, status: "ready", updatedAt };
    });
    setFiles([...files, ...incoming]);
  };

  const addLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;
    const updatedAt = nowIso();
    const link: DocumentLink = isValidUrl(trimmed)
      ? { id: newId(), url: trimmed, status: "ready", updatedAt }
      : { id: newId(), url: trimmed, status: "error", error: "URL inválida.", updatedAt };
    setLinks([...links, link]);
    setLinkInput("");
  };

  const removeRow = (row: Row) => {
    if (row.kind === "file") setFiles(files.filter((f) => f.id !== row.item.id));
    else setLinks(links.filter((l) => l.id !== row.item.id));
  };

  const allRows: Row[] = useMemo(
    () => [...files.map((item) => ({ kind: "file" as const, item })), ...links.map((item) => ({ kind: "link" as const, item }))],
    [files, links],
  );

  const readyCount = allRows.filter((r) => r.item.status === "ready").length;
  const errorCount = allRows.filter((r) => r.item.status === "error").length;

  const filtered = useMemo(() => {
    return allRows.filter((row) => {
      if (typeFilter !== "all" && row.kind !== typeFilter) return false;
      if (statusFilter !== "all" && row.item.status !== statusFilter) return false;
      const name = row.kind === "file" ? row.item.name : row.item.url;
      if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allRows, typeFilter, statusFilter, search]);

  const visible = filtered.slice(0, VISIBLE_CAP);

  const hasActiveFilters = search !== "" || typeFilter !== "all" || statusFilter !== "all";
  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#030712]">
      {/* Header */}
      <div className="flex items-center justify-between px-[32px] py-[16px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
        <div className="flex flex-col gap-[2px] min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Acervo de documentos</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px] truncate">
            Arquivos e links desta source ·{" "}
            <span className="text-[#60a5fa]">{source.external_id || source.id}</span>
            {source.label ? ` — ${source.label}` : ""}
          </p>
        </div>
        <button
          onClick={onClose}
          title="Fechar"
          className="flex items-center justify-center size-[32px] rounded-[8px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0"
        >
          <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
            <path d="M12 4L4 12M4 4L12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-[32px] py-[24px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="max-w-[900px] mx-auto flex flex-col gap-[24px]">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-[24px] gap-y-[8px] bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] px-[20px] py-[14px]">
            <Stat value={allRows.length} label="total" />
            <Stat value={files.length} label="arquivo(s)" />
            <Stat value={links.length} label="link(s)" />
            <Stat value={readyCount} label="ready" color="#6ee7b7" />
            {errorCount > 0 && <Stat value={errorCount} label="com erro" color="#f87171" />}
          </div>

          {/* Buscar no acervo */}
          <div className="flex flex-col gap-[10px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#6b7280] text-[11px] tracking-[0.5px]">BUSCAR NO ACERVO</p>
            <div className="flex gap-[8px]">
              <div className="flex-1">
                <TextInput value={search} onChange={setSearch} placeholder="Nome do arquivo ou URL..." />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] h-[36px] px-[10px] text-[#f9fafb] text-[13px] outline-none shrink-0"
              >
                <option value="all" style={{ background: "#111827" }}>Todos os tipos</option>
                <option value="file" style={{ background: "#111827" }}>Arquivos</option>
                <option value="link" style={{ background: "#111827" }}>Links</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] h-[36px] px-[10px] text-[#f9fafb] text-[13px] outline-none shrink-0"
              >
                <option value="all" style={{ background: "#111827" }}>Todos os status</option>
                <option value="ready" style={{ background: "#111827" }}>Ready</option>
                <option value="error" style={{ background: "#111827" }}>Erro</option>
              </select>
            </div>
          </div>

          {/* Tabela */}
          <div className="border border-[rgba(255,255,255,0.1)] rounded-[10px] overflow-hidden">
            <div className="grid grid-cols-[64px_1fr_90px_100px_90px_36px] gap-[12px] px-[16px] py-[10px] bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.08)]">
              {["Tipo", "Nome / URL", "Tamanho", "Status", "Atualizado", ""].map((h) => (
                <span key={h} className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#6b7280] text-[11px] tracking-[0.5px]">
                  {h}
                </span>
              ))}
            </div>

            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-[8px] py-[32px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[13px] text-center">
                  {allRows.length === 0
                    ? "Nenhum arquivo ou link neste acervo ainda."
                    : "Nenhum item corresponde à busca/filtro atual."}
                </p>
                {allRows.length > 0 && hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="font-['Inter:Medium',sans-serif] font-medium text-[#60a5fa] text-[13px] hover:underline"
                  >
                    Limpar busca e filtros
                  </button>
                )}
              </div>
            ) : (
              visible.map((row) => (
                <div
                  key={row.item.id}
                  className="grid grid-cols-[64px_1fr_90px_100px_90px_36px] gap-[12px] px-[16px] py-[10px] items-center border-b border-[rgba(255,255,255,0.05)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <TypeBadge kind={row.kind} />
                  <div className="min-w-0 flex flex-col">
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px] truncate">
                      {row.kind === "file" ? row.item.name : row.item.url}
                    </span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[11px] truncate">
                      {row.item.status === "error" ? row.item.error : row.kind === "file" ? row.item.extension : ""}
                    </span>
                  </div>
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">
                    {row.kind === "file" ? formatSize(row.item.size) : "—"}
                  </span>
                  <StatusBadge status={row.item.status} />
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">
                    {formatDate(row.item.updatedAt)}
                  </span>
                  <button onClick={() => removeRow(row)} className="opacity-50 hover:opacity-100 transition-opacity justify-self-end" title="Remover">
                    <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </button>
                </div>
              ))
            )}

            {filtered.length > VISIBLE_CAP && (
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px] px-[16px] py-[10px] border-t border-[rgba(255,255,255,0.05)]">
                Mostrando {VISIBLE_CAP} de {filtered.length} — refine a busca para ver mais.
              </p>
            )}
          </div>

          {/* Adicionar ao acervo — separado visualmente da busca */}
          <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-[20px] flex flex-col gap-[20px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Adicionar ao acervo</p>

            <div className="flex flex-col gap-[8px]">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (e.dataTransfer.files.length) handleFilesPicked(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-[8px] border border-dashed rounded-[10px] py-[24px] cursor-pointer transition-colors ${dragOver ? "border-[#2563eb] bg-[rgba(37,99,235,0.05)]" : "border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)]"}`}
              >
                <svg className="size-[22px] opacity-60" fill="none" viewBox="0 0 24 24">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Arraste arquivos ou clique para selecionar</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
                  {ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(", ")} · até {MAX_FILE_SIZE_MB}MB por arquivo
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFilesPicked(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />

            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[8px]">
                <div className="flex-1">
                  <TextInput
                    value={linkInput}
                    onChange={setLinkInput}
                    placeholder="https://exemplo.com/pagina"
                  />
                </div>
                <button
                  type="button"
                  onClick={addLink}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] h-[36px] px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors shrink-0"
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar link</span>
                </button>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
                Links passam por extração de conteúdo (web scraping) antes de ir para o RAG.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div className="flex items-baseline gap-[6px]">
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]" style={{ color: color ?? "#f9fafb" }}>
        {value}
      </span>
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">{label}</span>
    </div>
  );
}
