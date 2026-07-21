// Componentes de campo compartilhados — extraídos dos forms de recursos existentes
// (DatabaseProviderForm / DocumentsForm) para reuso na nova tela v3 sem duplicação.
// Estética idêntica à já usada no projeto (dark-first, tokens do DESIGN.md).

import { useState } from "react";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f87171] text-[12px] mt-[4px]">
      {message}
    </p>
  );
}

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#f9fafb] text-[14px]">
      {children}
      {required && <span className="text-[#f87171] ml-[2px]">*</span>}
    </p>
  );
}

export function SliderField({
  label,
  description,
  value,
  min = 0,
  max = 1,
  step = 0.1,
  onChange,
  formatValue,
}: {
  label: string;
  description?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#2563eb] text-[13px]">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-[6px] rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-[6px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#030712] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:h-[6px] [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:size-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#030712] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#2563eb] [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percent}%, #1f2937 ${percent}%, #1f2937 100%)`,
        }}
      />
      {description && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-[12px]">{description}</p>
      )}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] min-w-0"
        />
      </div>
    </div>
  );
}

export function PasswordInput({
  value,
  onChange,
  placeholder,
  hasValue,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hasValue?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full gap-[8px]">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={hasValue && !value ? "••••••••  (deixe em branco para manter)" : placeholder || ""}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] min-w-0"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          tabIndex={-1}
        >
          {show ? (
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path d="M2 8s2.667-4.667 6-4.667S14 8 14 8s-2.667 4.667-6 4.667S2 8 2 8z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              <path d="M8 9.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666z" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          ) : (
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path d="M9.413 9.414A2 2 0 016.586 6.586M13.36 13.36C12.05 14.37 10.1 15.333 8 15.333 4.667 15.333 2 11.333 2 8a10.4 10.4 0 011.64-3.36M6.4 3.067A6.94 6.94 0 018 2.667c3.333 0 6 4 6 5.333a9.36 9.36 0 01-1.64 2.72M2 2l12 12" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export function TextareaInput({
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none placeholder:text-[#9ca3af] resize-none p-[12px]"
      />
      {maxLength != null && (
        <div className="flex justify-end px-[12px] pb-[8px]">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[12px]">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[36px] relative rounded-[8px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center px-[12px] size-full relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[#f9fafb] text-[14px] leading-[20px] bg-transparent border-none outline-none appearance-none cursor-pointer min-w-0"
          style={{ color: value ? "#f9fafb" : "#9ca3af" }}
        >
          {placeholder && (
            <option value="" disabled style={{ color: "#9ca3af", background: "#111827" }}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: "#111827", color: "#f9fafb" }}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg className="shrink-0 size-[14px] opacity-50 pointer-events-none" fill="none" viewBox="0 0 14 14">
          <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </svg>
      </div>
    </div>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
}) {
  const toggle = (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[20px] w-[36px] shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-[#2563eb]" : "bg-[rgba(255,255,255,0.15)]"}`}
    >
      <span
        className={`inline-block size-[16px] rounded-full bg-white shadow transition-transform duration-200 mt-[2px] ${checked ? "translate-x-[18px]" : "translate-x-[2px]"}`}
      />
    </button>
  );

  if (description) {
    return (
      <div className="flex items-center justify-between gap-[16px]">
        <div className="flex flex-col gap-[2px]">
          {label && <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">{label}</span>}
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[#9ca3af] text-[13px]">{description}</span>
        </div>
        {toggle}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[10px]">
      {toggle}
      {label && <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">{label}</span>}
    </div>
  );
}

export function CheckboxField({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
    >
      <span
        className={`flex items-center justify-center size-[16px] rounded-[4px] border shrink-0 transition-colors ${checked ? "bg-[#2563eb] border-[#2563eb]" : "border-[rgba(255,255,255,0.3)] bg-transparent"}`}
      >
        {checked && (
          <svg className="size-[10px]" fill="none" viewBox="0 0 10 10">
            <path d="M8.5 2.5L3.75 7.5 1.5 5.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        )}
      </span>
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[13px] whitespace-nowrap">{label}</span>
    </button>
  );
}
