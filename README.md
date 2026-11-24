# Asrar Kamal Portfolio

This is a standalone Next.js project beside the Zento dashboard. It includes the portfolio pages, styles, photos, project videos, and component walkthroughs.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root redirects to /portfolio.

## Customize it

- Update your phone, WhatsApp, and email in `src/modules/portfolio/contact.ts`.
- Update project titles, descriptions, tags, and media in `src/modules/portfolio/projects.ts`.
- Put replacement photos or videos in `public/portfolio/` and keep the asset paths in sync with `projects.ts`.
- Edit the pages and visual design in `src/modules/portfolio/`.

To create a fresh copy from Zento, run `npm run portfolio:export` from the Zento repository root. The exporter creates `../my-portfolio` and stops if that folder already exists, so it will not overwrite your edits.
