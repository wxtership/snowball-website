/* Shared navbar logic for every page: desktop mega-menu hover + the mobile menu.
   The mobile menu supports NESTED sub-views (e.g. Community > Policies > Charter) via a
   small view stack, so a "back" press returns to the parent view rather than the root.
   Markup contract:
     - .has-dropdown[data-menu="x"]  pairs with  #x-mega-menu
     - mobile big links call sbOpenSubMenu('community'); deeper links call sbOpenSubMenu('policies')
     - each sub-view is #sb-sub-menu-<id>; its back button calls sbCloseSubMenu()
   Functions are global because the markup wires them through inline onclick handlers. */

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

// ---- Mobile menu (with nested sub-views) ------------------------------------
var sbSubStack = []; // ids of the sub-views currently open, deepest last

function sbToggleMobileMenu() {
  var menu = document.getElementById('sb-mobile-menu');
  var btn = document.getElementById('mobile-trigger');
  if (!menu) return;
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    if (btn) btn.classList.remove('active');
    document.body.classList.remove('sb-mobile-menu-open');
    setTimeout(sbResetSubMenus, 300); // reset only after the close animation
  } else {
    menu.classList.add('active');
    if (btn) btn.classList.add('active');
    document.body.classList.add('sb-mobile-menu-open');
  }
}

function sbOpenSubMenu(id) {
  var menu = document.getElementById('sb-mobile-menu');
  var target = document.getElementById('sb-sub-menu-' + id);
  if (!menu || !target) return;
  menu.classList.add('sub-active');
  // Park the view we're leaving so it slides left (instead of just vanishing).
  if (sbSubStack.length) {
    var current = document.getElementById(sbSubStack[sbSubStack.length - 1]);
    if (current) { current.classList.remove('active'); current.classList.add('parked'); }
  }
  target.classList.remove('parked');
  target.classList.add('active');
  sbSubStack.push('sb-sub-menu-' + id);
}

function sbCloseSubMenu() {
  var menu = document.getElementById('sb-mobile-menu');
  var leaving = sbSubStack.pop();
  if (leaving) {
    var el = document.getElementById(leaving);
    if (el) { el.classList.remove('active'); el.classList.remove('parked'); }
  }
  if (sbSubStack.length) {
    // Reveal the parent sub-view we parked earlier.
    var parent = document.getElementById(sbSubStack[sbSubStack.length - 1]);
    if (parent) { parent.classList.remove('parked'); parent.classList.add('active'); }
  } else if (menu) {
    menu.classList.remove('sub-active'); // back to the root view
  }
}

function sbResetSubMenus() {
  sbSubStack = [];
  var menu = document.getElementById('sb-mobile-menu');
  if (menu) menu.classList.remove('sub-active');
  document.querySelectorAll('#sb-mobile-menu .sub-view').forEach(function (el) {
    el.classList.remove('active');
    el.classList.remove('parked');
  });
}

function sbCloseMobileMenu(e) {
  if (e.target === document.getElementById('sb-mobile-menu')) sbToggleMobileMenu();
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 1024) {
    var menu = document.getElementById('sb-mobile-menu');
    if (menu && menu.classList.contains('active')) sbToggleMobileMenu();
  }
  fitFooterWordmark();
});

// ---- Footer wordmark fit-to-width ------------------------------------------
// scrollWidth is capped by the parent overflow:hidden, so we measure using a
// fixed-position off-screen probe that is unaffected by any clipping ancestor.
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
  var available = el.parentElement.clientWidth;
  if (!textWidth || !available) return;
  el.style.fontSize = Math.floor(400 * (available * 0.92 / textWidth)) + 'px';
}
fitFooterWordmark();
