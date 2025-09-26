# Repository Guidelines

## Project Structure & Module Organization
Root Vite SPA drives the public marketing experience. Entry points are `src/main.tsx` and `src/App.tsx`; route modules live in `src/app/booking`, `src/app/menu`, etc. Shared views stay in `src/components/` (Radix wrappers in `src/components/ui/`), while copy and constants go to `src/lib/constants.ts`. Styles reside in `src/styles/globals.css` and assets in `src/public/`. The Next.js portal sits in `piazasaruuto-web/` with routes in `app/` and shared helpers in `lib/`, configured via `env.mjs` and `.env.local`.

## Build, Test, and Development Commands
Install dependencies per workspace: `npm install` at the root Vite app and `cd piazasaruuto-web && npm install` for the portal. Use `npm run dev` (root) to serve the marketing site via Vite, or the same command inside `piazasaruuto-web` for the TurboPack dev server. Build with `npm run build` in each workspace; run `npm run start` within `piazasaruuto-web` to smoke-test the production bundle.

## Coding Style & Naming Conventions
Write TypeScript functional components with PascalCase filenames (`Header.tsx`) and camelCase helpers. Colocate feature code near its route and rely on Tailwind utilities plus helpers from `src/components/ui/` instead of ad-hoc CSS. Keep JSX indented two spaces and promote shared literals to `constants.ts` to ease localization.

## Testing Guidelines
No automated suite exists yet. Before opening a PR, smoke-test booking, menu, and navigation flows in both the Vite site and the Next portal, watching the console for API or structured-data warnings. Document manual steps in the PR, and when you add automated coverage prefer colocated `__tests__` folders using Vitest or the Next.js testing stack.

## Commit & Pull Request Guidelines
Commits typically follow `<scope>: summary`, mixing English and Japanese (see `marketing: SimpleWorries mobile order fix`). Keep subjects present-tense and under 72 characters. PRs should link issues, describe user-visible changes, list verification steps, and attach screenshots or recordings for UI work. Flag environment or data migrations early so reviewers can reproduce builds.

## Configuration & Secrets
Keep secrets in `.env.local` (root) or `piazasaruuto-web/.env.local`. When adding variables, provide defaults in `env.mjs`, note required values in the PR, and reuse existing time-zone/API helpers to avoid drift in booking integrations.
