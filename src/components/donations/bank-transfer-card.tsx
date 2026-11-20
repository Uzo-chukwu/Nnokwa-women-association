import type { ReactNode } from "react";
import { CopyAccountNumber } from "@/components/donations/copy-account-number";
import { donationBankAccount } from "@/data/donations";

export function BankTransferCard({
  id,
  onDarkBackground = false,
  children,
}: {
  id: string;
  onDarkBackground?: boolean;
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
      className={`scroll-mt-5 border-t-2 bg-surface p-5 text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-8 ${onDarkBackground ? "border-gold focus-visible:outline-gold" : "border border-border border-t-gold focus-visible:outline-purple"}`}
    >
      <h3 id={headingId} className="text-2xl leading-tight font-semibold text-purple sm:text-3xl">Bank transfer details</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/85">We accept donations by direct bank transfer only.</p>
      <dl className="mt-5 grid gap-4 border-y border-border py-5">
        <div>
          <dt className="text-sm font-medium text-purple">Bank</dt>
          <dd className="mt-1 font-semibold">{bank}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-purple">Account name</dt>
          <dd className="mt-1 font-semibold">{accountName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-purple">Account number</dt>
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
