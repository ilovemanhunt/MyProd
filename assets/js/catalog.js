/* Games catalog page */
(function () {
  "use strict";
  const N = window.NFS;
  N.mount();

  let familyFilter = "all";

  function shortLabel(title) {
    const s = String(title).replace(/need for speed:?\s*/i, "").trim();
    return s || "NFS";
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
          (codes ? codes + " " + N.pluralCode(codes) : "коди згодом") + "</div>" +
        '<div class="platforms">' + N.platformBadges(g, 4) + "</div>" +
      "</div>" +
    "</a>";
  }

  function matchesFamily(g) {
    return familyFilter === "all" || N.familiesOf(g).indexOf(familyFilter) !== -1;
  }

  function render() {
    const box = document.getElementById("catalog");
    let html = "";
    N.data.eras.forEach(function (era) {
      const games = N.data.games
        .filter(function (g) { return g.era === era.id && !g.bonus && matchesFamily(g); })
        .sort(function (a, b) { return a.year - b.year; });

      html += '<div class="era-block">' +
        '<div class="era-head">' +
          "<h3>" + N.esc(era.name) + "</h3>" +
          '<span class="era-range">' + N.esc(era.range) + "</span>" +
          '<span class="era-line"></span>' +
          '<span class="era-range">' + games.length + " " + plural(games.length) + "</span>" +
        "</div>";
      html += games.length
        ? '<div class="grid-games">' + games.map(gameCard).join("") + "</div>"
        : '<div class="era-empty">Ігор для цього фільтра ще немає в базі.</div>';
      html += "</div>";
    });
    box.innerHTML = html;
  }

  function plural(n) {
    if (n % 10 === 1 && n % 100 !== 11) return "гра";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return "ігри";
    return "ігор";
  }

  function renderChips() {
    const box = document.getElementById("catalogChips");
    let html = '<button class="chip is-active" data-family="all">Усі</button>';
    N.data.families.forEach(function (f) {
      html += '<button class="chip" data-family="' + f.id + '">' +
        N.esc(f.icon) + " " + N.esc(f.name) + "</button>";
    });
    box.innerHTML = html;
    box.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        box.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        familyFilter = chip.getAttribute("data-family");
        render();
      });
    });
  }

  N.load().then(function () {
    renderChips();
    render();
    N.initSearch(document.getElementById("catalogSearch"), document.getElementById("searchResults"));
  }).catch(function (err) {
    console.error(err);
    document.getElementById("catalog").innerHTML =
      '<div class="empty-state"><h3>Не вдалося завантажити дані</h3>Запустіть сайт через локальний сервер (див. README).</div>';
  });
})();
