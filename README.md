# Rishi Web Studios — Marketing Site

A single-page React (Vite) site for Rishi Web Studios, with a light/dark
theme toggle. Built to be deployed as its own independent project on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```
Outputs to `dist/`.

## Deploying to Vercel

1. Push this folder to its own GitHub repo.
2. In Vercel, import the repo as a new project. Framework preset: **Vite**.
   Build command: `npm run build` · Output directory: `dist` (Vercel
   usually auto-detects this).
3. Point your domain at it in Vercel → Settings → Domains, and update the
   DNS records your registrar gives you.

## Theme system

The site defaults to your visitor's OS preference (light/dark), then
remembers whichever theme they pick via the toggle (stored in
`localStorage`). All colors are defined as CSS variables in
`src/index.css` under `[data-theme="dark"]` and `[data-theme="light"]` —
edit those two blocks to adjust the palette globally.

## Editing content

All page copy (headline, pricing, FAQ, portfolio entries) lives in plain
JS arrays/JSX near the top of `src/App.jsx`. Images are in
`public/assets/` — replace files directly (same filenames) to swap them
without touching code.

## Logo assets

Your uploaded logo (the network/plexus wordmark) is included in
`public/assets/` in all four variants (light/dark × with/without tagline)
for use elsewhere — Instagram profile photo, business cards, email
signature, etc. It's intricate at full size but doesn't read clearly
below ~150px wide, so the live site itself uses a clean text wordmark in
the nav and footer instead, and a simple generated "R" mark as the
favicon. If you'd like a simplified icon-style version of the real logo
for small UI use, that's worth commissioning separately from whoever
designed the original.

## Contact details used on this site

- WhatsApp: +91 89201 01994
- Email: contact@rishiwebstudios.com
- Instagram: @rishi_webstudios
