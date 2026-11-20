import { Mail } from "lucide-react";
import { cacheLife } from "next/cache";
import { SiteLink } from "@/components/ui/site-link";
import { SocialIcon } from "@/components/ui/social-icon";
import { footerNavigation } from "@/data/navigation";
import { getSiteInfo } from "@/data/site";

const footerLinkClass = "inline-flex min-h-8 items-center rounded-sm text-sm text-ivory/90 underline-offset-4 hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-safe:transition-colors";

async function CopyrightYear() {
  "use cache";
  cacheLife("hours");

  return new Intl.DateTimeFormat("en-NG", { year: "numeric", timeZone: "Africa/Lagos" }).format(new Date());
}

export async function SiteFooter() {
  const { name, tagline, footerDescription, contact, socialLinks } = await getSiteInfo();
  const officialSocialLinks = socialLinks.flatMap(({ platform, url }) => url ? [{ platform, url }] : []);

  return (
    <footer className="border-t border-gold/40 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-8 px-5 pt-12 pb-10 sm:gap-x-8 sm:px-8 sm:pt-14 sm:pb-12 md:grid-cols-3 lg:grid-cols-[1.45fr_0.8fr_0.8fr_1fr] xl:gap-x-12 xl:px-12">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <div aria-hidden="true" className="mb-4 h-px w-9 bg-gold" />
          <p className="max-w-[18rem] font-serif text-xl leading-tight font-semibold sm:text-2xl">{name}</p>
          <p className="mt-3 text-sm font-semibold text-gold">{tagline}</p>
          <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-ivory/85">{footerDescription}</p>
        </div>

        {footerNavigation.map(({ title, links }) => (
          <nav key={title} aria-label={`Footer ${title}`}>
            <h2 className="font-sans text-sm font-semibold tracking-wide text-gold">{title}</h2>
            <ul role="list" className="mt-3 space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <SiteLink href={href} prefetch={false} className={footerLinkClass}>{label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 md:col-span-1">
          <h2 className="font-sans text-sm font-semibold tracking-wide text-gold">Contact</h2>
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className={`mt-3 gap-2 ${footerLinkClass}`}>
              <Mail size={16} aria-hidden="true" className="shrink-0 text-gold" />
              <span className="wrap-anywhere">{contact.email}</span>
            </a>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ivory/85">{contact.emailPlaceholder}</p>
          )}

          {officialSocialLinks.length > 0 && (
            <nav aria-label="Official social media" className="mt-5">
              <h3 className="font-sans text-sm font-semibold tracking-wide text-gold">Follow us</h3>
              <ul role="list" className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {officialSocialLinks.map(({ platform, url }) => (
                  <li key={platform}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`gap-2 ${footerLinkClass}`}>
                      <SocialIcon platform={platform} className="size-4 shrink-0 text-gold" />
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 xl:px-12">
          <p className="text-sm leading-relaxed text-ivory/80">© <CopyrightYear /> {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
