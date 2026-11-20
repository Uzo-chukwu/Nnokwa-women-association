import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteInfo } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: siteInfo.name, template: `%s | ${siteInfo.name}` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-purple focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
