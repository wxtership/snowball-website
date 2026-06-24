/* Fetches donators.json (published by Snowball's /moderation donatorsync) and renders
   current Donator-role members, highest donation first, with amount + date pills. */
(function () {
  var root = document.getElementById('donator-roster');
  if (!root) return;
  if (!window.fetch) { showError(); return; }

  var allMembers = [];
  var allTimeTotal = null;

  fetch('donators.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) { showError(); return; }
      if (typeof data.allTimeTotal === 'number') allTimeTotal = data.allTimeTotal;
      data.tiers.forEach(function (tier) {
        if (tier && Array.isArray(tier.members)) allMembers = allMembers.concat(tier.members);
      });
      if (!allMembers.length) { showEmpty(); return; }
      preloadThenRender(allMembers);
    })
    .catch(function () { showError(); });

  // Highest donated first; donors with no recorded amount sink to the bottom,
  // tie-broken alphabetically so that block stays stable.
  function getSorted() {
    return allMembers.slice().sort(function (a, b) {
      var av = typeof a.amount === 'number' ? a.amount : -1;
      var bv = typeof b.amount === 'number' ? b.amount : -1;
      if (bv !== av) return bv - av;
      var an = (a.displayName || a.username || '').toLowerCase();
      var bn = (b.displayName || b.username || '').toLowerCase();
      return an < bn ? -1 : an > bn ? 1 : 0;
    });
  }

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
      root.innerHTML = renderWall(getSorted());
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
    return '<div class="staff-tier">'
      + '<div class="staff-tier-title" style="--i:0">'
      + '<img src="assets/donatechat.png" class="tier-img-icon" alt="" aria-hidden="true">'
      + 'Donators</div>'
      + '<div class="staff-grid staff-grid-donator">' + cards + '</div>'
      + '</div>'
      + renderDonateBanner();
  }

  function renderDonateBanner() {
    var totalLine = '';
    if (typeof allTimeTotal === 'number' && allTimeTotal > 0) {
      var formatted = allTimeTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      totalLine = '<div class="donate-banner-total">'
        + '<span class="donate-banner-amount">$' + formatted + '</span>'
        + '<span class="donate-banner-label">raised all-time by us</span>'
        + '</div>';
    }
    return '<div class="donate-banner">'
      + totalLine
      + '<p class="donate-banner-copy">Every dollar keeps the bots, radar, and alerts running. Want your name on the wall?</p>'
      + '<a href="https://xtremewx.com/donate" target="_blank" rel="noopener" class="donate-banner-btn">'
      + '<i class="fas fa-heart" aria-hidden="true"></i> Donate</a>'
      + '</div>';
  }

  function renderCard(m, i) {
    var name = esc(m.displayName || m.username || 'Member');
    var handle = m.username ? '@' + esc(m.username) : '';
    var avatar = safeUrl(m.avatar) || 'assets/snowball-logo-transparent-small.png';
    var bgUrl = safeUrl(m.banner) || safeUrl(m.avatar);
    var bg = bgUrl
      ? '<div class="staff-card-bg" style="background-image:url(\'' + bgUrl + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-default"></div>';
    var amountPill = typeof m.amount === 'number'
      ? '<span class="donator-amount-pill">$' + m.amount.toFixed(2) + '</span>'
      : '';
    var datePill = '';
    if (m.donatedAt) {
      var d = new Date(m.donatedAt);
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      datePill = '<span class="donator-date-pill">Last donated ' + months[d.getUTCMonth()] + ' ' + ordinal(d.getUTCDate()) + ', ' + d.getUTCFullYear() + '</span>';
    }
    return '<article class="staff-card has-banner" style="--i:' + i + '">'
      + bg
      + '<img class="staff-avatar" src="' + avatar + '" alt="">'
      + '<span class="staff-name">' + name + '</span>'
      + (handle ? '<span class="staff-handle">' + handle + '</span>' : '')
      + amountPill
      + datePill
      + '</article>';
  }

  function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
