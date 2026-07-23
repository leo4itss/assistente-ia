import { useState } from "react";
import { FieldLabel, FieldError, TextInput, PasswordInput } from "@/app/components/resources/fields/Fields";
import AcervoModal from "@/app/components/resources/sources/AcervoModal";
import { slugifyLabel } from "@/app/lib/slug";
import type { SourceDocuments, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  source: SourceDocuments;
  onChange: (updated: SourceDocuments) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function SourceDocumentsForm({ source, onChange, errors, errorPrefix }: Props) {
  const [showAcervo, setShowAcervo] = useState(false);
  const [idTouched, setIdTouched] = useState(!!source.external_id);
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<SourceDocuments>) => onChange({ ...source, ...patch });

  const handleLabelChange = (label: string) => {
    if (idTouched) {
      update({ label });
    } else {
      update({ label, external_id: slugifyLabel(label) });
    }
  };

  const errorCount =
    source.files.filter((f) => f.status === "error").length + source.links.filter((l) => l.status === "error").length;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>ID</FieldLabel>
          <TextInput
            value={source.external_id}
            onChange={(v) => {
              setIdTouched(true);
              update({ external_id: v });
            }}
            placeholder="Ex.: docnix_rag"
          />
          <FieldError message={e("external_id")} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Rótulo</FieldLabel>
          <TextInput value={source.label} onChange={handleLabelChange} placeholder="Ex.: Acervo documental (RAG)" />
          <FieldError message={e("label")} />
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>String de conexão</FieldLabel>
        <PasswordInput
          value={source.connection_string}
          onChange={(v) => update({ connection_string: v })}
          placeholder="postgresql://user:pass@host:5432/pas_file_processor"
          hasValue={!!source.connection_string}
        />
        <FieldError message={e("connection_string")} />
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
          Conexão física da base de conhecimento (PGVector). O conteúdo do acervo não é definido aqui.
        </p>
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />

      <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-[16px] flex items-center justify-between gap-[16px]">
        <div className="flex flex-col gap-[2px] min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Acervo desta source</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px] truncate">
            {source.files.length} arquivo(s) · {source.links.length} link(s)
            {errorCount > 0 && ` · ${errorCount} com erro`}
          </p>
        </div>
        <button
          onClick={() => setShowAcervo(true)}
          className="bg-[#2563eb] flex gap-[6px] h-[36px] items-center justify-center px-[16px] rounded-[8px] hover:bg-[#1d4ed8] transition-colors shrink-0"
        >
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px] whitespace-nowrap">Abrir acervo</span>
          <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
            <path d="M2.917 7h8.166M7.583 3.5L11.083 7l-3.5 3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
      </div>

      {showAcervo && <AcervoModal source={source} onChange={onChange} onClose={() => setShowAcervo(false)} />}
    </div>
  );
}
