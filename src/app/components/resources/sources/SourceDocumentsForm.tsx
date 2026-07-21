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
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<SourceDocuments>) => onChange({ ...source, ...patch });

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Rótulo</FieldLabel>
        <TextInput
          value={source.label}
          onChange={(v) => update({ label: v })}
          placeholder="Ex.: Acervo documental (RAG)"
        />
        <FieldError message={e("label")} />
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
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />

      <FileManager files={source.files} onChange={(files) => update({ files })} />

      <div className="h-px bg-[rgba(255,255,255,0.08)] w-full" />

      <LinkManager links={source.links} onChange={(links) => update({ links })} />
    </div>
  );
}
