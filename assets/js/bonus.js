/* Bonus games page: series-grouped grids */
(function () {
  "use strict";
  const N = window.NFS;
  N.mount();

  const SERIES_ORDER = ["Gran Turismo", "Midnight Club", "Tokyo Xtreme Racer"];

  function shortLabel(title) {
    const s = String(title).replace(/need for speed:?\s*/i, "").trim();
    return s || "NFS";
  }

  function codePlural(n) {
    if (n % 10 === 1 && n % 100 !== 11) return "код";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return "коди";
    return "кодів";
  }

  function gamePlural(n) {
    if (n % 10 === 1 && n % 100 !== 11) return "гра";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return "гри";
    return "ігор";
  }

  function gameCard(g) {
    const a = g.accent || ["#00e5ff", "#7b2bff"];
    const codes = N.codeCount(g);
    const hasCover = !!g.cover;
    const media = hasCover
      ? N.coverImage(g)
      : '<span class="cover-label">' + N.esc(shortLabel(g.title)) + "</span>";
    return '<a class="game-card" href="' + N.gameUrl(g.slug) + '">' +
      '<div class="cover' + (hasCover ? " has-cover" : "") + '" style="background:linear-gradient(135deg,' + a[0] + "," + a[1] + ')">' +
        media +
        '<span class="year-badge">' + g.year + "</span>" +
      "</div>" +
      '<div class="body">' +
        "<h3>" + N.esc(g.title) + "</h3>" +
        '<div class="meta">' + N.esc(g.developer || "") + " &middot; " +
          (codes ? codes + " " + codePlural(codes) : "коди згодом") + "</div>" +
        '<div class="platforms">' + N.platformBadges(g, 4) + "</div>" +
      "</div>" +
    "</a>";
  }

  function groupBySeries(list) {
    const by = {};
    const order = [];
    list.forEach(function (g) {
      const s = g.series || "Інші";
      if (!by[s]) { by[s] = []; order.push(s); }
      by[s].push(g);
    });
    order.sort(function (a, b) {
      const ia = SERIES_ORDER.indexOf(a);
      const ib = SERIES_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return order.map(function (name) { return { name: name, games: by[name] }; });
  }

  function seriesSection(grp) {
    const codes = grp.games.reduce(function (sum, g) { return sum + N.codeCount(g); }, 0);
    return '<section class="section">' +
      '<div class="wrap">' +
        '<div class="section-head">' +
          "<h2>" + N.esc(grp.name) + "</h2>" +
          '<span class="sub">' + grp.games.length + " " + gamePlural(grp.games.length) +
          " &middot; " + (codes ? codes + " " + codePlural(codes) : "коди згодом") + "</span>" +
        "</div>" +
        '<div class="grid-games">' + grp.games.map(gameCard).join("") + "</div>" +
      "</div>" +
    "</section>";
  }

  function emptyState(title, text) {
    return '<section class="section"><div class="wrap"><div class="empty-state">' +
      "<h3>" + title + "</h3>" + text + "</div></div></section>";
  }

  N.load().then(function () {
    const host = document.getElementById("bonusHost");
    const list = N.bonusGames();
    if (!list.length) {
      host.innerHTML = emptyState("Поки порожньо", "Бонусних ігор у базі ще немає.");
      return;
    }
    host.innerHTML = groupBySeries(list).map(seriesSection).join("");
  }).catch(function (err) {
    console.error(err);
    document.getElementById("bonusHost").innerHTML =
      emptyState("Не вдалося завантажити дані", "Запустіть сайт через локальний сервер (див. README).");
  });
})();
