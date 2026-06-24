/* Fetches donators.json (published by Snowball's /moderation donatorsync) and renders
   current Donator-role members with sorting options and donation amount pills. */
(function () {
  var root = document.getElementById('donator-roster');
  if (!root) return;
  if (!window.fetch) { showError(); return; }

  var currentSort = 'alpha';
  var allMembers = [];

  fetch('donators.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.tiers)) { showError(); return; }
      data.tiers.forEach(function (tier) {
        if (tier && Array.isArray(tier.members)) allMembers = allMembers.concat(tier.members);
      });
      if (!allMembers.length) { showEmpty(); return; }
      preloadThenRender(allMembers);
    })
    .catch(function () { showError(); });

  function getSorted(sort) {
    var arr = allMembers.slice();
    if (sort === 'amount') {
      arr.sort(function (a, b) {
        var av = typeof a.amount === 'number' ? a.amount : -1;
        var bv = typeof b.amount === 'number' ? b.amount : -1;
        return bv - av;
      });
    } else if (sort === 'recent') {
      arr.sort(function (a, b) {
        var at = a.joinedAt ? new Date(a.joinedAt).getTime() : 0;
        var bt = b.joinedAt ? new Date(b.joinedAt).getTime() : 0;
        return bt - at;
      });
    } else {
      arr.sort(function (a, b) {
        var an = (a.displayName || a.username || '').toLowerCase();
        var bn = (b.displayName || b.username || '').toLowerCase();
        return an < bn ? -1 : an > bn ? 1 : 0;
      });
    }
    return arr;
  }

  function applySort(sort) {
    currentSort = sort;
    document.querySelectorAll('.donator-sort-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.sort === sort);
    });
    var grid = root.querySelector('.staff-grid-donator');
    if (!grid) return;
    var sorted = getSorted(sort);
    grid.innerHTML = sorted.map(function (m, i) { return renderCard(m, i + 1); }).join('');
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
      root.innerHTML = renderWall(getSorted(currentSort));
      root.querySelectorAll('.donator-sort-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { applySort(btn.dataset.sort); });
      });
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
      + '<div class="donator-sort-bar">'
      + '<button class="donator-sort-btn active" data-sort="alpha">Alphabetical</button>'
      + '<button class="donator-sort-btn" data-sort="amount">Most Donated</button>'
      + '<button class="donator-sort-btn" data-sort="recent">Recent</button>'
      + '</div>'
      + '<div class="staff-grid staff-grid-donator">' + cards + '</div>'
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
    return '<article class="staff-card has-banner" style="--i:' + i + '">'
      + bg
      + '<img class="staff-avatar" src="' + avatar + '" alt="">'
      + '<span class="staff-name">' + name + '</span>'
      + (handle ? '<span class="staff-handle">' + handle + '</span>' : '')
      + amountPill
      + '</article>';
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
