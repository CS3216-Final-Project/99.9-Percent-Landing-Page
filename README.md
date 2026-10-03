# 99.99% — Landing Page

A responsive marketing page for **99.99%**, the CS3216 Group 5 system-design tycoon. Positioning and the interactive example follow the 99.99% proposal, especially sections 3.2, 6, and 7.4.

The page addresses NUS Computing undergraduates directly, with a side-project hook, three short gameplay benefits, and an approachable bottleneck example. Body copy is 18–20px; every visible text label is at least 16px at desktop and phone sizes. Secondary dashboard metrics, decorative labels, repeated copy, and nonessential FAQ entries have been removed.

The primary CTA opens the [playable prototype](https://99-99-percent-web.vercel.app/). The page invites early players without collecting personal information or claiming that a signup was recorded.

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

- Hero with positioning, browser-play CTA, and an original SVG server-room concept mockup.
- Three gameplay pillars: build, adapt, and evolve.
- Interactive database-overload example with three alternative investments and reset.
- FAQ, early-playtest invitation, and repeated prototype CTA.
- Responsive navigation, keyboard focus states, live scenario announcements, reduced-motion support, and usable content without JavaScript.

All preview visuals and numbers are labelled illustrative. They are not screenshots or recorded player results. The interactive scenario is a small marketing demonstration, not the game simulation.

The example starts at 900 requests/s, 1,000 requests/s of application capacity, and 600 database operations/s of capacity. All requests hit the database initially; 80% are cacheable reads. A warm cache with a 60% read-hit rate reduces database demand to `900 × (1 − 0.8 × 0.6) = 468` operations/s. A database upgrade raises capacity to 1,000 operations/s. Extra application servers leave database demand unchanged. Each choice resets to this common starting point; purchases are not cumulative.

## Editing

- `index.html`: positioning, FAQ, CTA destination, and page structure. All three prototype links use `data-prototype-link` for easy discovery.
- `styles.css`: responsive layout, colours, illustrations, and reduced-motion styles.
- `script.js`: navigation and the illustrative scenario.
- `assets/server-room.svg`: original vector mockup; `assets/favicon.svg`: brand mark.

The landing page currently has no signup backend, marketing analytics, or contact form. Add a real recruitment form if collecting unique signups is needed for the proposal's PR1 target; prototype clicks do not count as signups. Add analytics only after deciding what events are required. The page sends no automatic tracking requests.

## Verification

Build with `node build.mjs`. Check desktop and mobile widths, all three scenario outcomes and reset, navigation and Escape handling, FAQ expansion, prototype destinations, keyboard access, and the no-JavaScript fallback before publishing.
