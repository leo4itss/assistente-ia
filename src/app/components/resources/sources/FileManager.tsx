import { useState, useMemo, useRef } from "react";
import { FieldLabel, TextInput } from "@/app/components/resources/fields/Fields";
import type { DocumentFile } from "@/app/types/assistantConfig";

const ALLOWED_EXTENSIONS = ["pdf", "docx", "doc", "txt", "md", "csv", "xlsx"];
const MAX_FILE_SIZE_MB = 25;
/** Acima disso a lista deixa de renderizar tudo — busca/filtro passam a ser obrigatórios para achar um item. */
const VISIBLE_CAP = 100;

function newId() {
  return Math.random().toString(36).slice(2);
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

interface Props {
  files: DocumentFile[];
  onChange: (files: DocumentFile[]) => void;
}

/**
 * Upload + gestão de arquivos de uma source de documentos. Todo arquivo rejeitado
 * (extensão ou tamanho) entra na lista com o motivo visível — corrige o bug conhecido
 * de rejeições silenciosas. Busca e filtro por extensão resolvem bases grandes
 * (200–1800 itens, urgência apontada por River).
 */
export default function FileManager({ files, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [extensionFilter, setExtensionFilter] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFilesPicked = (picked: FileList | File[]) => {
    const incoming: DocumentFile[] = Array.from(picked).map((f) => {
      const extension = getExtension(f.name);
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        return { id: newId(), name: f.name, size: f.size, extension, status: "error", error: `Extensão .${extension} não suportada.` };
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return { id: newId(), name: f.name, size: f.size, extension, status: "error", error: `Arquivo excede ${MAX_FILE_SIZE_MB}MB.` };
      }
      return { id: newId(), name: f.name, size: f.size, extension, status: "ready" };
    });
    onChange([...files, ...incoming]);
  };

  const removeFile = (id: string) => onChange(files.filter((f) => f.id !== id));

  const extensions = useMemo(() => Array.from(new Set(files.map((f) => f.extension))).sort(), [files]);

  const filtered = useMemo(() => {
    return files.filter((f) => {
      if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (extensionFilter && f.extension !== extensionFilter) return false;
      return true;
    });
  }, [files, search, extensionFilter]);

  const visible = filtered.slice(0, VISIBLE_CAP);
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="flex flex-col gap-[12px]">
      <FieldLabel>Arquivos</FieldLabel>

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
          {ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(", ")} · até {MAX_FILE_SIZE_MB}MB por arquivo
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

      {errorCount > 0 && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px]">
          {errorCount} {errorCount > 1 ? "arquivos rejeitados" : "arquivo rejeitado"} — veja o motivo na lista abaixo.
        </p>
      )}

      {files.length === 0 ? (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">Nenhum arquivo enviado ainda.</p>
      ) : (
        <>
          <div className="flex gap-[8px]">
            <div className="flex-1">
              <TextInput value={search} onChange={setSearch} placeholder="Buscar por nome..." />
            </div>
            {extensions.length > 1 && (
              <select
                value={extensionFilter}
                onChange={(e) => setExtensionFilter(e.target.value)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] h-[36px] px-[10px] text-[#f9fafb] text-[13px] outline-none shrink-0"
              >
                <option value="">Todas extensões</option>
                {extensions.map((ext) => (
                  <option key={ext} value={ext} style={{ background: "#111827" }}>
                    .{ext}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">Nenhum arquivo corresponde à busca.</p>
          ) : (
            <div className="flex flex-col gap-[6px] max-h-[280px] overflow-y-auto pr-[4px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
              {visible.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-[10px] rounded-[8px] px-[12px] py-[8px] ${file.status === "error" ? "bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)]" : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]"}`}
                >
                  <svg className="size-[14px] shrink-0 opacity-60" fill="none" viewBox="0 0 16 16">
                    <path d="M9.333 1.333H4A1.333 1.333 0 002.667 2.667v10.666A1.333 1.333 0 004 14.667h8a1.333 1.333 0 001.333-1.334V5.333L9.333 1.333z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                  </svg>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px] truncate">{file.name}</span>
                    {file.status === "error" ? (
                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[11px]">{file.error}</span>
                    ) : (
                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[11px]">{formatSize(file.size)}</span>
                    )}
                  </div>
                  <button onClick={() => removeFile(file.id)} className="opacity-50 hover:opacity-100 transition-opacity shrink-0" title="Remover">
                    <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4h12M5 4V2.667C5 2.298 5.298 2 5.667 2h4.666C10.702 2 11 2.298 11 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333C4 13.702 4.298 14 4.667 14h6.666c.369 0 .667-.298.667-.667L12.667 4" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {filtered.length > VISIBLE_CAP && (
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
              Mostrando {VISIBLE_CAP} de {filtered.length} — refine a busca para ver mais.
            </p>
          )}
        </>
      )}
    </div>
  );
}
