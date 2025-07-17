# BrowserBlackBox

BrowserBlackBox is a privacy auditing playground built with Next.js and Tailwind CSS. It demonstrates how browsers may reveal data such as autofill information, cached URLs or stored form values. The project started as a Firebase Studio starter and now exposes various "scans" to help visualize browser‑side leaks.

## Features
- **Autofill Scanner** – dynamically create forms and display values the browser auto-completes.
- **Hidden Form Scanner** – reveal hidden or off‑screen fields that browsers pre-fill.
- **Canvas Fingerprinter** – inspect canvas fingerprint details.
- **Cache Detective** – infer visited URLs using link styling and timing attacks.
- **Memory Lane** – show input suggestions remembered from old forms.
- **Storage Excavator** – dump `localStorage`, `sessionStorage` and IndexedDB values.
- **Worker Watcher** – list registered service workers and their caches.
- **Prefetch Peek** – expose domains hinted via `<link rel="prefetch">` and `<link rel="preconnect">`.
- **Privacy Remediation Guide** – offer tips on mitigating these exposures.

## Getting Started
1. Install dependencies (Node.js v20 recommended):
   ```bash
   npm install
   ```
2. Launch the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:9002](http://localhost:9002).

To create an optimized production build run `npm run build`.

## Project Layout
- `src/app` – Next.js application entry points.
- `src/components` – React components implementing the individual scans.
- `src/config/features.tsx` – configuration defining available features.
- `docs/blueprint.md` – notes on the original design and UI guidelines.

BrowserBlackBox is written in TypeScript and styled with Tailwind CSS. Feel free to explore and extend the scans to test other browser privacy behaviors.
