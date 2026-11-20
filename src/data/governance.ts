import { siteInfo } from "@/data/site";

export const legalStatusId = "legal-status-and-governance";

type GovernanceDocument = {
  title: string;
  description: string;
  url: `https://${string}`;
};

type Registration = {
  name: string;
  number: string;
  authority: string;
  date: string;
  isoDate: string;
  location: string;
  certificate: { url: `/${string}`; width: number; height: number; alt: string };
};

export const registration: Registration = {
  name: siteInfo.name,
  number: "9686878",
  authority: "Corporate Affairs Commission (CAC), Nigeria",
  date: "16 July 2026",
  isoDate: "2026-07-16",
  location: "Nnokwa, Idemili South LGA, Anambra State, Nigeria",
  certificate: {
    url: "/documents/nnokwa-cac-certificate-redacted.jpg",
    width: 1400,
    height: 1981,
    alt: "CAC Certificate of Incorporation for NNOKWA WOMEN ASSOCIATION with the tax identification line and QR code redacted",
  },
};

export const constitution: GovernanceDocument = {
  title: "Our Constitution",
  description: "Our constitution provides the framework that guides the association's objectives, membership, leadership, responsibilities and internal governance.",
  url: "https://drive.google.com/file/d/1M2fSPlyiSS_XP6MYXcIMLQaKhKFpIR4b/view?usp=drivesdk",
};
