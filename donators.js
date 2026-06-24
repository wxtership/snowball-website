/* Fetches donators.json (published by Snowball's /moderation donatorsync) and renders
   current Donator-role members with the same card style as the staff page. */
(function () {
  var root = document.getElementById('donator-roster');
  if (!root) return;
  if (!window.fetch) { showError(); return; }

  fetch('donators.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) { showError(); return; }
      var members = [];
      data.tiers.forEach(function (tier) {
        if (tier && Array.isArray(tier.members)) members = members.concat(tier.members);
      });
      if (!members.length) { showEmpty(); return; }
      preloadThenRender(members);
    })
    .catch(function () { showError(); });

  function preloadThenRender(members) {
    var urls = [];
    members.forEach(function (m) {
      var a = safeUrl(m.avatar); if (a) urls.push(a);
      var b = safeUrl(m.banner); if (b) urls.push(b);
    });
    var remaining = urls.length, done = false;
    function render() {
      if (done) return; done = true;
      root.classList.add('animate-in');
      root.innerHTML = renderWall(members);
    }
    if (!remaining) { render(); return; }
    urls.forEach(function (u) {
      var img = new Image();
      img.onload = img.onerror = function () { if (--remaining <= 0) render(); };
      img.src = u;
    });
    setTimeout(render, 2500);
  }

  function showError() {
    root.innerHTML = '<p class="staff-empty">We couldn’t load the donator wall right now. '
      + 'Try refreshing, or come say hi in <a href="https://discord.gg/xtremeweather" '
      + 'target="_blank" rel="noopener">the Discord</a>.</p>';
  }

  function showEmpty() {
    root.innerHTML = '<p class="staff-empty">No donators are synced yet. Check back soon.</p>';
  }

  function renderWall(members) {
    var cards = members.map(function (m, i) { return renderCard(m, i + 1); }).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title" style="--i:0">' +
          '<i class="fas fa-heart tier-icon tier-donator" aria-hidden="true"></i>' +
          'Donators</div>' +
        '<div class="staff-grid staff-grid-donator">' + cards + '</div>' +
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
    return '<article class="staff-card has-banner" style="--i:' + i + '">' +
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
