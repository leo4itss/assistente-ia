import { FieldLabel, FieldError, TextareaInput } from "@/app/components/resources/fields/Fields";
import type { CapabilityRouting, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  routing: CapabilityRouting;
  onChange: (routing: CapabilityRouting) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

/** routing.examples é armazenado como string[] mas editado como textarea "um por linha". */
export default function RoutingFields({ routing, onChange, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];

  const examplesText = routing.examples.join("\n");
  const handleExamplesChange = (text: string) => {
    onChange({ ...routing, examples: text.split("\n") });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>Roteamento · descrição</FieldLabel>
        <TextareaInput
          value={routing.description}
          onChange={(v) => onChange({ ...routing, description: v })}
          placeholder="O que o supervisor lê para decidir se aciona esta capacidade. Ex.: Gestão da Qualidade: ocorrências, backlog, gargalos, reclamações de cliente."
          rows={2}
        />
        <FieldError message={e("routing.description")} />
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel>Roteamento · exemplos (um por linha)</FieldLabel>
        <TextareaInput
          value={examplesText}
          onChange={handleExamplesChange}
          placeholder={"Quantas ocorrências abertas nos últimos 30 dias?\nQuais os principais gargalos por área?"}
          rows={3}
        />
      </div>
    </div>
  );
}
