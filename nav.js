/* Shared navbar logic — desktop mega-menu hover + sub-view mobile menu. */

// ---- Desktop mega-menu hover ------------------------------------------------
document.querySelectorAll('.has-dropdown[data-menu]').forEach(function (item) {
  var menuName = item.getAttribute('data-menu');
  var megaMenu = document.getElementById(menuName + '-mega-menu');
  if (!megaMenu) return;
  var t;
  function show() {
    clearTimeout(t);
    megaMenu.style.opacity = '1';
    megaMenu.style.visibility = 'visible';
    megaMenu.style.pointerEvents = 'auto';
    // margin-top instead of transform: Chromium drops backdrop-filter on
    // fixed elements that carry a transform, which let text bleed through.
    megaMenu.style.marginTop = '0px';
  }
  function hide() {
    megaMenu.style.opacity = '0';
    megaMenu.style.visibility = 'hidden';
    megaMenu.style.pointerEvents = 'none';
    megaMenu.style.marginTop = '20px';
  }
  item.addEventListener('mouseenter', show);
  item.addEventListener('mouseleave', function () { t = setTimeout(hide, 100); });
  megaMenu.addEventListener('mouseenter', function () { clearTimeout(t); });
  megaMenu.addEventListener('mouseleave', hide);
});

// ---- Mobile sub-view menu ---------------------------------------------------
var sbSubStack = [];
var sbTransitioning = false;
var sbTransitionTimer = null;

function sbLockTransition() {
  sbTransitioning = true;
  clearTimeout(sbTransitionTimer);
  sbTransitionTimer = setTimeout(function () { sbTransitioning = false; }, 460);
}

function sbOpenSubMenu(name) {
  if (sbTransitioning) return;
  var overlay = document.getElementById('sb-mobile-menu');
  var target = document.getElementById('sb-sub-' + name);
  if (!overlay || !target) return;

  sbLockTransition();

  // Park any currently active sub-view
  var currentSub = overlay.querySelector('.sub-view.active');
  if (currentSub) {
    currentSub.classList.remove('active');
    currentSub.classList.add('parked');
    sbSubStack.push(currentSub);
  }

  overlay.classList.add('sub-active');
  target.classList.add('active');
  target.classList.remove('parked');
}

function sbCloseSubMenu() {
  if (sbTransitioning) return;
  var overlay = document.getElementById('sb-mobile-menu');
  if (!overlay) return;

  sbLockTransition();

  var currentSub = overlay.querySelector('.sub-view.active');
  if (currentSub) {
    currentSub.classList.remove('active');
  }

  var prev = sbSubStack.pop();
  if (prev) {
    prev.classList.remove('parked');
    prev.classList.add('active');
  } else {
    overlay.classList.remove('sub-active');
  }
}

function sbResetSubMenus() {
  var overlay = document.getElementById('sb-mobile-menu');
  if (!overlay) return;
  overlay.classList.remove('sub-active');
  overlay.querySelectorAll('.sub-view').forEach(function (v) {
    v.classList.remove('active', 'parked');
  });
  sbSubStack = [];
}

function sbToggleMobileMenu() {
  var menu = document.getElementById('sb-mobile-menu');
  var btn = document.getElementById('mobile-trigger');
  if (!menu) return;
  var open = menu.classList.toggle('active');
  if (btn) btn.classList.toggle('active', open);
  document.body.classList.toggle('sb-mobile-menu-open', open);
  if (!open) sbResetSubMenus();
}

function sbCloseMobileMenu(e) {
  if (e.target === document.getElementById('sb-mobile-menu')) {
    sbToggleMobileMenu();
  }
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 1024) {
    var menu = document.getElementById('sb-mobile-menu');
    if (menu && menu.classList.contains('active')) sbToggleMobileMenu();
  }
  fitFooterWordmark();
});

// ---- Footer wordmark fit-to-width ------------------------------------------
function fitFooterWordmark() {
  var el = document.querySelector('.footer-wordmark');
  if (!el) return;
  var cs = getComputedStyle(el);
  var probe = document.createElement('span');
  probe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;'
    + 'white-space:nowrap;font-size:400px;'
    + 'font-family:' + cs.fontFamily + ';'
    + 'font-weight:' + cs.fontWeight + ';'
    + 'letter-spacing:' + cs.letterSpacing + ';';
  probe.textContent = el.textContent;
  document.body.appendChild(probe);
  var textWidth = probe.offsetWidth;
  document.body.removeChild(probe);
  var available = el.clientWidth;
  if (!textWidth || !available) return;
  el.style.fontSize = Math.floor(400 * (available * 0.92 / textWidth)) + 'px';
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitFooterWordmark);
} else {
  window.addEventListener('load', fitFooterWordmark);
}

// ---- Site-wide stagger-up reveal -------------------------------------------
// Blocks inside each section rise + fade in as they scroll into view (same feel
// as the legal pages). Works on static and React-rendered pages; elements that
// already have their own intro animation are skipped so nothing double-animates.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Containers whose contents animate themselves — never touch these or anything
  // inside them (hero fade-ins, the demo cards, the feature marquee, the radar
  // app's dive-deeper section, the legal sections handled by their own script,
  // and the staff roster which preloads its avatars then runs its own stagger).
  var SKIP_INSIDE = '.xw-hero-v2, .page-hero, .xw-feat-marquee, .xw-demo3d, ' +
    '.demo-fades, .ai-timeline, .dive-deeper-section, .legal-doc, #staff-roster';

  // Child containers whose own children should stagger individually (so grids of
  // cards rise one-by-one) instead of the whole block moving as one unit.
  var GROUP_SELECTOR = 'xw-product-grid xw-feature-list home-cta-stats ' +
    'xw-section-head footer-grid economy-grid ' +
    'coverage-modes mode-thresholds charter-list faq';

  function shouldSkip(el) {
    if (el.hasAttribute('data-no-reveal')) return true;
    if (el.closest('[data-no-reveal]')) return true;
    if (el.closest(SKIP_INSIDE)) return true;
    if (el.classList.contains('reveal-up')) return true;
    // Don't reveal empty layout wrappers (dividers, spacers, scripts, styles).
    var tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'BR') return true;
    if (el.classList.contains('divider')) return true;
    return false;
  }

  function isGroup(el) {
    var cls = ' ' + el.className + ' ';
    return GROUP_SELECTOR.split(' ').some(function (g) {
      return cls.indexOf(' ' + g + ' ') !== -1;
    });
  }

  // Collect the blocks to reveal: direct children of each .section-inner, but if
  // a child is a known grid/group, reveal its children instead.
  function collectTargets() {
    var out = [];
    document.querySelectorAll('.section-inner').forEach(function (inner) {
      if (inner.closest(SKIP_INSIDE)) return;
      Array.prototype.forEach.call(inner.children, function (child) {
        if (shouldSkip(child)) return;
        if (isGroup(child)) {
          Array.prototype.forEach.call(child.children, function (gc) {
            if (!shouldSkip(gc)) out.push(gc);
          });
        } else {
          out.push(child);
        }
      });
    });
    return out;
  }

  if (reduce) return; // CSS already shows everything; no observer needed.

  // Eager-load a block's images as soon as it's armed (before it scrolls into
  // view), so by reveal time the image is already decoded and never pops in
  // mid-rise. This does NOT gate the reveal — the block always animates on
  // schedule; we just start its images early.
  function preloadImages(el) {
    var imgs = el.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute('loading') === 'lazy') imgs[i].loading = 'eager';
    }
  }

  var batch = [];
  var timer = null;
  function flush() {
    var items = batch;
    batch = [];
    timer = null;
    items.forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 70) + 'ms');
    });
    // The transition only plays if the hidden state was painted first. On
    // fast (cached) refreshes both classes could land in the same style pass
    // and elements popped in with no fade. Force a style flush, then wait two
    // frames so the hidden state is guaranteed on screen before revealing.
    void document.body.offsetHeight;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        items.forEach(function (el, i) {
          el.classList.add('reveal-in');
          // Drop the reveal classes once the entrance finishes so the
          // element's own transitions (hover lifts etc.) take back over.
          setTimeout(function () {
            el.classList.remove('reveal-up', 'reveal-in');
            el.style.removeProperty('--reveal-delay');
          }, i * 70 + 800);
        });
      });
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        io.unobserve(e.target);
        batch.push(e.target);
        clearTimeout(timer);
        timer = setTimeout(flush, 16);
      }
    });
  }, { rootMargin: '0px 0px -32px 0px', threshold: 0.04 });

  function arm() {
    collectTargets().forEach(function (el) {
      if (el.classList.contains('reveal-up')) return; // already armed
      el.classList.add('reveal-up');
      preloadImages(el); // start images now so they're ready by reveal time
      // Already in view on load? Reveal next frame so the transition runs.
      io.observe(el);
    });
  }

  function init() {
    arm();
    // React pages mount content after this script runs; re-scan a couple times.
    setTimeout(arm, 120);
    setTimeout(arm, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ---- Live Coverage Mode banner ----------------------------------------------
// When Snowball enables a Coverage Mode it records the event with
// banner-service, which exposes the current state at /public/coverage. Every
// page polls that endpoint; while coverage is live it shows a dismissible
// bottom banner and swaps the tab icon to the coverage variant of the logo.
(function () {
  if (!window.fetch) return;

  var STATS_BASE = 'https://community.xtremewx.com';
  var INVITE_URL = 'https://discord.gg/xtremeweather';
  var DISMISS_KEY = 'xw-coverage-dismissed-until';
  var DISMISS_MS = 24 * 60 * 60 * 1000;
  var POLL_MS = 60 * 1000;

  // Resolve assets against this script's URL so the 404 page (which loads
  // nav.js by absolute path) gets working icons at any URL depth.
  var ASSET_BASE = '';
  try {
    var src = document.currentScript && document.currentScript.src;
    if (src) ASSET_BASE = src.slice(0, src.lastIndexOf('/') + 1);
  } catch (e) { /* fall back to page-relative */ }

  var TYPES = {
    severe:   { name: 'Severe',   icon: ASSET_BASE + 'assets/coverage/severe_static.png?v=3' },
    tropical: { name: 'Tropical', icon: ASSET_BASE + 'assets/coverage/tropical_static.png?v=3' },
    winter:   { name: 'Winter',   icon: ASSET_BASE + 'assets/coverage/winter_static.png?v=3' }
  };

  var banner = null;
  var shownType = null;
  var savedFavicons = null; // original hrefs, restored when coverage ends
  var savedNavLogo = null;  // original navbar logo src, restored when coverage ends

  function check() {
    fetch(STATS_BASE + '/public/coverage', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) { apply(data); })
      .catch(function () { /* banner is optional; fail quietly */ });
  }
  check();
  setInterval(check, POLL_MS);

  function apply(data) {
    var active = !!(data && data.active && TYPES[data.type]);

    if (!active) {
      restoreFavicons();
      restoreNavLogo();
      if (banner) hideBanner();
      shownType = null;
      return;
    }

    // Tab + navbar icons switch to the coverage logo right away
    setFavicons(TYPES[data.type].icon);
    setNavLogo(TYPES[data.type].icon);

    if (banner && shownType !== data.type) hideBanner(); // type changed mid-session
    if (!banner && !isDismissed()) showBanner(data);
  }

  function setFavicons(href) {
    document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach(function (l) {
      if (savedFavicons === null) savedFavicons = [];
      if (!savedFavicons.some(function (s) { return s.el === l; })) {
        savedFavicons.push({ el: l, href: l.href });
      }
      if (l.href !== href) l.href = href;
    });
  }

  function restoreFavicons() {
    if (!savedFavicons) return;
    savedFavicons.forEach(function (s) { s.el.href = s.href; });
    savedFavicons = null;
  }

  function setNavLogo(src) {
    var logo = document.querySelector('.navbar img.logo');
    if (!logo) return;
    if (savedNavLogo === null) savedNavLogo = logo.getAttribute('src');
    if (logo.getAttribute('src') !== src) logo.src = src;
  }

  function restoreNavLogo() {
    if (savedNavLogo === null) return;
    var logo = document.querySelector('.navbar img.logo');
    if (logo) logo.src = savedNavLogo;
    savedNavLogo = null;
  }

  function isDismissed() {
    try { return Date.now() < Number(localStorage.getItem(DISMISS_KEY) || 0); } catch (e) { return false; }
  }

  function hideBanner() {
    var el = banner;
    banner = null;
    shownType = null;
    el.classList.remove('animate-in');
    el.classList.add('animate-out');
    setTimeout(function () { el.remove(); }, 600);
  }

  function showBanner(data) {
    var t = TYPES[data.type];
    var headline = data.header || ('Xtreme Weather has activated ' + t.name + ' Coverage Mode.');

    banner = document.createElement('div');
    shownType = data.type;
    banner.className = 'coverage-banner ' + data.type;
    banner.setAttribute('role', 'status');
    banner.style.display = 'block';
    banner.innerHTML =
      '<div class="coverage-banner-content">' +
        '<img class="coverage-icon" src="' + t.icon + '" alt="" width="48" height="48">' +
        '<div class="coverage-text">' +
          '<p class="coverage-title">' + esc(t.name + ' Coverage Mode enabled!') + '</p>' +
          '<p class="coverage-subtitle">' + esc(headline) + '</p>' +
        '</div>' +
        '<button class="coverage-dismiss" type="button" aria-label="Dismiss">' +
          '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">' +
            '<path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>';

    banner.addEventListener('click', function () {
      window.open(INVITE_URL, '_blank', 'noopener');
    });
    banner.querySelector('.coverage-dismiss').addEventListener('click', function (e) {
      e.stopPropagation();
      try { localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_MS)); } catch (err) { /* private mode */ }
      if (banner) hideBanner();
    });

    // Mount a beat after the page settles, then double rAF so the browser
    // commits the off-screen state first and the enter transition animates.
    var el = banner;
    setTimeout(function () {
      if (banner !== el) return; // dismissed or replaced while waiting
      document.body.appendChild(el);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add('animate-in'); });
      });
    }, 500);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
