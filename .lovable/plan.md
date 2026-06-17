# Mini Apps Hub — a collection of installable, offline mobile web apps

A static collection of self-contained HTML apps, each its own single `.html` file (HTML + CSS + JS inline, heavily commented) under `public/apps/`, tied together by one launcher page. Installable to the home screen and usable offline via a manifest + service worker.

## How it's served

- All apps live in `public/apps/` as standalone files. The launcher is `public/apps/index.html`.
- Because TanStack owns the site root `/`, `src/routes/index.tsx` will redirect to `/apps/` so the launcher is the landing page. Everything else stays pure static HTML, exactly as requested (portable, copy-anywhere files).
- Each app persists its data with `localStorage`.

## App lineup (consolidated)

Notes & lists
- Paint — finger/mouse canvas, color + brush size, eraser, clear, save PNG
- Text Editor — autosave, word count, export .txt
- To-Do List — add/check/delete/reorder, clear completed
- Shopping List — items + quantities, check off, categories
- Journal — dated entries, list + edit

Audio
- Drum Machine + Tracker — step sequencer (kick/snare/hat/clap), tempo, pattern save (Web Audio API)
- Metronome — BPM, time signature, accent, tap-tempo

Calculators (consolidated to avoid near-duplicates)
- Simple Calculator
- Scientific Calculator — trig, logs, powers, memory
- Financial Calculator — TVM (N, I/Y, PV, PMT, FV), interest, plus an RPN mode toggle for HP‑12C fans (covers BA‑II Plus + HP‑12C use cases)
- Graphing Calculator — plot y=f(x), zoom/pan, trace (covers fx‑CG50 / Nspire-style needs, function plotting only)
- Units Calculator — metric/imperial + time/date math and conversions
- Construction Calculator — feet‑inches‑fractions arithmetic, area/volume, board/material helpers

Timers
- Pomodoro Timer — work/break cycles, session count, sound
- Countdown Timer — set duration, alarm
- Stopwatch — start/stop/lap

Health
- Period Tracker — log periods, predict next cycle
- Water Intake Tracker — daily goal, quick-add, progress ring
- BMI / BMR Calculator — metric/imperial, activity multiplier

Tools
- Dialer — keypad that fires a `tel:` link
- Mini Browser — URL bar that opens links and attempts an in-page iframe preview (see caveats)

Game
- Snake — Nokia-style, swipe + buttons, high score

Extras I'll add (useful, cheap to build)
- Tally Counter — multiple counters, increment/decrement
- Dice & Coin — roller for dice + coin flip
- Notes scratchpad is covered by Text Editor, so skipped

## PWA / offline

- One `public/manifest.webmanifest` (name, icons, `display: standalone`, `start_url: /apps/`, `scope: /apps/`) plus generated app icons.
- One service worker `public/apps/sw.js` that precaches the launcher + all app files for offline use.
- Registration is guarded so the service worker only registers on the published domain — never in the Lovable preview/dev/iframe context (prevents stale-cache issues). Offline therefore works on the published app, not inside the editor preview.

## Design

- Clean, friendly mobile launcher: responsive icon grid, large tap targets, light/dark via `prefers-color-scheme`, simple flat icons (inline SVG/emoji), subtle category grouping and search/filter on the launcher.
- Each app: minimal chrome, a top bar with title + back-to-hub link, big touch controls.

## Documentation

- Root `README.md` describing the collection: app list, how to run/serve, install-to-home-screen steps, offline behavior, file structure, and per-app notes/limitations.

## Things that can't be done faithfully (will note in README)

- True calculator emulators (TI‑Nspire CX II CAS, HP Prime, Casio fx‑CG50, TI/HP‑83/84/89) cannot be replicated in simple HTML — delivered as the consolidated functional calculators above instead of bit-accurate skins.
- Mini Browser: most websites block embedding (X‑Frame‑Options/CSP), and a real browser engine can't be built in static HTML. It will open URLs in a new tab and attempt an iframe preview with a graceful "can't embed this site" fallback.
- Offline caching only activates on the published site, not the in-editor preview.

## Technical notes

- ~25 files in `public/apps/`, one manifest, one service worker, an icon set, an edit to `src/routes/index.tsx` (redirect to `/apps/`), and the root `README.md`.
- No new npm dependencies; everything uses native browser APIs (Canvas, Web Audio, localStorage).
