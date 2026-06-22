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
        '<div class="staff-tier-title">' +
          '<img class="tier-icon" src="assets/icons/role-' + (TIERS[t.key] ? t.key : 'staff') + '.png" alt="" width="30" height="30">' +
          esc(t.label || meta.label) + '</div>' +
        '<div class="staff-grid">' + cards + '</div>' +
      '</div>';
  }

  function renderCard(m, meta) {
    var name = esc(m.displayName || m.username || 'Member');
    var handle = m.username ? '@' + esc(m.username) : '';
    var avatar = safeUrl(m.avatar) || 'assets/snowball-logo-transparent-small.png';
    // Background fills the whole card: prefer the banner, else the avatar (blurred + saturated in CSS).
    var bgUrl = safeUrl(m.banner) || safeUrl(m.avatar);
    var bg = bgUrl
      ? '<div class="staff-card-bg" style="background-image:url(\'' + bgUrl + '\')"></div>'
      : '<div class="staff-card-bg staff-card-bg-default"></div>';
    return '<article class="staff-card has-banner">' +
        bg +
        '<img class="staff-avatar" src="' + avatar + '" alt="" loading="lazy">' +
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
