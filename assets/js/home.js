/* Home page logic */
(function () {
  "use strict";
  const N = window.NFS;
  N.mount();

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

  function updateRow(g) {
    const a = g.accent || ["#00e5ff", "#7b2bff"];
    const plats = N.platformList(g).map(function (p) { return p.name; }).join(", ") || "—";
    return '<a class="update-row" href="' + N.gameUrl(g.slug) + '">' +
      '<span class="dot" style="color:' + a[0] + ";background:" + a[0] + '"></span>' +
      '<div class="u-main">' +
        '<div class="u-title">' + N.esc(g.title) + " <span class=\"muted\">(" + g.year + ")</span></div>" +
        '<div class="u-meta">' + N.esc(plats) + " &middot; " + N.codeCount(g) + " " + N.pluralCode(N.codeCount(g)) + "</div>" +
      "</div>" +
      '<span class="u-date">' + N.esc(g.lastUpdated || g.added || "") + "</span>" +
    "</a>";
  }

  function renderPopular(familyFilter) {
    const grid = document.getElementById("popularGrid");
    let list = N.popularGames();
    if (familyFilter && familyFilter !== "all") {
      list = list.filter(function (g) { return N.familiesOf(g).indexOf(familyFilter) !== -1; });
    }
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state"><h3>Порожньо</h3>Для цієї платформи ще немає ігор у базі.</div>';
      return;
    }
    grid.innerHTML = list.map(gameCard).join("");
  }

  function renderChips() {
    const box = document.getElementById("familyChips");
    const total = N.coreGames().length;
    let html = '<button class="chip is-active" data-family="all">Усі <span class="cnt">' + total + "</span></button>";
    N.data.families.forEach(function (f) {
      const cnt = N.gamesByFamily(f.id).length;
      html += '<button class="chip" data-family="' + f.id + '">' +
        N.esc(f.icon) + " " + N.esc(f.name) + ' <span class="cnt">' + cnt + "</span></button>";
    });
    box.innerHTML = html;
    box.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        box.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        renderPopular(chip.getAttribute("data-family"));
        document.getElementById("popularGrid").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderStats() {
    let codes = 0;
    N.coreGames().forEach(function (g) { codes += N.codeCount(g); });
    document.getElementById("statGames").textContent = N.coreGames().length;
    document.getElementById("statCodes").textContent = codes;
    document.getElementById("statPlatforms").textContent = N.data.platforms.length;
  }

  N.load().then(function () {
    renderStats();
    renderChips();
    renderPopular("all");
    N.initSearch(document.getElementById("heroSearch"), document.getElementById("searchResults"));

    const recent = N.recentGames().slice(0, 5);
    document.getElementById("recentList").innerHTML = recent.map(updateRow).join("");
  }).catch(function (err) {
    console.error(err);
    document.getElementById("popularGrid").innerHTML =
      '<div class="empty-state"><h3>Не вдалося завантажити дані</h3>' +
      "Запустіть сайт через локальний сервер (див. README).</div>";
  });
})();
