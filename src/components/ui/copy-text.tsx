"use client";

import { Copy } from "lucide-react";
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
  const [feedback, setFeedback] = useState("");

  async function copyText() {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback(successMessage);
    } catch {
      setFeedback(errorMessage);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={copyText}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border border-accent/35 px-3 py-2 text-left text-sm font-semibold text-accent hover:border-accent hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors"
      >
        <Copy size={16} aria-hidden="true" />
        {label}
      </button>
      <p role="status" aria-atomic="true" className="mt-2 min-h-5 text-sm text-accent">
        {feedback}
      </p>
    </div>
  );
}
