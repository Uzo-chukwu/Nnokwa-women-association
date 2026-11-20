import { CopyText } from "@/components/ui/copy-text";

export function CopyAccountNumber({ accountNumber }: { accountNumber: string }) {
  return (
    <CopyText
      value={accountNumber}
      label="Copy account number"
      successMessage="Account number copied."
      errorMessage="Copy unavailable. You can select and copy the account number above."
    />
  );
}
