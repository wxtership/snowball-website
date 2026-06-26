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
