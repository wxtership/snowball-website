/* Populates #staff-roster from staff.json (published by the Snowball bot's
   /moderation sync command). Falls back to the static placeholder markup in the
   page if staff.json is missing, empty, or unreachable. Empty tiers are hidden. */
(function () {
  var TIERS = {
    founder:    { label: 'Founder',     icon: 'fa-crown',         cls: 'tier-founder' },
    leadership: { label: 'Leadership',  icon: 'fa-gavel',         cls: 'tier-leadership' },
    staff:      { label: 'Staff',       icon: 'fa-wrench',        cls: 'tier-staff' },
    trial:      { label: 'Trial Staff', icon: 'fa-shield-halved', cls: 'tier-trial' }
  };
  var ORDER = ['founder', 'leadership', 'staff', 'trial'];

  var root = document.getElementById('staff-roster');
  if (!root || !window.fetch) return;

  fetch('staff.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) return;
      var tiers = data.tiers.filter(function (t) {
        return t && Array.isArray(t.members) && t.members.length;
      });
      if (!tiers.length) return; // nothing synced yet -> keep placeholder fallback
      tiers.sort(function (a, b) {
        var ia = ORDER.indexOf(a.key), ib = ORDER.indexOf(b.key);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      root.innerHTML = tiers.map(renderTier).join('');
    })
    .catch(function () { /* keep fallback */ });

  function renderTier(t) {
    var meta = TIERS[t.key] || { label: t.label || t.key, icon: 'fa-user', cls: '' };
    var cards = t.members.map(function (m) { return renderCard(m, meta); }).join('');
    return '<div class="staff-tier">' +
        '<div class="staff-tier-title"><span class="tier-icon ' + meta.cls + '">' +
          '<i class="fas ' + meta.icon + '"></i></span>' + esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m, meta) {
    var name = esc(m.displayName || m.username || 'Member');
    var role = esc(m.role || meta.label);
    var avatar = safeUrl(m.avatar) || 'assets/snowball-logo-transparent-small.png';
    var banner;
    if (safeUrl(m.banner)) {
      banner = '<div class="staff-banner" style="background-image:url(\'' + safeUrl(m.banner) + '\')"></div>';
    } else if (typeof m.accentColor === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(m.accentColor)) {
      banner = '<div class="staff-banner" style="background:' + m.accentColor + '"></div>';
    } else {
      banner = '<div class="staff-banner staff-banner-default"></div>';
    }
    return '<article class="staff-card has-banner">' +
        banner +
        '<img class="staff-avatar" src="' + avatar + '" alt="" loading="lazy">' +
        '<span class="staff-name">' + name + '</span>' +
        '<span class="staff-role">' + role + '</span>' +
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
