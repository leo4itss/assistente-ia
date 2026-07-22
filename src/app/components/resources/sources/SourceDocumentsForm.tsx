import { useState } from "react";
import { FieldLabel, FieldError, TextInput, PasswordInput } from "@/app/components/resources/fields/Fields";
import FileManager from "@/app/components/resources/sources/FileManager";
import LinkManager from "@/app/components/resources/sources/LinkManager";
import type { SourceDocuments, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  source: SourceDocuments;
  onChange: (updated: SourceDocuments) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function SourceDocumentsForm({ source, onChange, errors, errorPrefix }: Props) {
  const [showAcervo, setShowAcervo] = useState(false);
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<SourceDocuments>) => onChange({ ...source, ...patch });

  const errorCount =
    source.files.filter((f) => f.status === "error").length + source.links.filter((l) => l.status === "error").length;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>ID</FieldLabel>
          <TextInput value={source.external_id} onChange={(v) => update({ external_id: v })} placeholder="Ex.: docnix_rag" />
          <FieldError message={e("external_id")} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Rótulo</FieldLabel>
          <TextInput value={source.label} onChange={(v) => update({ label: v })} placeholder="Ex.: Acervo documental (RAG)" />
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

      {showAcervo && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#030712]">
          <div className="flex items-center justify-between px-[32px] py-[16px] border-b border-[rgba(255,255,255,0.1)] shrink-0">
            <div className="flex flex-col">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Acervo desta source</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
                {source.external_id || source.label || "Sem rótulo"}
              </p>
            </div>
            <button
              onClick={() => setShowAcervo(false)}
              title="Fechar"
              className="flex items-center justify-center size-[32px] rounded-[8px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M12 4L4 12M4 4L12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-[32px] py-[24px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#374151] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="max-w-[720px] mx-auto flex flex-col gap-[24px]">
              <FileManager files={source.files} onChange={(files) => update({ files })} />
              <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />
              <LinkManager links={source.links} onChange={(links) => update({ links })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
