import { FileText } from "lucide-react";
import { DocumentLink } from "@/components/governance/document-link";
import { constitution } from "@/data/governance";

export function ConstitutionCard() {
  return (
    <div className="border border-border bg-surface p-5 sm:p-7">
      <div aria-hidden="true" className="mb-4 grid size-11 place-items-center rounded-sm bg-gold/20 text-accent">
        <FileText size={22} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl leading-tight font-semibold text-foreground">{constitution.title}</h3>
      <p className="mt-3 max-w-[37rem] text-base leading-relaxed text-foreground/85">{constitution.description}</p>
      <div className="mt-5">
        <DocumentLink href={constitution.url}>View Our Constitution</DocumentLink>
      </div>
    </div>
  );
}
