import RoutingFields from "@/app/components/resources/capabilities/RoutingFields";
import FaqItemsEditor from "@/app/components/resources/capabilities/FaqItemsEditor";
import { FieldLabel, FieldError, TextInput, TextareaInput } from "@/app/components/resources/fields/Fields";
import type { CapabilityFaq, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  capability: CapabilityFaq;
  onChange: (updated: CapabilityFaq) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function CapabilityFaqForm({ capability, onChange, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<CapabilityFaq>) => onChange({ ...capability, ...patch });

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>ID</FieldLabel>
        <TextInput value={capability.name} onChange={(v) => update({ name: v })} placeholder="faq" />
        <FieldError message={e("name")} />
      </div>

      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
        FAQ não faz bind a uma source. A semântica de roteamento vem da própria pergunta e resposta — os anexos abaixo são apenas referência.
      </p>

      <FaqItemsEditor
        items={capability.items}
        onChange={(items) => update({ items })}
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
        <FieldLabel required>Instructions</FieldLabel>
        <TextareaInput
          value={capability.instructions}
          onChange={(v) => update({ instructions: v })}
          placeholder="Como o agente deve usar as perguntas frequentes cadastradas."
          rows={3}
        />
        <FieldError message={e("instructions")} />
      </div>
    </div>
  );
}
