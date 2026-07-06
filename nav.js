/*

   ██╗  ██╗████████╗██████╗ ███████╗███╗   ███╗███████╗
   ╚██╗██╔╝╚══██╔══╝██╔══██╗██╔════╝████╗ ████║██╔════╝
    ╚███╔╝    ██║   ██████╔╝█████╗  ██╔████╔██║█████╗
    ██╔██╗    ██║   ██╔══██╗██╔══╝  ██║╚██╔╝██║██╔══╝
   ██╔╝ ██╗   ██║   ██║  ██║███████╗██║ ╚═╝ ██║███████╗
   ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝
 ██╗    ██╗███████╗ █████╗ ████████╗██╗  ██╗███████╗██████╗
 ██║    ██║██╔════╝██╔══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗
 ██║ █╗ ██║█████╗  ███████║   ██║   ███████║█████╗  ██████╔╝
 ██║███╗██║██╔══╝  ██╔══██║   ██║   ██╔══██║██╔══╝  ██╔══██╗
 ╚███╔███╔╝███████╗██║  ██║   ██║   ██║  ██║███████╗██║  ██║
  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

          WE're the ones who innovate, not imitate.

*/

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

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SKIP_INSIDE = '.xw-hero-v2, .page-hero, .xw-feat-marquee, .xw-demo3d, ' +
    '.demo-fades, .ai-timeline, .dive-deeper-section, .legal-doc, #staff-roster';

  var GROUP_SELECTOR = 'xw-product-grid xw-feature-list home-cta-stats ' +
    'xw-section-head footer-grid economy-grid ' +
    'coverage-modes mode-thresholds charter-list faq';

  function shouldSkip(el) {
    if (el.hasAttribute('data-no-reveal')) return true;
    if (el.closest('[data-no-reveal]')) return true;
    if (el.closest(SKIP_INSIDE)) return true;
    if (el.classList.contains('reveal-up')) return true;
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

  if (reduce) return;

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
    void document.body.offsetHeight;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        items.forEach(function (el, i) {
          el.classList.add('reveal-in');
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
      if (el.classList.contains('reveal-up')) return;
      el.classList.add('reveal-up');
      preloadImages(el);
      io.observe(el);
    });
  }

  function init() {
    arm();
    setTimeout(arm, 120);
    setTimeout(arm, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function () {
  if (!window.fetch) return;

  var STATS_BASE = 'https://community.xtremewx.com';
  var INVITE_URL = 'https://discord.gg/xtremeweather';
  var DISMISS_KEY = 'xw-coverage-dismissed-until';
  var DISMISS_MS = 24 * 60 * 60 * 1000;
  var POLL_MS = 60 * 1000;

  var ASSET_BASE = '';
  try {
    var src = document.currentScript && document.currentScript.src;
    if (src) ASSET_BASE = src.slice(0, src.lastIndexOf('/') + 1);
  } catch (e) {                                  }

  var TYPES = {
    severe:   { name: 'Severe',   icon: ASSET_BASE + 'assets/coverage/severe_static.png?v=3',   fav: ASSET_BASE + 'assets/coverage/severe_favicon.png' },
    tropical: { name: 'Tropical', icon: ASSET_BASE + 'assets/coverage/tropical_static.png?v=3', fav: ASSET_BASE + 'assets/coverage/tropical_favicon.png' },
    winter:   { name: 'Winter',   icon: ASSET_BASE + 'assets/coverage/winter_static.png?v=3',   fav: ASSET_BASE + 'assets/coverage/winter_favicon.png' }
  };

  var banner = null;
  var shownType = null;
  var savedFavicons = null;
  var savedNavLogo = null;

  function check() {
    fetch(STATS_BASE + '/public/coverage', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) { apply(data); })
      .catch(function () {                                        });
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

    setFavicons(TYPES[data.type].fav);
    setNavLogo(TYPES[data.type].icon);

    if (banner && shownType !== data.type) hideBanner();
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
      try { localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_MS)); } catch (err) {                    }
      if (banner) hideBanner();
    });

    var el = banner;
    setTimeout(function () {
      if (banner !== el) return;
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
