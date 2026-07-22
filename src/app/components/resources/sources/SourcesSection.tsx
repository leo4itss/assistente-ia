import { useState } from "react";
import SourceCard from "@/app/components/resources/sources/SourceCard";
import SourceDocumentsForm from "@/app/components/resources/sources/SourceDocumentsForm";
import SourceDatabaseForm from "@/app/components/resources/sources/SourceDatabaseForm";
import SourceMcpForm from "@/app/components/resources/sources/SourceMcpForm";
import type {
  Source,
  SourceKind,
  SourceDatabase,
  SourceDocuments,
  SourceMcp,
  ValidationErrors,
} from "@/app/types/assistantConfig";

function newId() {
  return Math.random().toString(36).slice(2);
}

export function createSource(kind: SourceKind): Source {
  if (kind === "documents") {
    const s: SourceDocuments = { id: newId(), kind: "documents", label: "", connection_string: "", files: [], links: [] };
    return s;
  }
  if (kind === "database") {
    const s: SourceDatabase = {
      id: newId(),
      kind: "database",
      label: "",
      database: "",
      connection_string: "",
      use_mcp: false,
      introspect: false,
      mcp_host: "",
      mcp_port: "",
      mcp_transport: "",
      mcp_secret_key: "",
      structure: "",
    };
    return s;
  }
  const s: SourceMcp = { id: newId(), kind: "mcp", label: "", url: "", transport: "", secret_key: "" };
  return s;
}

interface SourcesSectionProps {
  sources: Source[];
  onChange: (updated: Source[]) => void;
  errors: ValidationErrors;
  /** Map sourceId → nº de capabilities que a usam (etapa 2). */
  usageBySourceId?: Record<string, number>;
}

export default function SourcesSection({ sources, onChange, errors, usageBySourceId = {} }: SourcesSectionProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const add = (kind: SourceKind) => {
    const s = createSource(kind);
    onChange([...sources, s]);
    setExpanded((prev) => ({ ...prev, [s.id]: true }));
  };

  const update = (idx: number, updated: Source) => {
    const copy = [...sources];
    copy[idx] = updated;
    onChange(copy);
  };

  const remove = (idx: number) => onChange(sources.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <div className="flex items-start justify-end gap-[16px]">
        <AddSourceButton onAdd={add} />
      </div>

      {sources.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-[64px] gap-[16px]">
          <div className="flex items-center justify-center size-[48px] rounded-full bg-[rgba(255,255,255,0.05)]">
            <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[16px]">Nenhuma fonte configurada</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[14px] text-center max-w-[360px]">
            Adicione documentos, bancos de dados ou conexões MCP. Você pode cadastrar a mesma conexão mais de uma vez apontando para escopos diferentes.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[16px]">
          {sources.map((source, idx) => (
            <SourceCard
              key={source.id}
              source={source}
              usedByCount={usageBySourceId[source.id] ?? 0}
              expanded={!!expanded[source.id]}
              onToggle={() => toggle(source.id)}
              onDelete={() => remove(idx)}
            >
              {source.kind === "documents" && (
                <SourceDocumentsForm source={source} onChange={(u) => update(idx, u)} errors={errors} errorPrefix={`source.${idx}`} />
              )}
              {source.kind === "database" && (
                <SourceDatabaseForm source={source} onChange={(u) => update(idx, u)} errors={errors} errorPrefix={`source.${idx}`} />
              )}
              {source.kind === "mcp" && (
                <SourceMcpForm source={source} onChange={(u) => update(idx, u)} errors={errors} errorPrefix={`source.${idx}`} />
              )}
            </SourceCard>
          ))}
        </div>
      )}
    </div>
  );
}

function AddSourceButton({ onAdd }: { onAdd: (kind: SourceKind) => void }) {
  const OPTIONS: { kind: SourceKind; label: string }[] = [
    { kind: "documents", label: "Documentos" },
    { kind: "database", label: "Banco de dados" },
    { kind: "mcp", label: "MCP" },
  ];

  return (
    <div className="flex gap-[8px] shrink-0">
      {OPTIONS.map((opt) => (
        <button
          key={opt.kind}
          onClick={() => onAdd(opt.kind)}
          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex gap-[8px] h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
            <path d="M8 3.333v9.334M3.333 8h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
