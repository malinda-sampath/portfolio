# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page personal portfolio site (React 19 + TypeScript + Vite + Tailwind CSS 4). No router — the whole site is one page (`src/App.tsx`) composed of stacked sections that are navigated via in-page anchor scrolling (see `NAV_LINKS` in `src/utills/constants.ts` and `useScrollSpy`).

## Commands

```
npm run dev       # start Vite dev server
npm run build      # tsc -b (project references) then vite build -> dist/
npm run lint       # eslint .
npm run preview    # preview the production build locally
```

There is no test suite/runner configured in this repo.

## Architecture

- **Composition root**: `src/App.tsx` renders the page as a fixed sequence of sections: `Hero → About → Skills → Projects → Certificate`, wrapped by `WhatsAppChatProvider`, with a persistent `NavBar`, `Footer`, `RadialGradientBackground`, and `WhatsAppButton`. To add/reorder a section, edit this file.
- **Content vs. presentation split**: page content (projects, skills, certifications, testimonials, personal info/stats/nav links) lives in `src/data/*.ts` and `src/utills/constants.ts` as typed data arrays/objects, imported by the section components in `src/components/sections/`. Update content there rather than hardcoding it in components. Note the directory is spelled `utills` (not `utils`) — match existing imports.
- **Component layout**:
  - `components/sections/` — top-level page sections (one per `App.tsx` entry).
  - `components/layout/` — `NavBar`, `Footer`.
  - `components/ui/` — reusable pieces (cards, tilt/magnetic effects, project modal, WhatsApp button/chat panel).
  - `components/animations/` / `components/backgrounds/` — scroll-reveal/fade-in wrappers and the radial gradient background.
  - `hooks/` — `useScrollReveal`, `useScrollSpy` (drives active nav link), `userMagnetic` (magnetic button effect; note the typo'd filename).
  - `context/WhatsAppChatContext.tsx` — global state for whether the WhatsApp chat panel is open and whether the footer is in view (used to decide when to show the floating WhatsApp button).
- **Static assets** (project images, resume PDF) live under `public/assets/...` and `public/cv/...` and are imported directly into `src/data/*.ts` by relative path (e.g. `../../public/assets/projects/...`).
- **Path aliasing**: none configured — use relative imports.

## Deployment

This app is built once (`npm run build` → `dist/`) and shipped to multiple targets in parallel via separate pipelines — be aware of all of them when changing build output, base path, or routing:

- **GitHub Pages**: `.github/workflows/deploy.yml` builds and deploys `dist/` on push to `main`.
- **Firebase Hosting**: `firebase.json` serves `dist/` with an SPA rewrite (`**` → `/index.html`); `.github/workflows/firebase-hosting-merge.yml` and `firebase-hosting-pull-request.yml` handle deploy/preview.
- **Azure Kubernetes Service**: `Dockerfile` builds the app then serves `dist/` via nginx on port 8080 (Cloud Run/K8s convention); `.azure-pipelines/azure-pipelines.yml` builds the image, pushes to ACR, and applies `k8s/deployment.yaml` + `k8s/service.yaml` to AKS.
- **Azure repo mirror**: `.github/workflows/mirror-to-azure.yaml` mirrors this GitHub repo to an Azure DevOps repo on every push to `main` (feeds the Azure Pipelines build above).
- `vite.config.ts` sets `base: "/"`, which all of the above assume.
