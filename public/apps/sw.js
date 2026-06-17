/*
 * Mini Apps Hub - Service Worker
 * -------------------------------
 * Precaches the launcher and every app so the whole collection works offline
 * once it has been opened on the published site.
 *
 * NOTE: Registration is guarded (see /apps/_register-sw.js) so this worker is
 * ONLY installed on the real published domain - never inside the Lovable editor
 * preview/dev iframe. That avoids serving stale HTML while you build.
 */

// Bump this version string whenever you change cached files to force an update.
const CACHE = "mini-apps-v2";

// Everything that should be available offline.
const ASSETS = [
  "/apps/index.html",
  "/apps/paint.html",
  "/apps/editor.html",
  "/apps/todo.html",
  "/apps/shopping.html",
  "/apps/journal.html",
  "/apps/drums.html",
  "/apps/metronome.html",
  "/apps/calc-simple.html",
  "/apps/calc-scientific.html",
  "/apps/calc-financial.html",
  "/apps/calc-graphing.html",
  "/apps/calc-units.html",
  "/apps/calc-construction.html",
  "/apps/pomodoro.html",
  "/apps/countdown.html",
  "/apps/stopwatch.html",
  "/apps/period.html",
  "/apps/water.html",
  "/apps/bmi.html",
  "/apps/dialer.html",
  "/apps/browser.html",
  "/apps/snake.html",
  "/apps/tally.html",
  "/apps/dice.html",
  "/apps/rpg-dice.html",
  "/manifest.webmanifest",
  "/icons/app-icon.png",
];

// Install: precache everything (ignore individual failures so one bad URL
// doesn't break the whole install).
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    )
  );
});

// Activate: drop old caches from previous versions.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
//  - HTML navigations: network-first (fresh when online, cached when offline).
//  - Other same-origin GETs: cache-first (fast, falls back to network).
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("/apps/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
