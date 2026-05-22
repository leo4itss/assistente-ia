import { useState } from "react";
import type { DbSchema, TableSchema, ColumnSchema, ValidationErrors } from "@/app/types/resourcesTools";

function newId() {
  return Math.random().toString(36).slice(2);
}

function newColumn(): ColumnSchema {
  return { id: newId(), name: "", type: "", is_null: true, is_key: false, comment: "" };
}

function newTable(): TableSchema {
  return { id: newId(), name: "", comment: "", columns: [newColumn()] };
}

function newSchema(): DbSchema {
  return { id: newId(), name: "", comment: "", tables: [newTable()] };
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px] mt-[2px]">{message}</p>;
}

function SmallInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[28px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-[6px] px-[8px] font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[13px] leading-[20px] outline-none placeholder:text-[#6b7280] w-full"
    />
  );
}

function ToggleMini({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-[6px]">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-[16px] w-[28px] shrink-0 rounded-full transition-colors ${checked ? "bg-[#2563eb]" : "bg-[rgba(255,255,255,0.15)]"}`}
      >
        <span className={`inline-block size-[12px] rounded-full bg-white shadow transition-transform mt-[2px] ${checked ? "translate-x-[14px]" : "translate-x-[2px]"}`} />
      </button>
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">{label}</span>
    </div>
  );
}

function ColumnRow({
  column,
  onChange,
  onDelete,
}: {
  column: ColumnSchema;
  onChange: (c: ColumnSchema) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-[8px] py-[4px]">
      <div className="flex-1 min-w-0">
        <SmallInput value={column.name} onChange={(v) => onChange({ ...column, name: v })} placeholder="nome" />
      </div>
      <div className="w-[120px] shrink-0">
        <SmallInput value={column.type} onChange={(v) => onChange({ ...column, type: v })} placeholder="tipo" />
      </div>
      <ToggleMini checked={column.is_null} onChange={(v) => onChange({ ...column, is_null: v })} label="null" />
      <ToggleMini checked={column.is_key} onChange={(v) => onChange({ ...column, is_key: v })} label="key" />
      <div className="w-[130px] shrink-0">
        <SmallInput value={column.comment} onChange={(v) => onChange({ ...column, comment: v })} placeholder="comentário" />
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="shrink-0 flex items-center justify-center size-[24px] rounded-[4px] hover:bg-[rgba(255,255,255,0.05)] opacity-50 hover:opacity-100 transition-all"
      >
        <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
          <path d="M9 3L3 9M3 3l6 6" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function TableAccordion({
  table,
  tableIdx,
  onChange,
  onDelete,
  errors,
  errorPrefix,
}: {
  table: TableSchema;
  tableIdx: number;
  onChange: (t: TableSchema) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}) {
  const [open, setOpen] = useState(true);

  const updateColumn = (ci: number, col: ColumnSchema) => {
    const cols = [...table.columns];
    cols[ci] = col;
    onChange({ ...table, columns: cols });
  };

  const addColumn = () => onChange({ ...table, columns: [...table.columns, newColumn()] });

  const deleteColumn = (ci: number) =>
    onChange({ ...table, columns: table.columns.filter((_, i) => i !== ci) });

  const totalCols = table.columns.length;

  return (
    <div className="border border-[rgba(255,255,255,0.08)] rounded-[8px] overflow-hidden">
      {/* Table header */}
      <div className="flex items-center gap-[8px] px-[12px] py-[8px] bg-[rgba(255,255,255,0.03)]">
        <button type="button" onClick={() => setOpen(!open)} className="shrink-0 opacity-60 hover:opacity-100">
          <svg className={`size-[14px] transition-transform ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 14 14">
            <path d="M5.25 3.5l3.5 3.5-3.5 3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <SmallInput
            value={table.name}
            onChange={(v) => onChange({ ...table, name: v })}
            placeholder="nome da tabela"
          />
          <FieldError message={errors[`${errorPrefix}.${tableIdx}.name`]} />
        </div>
        <div className="w-[160px] shrink-0">
          <SmallInput value={table.comment} onChange={(v) => onChange({ ...table, comment: v })} placeholder="comentário" />
        </div>
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px] shrink-0">{totalCols} col{totalCols !== 1 ? "s" : ""}</span>
        <button
          type="button"
          onClick={onDelete}
          className="shrink-0 flex items-center justify-center size-[24px] rounded-[4px] hover:bg-[rgba(255,255,255,0.05)] opacity-50 hover:opacity-100 transition-all"
        >
          <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
            <path d="M9 3L3 9M3 3l6 6" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Columns */}
      {open && (
        <div className="px-[12px] py-[8px] flex flex-col gap-[4px] bg-[rgba(0,0,0,0.15)]">
          {/* Column header labels */}
          <div className="flex items-center gap-[8px] pb-[4px]">
            <div className="flex-1 min-w-0">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[11px]">nome</span>
            </div>
            <div className="w-[120px] shrink-0">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[11px]">tipo</span>
            </div>
            <div className="w-[80px] shrink-0" />
            <div className="w-[130px] shrink-0">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[11px]">comentário</span>
            </div>
            <div className="size-[24px] shrink-0" />
          </div>
          {table.columns.map((col, ci) => (
            <ColumnRow
              key={col.id}
              column={col}
              onChange={(updated) => updateColumn(ci, updated)}
              onDelete={() => deleteColumn(ci)}
            />
          ))}
          <button
            type="button"
            onClick={addColumn}
            className="flex items-center gap-[6px] mt-[4px] opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
              <path d="M6 2v8M2 6h8" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">+ Coluna</span>
          </button>
        </div>
      )}
    </div>
  );
}

function SchemaAccordion({
  schema,
  schemaIdx,
  onChange,
  onDelete,
  errors,
  errorPrefix,
}: {
  schema: DbSchema;
  schemaIdx: number;
  onChange: (s: DbSchema) => void;
  onDelete: () => void;
  errors: ValidationErrors;
  errorPrefix: string;
}) {
  const [open, setOpen] = useState(true);

  const updateTable = (ti: number, table: TableSchema) => {
    const tables = [...schema.tables];
    tables[ti] = table;
    onChange({ ...schema, tables });
  };

  const addTable = () => onChange({ ...schema, tables: [...schema.tables, newTable()] });

  const deleteTable = (ti: number) =>
    onChange({ ...schema, tables: schema.tables.filter((_, i) => i !== ti) });

  const totalCols = schema.tables.reduce((acc, t) => acc + t.columns.length, 0);
  const summary = `${schema.tables.length} tabela${schema.tables.length !== 1 ? "s" : ""} · ${totalCols} coluna${totalCols !== 1 ? "s" : ""}`;

  return (
    <div className="border border-[rgba(255,255,255,0.1)] rounded-[10px] overflow-hidden">
      {/* Schema header */}
      <div className="flex items-center gap-[8px] px-[12px] py-[10px] bg-[rgba(255,255,255,0.04)]">
        <button type="button" onClick={() => setOpen(!open)} className="shrink-0 opacity-60 hover:opacity-100">
          <svg className={`size-[14px] transition-transform ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 14 14">
            <path d="M5.25 3.5l3.5 3.5-3.5 3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </svg>
        </button>
        <svg className="size-[14px] shrink-0 opacity-50" fill="none" viewBox="0 0 16 16">
          <path d="M8 2C4.686 2 2 3.343 2 5v6c0 1.657 2.686 3 6 3s6-1.343 6-3V5c0-1.657-2.686-3-6-3z" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          <path d="M2 5c0 1.657 2.686 3 6 3s6-1.343 6-3" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <div className="flex-1 min-w-0">
          <SmallInput
            value={schema.name}
            onChange={(v) => onChange({ ...schema, name: v })}
            placeholder="nome do schema"
          />
          <FieldError message={errors[`${errorPrefix}.${schemaIdx}.name`]} />
        </div>
        <div className="w-[160px] shrink-0">
          <SmallInput value={schema.comment} onChange={(v) => onChange({ ...schema, comment: v })} placeholder="comentário" />
        </div>
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px] shrink-0 whitespace-nowrap">{summary}</span>
        <button
          type="button"
          onClick={onDelete}
          className="shrink-0 flex items-center justify-center size-[24px] rounded-[4px] hover:bg-[rgba(255,255,255,0.05)] opacity-50 hover:opacity-100 transition-all"
        >
          <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
            <path d="M9 3L3 9M3 3l6 6" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Tables */}
      {open && (
        <div className="p-[12px] flex flex-col gap-[8px]">
          <FieldError message={errors[`${errorPrefix}.${schemaIdx}.tables`]} />
          {schema.tables.map((table, ti) => (
            <TableAccordion
              key={table.id}
              table={table}
              tableIdx={ti}
              onChange={(updated) => updateTable(ti, updated)}
              onDelete={() => deleteTable(ti)}
              errors={errors}
              errorPrefix={`${errorPrefix}.${schemaIdx}.tables`}
            />
          ))}
          <button
            type="button"
            onClick={addTable}
            className="flex items-center gap-[6px] mt-[4px] opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
              <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">+ Tabela</span>
          </button>
        </div>
      )}
    </div>
  );
}

interface MetadataSchemaEditorProps {
  schemas: DbSchema[];
  onChange: (schemas: DbSchema[]) => void;
  errors: ValidationErrors;
  errorPrefix: string;
}

export default function MetadataSchemaEditor({ schemas, onChange, errors, errorPrefix }: MetadataSchemaEditorProps) {
  const updateSchema = (si: number, schema: DbSchema) => {
    const copy = [...schemas];
    copy[si] = schema;
    onChange(copy);
  };

  const addSchema = () => onChange([...schemas, newSchema()]);

  const deleteSchema = (si: number) => onChange(schemas.filter((_, i) => i !== si));

  return (
    <div className="flex flex-col gap-[8px]">
      {schemas.map((schema, si) => (
        <SchemaAccordion
          key={schema.id}
          schema={schema}
          schemaIdx={si}
          onChange={(updated) => updateSchema(si, updated)}
          onDelete={() => deleteSchema(si)}
          errors={errors}
          errorPrefix={errorPrefix}
        />
      ))}
      <button
        type="button"
        onClick={addSchema}
        className="flex items-center gap-[6px] opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
          <path d="M7 2.333v9.334M2.333 7h9.334" stroke="#9ca3af" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">+ Schema</span>
      </button>
    </div>
  );
}
