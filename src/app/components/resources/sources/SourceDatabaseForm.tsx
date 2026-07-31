import {
  FieldLabel,
  FieldError,
  TextInput,
  PasswordInput,
  TextareaInput,
  SelectInput,
  ToggleSwitch,
} from "@/app/components/resources/fields/Fields";
import TestConnectionButton from "@/app/components/resources/sources/TestConnectionButton";
import { untestedConnectionMeta } from "@/app/lib/testSourceConnection";
import type {
  SourceDatabase,
  DatabaseType,
  SourceTransport,
  SourceConnectionMeta,
  ValidationErrors,
} from "@/app/types/assistantConfig";

interface Props {
  source: SourceDatabase;
  onChange: (updated: SourceDatabase) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

const DB_OPTIONS = [
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlserver", label: "SQL Server" },
];

const CONNECTION_PLACEHOLDERS: Record<string, string> = {
  postgresql: "postgresql://user:pass@host:5432/db",
  mysql: "mysql://user:pass@host:3306/db",
  sqlserver: "sqlserver://user:pass@host:1433;database=db",
};

const TRANSPORT_OPTIONS = [
  { value: "sse", label: "sse" },
  { value: "stdio", label: "stdio" },
  { value: "http", label: "http" },
  { value: "websocket", label: "websocket" },
];

export default function SourceDatabaseForm({ source, onChange, errors, errorPrefix }: Props) {
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<SourceDatabase>) => onChange({ ...source, ...patch });
  const updateCredentials = (patch: Partial<SourceDatabase>) =>
    onChange({ ...source, ...patch, ...untestedConnectionMeta() });
  const applyTestResult = (meta: SourceConnectionMeta) => onChange({ ...source, ...meta });

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-2 gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Rótulo</FieldLabel>
          <TextInput value={source.label} onChange={(v) => update({ label: v })} placeholder="Ex.: Banco Docnix" />
          <FieldError message={e("label")} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Banco de dados</FieldLabel>
          <SelectInput
            value={source.database}
            onChange={(v) => updateCredentials({ database: v as DatabaseType })}
            options={DB_OPTIONS}
            placeholder="Selecione o banco..."
          />
          <FieldError message={e("database")} />
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>String de conexão</FieldLabel>
        <PasswordInput
          value={source.connection_string}
          onChange={(v) => updateCredentials({ connection_string: v })}
          placeholder={CONNECTION_PLACEHOLDERS[source.database] ?? "protocol://user:pass@host:port/db"}
          hasValue={!!source.connection_string}
        />
        <FieldError message={e("connection_string")} />
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[12px]">
          <ToggleSwitch
            checked={source.use_mcp}
            onChange={(v) => updateCredentials({ use_mcp: v })}
            label="Usar MCP"
            description="Acessar o banco via MCP"
          />
        </div>
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[12px]">
          <ToggleSwitch
            checked={source.introspect}
            onChange={(v) => update({ introspect: v })}
            label="Detectar estrutura"
            description="Identificar schema via MCP"
          />
        </div>
      </div>

      {source.use_mcp && (
        <div className="flex flex-col gap-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[10px] p-[16px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#f9fafb] text-[14px]">Configuração MCP</p>
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <FieldLabel required>Host</FieldLabel>
              <TextInput value={source.mcp_host} onChange={(v) => updateCredentials({ mcp_host: v })} placeholder="mcp-docnix.example.internal" />
              <FieldError message={e("mcp_host")} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FieldLabel>Porta</FieldLabel>
              <TextInput value={source.mcp_port} onChange={(v) => updateCredentials({ mcp_port: v })} placeholder="8080" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <FieldLabel>Transporte</FieldLabel>
              <SelectInput
                value={source.mcp_transport}
                onChange={(v) => updateCredentials({ mcp_transport: v as SourceTransport })}
                options={TRANSPORT_OPTIONS}
                placeholder="Selecione..."
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FieldLabel>API Key</FieldLabel>
              <PasswordInput
                value={source.mcp_secret_key}
                onChange={(v) => updateCredentials({ mcp_secret_key: v })}
                placeholder="sk-..."
                hasValue={!!source.mcp_secret_key}
              />
            </div>
          </div>
        </div>
      )}

      {!source.introspect && (
        <div className="flex flex-col gap-[8px]">
          <FieldLabel>Estrutura do banco (JSON)</FieldLabel>
          <TextareaInput
            value={source.structure}
            onChange={(v) => update({ structure: v })}
            placeholder={'{ "schemas": [ { "name": "public", "tables": [ ... ] } ] }'}
            rows={5}
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">
            Informe a estrutura do banco quando a inspeção automática não estiver habilitada.
          </p>
          <FieldError message={e("structure")} />
        </div>
      )}

      <TestConnectionButton source={source} onResult={applyTestResult} />
    </div>
  );
}
