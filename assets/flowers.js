/* ============================================================
   FLOWERS — shared library used by plant.html (the planting flow)
   AND lawn.html (the gallery). Single source of truth so the
   flower a visitor picks during planting renders identically on
   the lawn.
   Loaded synchronously in <head> (no defer) so inline scripts
   can use LAWN_LIB.* without ordering issues.
   ============================================================ */
(function () {
  'use strict';

  /* -- Watercolor flowers, layered washes, irregular edges (60x90 viewBox)
        Each includes stem + leaves baked in. -- */
  var FLOWERS = [
    {
      id: 'hibiscus', label: 'hibiscus',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 32 60 30 36" stroke="#5e8a4f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 64 Q 12 60 4 46 Q 6 38 16 42 Q 26 48 30 58 Z" fill="#7eb86b"/>' +
        '<path d="M14 50 Q 22 46 28 54" stroke="#3d6b2c" stroke-width=".8" fill="none" opacity=".5"/>' +
        '<path d="M30 52 Q 50 46 56 30 Q 50 24 44 28 Q 34 34 30 46 Z" fill="#5fa055"/>' +
        '<path d="M12 32 Q 4 22 12 12 Q 22 14 24 26 Q 22 32 12 32 Z" fill="#e85a5a"/>' +
        '<path d="M14 26 Q 8 18 14 12 Q 22 16 22 26 Z" fill="#f4a8a8" opacity=".7"/>' +
        '<path d="M48 32 Q 56 22 48 12 Q 38 14 36 26 Q 38 32 48 32 Z" fill="#e85a5a"/>' +
        '<path d="M46 26 Q 52 18 46 12 Q 38 16 38 26 Z" fill="#f4a8a8" opacity=".7"/>' +
        '<path d="M30 8 Q 22 4 14 10 Q 18 22 30 22 Q 42 22 46 10 Q 38 4 30 8 Z" fill="#e85a5a"/>' +
        '<path d="M30 14 Q 24 10 22 16 Q 30 20 38 16 Q 36 10 30 14 Z" fill="#f4a8a8" opacity=".7"/>' +
        '<path d="M28 32 Q 30 24 32 32 L 30 38 Z" fill="#f6c54a"/>' +
        '<circle cx="30" cy="38" r="2.2" fill="#c87a18"/>' +
        '</svg>'
    },
    {
      id: 'peony', label: 'peony',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 30 60 30 36" stroke="#5e8a4f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 64 Q 12 60 4 46 Q 8 38 18 42 Q 26 48 30 58 Z" fill="#7eb86b"/>' +
        '<path d="M30 52 Q 50 46 54 32 Q 50 26 44 30 Q 34 34 30 46 Z" fill="#5fa055"/>' +
        '<ellipse cx="30" cy="22" rx="18" ry="14" fill="#f4a8b6"/>' +
        '<ellipse cx="30" cy="22" rx="13" ry="11" fill="#ec6478" opacity=".85"/>' +
        '<path d="M16 22 Q 22 8 30 14 Q 28 22 16 22 Z" fill="#f4a8b6" opacity=".7"/>' +
        '<path d="M44 22 Q 38 8 30 14 Q 32 22 44 22 Z" fill="#f4a8b6" opacity=".7"/>' +
        '<path d="M22 18 Q 28 12 36 16 Q 38 22 32 26 Q 24 24 22 18 Z" fill="#ec6478"/>' +
        '<ellipse cx="30" cy="22" rx="5" ry="4" fill="#b13e58" opacity=".9"/>' +
        '<circle cx="29" cy="20" r="1.2" fill="#f6c54a" opacity=".8"/>' +
        '</svg>'
    },
    {
      id: 'lavender', label: 'lavender',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 30 60 30 42" stroke="#5e8a4f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 68 Q 14 64 6 50 Q 10 42 18 46 Q 26 52 30 62 Z" fill="#7eb86b"/>' +
        '<path d="M30 56 Q 46 50 50 36 Q 44 32 38 36 Q 32 42 30 52 Z" fill="#5fa055"/>' +
        '<ellipse cx="30" cy="6" rx="6" ry="7.5" fill="#a878c6" opacity=".55"/>' +
        '<ellipse cx="30" cy="6" rx="4" ry="5.5" fill="#a878c6"/>' +
        '<ellipse cx="24" cy="14" rx="6" ry="7.5" fill="#a878c6" opacity=".55"/>' +
        '<ellipse cx="24" cy="14" rx="4" ry="5.5" fill="#9460b0"/>' +
        '<ellipse cx="36" cy="14" rx="6" ry="7.5" fill="#a878c6" opacity=".55"/>' +
        '<ellipse cx="36" cy="14" rx="4" ry="5.5" fill="#9460b0"/>' +
        '<ellipse cx="20" cy="24" rx="6" ry="7.5" fill="#cfb0e0" opacity=".7"/>' +
        '<ellipse cx="30" cy="22" rx="6" ry="8" fill="#a878c6"/>' +
        '<ellipse cx="40" cy="24" rx="6" ry="7.5" fill="#cfb0e0" opacity=".7"/>' +
        '<ellipse cx="24" cy="32" rx="5" ry="7" fill="#9460b0" opacity=".85"/>' +
        '<ellipse cx="36" cy="32" rx="5" ry="7" fill="#9460b0" opacity=".85"/>' +
        '<ellipse cx="30" cy="40" rx="4" ry="5.5" fill="#7e4ea0"/>' +
        '</svg>'
    },
    {
      id: 'tulip', label: 'tulip',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 30 60 30 32" stroke="#5e8a4f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 68 Q 12 64 4 48 Q 8 40 18 44 Q 26 50 30 60 Z" fill="#7eb86b"/>' +
        '<path d="M30 56 Q 46 50 50 36 Q 44 32 38 36 Q 32 42 30 52 Z" fill="#5fa055"/>' +
        '<path d="M18 38 Q 12 18 22 10 Q 30 14 28 38 Z" fill="#f4a8b6"/>' +
        '<path d="M42 38 Q 48 18 38 10 Q 30 14 32 38 Z" fill="#f4a8b6"/>' +
        '<path d="M22 38 Q 22 14 30 8 Q 38 14 38 38 Z" fill="#ec6478"/>' +
        '<path d="M26 12 Q 30 8 34 14 Q 32 26 30 36" stroke="#b13e58" stroke-width=".8" fill="none" opacity=".5"/>' +
        '<path d="M22 24 Q 30 18 38 24" stroke="#fbcdd8" stroke-width=".6" fill="none" opacity=".7"/>' +
        '</svg>'
    },
    {
      id: 'sunflower', label: 'sunflower',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 30 60 30 38" stroke="#5e8a4f" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 68 Q 12 64 4 48 Q 8 40 18 44 Q 26 50 30 60 Z" fill="#7eb86b"/>' +
        '<path d="M30 56 Q 46 50 50 36 Q 44 32 38 36 Q 32 42 30 52 Z" fill="#5fa055"/>' +
        '<g transform="translate(30 22)">' +
        '<ellipse cx="0" cy="-13" rx="5" ry="10" fill="#f6c54a" opacity=".7"/>' +
        '<ellipse cx="0" cy="-13" rx="3.6" ry="9" fill="#f6c54a"/>' +
        '<ellipse cx="9" cy="-9" rx="5" ry="10" fill="#f6c54a" opacity=".7" transform="rotate(45)"/>' +
        '<ellipse cx="9" cy="-9" rx="3.6" ry="9" fill="#f6c54a" transform="rotate(45)"/>' +
        '<ellipse cx="13" cy="0" rx="10" ry="5" fill="#f6c54a" opacity=".7"/>' +
        '<ellipse cx="13" cy="0" rx="9" ry="3.6" fill="#f6c54a"/>' +
        '<ellipse cx="9" cy="9" rx="5" ry="10" fill="#f6c54a" opacity=".7" transform="rotate(-45)"/>' +
        '<ellipse cx="9" cy="9" rx="3.6" ry="9" fill="#f6c54a" transform="rotate(-45)"/>' +
        '<ellipse cx="0" cy="13" rx="5" ry="10" fill="#f6c54a" opacity=".7"/>' +
        '<ellipse cx="0" cy="13" rx="3.6" ry="9" fill="#f6c54a"/>' +
        '<ellipse cx="-9" cy="9" rx="5" ry="10" fill="#f6c54a" opacity=".7" transform="rotate(45)"/>' +
        '<ellipse cx="-9" cy="9" rx="3.6" ry="9" fill="#f6c54a" transform="rotate(45)"/>' +
        '<ellipse cx="-13" cy="0" rx="10" ry="5" fill="#f6c54a" opacity=".7"/>' +
        '<ellipse cx="-13" cy="0" rx="9" ry="3.6" fill="#f6c54a"/>' +
        '<ellipse cx="-9" cy="-9" rx="5" ry="10" fill="#f6c54a" opacity=".7" transform="rotate(-45)"/>' +
        '<ellipse cx="-9" cy="-9" rx="3.6" ry="9" fill="#f6c54a" transform="rotate(-45)"/>' +
        '</g>' +
        '<circle cx="30" cy="22" r="7" fill="#7a4818"/>' +
        '<circle cx="30" cy="22" r="4.5" fill="#5a3010"/>' +
        '</svg>'
    },
    {
      id: 'cosmos', label: 'cosmos',
      svg: '<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 90 Q 30 60 30 38" stroke="#5e8a4f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 68 Q 12 64 4 48 Q 8 40 18 44 Q 26 50 30 60 Z" fill="#7eb86b"/>' +
        '<path d="M30 56 Q 46 50 50 36 Q 44 32 38 36 Q 32 42 30 52 Z" fill="#5fa055"/>' +
        '<g transform="translate(30 22)">' +
        '<path d="M0 -18 Q -8 -12 -6 0 Q 6 0 8 -12 Q 8 -18 0 -18 Z" fill="#fbcdd8" opacity=".75"/>' +
        '<path d="M0 -16 Q -6 -10 -4 0 Q 4 0 6 -10 Q 6 -16 0 -16 Z" fill="#f4a8b6"/>' +
        '<path d="M14 -8 Q 8 -2 12 6 Q 18 4 18 -6 Q 18 -10 14 -8 Z" fill="#f4a8b6" transform="rotate(72)"/>' +
        '<path d="M14 -8 Q 8 -2 12 6 Q 18 4 18 -6 Q 18 -10 14 -8 Z" fill="#f4a8b6" transform="rotate(144)"/>' +
        '<path d="M14 -8 Q 8 -2 12 6 Q 18 4 18 -6 Q 18 -10 14 -8 Z" fill="#f4a8b6" transform="rotate(216)"/>' +
        '<path d="M14 -8 Q 8 -2 12 6 Q 18 4 18 -6 Q 18 -10 14 -8 Z" fill="#f4a8b6" transform="rotate(288)"/>' +
        '</g>' +
        '<circle cx="30" cy="22" r="5.5" fill="#f6c54a"/>' +
        '<circle cx="30" cy="22" r="3" fill="#c87a18"/>' +
        '</svg>'
    }
  ];

  /* Five clay/terracotta-toned pots — body + rim + name text color */
  var POTS = [
    { id: 'terracotta', label: 'terra',   body: '#c8602f', rim: '#a04a0c', textC: '#fdf3eb' },
    { id: 'cobalt',     label: 'cobalt',  body: '#2a5fc4', rim: '#1a3a8a', textC: '#eef2ff' },
    { id: 'cream',      label: 'cream',   body: '#ebe3d0', rim: '#c8b894', textC: '#3a3530' },
    { id: 'matte',      label: 'matte',   body: '#1a1a1a', rim: '#000',    textC: '#f4f1ea' },
    { id: 'saffron',    label: 'saffron', body: '#d96a1a', rim: '#a04a0c', textC: '#fdf3eb' }
  ];

  /* Cozy one-liners — used as fallback for any record missing a quote */
  var QUOTES_FALLBACK = [
    'someone passed through here',
    'left a flower, kept walking',
    'a quiet visit',
    'watering ideas worth growing',
    'first time on a portfolio that felt alive',
    'planted on a tuesday',
    'pretty work, pretty garden',
    'taking the long way home',
    'reading between the rows',
    'leaving sunshine',
    'this place breathes',
    'thanks for the slow scroll',
    'hello from the desk',
    'stayed five minutes too long',
    'a small offering',
    'on lunch break',
    'quietly impressed',
    'stopped to look closer',
    'planted a thought',
    'good company in this garden'
  ];

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function potSvg(p) {
    return '<svg viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M14 16 L76 16 L70 76 L20 76 Z" fill="' + p.body + '"/>' +
      '<rect x="11" y="14" width="68" height="7" rx="1" fill="' + p.rim + '"/>' +
      '</svg>';
  }

  /* renderPotted({flower, pot, name}) — composite SVG-based plant render.
     Same markup used by plant.html's preview/success and lawn.html flowers. */
  function renderPotted(opts) {
    opts = opts || {};
    var f = opts.flower ? FLOWERS.find(function (x) { return x.id === opts.flower; }) : null;
    var p = opts.pot ? POTS.find(function (x) { return x.id === opts.pot; }) : null;
    var isEmpty = !f || !p;
    var flowerSvg = f ? f.svg :
      '<svg viewBox="0 0 60 90"><path d="M30 90 L30 50" stroke="#d8d4c8" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="30" cy="30" r="16" fill="#d8d4c8"/></svg>';
    var potHtml = p ? potSvg(p) :
      '<svg viewBox="0 0 90 80"><path d="M14 16 L76 16 L70 76 L20 76 Z" fill="#d8d4c8"/><rect x="11" y="14" width="68" height="7" fill="#bcb8aa"/></svg>';
    var nameColor = p ? p.textC : 'rgba(255,255,255,0.92)';
    return '<div class="plant-render' + (isEmpty ? ' empty' : '') + '">' +
      '<div class="pr-flower">' + flowerSvg + '</div>' +
      '<div class="pr-pot">' + potHtml +
      '<span class="pr-name" style="color:' + nameColor + '">' + escapeHtml(opts.name || '') + '</span>' +
      '</div></div>';
  }

  function pickQuote() {
    return QUOTES_FALLBACK[Math.floor(Math.random() * QUOTES_FALLBACK.length)];
  }

  window.LAWN_LIB = {
    FLOWERS: FLOWERS,
    POTS: POTS,
    QUOTES_FALLBACK: QUOTES_FALLBACK,
    potSvg: potSvg,
    renderPotted: renderPotted,
    pickQuote: pickQuote,
    escapeHtml: escapeHtml
  };
})();
