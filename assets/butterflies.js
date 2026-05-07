/* ============================================================
   BUTTERFLY TRANSITION — shared link interceptor + animator.
   Loaded as <script src="assets/butterflies.js" defer> in every
   page's <head> EXCEPT index.html (welcome has its own transition).
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ARRIVING_FLAG = 'butterfly_arriving';
  var OUT_DURATION = REDUCED ? 200 : 1100;
  var IN_DURATION  = REDUCED ? 200 : 600;
  var MAX_INFLIGHT = 10;

  var isLeaving = false;

  /* ----- Three SVG variants in the site palette: coral, purple, yellow ----- */
  var SVGS = {
    coral: '<svg viewBox="0 0 46 36" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="14" cy="14" rx="10" ry="9" fill="#f4a8b6" opacity=".95"/>' +
      '<ellipse cx="32" cy="14" rx="10" ry="9" fill="#f4a8b6" opacity=".95"/>' +
      '<ellipse cx="15" cy="24" rx="6" ry="5" fill="#ec6478" opacity=".9"/>' +
      '<ellipse cx="31" cy="24" rx="6" ry="5" fill="#ec6478" opacity=".9"/>' +
      '<ellipse cx="23" cy="18" rx="1.5" ry="9" fill="#5a3424"/>' +
      '<circle cx="23" cy="9" r="1.5" fill="#5a3424"/></svg>',
    purple: '<svg viewBox="0 0 38 30" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="11" cy="11" rx="8" ry="7" fill="#cfb0e0" opacity=".95"/>' +
      '<ellipse cx="27" cy="11" rx="8" ry="7" fill="#cfb0e0" opacity=".95"/>' +
      '<ellipse cx="12" cy="20" rx="5" ry="4" fill="#a878c6" opacity=".9"/>' +
      '<ellipse cx="26" cy="20" rx="5" ry="4" fill="#a878c6" opacity=".9"/>' +
      '<ellipse cx="19" cy="15" rx="1.2" ry="7" fill="#3a2818"/>' +
      '<circle cx="19" cy="8" r="1.2" fill="#3a2818"/></svg>',
    yellow: '<svg viewBox="0 0 44 34" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="13" cy="13" rx="10" ry="8" fill="#f6c97a" opacity=".95"/>' +
      '<ellipse cx="31" cy="13" rx="10" ry="8" fill="#f6c97a" opacity=".95"/>' +
      '<ellipse cx="14" cy="22" rx="6" ry="5" fill="#d99c3e" opacity=".9"/>' +
      '<ellipse cx="30" cy="22" rx="6" ry="5" fill="#d99c3e" opacity=".9"/>' +
      '<ellipse cx="22" cy="17" rx="1.4" ry="8" fill="#5a3424"/>' +
      '<circle cx="22" cy="9" r="1.4" fill="#5a3424"/></svg>'
  };
  var VARIANT_KEYS = Object.keys(SVGS);

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function range(min, max) { return min + Math.random() * (max - min); }

  function ensureOverlay() {
    var o = document.querySelector('.butterfly-overlay');
    if (o) return o;
    o = document.createElement('div');
    o.className = 'butterfly-overlay';
    o.setAttribute('aria-hidden', 'true');
    document.body.appendChild(o);
    return o;
  }

  /* Spawn one butterfly with random variant, size, path, flap rate */
  function spawn(opts) {
    if (REDUCED) return;
    var overlay = ensureOverlay();
    if (overlay.children.length >= MAX_INFLIGHT) return;

    opts = opts || {};
    var variant = opts.variant || pick(VARIANT_KEYS);
    var size = Math.round(range(40, 62));
    var duration = Math.round(range(1100, 1300));
    var delay = opts.delay || 0;
    var path = String(opts.path || (1 + Math.floor(Math.random() * 4)));
    var flap = Math.round(range(110, 150));

    var wrap = document.createElement('div');
    wrap.className = 'butterfly';
    wrap.dataset.path = path;
    wrap.style.setProperty('--bsize', size + 'px');
    wrap.style.setProperty('--bdur', duration + 'ms');
    wrap.style.setProperty('--bdelay', delay + 'ms');
    wrap.style.setProperty('--bflap', flap + 'ms');
    wrap.innerHTML = '<div class="butterfly-flap">' + SVGS[variant] + '</div>';
    overlay.appendChild(wrap);

    setTimeout(function () {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }, duration + delay + 80);
  }

  function flock(count) {
    for (var i = 0; i < count; i++) {
      spawn({ delay: Math.round(i * range(70, 130)) });
    }
  }

  /* OUTGOING — fade content, spawn a flock, navigate after ~1.1s */
  function leave(href) {
    if (isLeaving) return;
    isLeaving = true;
    try { sessionStorage.setItem(ARRIVING_FLAG, '1'); } catch (e) {}

    document.body.classList.add('butterfly-leaving');
    if (!REDUCED) flock(5 + Math.floor(Math.random() * 3));
    setTimeout(function () { window.location.href = href; }, OUT_DURATION);
  }

  /* INCOMING — page just loaded after a butterfly nav */
  function arrive() {
    var arriving = false;
    try { arriving = sessionStorage.getItem(ARRIVING_FLAG) === '1'; } catch (e) {}
    if (!arriving) return;
    try { sessionStorage.removeItem(ARRIVING_FLAG); } catch (e) {}

    document.documentElement.classList.add('butterfly-arriving');

    if (!REDUCED) {
      var trailing = 2 + Math.floor(Math.random() * 2);
      for (var i = 0; i < trailing; i++) {
        spawn({ delay: Math.round(i * range(120, 180)) });
      }
    }

    setTimeout(function () {
      document.documentElement.classList.remove('butterfly-arriving');
    }, IN_DURATION + 200);
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
    /* same path + only hash change: let the browser handle it */
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!isInternalLink(a, e)) return;
    e.preventDefault();
    leave(a.href);
  }, false);

  function boot() { arrive(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
