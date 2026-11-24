# Portfolio module and standalone export

The portfolio UI, routes, content, and media are isolated from the Zento dashboard. To make a complete project you can move elsewhere, run this once from the Zento repository root:

```bash
npm run portfolio:export
```

This creates `portfolio-standalone/` with its own Next.js setup, all portfolio pages, and the photos and project videos. It is ignored by the Zento git repository so the copied media does not bloat the dashboard's commit history. The generated folder is still available locally to copy, zip, or move to another location.

Then run the standalone copy:

```bash
cd portfolio-standalone
npm install
npm run dev
```

Open `http://localhost:3000`; the root redirects to `/portfolio`. Build it independently with `npm run build`.

## What the export includes

- `src/modules/portfolio/` — portfolio screens, content, styles, and contact settings.
- `src/app/portfolio/` — portfolio routes for home, work, project details, about, contact, and component demos.
- `public/portfolio/` — all images and videos used by those routes.
- A small standalone Next.js app shell and its own `package.json`.

The portfolio depends only on Next.js, React, and `lucide-react`; it does not import the dashboard sidebar, navbar, providers, or shared dashboard components. In Zento, the dashboard shell is hidden for `/portfolio` by `src/components/application-shell.tsx`; that adjustment is not needed in the exported app.

## Customize the exported copy

- Change WhatsApp and email details in `src/modules/portfolio/contact.ts`.
- Edit project descriptions and media paths in `src/modules/portfolio/projects.ts`.
- Replace media in `public/portfolio/` and update the matching paths.
- Keep the standalone copy independent after exporting. To create a fresh copy later, move or rename the existing `portfolio-standalone/` folder, then run the export command again. The exporter will not overwrite an existing folder.
