import { CheckboxField, ToggleSwitch } from "@/app/components/resources/fields/Fields";
import { SOURCE_KIND_LABELS } from "@/app/types/assistantConfig";
import type { Builtins, Source } from "@/app/types/assistantConfig";

interface Props {
  builtins: Builtins;
  onChange: (updated: Builtins) => void;
  sources: Source[];
}

function BuiltinCard({
  title,
  description,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-[#111827] relative rounded-[14px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex items-center justify-between px-[20px] py-[18px]">
        <div className="flex items-center gap-[10px]">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] tracking-[0.5px] px-[7px] py-[2px] rounded-[4px] text-[#fbbf24] bg-[rgba(251,191,36,0.15)]">
            NATIVO
          </span>
          <div className="flex flex-col">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[15px]">{title}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">{description}</span>
          </div>
        </div>
        <ToggleSwitch checked={enabled} onChange={onToggle} />
      </div>
      {enabled && children && (
        <div className="px-[20px] pb-[20px] pt-[4px] border-t border-[rgba(255,255,255,0.08)]">
          <div className="pt-[16px] flex flex-col gap-[16px]">{children}</div>
        </div>
      )}
    </div>
  );
}

export default function BuiltinsSection({ builtins, onChange, sources }: Props) {
  const mcpSources = sources.filter((s) => s.kind === "mcp");
  const availableMcpSources = mcpSources.filter((s) => !builtins.knowledge.mcp_sources.includes(s.id));

  return (
    <div className="flex flex-col gap-[16px] w-full">
      <BuiltinCard
        title="Conhecimento"
        description="Ferramentas gerais e fontes MCP"
        enabled={builtins.knowledge.enabled}
        onToggle={(v) => onChange({ ...builtins, knowledge: { ...builtins.knowledge, enabled: v } })}
      >
        <div className="flex flex-col gap-[8px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Ferramentas</span>
          <div className="flex flex-wrap gap-[8px]">
            <CheckboxField
              checked={builtins.knowledge.tools.current_datetime}
              onChange={(v) => onChange({ ...builtins, knowledge: { ...builtins.knowledge, tools: { ...builtins.knowledge.tools, current_datetime: v } } })}
              label="DATA E HORA ATUAL"
            />
            <CheckboxField
              checked={builtins.knowledge.tools.code_execution}
              onChange={(v) => onChange({ ...builtins, knowledge: { ...builtins.knowledge, tools: { ...builtins.knowledge.tools, code_execution: v } } })}
              label="EXECUÇÃO DE CÓDIGO"
            />
            <CheckboxField
              checked={builtins.knowledge.tools.fetch_url}
              onChange={(v) => onChange({ ...builtins, knowledge: { ...builtins.knowledge, tools: { ...builtins.knowledge.tools, fetch_url: v } } })}
              label="ACESSO A URLS"
            />
            <CheckboxField
              checked={builtins.knowledge.tools.attachments}
              onChange={(v) => onChange({ ...builtins, knowledge: { ...builtins.knowledge, tools: { ...builtins.knowledge.tools, attachments: v } } })}
              label="ANEXOS"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Fontes MCP</span>
          <div className="flex flex-wrap gap-[6px] items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] p-[8px] min-h-[36px]">
            {builtins.knowledge.mcp_sources.length === 0 && (
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px] px-[4px]">Nenhuma fonte MCP selecionada</span>
            )}
            {builtins.knowledge.mcp_sources.map((id) => {
              const source = sources.find((s) => s.id === id);
              return (
                <div key={id} className="flex items-center gap-[4px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] rounded-[4px] px-[8px] py-[3px]">
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[12px]">{source?.label || id}</span>
                  <button
                    type="button"
                    onClick={() => onChange({ ...builtins, knowledge: { ...builtins.knowledge, mcp_sources: builtins.knowledge.mcp_sources.filter((mid) => mid !== id) } })}
                    className="opacity-50 hover:opacity-100"
                  >
                    <svg className="size-[10px]" fill="none" viewBox="0 0 10 10">
                      <path d="M8 2L2 8M2 2l6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          {availableMcpSources.length > 0 && (
            <div className="flex items-center gap-[8px]">
              <select
                onChange={(e) => {
                  if (!e.target.value) return;
                  onChange({ ...builtins, knowledge: { ...builtins.knowledge, mcp_sources: [...builtins.knowledge.mcp_sources, e.target.value] } });
                  e.target.value = "";
                }}
                defaultValue=""
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[8px] h-[32px] px-[10px] text-[#f9fafb] text-[13px] outline-none"
              >
                <option value="" disabled>Adicionar fonte MCP</option>
                {availableMcpSources.map((s) => (
                  <option key={s.id} value={s.id} style={{ background: "#111827" }}>
                    {s.label || SOURCE_KIND_LABELS[s.kind]}
                  </option>
                ))}
              </select>
            </div>
          )}
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
            Selecione as fontes MCP cadastradas em Fontes.
          </p>
        </div>
      </BuiltinCard>

      <BuiltinCard
        title="Agendamentos"
        description="Lembretes e agendamentos"
        enabled={builtins.schedule.enabled}
        onToggle={(v) => onChange({ ...builtins, schedule: { enabled: v } })}
      />

      <BuiltinCard
        title="Visualização"
        description="Gráficos e visualizações de dados"
        enabled={builtins.visualization.enabled}
        onToggle={(v) => onChange({ ...builtins, visualization: { enabled: v } })}
      />
    </div>
  );
}
