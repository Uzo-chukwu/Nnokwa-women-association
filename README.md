# NNOKWA WOMEN ASSOCIATION

## Local development

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. Run `npm run build` to check the production build.

## Browser regression tests

```sh
npm ci
npx playwright install --only-shell chromium
npm test
```

On Linux, use `npx playwright install --with-deps --only-shell chromium` if Chromium needs system libraries. If Google Chrome is already installed, `PLAYWRIGHT_USE_SYSTEM_CHROME=1 npm test` runs against that browser. The suite builds the app and starts a dedicated production server on port 3107. It runs headless and mocks clipboard access.

Run an individual spec with `npm test -- tests/e2e/navigation.spec.ts`. Failed tests retain a trace under `test-results/`. Open a trace with `npx playwright show-trace path/to/trace.zip`.

## Source structure

| Directory | Purpose |
| --- | --- |
| `src/app` | App Router routes, root layout, and global design tokens |
| `src/components/ui` | Shared UI components |
| `src/components/layout` | Shared page layout components |
| `src/components/home` | Homepage sections |
| `src/data` | Local content and access functions |
| `src/types` | Content types shared by the data and presentation layers |
| `src/config` | Image delivery configuration |
| `src/utils` | Shared utilities, including the Cloudinary image loader |

The root layout includes the global header and footer. The global footer and `/contact` share the official email and social URLs configured in `src/data/site.ts`.

The root route has the global header, homepage hero, association introduction, core pillars, Our Work in Action, SDG commitment, leadership preview, News & Events preview, and donation section. The `/about` page introduces the association, presents its history and governance documents, and keeps its history separate from Nnokwa’s history. The `/leadership` page shares its executive data with the homepage preview. The `/our-work` and `/partnerships` pages share focus, activity, and SDG data. The `/news` listing displays published entries and shows an empty state when none are available. The `/donate` page displays the confirmed bank account and transfer instructions.

`getSiteInfo()` is the current content entry point. When Sanity is integrated, map its response to `SiteInfo` at this boundary so the layout can keep the same interface. Add other content types and access functions as verified content becomes available.

## Images

When Cloudinary images are ready, copy `.env.example` to `.env.local`, fill in `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` with the public cloud name, and restart the development server. Set the variable before building for production.

The homepage hero uses the ordered Cloudinary assets in `src/data/home.ts`. The optional `NEXT_PUBLIC_CLOUDINARY_HERO_PUBLIC_ID` and `NEXT_PUBLIC_CLOUDINARY_HERO_ALT` settings remain available as the About page's photo fallback when it has no introduction photo.

For the association introduction, set `NEXT_PUBLIC_CLOUDINARY_INTRO_PUBLIC_ID` and `NEXT_PUBLIC_CLOUDINARY_INTRO_ALT` for its photograph. The introduction also shows a placeholder until a cloud name and public ID are set.

For each approved Our Work photograph, add an `image` object with its `publicId` and descriptive `alt` text to the corresponding activity in `src/data/work-activities.ts`. Each card shows a placeholder until its public ID and the Cloudinary cloud name are set.

Update approved executive portraits and alt text in `src/data/leadership.ts`. The portrait cloud name in that file is shared by the homepage preview and Leadership page.

Replace sample news entries in `src/data/news-events.ts` with approved content using `status: "published"` and the detail page `href` once that page is available. Add an optional `image` with its `publicId` and descriptive `alt` text, and an optional `date` with its `kind` and ISO date (`YYYY-MM-DD`). A future Sanity query can map approved documents to the same `NewsEntry` type.

## Governance documents

Registration details and the public constitution link live in `src/data/governance.ts`. The certificate preview and full-size link both use the redacted public image in `public/documents`. Keep the original certificate outside the public assets when updating that image.

## Donations

The association's confirmed bank transfer details live in `src/data/donations.ts` and are shown on `/donate`.

Use `CloudinaryImage` from `src/components/ui/cloudinary-image.tsx` for other Cloudinary assets. Pass the public ID as `src`, descriptive `alt` text, intrinsic dimensions or `fill`, and `sizes` for responsive images.

## Scroll reveals

Use `Reveal` from `src/components/motion/reveal.tsx` around a block or set `as="li"` to keep a card as a direct child of a list. Choose `variant="fade-up"` (the default), `variant="fade-in"`, or `variant="scale"`. For staggered groups, pass the item's zero-based index as `staggerIndex`. Add `reveal-stagger-group` to the list for a short delay after the heading. Delays are capped at 220 ms, or 88 ms below 640 px.

Use `variant="fade-in" keepVisible` for essential controls and details that should stay readable before and during the reveal.
