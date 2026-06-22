/* Fetches staff.json (published by the Snowball bot's /moderation sync) and
   renders the tiers. A spinner shows while loading; the roster fades in only once
   its avatars have loaded. Empty tiers are hidden. Shows a friendly message if the
   data can't be loaded (instead of placeholder cards). */
(function () {
  var TIERS = {
    founder:    { label: 'Founder' },
    leadership: { label: 'Leadership' },
    staff:      { label: 'Staff' },
    trial:      { label: 'Trial Staff' }
  };
  var ORDER = ['founder', 'leadership', 'staff', 'trial'];

  var root = document.getElementById('staff-roster');
  var loading = document.getElementById('staff-loading');
  if (!root) return;
  if (!window.fetch) { showError(); return; }

  fetch('staff.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) { showError(); return; }
      var tiers = data.tiers.filter(function (t) {
        return t && Array.isArray(t.members) && t.members.length;
      });
      if (!tiers.length) { showError(); return; }
      tiers.sort(function (a, b) {
        var ia = ORDER.indexOf(a.key), ib = ORDER.indexOf(b.key);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      root.innerHTML = tiers.map(renderTier).join('');
      revealWhenReady();
    })
    .catch(function () { showError(); });

  // Fade the roster in only after its images have loaded (with a safety timeout).
  function revealWhenReady() {
    var imgs = Array.prototype.slice.call(root.querySelectorAll('img'));
    var pending = imgs.filter(function (im) { return !im.complete; });
    var done = false;
    function reveal() {
      if (done) return; done = true;
      hideLoading();
      requestAnimationFrame(function () { root.classList.add('is-loaded'); });
    }
    if (!pending.length) { reveal(); return; }
    var remaining = pending.length;
    pending.forEach(function (im) {
      function tick() { if (--remaining <= 0) reveal(); }
      im.addEventListener('load', tick);
      im.addEventListener('error', tick);
    });
    setTimeout(reveal, 2500); // never wait forever on a slow/broken image
  }

  function hideLoading() { if (loading) loading.style.display = 'none'; }

  function showError() {
    hideLoading();
    root.innerHTML = '<p class="staff-empty">We couldn’t load the team right now. '
      + 'Try refreshing, or come say hi in <a href="https://discord.gg/xtremeweather" '
      + 'target="_blank" rel="noopener">the Discord</a>.</p>';
    requestAnimationFrame(function () { root.classList.add('is-loaded'); });
  }

  function renderTier(t) {
    var meta = TIERS[t.key] || { label: t.label || t.key };
    var iconKey = TIERS[t.key] ? t.key : 'staff';
    var cards = t.members.map(renderCard).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title">' +
          '<img class="tier-icon" src="assets/icons/role-' + iconKey + '.png" alt="" width="30" height="30">' +
          esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid staff-grid-' + iconKey + '">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m) {
    var name = esc(m.displayName || m.username || 'Member');
    var handle = m.username ? '@' + esc(m.username) : '';
    var avatar = safeUrl(m.avatar) || 'assets/snowball-logo-transparent-small.png';
    var bgUrl = safeUrl(m.banner) || safeUrl(m.avatar);
    var bg = bgUrl
      ? '<div class="staff-card-bg" style="background-image:url(\'' + bgUrl + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-default"></div>';
    return '<article class="staff-card has-banner">' +
        bg +
        '<img class="staff-avatar" src="' + avatar + '" alt="">' +
        '<span class="staff-name">' + name + '</span>' +
        (handle ? '<span class="staff-handle">' + handle + '</span>' : '') +
      '</article>';
  }

  function safeUrl(u) {
    if (typeof u !== 'string' || !/^https?:\/\//i.test(u)) return '';
    return u.replace(/'/g, '%27').replace(/"/g, '%22');
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
