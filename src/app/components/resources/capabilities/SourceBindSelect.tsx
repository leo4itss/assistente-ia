import { FieldLabel, FieldError, SelectInput } from "@/app/components/resources/fields/Fields";
import { SOURCE_KIND_LABELS } from "@/app/types/assistantConfig";
import type { Source, SourceKind, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  sourceId: string;
  onChange: (sourceId: string) => void;
  sources: Source[];
  compatibleKinds: SourceKind[];
  errors: ValidationErrors;
  errorPrefix: string;
}

/** Select de bind: só lista sources cujo kind é compatível com o kind da capability. */
export default function SourceBindSelect({ sourceId, onChange, sources, compatibleKinds, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const compatible = sources.filter((s) => compatibleKinds.includes(s.kind));

  return (
    <div className="flex flex-col gap-[8px]">
      <FieldLabel required>Source (bind)</FieldLabel>
      {compatible.length === 0 ? (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[13px]">
          Nenhuma source do tipo {compatibleKinds.map((k) => SOURCE_KIND_LABELS[k]).join(" / ")} cadastrada. Crie uma em "Sources" primeiro.
        </p>
      ) : (
        <SelectInput
          value={sourceId}
          onChange={onChange}
          options={compatible.map((s) => ({ value: s.id, label: `${s.label || "Sem rótulo"} (${SOURCE_KIND_LABELS[s.kind]})` }))}
          placeholder="Selecione a fonte..."
        />
      )}
      <FieldError message={e("sourceId")} />
    </div>
  );
}
