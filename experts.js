// We're the ones who innovate, not imitate.

(function () {
  var root = document.getElementById('experts-roster');
  if (!root || !window.fetch) return;

  var ICON = 'assets/coverage-expert.png';
  var TIERS = {
    lead:   { label: 'Lead Experts',    role: 'Lead Coverage Expert' },
    expert: { label: 'Coverage Experts', role: 'Coverage Expert' }
  };
  var ORDER = ['lead', 'expert'];
  var stagger = 0;

  fetch('experts.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) return;
      var tiers = data.tiers.filter(function (t) {
        return t && Array.isArray(t.members) && t.members.length;
      });
      if (!tiers.length) return;
      tiers.sort(function (a, b) {
        var ia = ORDER.indexOf(a.key), ib = ORDER.indexOf(b.key);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      preloadThenRender(tiers);
    })
    .catch(function () {                          });

  function preloadThenRender(tiers) {
    var urls = [];
    tiers.forEach(function (t) {
      t.members.forEach(function (m) {
        if (m.avatarURL) urls.push(m.avatarURL);
      });
    });
    var remaining = urls.length, done = false;
    function render() {
      if (done) return; done = true;
      root.classList.add('animate-in');
      root.innerHTML = tiers.map(renderTier).join('');
    }
    if (!remaining) { render(); return; }
    urls.forEach(function (u) {
      var img = new Image();
      img.onload = img.onerror = function () { if (--remaining <= 0) render(); };
      img.src = u;
    });
    setTimeout(render, 2500);
  }

  function renderTier(t) {
    var meta = TIERS[t.key] || { label: t.label || t.key, role: 'Coverage Expert' };
    var headIdx = stagger++;
    var cards = t.members.map(function (m) { return renderCard(m); }).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title" style="--i:' + headIdx + '">' +
          '<img class="tier-icon" src="' + ICON + '" alt="" width="30" height="30"> ' +
          esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid staff-grid-coverage">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m) {
    var name = esc(m.displayName || m.username || 'Expert');
    var avatar = m.avatarURL ? esc(m.avatarURL) : ICON;
    var bg = m.avatarURL
      ? '<div class="staff-card-bg" style="background-image:url(\'' + avatar + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-cov"></div>';
    var idx = stagger++;
    return '<article class="staff-card has-banner coverage-card" style="--i:' + idx + '">' +
        bg +
        '<img class="staff-avatar" src="' + avatar + '" alt="">' +
        '<span class="staff-name">' + name + '</span>' +
      '</article>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
