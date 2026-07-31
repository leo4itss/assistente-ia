import { useState } from "react";
import { toast } from "sonner";
import { toastSuccess } from "@/app/lib/toast";
import { testSourceConnection } from "@/app/lib/testSourceConnection";
import type { Source, SourceConnectionMeta } from "@/app/types/assistantConfig";

interface Props {
  source: Source;
  onResult: (meta: SourceConnectionMeta) => void;
}

export default function TestConnectionButton({ source, onResult }: Props) {
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    if (testing) return;
    setTesting(true);
    try {
      const result = await testSourceConnection(source);
      onResult(result.meta);
      if (result.ok) toastSuccess(result.message);
      else toast.error(result.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTest}
      disabled={testing}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] flex h-[36px] items-center justify-center gap-[8px] px-[16px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
    >
      {testing ? (
        <>
          <span className="size-[14px] rounded-full border-2 border-[rgba(255,255,255,0.25)] border-t-[#f9fafb] animate-spin shrink-0" />
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Testando…</span>
        </>
      ) : (
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#f9fafb] text-[14px]">Testar conexão</span>
      )}
    </button>
  );
}
