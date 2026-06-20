# Mini Apps Hub

A collection of **simple, self-contained, mobile-first web apps** — each one a single
HTML file you can open on a phone, install to your home screen, and use offline.

No build step, no frameworks, no tracking. Every app stores its data locally in your
browser (`localStorage`).

## Launcher

Open **`/apps/`** (served from `public/apps/index.html`). It shows a searchable,
category-grouped grid linking to every app. The site root (`/`) redirects here.

Alternatively, it's hosted here: https://pocket-apps.lovable.app

## Apps included

### Notes & Lists
| App | File | What it does |
| --- | --- | --- |
| 🎨 Paint | `paint.html` | Finger/mouse drawing canvas: color, brush size, eraser, clear, save PNG |
| 📝 Text Editor | `editor.html` | Autosaving notepad with word/char count and `.txt` export |
| ✅ To-Do | `todo.html` | Add / check / delete tasks, clear completed |
| 🛒 Shopping | `shopping.html` | Items with quantities, check off, clear bought |
| 📓 Journal | `journal.html` | Dated entries you can add and delete |

### Audio
| App | File | What it does |
| --- | --- | --- |
| 🥁 Drum Machine | `drums.html` | 16-step sequencer (kick/snare/hat/clap) with tempo; patterns saved |
| 🎵 Metronome | `metronome.html` | BPM slider, time signatures, accent, tap-tempo |

### Calculators
| App | File | What it does |
| --- | --- | --- |
| ➗ Simple | `calc-simple.html` | Everyday four-function calculator with keyboard support |
| 🔬 Scientific | `calc-scientific.html` | Trig, logs, powers, roots, factorial, DEG/RAD (safe expression parser, no `eval`) |
| 💰 Financial | `calc-financial.html` | TVM solver (N, I/Y, PV, PMT, FV) **plus** an RPN mode (HP-12C style) |
| 📈 Graphing | `calc-graphing.html` | Plot up to 3 functions, pan/zoom |
| 📐 Units | `calc-units.html` | Length/weight/volume/area/speed/temp/time/data conversions + date math |
| 🏗️ Construction | `calc-construction.html` | Feet-inch-fraction arithmetic, area/volume, concrete estimate |

### Timers
| App | File | What it does |
| --- | --- | --- |
| 🍅 Pomodoro | `pomodoro.html` | Focus/break cycles with progress ring and session count |
| ⏲️ Countdown | `countdown.html` | Set hrs/min/sec or presets, alarm + vibrate |
| ⏱️ Stopwatch | `stopwatch.html` | Start/stop, laps with splits |

### Health
| App | File | What it does |
| --- | --- | --- |
| 🌸 Period Tracker | `period.html` | Log periods, predict next cycle (local only) |
| 💧 Water Tracker | `water.html` | Daily goal, quick-add, progress ring (per-day) |
| ⚖️ BMI / BMR | `bmi.html` | BMI, BMR (Mifflin-St Jeor) and TDEE, metric/imperial |

### Tools
| App | File | What it does |
| --- | --- | --- |
| ☎️ Dialer | `dialer.html` | Keypad that triggers a `tel:` link to your phone |
| 🌐 Mini Browser | `browser.html` | URL/search bar with iframe preview + "open in tab" fallback |
| 🔢 Tally | `tally.html` | Multiple named counters |
| 🎲 Dice & Coin | `dice.html` | Roll 1–5 dice, flip a coin |

### Tabletop
| App | File | What it does |
| --- | --- | --- |
| 🐉 RPG Dice | `rpg-dice.html` | Parse expressions like `12d8+4d6+1d4+6`, reroll 1's, explode max rolls, save named combinations |

### Games
| App | File | What it does |
| --- | --- | --- |
| 🐍 Snake | `snake.html` | Nokia-style Snake with swipe + d-pad and high score |

## Install / offline

- A web app manifest (`public/manifest.webmanifest`) makes the collection installable
  ("Add to Home Screen").
- A service worker (`public/apps/sw.js`) precaches the launcher and every app for
  offline use.
- **Offline only activates on the published site** — the service worker deliberately
  refuses to register inside the Lovable editor preview/dev iframe (see
  `public/apps/_register-sw.js`) to avoid serving stale pages while developing.

## File structure

```
public/
  manifest.webmanifest      # PWA manifest
  icons/app-icon.png        # app icon
  apps/
    index.html              # the launcher
    _register-sw.js         # guarded service-worker registration
    sw.js                   # offline precache worker
    <app>.html              # one self-contained file per app
src/routes/index.tsx        # redirects "/" -> "/apps/index.html"
```

## Notes & limitations

- **High-end calculators** (TI-Nspire CX II CAS, HP Prime, Casio fx-CG50, TI/HP-83/84/89,
  HP 12C/BA-II Plus) can't be faithfully emulated in plain HTML. They're delivered as the
  consolidated functional calculators above (Scientific, Financial with RPN, Graphing,
  Units, Construction) rather than bit-accurate device clones.
- **Mini Browser** can't be a real browser engine. Most websites block being embedded in
  an iframe (X-Frame-Options / CSP), so it falls back to opening pages in a new tab.
- **Dialer** opens the device dialer via `tel:` — it doesn't place calls itself and does
  nothing on desktops without a calling app.
- **Health trackers** are for personal logging only and are not medical advice.
- All data is stored on your device with `localStorage`; clearing site data erases it.
