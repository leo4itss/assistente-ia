import { FieldLabel, TextInput, SelectInput, SliderField, ToggleSwitch } from "@/app/components/resources/fields/Fields";
import { ANSWER_DEPTH_LABELS } from "@/app/types/assistantConfig";
import type { AssistantRuntimeConfig, AnswerDepth, ModelOverride } from "@/app/types/assistantConfig";

interface Props {
  config: AssistantRuntimeConfig;
  onChange: (updated: AssistantRuntimeConfig) => void;
}

function ModelOverrideFields({
  label,
  override,
  onChange,
}: {
  label: string;
  override: ModelOverride;
  onChange: (updated: ModelOverride) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-[12px]">
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>{label} — model_name</FieldLabel>
        <TextInput
          value={override.model_name ?? ""}
          onChange={(v) => onChange({ ...override, model_name: v || null })}
          placeholder="null = default"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <FieldLabel>{label} — api_version</FieldLabel>
        <TextInput
          value={override.api_version ?? ""}
          onChange={(v) => onChange({ ...override, api_version: v || null })}
          placeholder="null = default"
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
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Sampling (temperature)</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">
            Precedência: temperature_role → global_temperature → Infisical
          </p>
        </div>

        <SliderField
          label="GLOBAL_TEMPERATURE"
          value={config.global_temperature}
          min={0}
          max={1}
          step={0.1}
          onChange={(v) => update({ global_temperature: v })}
        />

        <div className="grid grid-cols-3 gap-[16px]">
          <SliderField
            label="DECISION"
            description="Supervisor, intent, SQL"
            value={config.temperature_decision}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_decision: v })}
          />
          <SliderField
            label="GENERATION"
            description="Synthesize / editor"
            value={config.temperature_generation}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_generation: v })}
          />
          <SliderField
            label="CREATIVE"
            description="Reservado (não wired)"
            value={config.temperature_creative}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ temperature_creative: v })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Enrichment</p>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <FieldLabel>ANSWER_DEPTH</FieldLabel>
            <SelectInput
              value={config.answer_depth}
              onChange={(v) => update({ answer_depth: v as AnswerDepth })}
              options={Object.entries(ANSWER_DEPTH_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-[10px] px-[16px] flex items-center">
            <ToggleSwitch
              checked={config.insight_enrichment_enabled}
              onChange={(v) => update({ insight_enrichment_enabled: v })}
              label="INSIGHT_ENRICHMENT_ENABLED"
              description="L2 insight pós-fatos"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[16px]">Models (override por categoria)</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">Só model_name e api_version; resto vem do Infisical.</p>
        </div>
        <ModelOverrideFields label="MODEL_LARGE" override={config.model_large} onChange={(v) => update({ model_large: v })} />
        <ModelOverrideFields label="MODEL_SMALL" override={config.model_small} onChange={(v) => update({ model_small: v })} />
        <ModelOverrideFields label="MODEL_CODING" override={config.model_coding} onChange={(v) => update({ model_coding: v })} />
      </div>
    </div>
  );
}
