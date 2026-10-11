# 99.99% — Landing Page

A responsive marketing page for **99.99%**, the CS3216 Group 5 system-design tycoon. Positioning and the interactive example follow the 99.99% proposal, especially sections 3.2, 6, and 7.4.

The page addresses NUS Computing undergraduates directly, with a side-project hook, real gameplay screenshots, the two game modes, the five Campaign chapters, accounts and cloud saves, and an approachable bottleneck example. Body copy is 18–20px; every visible text label is at least 16px at desktop and phone sizes. Secondary dashboard metrics, decorative labels, repeated copy, and nonessential FAQ entries have been removed.

The page uses the game's visual language from `frontend/src/index.css` and `docs/UI_DESIGN.md` in [the game repository](https://github.com/CS3216-Final-Project/99.9-Percent): the indigo night background, cream paper cards with ink outlines, yellow buttons that press down, coloured icon tiles, Pixelify Sans for headings and Rubik for reading. Digits in headings fall back to Rubik, as in the game. Type sizes stay larger than the game's so the page reads comfortably.

Every game link opens [the game](https://99-99-percent-web.vercel.app/). Sign-up happens in the game: players create an account with Google from **Account and cloud saves** on the title screen. The page links to the game root rather than the sign-in endpoint, so an account-service outage leaves visitors on the game's own guest fallback. The landing page itself collects no personal information.

## Run locally

Requires Node.js 22 or newer. There are no third-party packages to install.

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. Without npm, `node server.mjs` works too.

## Build and preview

```sh
npm run build
npm run preview
```

Or use `node build.mjs` followed by `node server.mjs --dir dist`. Publish the contents of `dist/` to any static host.

## Deploy on Vercel

Import this repository into Vercel and choose the branch you want to publish. `vercel.json` configures the build command (`node build.mjs`) and output directory (`dist`). No environment variables, database, external assets, or API keys are needed. Publishing the repository alone does not create a Vercel deployment.

## Page content

- Hero with positioning, play and account CTAs, and a real Campaign incident screenshot.
- Campaign and Classic modes, each with an in-game screenshot.
- The five Campaign chapters: Opening, Scaling & Routing, Data Strategy, Traffic Spikes & Autoscaling, and Stay Online.
- Accounts: Google sign-in, cloud saves, and guest play with save-file export.
- Interactive database-overload example with three alternative investments and reset.
- FAQ and a closing play CTA.
- Responsive navigation, keyboard focus states, live scenario announcements, reduced-motion support, and usable content without JavaScript.

Screenshots were captured from the production game at 1600×1000 and saved as WebP. Retake them when the game's interface changes noticeably. The interactive scenario is labelled illustrative: it is a small marketing demonstration, not the game simulation, and its cache numbers differ from the game's Read Cache.

The example starts at 900 requests/s, 1,000 requests/s of application capacity, and 600 database operations/s of capacity. All requests hit the database initially; 80% are cacheable reads. A warm cache with a 60% read-hit rate reduces database demand to `900 × (1 − 0.8 × 0.6) = 468` operations/s. A database upgrade raises capacity to 1,000 operations/s. Extra application servers leave database demand unchanged. Each choice resets to this common starting point; purchases are not cumulative.

## Editing

- `index.html`: positioning, FAQ, CTA destination, and page structure. Every link to the game uses `data-game-link` for easy discovery.
- `styles.css`: the game's colour tokens and components, self-hosted fonts, responsive layout, and reduced-motion styles.
- `script.js`: navigation and the illustrative scenario.
- `assets/gameplay-*.webp`: production screenshots; `assets/social-preview.jpg`: 1200×630 link preview; `assets/favicon.svg`: the game's own favicon.
- `assets/fonts/`: Pixelify Sans and Rubik from Fontsource, self-hosted because the Content Security Policy allows only same-origin fonts. Both are under the SIL Open Font License; see the licence files beside them.
- Icons are inline SVG paths from [pixelarticons](https://github.com/halfmage/pixelarticons), the game's icon set (MIT; `assets/LICENSE-pixelarticons.txt`).

The landing page has no form, signup backend or marketing analytics, and sends no automatic tracking requests. Count sign-ups from accounts created in the game. Add analytics only after deciding what events are required.

## Verification

Build with `node build.mjs`. Check desktop and mobile widths, all three scenario outcomes and reset, navigation and Escape handling, FAQ expansion, game link destinations, keyboard access, and the no-JavaScript fallback before publishing.
