import { useState } from "react";
import {
  FieldLabel,
  FieldError,
  TextInput,
  PasswordInput,
  SelectInput,
} from "@/app/components/resources/fields/Fields";
import { slugifyLabel } from "@/app/lib/slug";
import type { SourceMcp, SourceTransport, ValidationErrors } from "@/app/types/assistantConfig";

interface Props {
  source: SourceMcp;
  onChange: (updated: SourceMcp) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

const TRANSPORT_OPTIONS = [
  { value: "sse", label: "sse" },
  { value: "stdio", label: "stdio" },
  { value: "http", label: "http" },
  { value: "websocket", label: "websocket" },
];

export default function SourceMcpForm({ source, onChange, errors, errorPrefix }: Props) {
  const [idTouched, setIdTouched] = useState(!!source.external_id);
  const e = (f: string) => errors[`${errorPrefix}.${f}`];
  const update = (patch: Partial<SourceMcp>) => onChange({ ...source, ...patch });

  const handleLabelChange = (label: string) => {
    if (idTouched) {
      update({ label });
    } else {
      update({ label, external_id: slugifyLabel(label) });
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Rótulo</FieldLabel>
          <TextInput value={source.label} onChange={handleLabelChange} placeholder="Ex.: Jira MCP (tools → knowledge)" />
          <FieldError message={e("label")} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>ID</FieldLabel>
          <TextInput
            value={source.external_id}
            onChange={(v) => {
              setIdTouched(true);
              update({ external_id: v });
            }}
            placeholder="Ex.: jira_mcp"
          />
          <FieldError message={e("external_id")} />
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <FieldLabel required>URL</FieldLabel>
        <TextInput value={source.url} onChange={(v) => update({ url: v })} placeholder="https://mcp.example.com/jira/sse" />
        <FieldError message={e("url")} />
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <FieldLabel required>Transporte</FieldLabel>
          <SelectInput
            value={source.transport}
            onChange={(v) => update({ transport: v as SourceTransport })}
            options={TRANSPORT_OPTIONS}
            placeholder="Selecione..."
          />
          <FieldError message={e("transport")} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <FieldLabel>API Key</FieldLabel>
          <PasswordInput
            value={source.secret_key}
            onChange={(v) => update({ secret_key: v })}
            placeholder="sk-..."
            hasValue={!!source.secret_key}
          />
        </div>
      </div>
    </div>
  );
}
