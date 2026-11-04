/* Platforms page: overview + per-family / per-platform game lists */
(function () {
  "use strict";
  const N = window.NFS;
  N.mount();

  function shortLabel(title) {
    const s = String(title).replace(/need for speed:?\s*/i, "").trim();
    return s || "NFS";
  }

  function gameCard(g, count) {
    const a = g.accent || ["#00e5ff", "#7b2bff"];
    const codes = typeof count === "number" ? count : N.codeCount(g);
    const hasCover = !!g.cover;
    const media = hasCover
      ? N.coverImage(g)
      : '<span class="cover-label">' + N.esc(shortLabel(g.title)) + "</span>";
    return '<a class="game-card" href="' + N.gameUrl(g.slug) + '">' +
      '<div class="cover' + (hasCover ? " has-cover" : "") + '" style="background:linear-gradient(135deg,' + a[0] + "," + a[1] + ')">' +
        media +
        '<span class="year-badge">' + g.year + "</span>" +
      "</div>" +
      '<div class="body"><h3>' + N.esc(g.title) + "</h3>" +
        '<div class="meta">' + N.esc(g.developer || "") + " &middot; " +
          (codes ? codes + " " + N.pluralCode(codes) : "коди згодом") + "</div>" +
        '<div class="platforms">' + N.platformBadges(g, 4) + "</div>" +
      "</div></a>";
  }

  function codesFor(games, counter) {
    return games.reduce(function (n, g) {
      return n + (counter ? counter(g) : N.codeCount(g));
    }, 0);
  }

  function renderChips(activeSlug) {
    const box = document.getElementById("platformChips");
    let html = '<a class="chip' + (!activeSlug ? " is-active" : "") + '" href="platform.html">Усі</a>';
    N.data.families.forEach(function (f) {
      html += '<a class="chip' + (activeSlug === f.id ? " is-active" : "") +
        '" href="' + N.platformUrl(f.id) + '">' + N.esc(f.icon) + " " + N.esc(f.name) + "</a>";
    });
    box.innerHTML = html;
  }

  function overview() {
    document.getElementById("pTitle").textContent = "Платформи";
    document.getElementById("pSub").textContent = "Оберіть платформу, щоб побачити доступні ігри та коди.";

    let html = '<div class="section-head"><div><h2>Родини платформ</h2>' +
      '<p class="sub">Згруповано за виробником</p></div></div>';
    html += '<div class="platform-grid">' + N.data.families.map(function (f) {
      const games = N.gamesByFamily(f.id);
      const counter = function (g) { return N.familyCodeCount(g, f.id); };
      const total = codesFor(games, counter);
      return '<a class="platform-card" href="' + N.platformUrl(f.id) + '">' +
        '<div class="p-icon">' + N.esc(f.icon) + "</div>" +
        "<h3>" + N.esc(f.name) + "</h3>" +
        "<p>" + games.length + " " + N.pluralGame(games.length) + " у базі</p>" +
        '<div class="p-count">' + total + " " + N.pluralCode(total) + "</div>" +
      "</a>";
    }).join("") + "</div>";

    html += '<div class="section-head" style="margin-top:44px"><div><h2>Окремі платформи</h2>' +
      '<p class="sub">Точний вибір пристрою</p></div></div>';
    html += '<div class="platform-grid">' + N.data.platforms.map(function (p) {
      const games = N.gamesByPlatform(p.id);
      const counter = function (g) { return N.platformCodeCount(g, p.id); };
      const total = codesFor(games, counter);
      return '<a class="platform-card" href="' + N.platformUrl(p.id) + '">' +
        '<div class="p-icon">' + N.esc(p.icon) + "</div>" +
        "<h3>" + N.esc(p.name) + "</h3>" +
        "<p>" + (games.length ? games.length + " " + N.pluralGame(games.length) : "поки без ігор") + "</p>" +
        '<div class="p-count">' + total + " " + N.pluralCode(total) + "</div>" +
      "</a>";
    }).join("") + "</div>";

    document.getElementById("platformRoot").innerHTML = html;
  }

  function listGames(title, subtitle, games, crumbLabel, counter) {
    document.getElementById("pTitle").textContent = title;
    document.getElementById("pSub").textContent = subtitle;
    document.getElementById("breadcrumbs").innerHTML =
      '<a href="index.html">Головна</a> / <a href="platform.html">Платформи</a> / <span>' + N.esc(crumbLabel) + "</span>";

    const root = document.getElementById("platformRoot");
    if (!games.length) {
      root.innerHTML = '<div class="empty-state"><h3>Поки порожньо</h3>' +
        "Для цієї платформи ще немає ігор у базі. Оберіть іншу платформу.</div>";
      return;
    }
    const total = codesFor(games, counter);
    root.innerHTML =
      '<div class="section-head"><div><h2>' + N.esc(title) + "</h2>" +
      '<p class="sub">' + games.length + " " + N.pluralGame(games.length) + " &middot; " + total + " " + N.pluralCode(total) + "</p></div></div>" +
      '<div class="grid-games">' + games.map(function (g) {
        return gameCard(g, counter ? counter(g) : N.codeCount(g));
      }).join("") + "</div>";
  }

  N.load().then(function () {
    const slug = N.params().get("slug");
    renderChips(slug);

    if (!slug) { overview(); return; }

    const fam = N.family(slug);
    if (fam) {
      const games = N.gamesByFamily(slug).sort(function (a, b) { return a.year - b.year; });
      listGames(fam.name, "Усі ігри серії на платформах " + fam.name, games, fam.name, function (g) {
        return N.familyCodeCount(g, fam.id);
      });
      return;
    }

    const plat = N.platform(slug);
    if (plat) {
      const games = N.gamesByPlatform(slug).sort(function (a, b) { return a.year - b.year; });
      listGames(plat.name, "Ігри Need for Speed з підтримкою " + plat.name, games, plat.name, function (g) {
        return N.platformCodeCount(g, plat.id);
      });
      return;
    }

    overview();
  }).catch(function (err) {
    console.error(err);
    document.getElementById("platformRoot").innerHTML =
      '<div class="empty-state"><h3>Не вдалося завантажити дані</h3>Запустіть сайт через локальний сервер (див. README).</div>';
  });
})();
