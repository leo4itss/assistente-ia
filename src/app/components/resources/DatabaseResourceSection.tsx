import DatabaseProviderForm from "@/app/components/resources/DatabaseProviderForm";
import type { AgentDatabase, DatabaseProvider, ValidationErrors } from "@/app/types/resourcesTools";

function newId() {
  return Math.random().toString(36).slice(2);
}

function newProvider(): DatabaseProvider {
  return {
    id: newId(),
    database: "",
    connection_string: "",
    system_prompt: "",
    use_mcp: false,
    mcp_host: "",
    mcp_port: "",
    mcp_transport: "",
    mcp_secret_key: "",
    mcp_command: "",
    mcp_args: [],
    metadata: [],
  };
}

interface DatabaseResourceSectionProps {
  resource: AgentDatabase;
  onChange: (updated: AgentDatabase) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function DatabaseResourceSection({ resource, onChange, errors, errorPrefix }: DatabaseResourceSectionProps) {
  const updateProvider = (idx: number, provider: DatabaseProvider) => {
    const tools = [...resource.tools];
    tools[idx] = provider;
    onChange({ ...resource, tools });
  };

  const addProvider = () => onChange({ ...resource, tools: [...resource.tools, newProvider()] });

  const deleteProvider = (idx: number) =>
    onChange({ ...resource, tools: resource.tools.filter((_, i) => i !== idx) });

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Version radio */}
      <div className="flex flex-col gap-[10px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Versão</p>
        <div className="flex items-center gap-[20px]">
          {(["v1", "v2"] as const).map((v) => (
            <label key={v} className="flex items-center gap-[8px] cursor-pointer">
              <div
                onClick={() => onChange({ ...resource, version: v })}
                className={`flex items-center justify-center size-[16px] rounded-full border-2 transition-colors cursor-pointer ${resource.version === v ? "border-[#2563eb]" : "border-[rgba(255,255,255,0.3)]"}`}
              >
                {resource.version === v && <div className="size-[8px] rounded-full bg-[#2563eb]" />}
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px]">{v}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error for empty tools */}
      {errors[`${errorPrefix}.tools`] && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px]">{errors[`${errorPrefix}.tools`]}</p>
      )}

      {/* Provider forms */}
      {resource.tools.map((provider, idx) => (
        <DatabaseProviderForm
          key={provider.id}
          provider={provider}
          onChange={(updated) => updateProvider(idx, updated)}
          onDelete={() => deleteProvider(idx)}
          errors={errors}
          errorPrefix={`${errorPrefix}.tools.${idx}`}
        />
      ))}

      {/* Add provider */}
      <button
        type="button"
        onClick={addProvider}
        className="flex items-center gap-[8px] self-start bg-[rgba(255,255,255,0.05)] h-[32px] px-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        <svg className="size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
          <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px]">Adicionar conexão de banco</span>
      </button>
    </div>
  );
}
