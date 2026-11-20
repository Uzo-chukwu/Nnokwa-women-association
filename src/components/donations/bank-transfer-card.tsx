import type { ReactNode } from "react";
import { CopyAccountNumber } from "@/components/donations/copy-account-number";
import { donationBankAccount } from "@/data/donations";

export function BankTransferCard({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) {
  const { bank, accountName, accountNumber } = donationBankAccount;
  const headingId = `${id}-heading`;

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={headingId}
      tabIndex={-1}
      className="scroll-mt-5 border border-t-2 border-border border-t-gold bg-surface p-5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-8"
    >
      <h3 id={headingId} className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl">Bank transfer details</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">We accept donations by direct bank transfer only.</p>
      <dl className="mt-5 grid gap-4 border-y border-border py-5">
        <div>
          <dt className="text-sm font-medium text-accent">Bank</dt>
          <dd className="mt-1 font-semibold">{bank}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-accent">Account name</dt>
          <dd className="mt-1 font-semibold">{accountName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-accent">Account number</dt>
          <dd className="mt-1">
            <span className="text-2xl font-semibold tracking-[0.06em] tabular-nums select-all sm:text-3xl">{accountNumber}</span>
            <CopyAccountNumber accountNumber={accountNumber} />
          </dd>
        </div>
      </dl>
      {children}
    </div>
  );
}
