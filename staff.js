/* Fetches staff.json (published by the Snowball bot's /moderation sync) and renders
   the tiers. Cards "load up" with a staggered entrance (see .staff-card animation in
   community.css). Empty tiers are hidden. Shows a friendly message if it can't load. */
(function () {
  var TIERS = {
    founder:    { label: 'Founder' },
    leadership: { label: 'Leadership' },
    staff:      { label: 'Staff' },
    trial:      { label: 'Trial Staff' }
  };
  var ORDER = ['founder', 'leadership', 'staff', 'trial'];

  var root = document.getElementById('staff-roster');
  if (!root) return;
  if (!window.fetch) { showError(); return; }

  var stagger = 0;

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
      preloadThenRender(tiers);
    })
    .catch(function () { showError(); });

  // Preload avatars/banners so cards don't flash in unstyled, then render (which
  // triggers the staggered entrance). Falls back after a short timeout.
  function preloadThenRender(tiers) {
    var urls = [];
    tiers.forEach(function (t) {
      t.members.forEach(function (m) {
        var a = safeUrl(m.avatar); if (a) urls.push(a);
        var b = safeUrl(m.banner); if (b) urls.push(b);
      });
    });
    var remaining = urls.length, done = false;
    function render() {
      if (done) return; done = true;
      // Add the class BEFORE inserting the cards so they're created already animating from
      // the invisible first frame (no flash). Without this JS, the cards just stay visible.
      root.classList.add('animate-in');
      root.innerHTML = tiers.map(renderTier).join('');
    }
    if (!remaining) { render(); return; }
    urls.forEach(function (u) {
      var img = new Image();
      img.onload = img.onerror = function () { if (--remaining <= 0) render(); };
      img.src = u;
    });
    setTimeout(render, 2500); // never wait forever on a slow image
  }

  function showError() {
    root.innerHTML = '<p class="staff-empty">We couldn’t load the team right now. '
      + 'Try refreshing, or come say hi in <a href="https://discord.gg/xtremeweather" '
      + 'target="_blank" rel="noopener">the Discord</a>.</p>';
  }

  function renderTier(t) {
    var meta = TIERS[t.key] || { label: t.label || t.key };
    var iconKey = TIERS[t.key] ? t.key : 'staff';
    var headIdx = stagger++;
    var cards = t.members.map(function (m) { return renderCard(m, stagger++); }).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title" style="--i:' + headIdx + '">' +
          '<img class="tier-icon" src="assets/icons/role-' + iconKey + '.png" alt="" width="30" height="30">' +
          esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid staff-grid-' + iconKey + '">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m, i) {
    var name = esc(m.displayName || m.username || 'Member');
    var handle = m.username ? '@' + esc(m.username) : '';
    var avatar = safeUrl(m.avatar) || 'assets/snowball-logo-transparent-small.png';
    var bgUrl = safeUrl(m.banner) || safeUrl(m.avatar);
    var bg = bgUrl
      ? '<div class="staff-card-bg" style="background-image:url(\'' + bgUrl + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-default"></div>';
    var tag = m.username === 'sebastioss' ? 'a href="seb.html"' : 'article';
    var endTag = m.username === 'sebastioss' ? 'a' : 'article';
    var label = m.username === 'sebastioss' ? ' aria-label="Open Snowball roast page for seb"' : '';
    return '<' + tag + ' class="staff-card has-banner' + (m.username === 'sebastioss' ? ' staff-card-link' : '') + '" style="--i:' + i + '"' + label + '>' +
        bg +
        '<img class="staff-avatar" src="' + avatar + '" alt="">' +
        '<span class="staff-name">' + name + '</span>' +
        (handle ? '<span class="staff-handle">' + handle + '</span>' : '') +
      '</' + endTag + '>';
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
