/* Fetches experts.json (published by Snowball's /moderation expertssync) and renders the
   Coverage Expert roster: Lead Experts first, then the rest. Falls back to the shared
   Coverage Expert icon if a member has no avatar. If the file can't load, the static
   fallback already in #experts-roster is left in place. */
(function () {
  var root = document.getElementById('experts-roster');
  if (!root || !window.fetch) return;

  var ICON = 'assets/coverage-expert.png';
  var TIERS = {
    lead:   { label: 'Lead Experts',    role: 'Lead Coverage Expert' },
    expert: { label: 'Coverage Experts', role: 'Coverage Expert' }
  };
  var ORDER = ['lead', 'expert'];

  fetch('experts.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) return; // keep the fallback markup
      var tiers = data.tiers.filter(function (t) {
        return t && Array.isArray(t.members) && t.members.length;
      });
      if (!tiers.length) return;
      tiers.sort(function (a, b) {
        var ia = ORDER.indexOf(a.key), ib = ORDER.indexOf(b.key);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      root.innerHTML = tiers.map(renderTier).join('');
    })
    .catch(function () { /* leave the fallback */ });

  function renderTier(t) {
    var meta = TIERS[t.key] || { label: t.label || t.key, role: 'Coverage Expert' };
    var cards = t.members.map(function (m) { return renderCard(m, meta.role); }).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title"><i class="fas fa-tower-broadcast" style="color:var(--cov);"></i> ' +
          esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid staff-grid-coverage">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m, role) {
    var name = esc(m.displayName || m.username || 'Expert');
    var avatar = m.avatarURL ? esc(m.avatarURL) : ICON;
    var bg = m.avatarURL
      ? '<div class="staff-card-bg" style="background-image:url(\'' + avatar + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-cov"></div>';
    return '<article class="staff-card has-banner coverage-card">' +
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
