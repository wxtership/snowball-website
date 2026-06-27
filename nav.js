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
    megaMenu.style.transform = 'translateX(-50%) translateY(0)';
  }
  function hide() {
    megaMenu.style.opacity = '0';
    megaMenu.style.visibility = 'hidden';
    megaMenu.style.pointerEvents = 'none';
    megaMenu.style.transform = 'translateX(-50%) translateY(20px)';
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
  // app's dive-deeper section, the legal sections handled by their own script).
  var SKIP_INSIDE = '.xw-hero-v2, .page-hero, .xw-feat-marquee, .xw-demo3d, ' +
    '.demo-fades, .ai-timeline, .dive-deeper-section, .legal-doc';

  // Child containers whose own children should stagger individually (so grids of
  // cards rise one-by-one) instead of the whole block moving as one unit.
  var GROUP_SELECTOR = 'xw-product-grid xw-feature-list home-cta-stats ' +
    'xw-section-head footer-grid';

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

  var batch = [];
  var timer = null;
  function flush() {
    batch.forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 70) + 'ms');
      el.classList.add('reveal-in');
    });
    batch = [];
    timer = null;
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
