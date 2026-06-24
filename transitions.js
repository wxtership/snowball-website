// Cross-page transitions using the View Transitions API with a CSS fallback.
(function () {
  const SAME_ORIGIN = location.origin;

  function isInternalLink(a) {
    if (!a || a.tagName !== 'A') return false;
    if (a.target === '_blank') return false;
    if (a.hasAttribute('download')) return false;
    const href = a.href;
    if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    try { return new URL(href).origin === SAME_ORIGIN; } catch { return false; }
  }

  function navigate(url) {
    if (!document.startViewTransition) {
      // Fallback: manual fade out → navigate
      document.documentElement.classList.add('page-exit');
      setTimeout(() => { location.href = url; }, 220);
      return;
    }
    document.startViewTransition(() => { location.href = url; });
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!isInternalLink(a)) return;
    const url = a.href;
    // Let hash-only links (same-page anchors) pass through normally
    if (new URL(url).pathname === location.pathname && new URL(url).hash) return;
    e.preventDefault();
    navigate(url);
  }, true);
})();
