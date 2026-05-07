/* ============================================================
   PAGE TRANSITION — clean opacity + 6-8px lift cross-fade between
   every internal page on the site. Self-contained (CSS injected at
   runtime), no external stylesheet.
   Loaded via <script src="assets/page-transition.js" defer> in the
   <head> of every page EXCEPT index.html (the welcome page owns its
   own watercolor wash transition).
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ARRIVING_FLAG = 'page_arriving';
  /* Outgoing: 320ms fade (200ms reduced). NAV fires at 340ms (220ms reduced)
     so the body is ~95% transparent before the location changes. */
  var NAV_DELAY = REDUCED ? 220 : 340;
  /* Incoming fade-up duration (clear class after a small grace period). */
  var IN_DURATION = REDUCED ? 200 : 380;

  /* Inject the transition styles. We do this in JS (rather than a separate
     stylesheet) so a single <script> tag covers everything. */
  var styleTag = document.createElement('style');
  styleTag.id = 'page-transition-styles';
  if (REDUCED) {
    styleTag.textContent =
      'body { transition: opacity 200ms ease; }' +
      'body.is-leaving { opacity: 0; pointer-events: none; }' +
      'body.is-arriving { opacity: 0; }' +
      'body.is-arriving.is-ready { opacity: 1; transition: opacity 200ms ease; }';
  } else {
    styleTag.textContent =
      'body { transition: opacity 320ms cubic-bezier(0.4,0,0.2,1), transform 320ms cubic-bezier(0.4,0,0.2,1); }' +
      'body.is-leaving { opacity: 0; transform: translateY(-6px); pointer-events: none; }' +
      'body.is-arriving { opacity: 0; transform: translateY(8px); }' +
      'body.is-arriving.is-ready { opacity: 1; transform: translateY(0); transition: opacity 380ms cubic-bezier(0.22,0.61,0.36,1), transform 380ms cubic-bezier(0.22,0.61,0.36,1); }';
  }
  if (document.head) {
    document.head.appendChild(styleTag);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.head.appendChild(styleTag);
    });
  }

  var isLeaving = false;

  /* OUTGOING — fade body, then navigate */
  function leave(href) {
    if (isLeaving) return;
    isLeaving = true;
    try { sessionStorage.setItem(ARRIVING_FLAG, '1'); } catch (e) {}
    document.body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = href; }, NAV_DELAY);
  }

  /* INCOMING — invisible, lifted-down by 8px, then transition up to 1/0 */
  function arrive() {
    var arriving = false;
    try { arriving = sessionStorage.getItem(ARRIVING_FLAG) === '1'; } catch (e) {}
    if (!arriving) return;
    try { sessionStorage.removeItem(ARRIVING_FLAG); } catch (e) {}

    document.body.classList.add('is-arriving');
    /* Two rAFs: first sets the start state (opacity 0 + translateY 8px),
       second flips the end state class so the transition runs. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-ready');
      });
    });
    setTimeout(function () {
      document.body.classList.remove('is-arriving');
      document.body.classList.remove('is-ready');
    }, IN_DURATION + 120);
  }

  /* Decide whether a click should trigger the transition */
  function isInternalLink(a, e) {
    if (!a || a.tagName !== 'A') return false;
    if (a.hasAttribute('data-no-transition')) return false;
    if (a.target === '_blank') return false;
    if (a.hasAttribute('download')) return false;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (e.button !== 0) return false;
    var href = a.getAttribute('href');
    if (!href) return false;
    if (href.charAt(0) === '#') return false;
    if (/^(mailto:|tel:|sms:|javascript:)/i.test(href)) return false;
    var url;
    try { url = new URL(a.href, window.location.href); }
    catch (e2) { return false; }
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!isInternalLink(a, e)) return;
    e.preventDefault();
    leave(a.href);
  }, false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrive);
  } else {
    arrive();
  }
})();
