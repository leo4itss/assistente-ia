import SourceBindSelect from "@/app/components/resources/capabilities/SourceBindSelect";
import RoutingFields from "@/app/components/resources/capabilities/RoutingFields";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import { CAPABILITY_SOURCE_COMPATIBILITY } from "@/app/types/assistantConfig";
import type { CapabilityDocuments, Source, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  capability: CapabilityDocuments;
  onChange: (updated: CapabilityDocuments) => void;
  sources: Source[];
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function CapabilityDocumentsForm({ capability, onChange, sources, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<CapabilityDocuments>) => onChange({ ...capability, ...patch });

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>ID</FieldLabel>
        <TextInput value={capability.name} onChange={(v) => update({ name: v })} placeholder="docs_conteudo" />
        <FieldError message={e("name")} />
      </div>

      <SourceBindSelect
        sourceId={capability.sourceId}
        onChange={(v) => update({ sourceId: v })}
        sources={sources}
        compatibleKinds={CAPABILITY_SOURCE_COMPATIBILITY.documents}
        errors={errors}
        errorPrefix={errorPrefix}
      />

      <RoutingFields
        routing={capability.routing}
        onChange={(routing) => update({ routing })}
        errors={errors}
        errorPrefix={errorPrefix}
      />

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Instruções</FieldLabel>
        <TextareaInput
          value={capability.instructions}
          onChange={(v) => update({ instructions: v })}
          placeholder="Como o agente deve usar este acervo de documentos."
          rows={3}
        />
        <FieldError message={e("instructions")} />
      </div>
    </div>
  );
}
