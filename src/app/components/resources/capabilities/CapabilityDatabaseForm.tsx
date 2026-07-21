import SourceBindSelect from "@/app/components/resources/capabilities/SourceBindSelect";
import ScopeEditor from "@/app/components/resources/capabilities/ScopeEditor";
import RoutingFields from "@/app/components/resources/capabilities/RoutingFields";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import { CAPABILITY_SOURCE_COMPATIBILITY } from "@/app/types/assistantConfig";
import type { CapabilityDatabase, Source, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  capability: CapabilityDatabase;
  onChange: (updated: CapabilityDatabase) => void;
  sources: Source[];
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function CapabilityDatabaseForm({ capability, onChange, sources, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<CapabilityDatabase>) => onChange({ ...capability, ...patch });

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>ID</FieldLabel>
        <TextInput value={capability.name} onChange={(v) => update({ name: v })} placeholder="gq_ocorrencias" />
        <FieldError message={e("name")} />
      </div>

      <SourceBindSelect
        sourceId={capability.sourceId}
        onChange={(v) => update({ sourceId: v })}
        sources={sources}
        compatibleKinds={CAPABILITY_SOURCE_COMPATIBILITY.database}
        errors={errors}
        errorPrefix={errorPrefix}
      />

      <ScopeEditor scope={capability.scope} onChange={(scope) => update({ scope })} />

      <RoutingFields
        routing={capability.routing}
        onChange={(routing) => update({ routing })}
        errors={errors}
        errorPrefix={errorPrefix}
      />

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Instructions</FieldLabel>
        <TextareaInput
          value={capability.instructions}
          onChange={(v) => update({ instructions: v })}
          placeholder="O que o motor da capability segue. Ex.: Use views gold.vw_gq_*. Não invente fases literais."
          rows={3}
        />
        <FieldError message={e("instructions")} />
      </div>
    </div>
  );
}
