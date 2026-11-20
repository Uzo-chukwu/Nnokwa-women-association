export type BankTransferDetails = {
  bank: string;
  accountName: string;
  accountNumber: string;
};

export const donationBankAccount: BankTransferDetails = {
  bank: "United Bank for Africa (UBA)",
  accountName: "NNOKWA WOMEN ASSOCIATION",
  accountNumber: "2439636465",
};

export const donatePage = {
  title: "Donate",
  heading: "Be Part of the Change",
  introduction: "Your support can help strengthen initiatives that improve women's well-being, create opportunities for families and contribute to sustainable community development in Nnokwa.",
  instructions: `To support the work of the Nnokwa Women Association, transfer your donation to the bank account below. Please ensure that the beneficiary name matches ${donationBankAccount.accountName} before completing your transfer.`,
  thanks: "Thank you for supporting the Nnokwa Women Association. Your generosity contributes to our efforts to empower women, strengthen families and build a better community.",
  institutionalSupport: "We welcome support from corporate organizations, foundations, government institutions and development partners. Explore how your organization could collaborate with the association to support women and families in Nnokwa.",
} as const;
