"use client";

import { Check, CircleAlert, Copy } from "lucide-react";
import { useState } from "react";

export function CopyText({
  value,
  label,
  successMessage,
  errorMessage,
}: {
  value: string;
  label: string;
  successMessage: string;
  errorMessage: string;
}) {
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const Icon = result === "success" ? Check : result === "error" ? CircleAlert : Copy;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(value);
      setResult("success");
    } catch {
      setResult("error");
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={copyText}
        data-copy-result={result ?? undefined}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border border-accent/35 px-3 py-2 text-left text-sm font-semibold text-accent hover:border-accent hover:bg-accent/5 active:bg-accent/15 data-[copy-result=success]:border-accent data-[copy-result=success]:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors"
      >
        <Icon size={16} aria-hidden="true" className="shrink-0" />
        {label}
      </button>
      <p role="status" aria-atomic="true" className="mt-2 min-h-5 text-sm text-accent">
        {result === "success" ? successMessage : result === "error" ? errorMessage : ""}
      </p>
    </div>
  );
}
