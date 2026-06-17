/*
 * Shared PWA bootstrap for every Mini App.
 * ----------------------------------------
 * - Registers the offline service worker, but ONLY on the real published
 *   domain. It refuses to register inside the Lovable editor preview/dev
 *   iframe, where a cached service worker could keep serving stale pages.
 * - Each app links to this file plus the manifest in its <head>.
 */
(function () {
  function inPreviewOrDev() {
    var h = location.hostname;
    return (
      location.protocol === "file:" ||
      window.top !== window.self || // running inside an iframe (editor preview)
      h === "localhost" ||
      h === "127.0.0.1" ||
      h.startsWith("id-preview--") ||
      h.startsWith("preview--") ||
      h.endsWith(".lovableproject.com") ||
      h.endsWith(".lovableproject-dev.com") ||
      h.endsWith(".beta.lovable.dev")
    );
  }

  if (!("serviceWorker" in navigator)) return;

  if (inPreviewOrDev()) {
    // Make sure no stale worker lingers in dev/preview.
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) {
        r.unregister();
      });
    });
    return;
  }

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/apps/sw.js", { scope: "/apps/" })
      .catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
  });
})();
