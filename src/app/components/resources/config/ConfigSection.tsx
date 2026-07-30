import { FieldLabel, TextInput, SelectInput, SliderField, ToggleSwitch } from "@/app/components/resources/fields/Fields";
import { ANSWER_DEPTH_LABELS } from "@/app/types/assistantConfig";
import type { AssistantRuntimeConfig, AnswerDepth, ModelOverride } from "@/app/types/assistantConfig";

interface Props {
  config: AssistantRuntimeConfig;
  onChange: (updated: AssistantRuntimeConfig) => void;
}

function ModelOverrideFields({
  nameLabel,
  versionLabel,
  override,
  onChange,
}: {
  nameLabel: string;
  versionLabel: string;
  override: ModelOverride;
  onChange: (updated: ModelOverride) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-[12px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>{nameLabel}</FieldLabel>
        <TextInput
          value={override.model_name ?? ""}
          onChange={(v) => onChange({ ...override, model_name: v || null })}
          placeholder="model_name"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>{versionLabel}</FieldLabel>
        <TextInput
          value={override.api_version ?? ""}
          onChange={(v) => onChange({ ...override, api_version: v || null })}
          placeholder="api_version"
        />
      </div>
    </div>
  );
}

export default function ConfigSection({ config, onChange }: Props) {
  const update = (patch: Partial<AssistantRuntimeConfig>) => onChange({ ...config, ...patch });

  return (
    <div className="flex flex-col gap-[32px] w-full">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Amostragem (temperatura)</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
            Ajuste o nível de precisão e criatividade das respostas do assistente.
          </p>
        </div>

        <SliderField
          label="TEMPERATURA GERAL"
          value={config.global_temperature}
          min={0}
          max={1}
          step={0.1}
          onChange={(v) => update({ global_temperature: v })}
        />

        <div className="grid grid-cols-3 gap-[16px]">
          <SliderField
            label="DECISÃO"
            description="Decisões, interpretação de intenção e consultas"
            value={config.temperature_decision}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_decision: v })}
          />
          <SliderField
            label="GERAÇÃO"
            description="Geração e síntese de conteúdo"
            value={config.temperature_generation}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_generation: v })}
          />
          <SliderField
            label="CRIATIVO"
            description="Exploração de respostas mais variadas e criativas"
            value={config.temperature_creative}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_creative: v })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Enriquecimento</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
            Defina a profundidade das respostas e o uso de informações complementares.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-[16px] flex flex-col gap-[8px] justify-center">
            <FieldLabel>Profundidade da resposta</FieldLabel>
            <SelectInput
              value={config.answer_depth}
              onChange={(v) => update({ answer_depth: v as AnswerDepth })}
              options={Object.entries(ANSWER_DEPTH_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-[16px] flex items-center">
            <ToggleSwitch
              checked={config.insight_enrichment_enabled}
              onChange={(v) => update({ insight_enrichment_enabled: v })}
              label="Enriquecimento de insights"
              description="Adiciona insights complementares à resposta"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Modelos (sobrescrita por categoria)</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
            Defina os modelos de IA utilizados para diferentes tipos de tarefa.
          </p>
        </div>
        <ModelOverrideFields
          nameLabel="Modelo principal"
          versionLabel="Versão do modelo principal"
          override={config.model_large}
          onChange={(v) => update({ model_large: v })}
        />
        <ModelOverrideFields
          nameLabel="Modelo leve"
          versionLabel="Versão do modelo leve"
          override={config.model_small}
          onChange={(v) => update({ model_small: v })}
        />
        <ModelOverrideFields
          nameLabel="Modelo para código"
          versionLabel="Versão do modelo para código"
          override={config.model_coding}
          onChange={(v) => update({ model_coding: v })}
        />
      </div>
    </div>
  );
}
