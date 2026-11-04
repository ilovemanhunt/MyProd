/* Single game page: info block, platform tabs, code list */
(function () {
  "use strict";
  const N = window.NFS;
  N.mount();

  const CATEGORY_ICON = {
    "Головний код": "\u{1F511}",
    "Гроші": "\u{1F4B0}",
    "Очки та репутація": "\u2B50",
    "Автомобілі": "\u{1F3CE}",
    "Апгрейди": "\u{1F527}",
    "Вініли": "\u{1F3A8}",
    "Спонсори": "\u{1F4E3}",
    "Ігровий процес": "\u2699",
    "Комбінації в меню": "\u{1F3AE}",
    "Треки": "\u{1F5FA}"
  };

  function shortLabel(title) {
    const s = String(title).replace(/need for speed:?\s*/i, "").trim();
    return s || "NFS";
  }

  function notFound() {
    document.getElementById("gameRoot").innerHTML =
      '<div class="empty-state" style="margin-top:20px">' +
        "<h3>Гру не знайдено</h3>" +
        "Схоже, такого slug немає в базі. <a class=\"text-neon\" href=\"games.html\">Повернутись до каталогу</a>." +
      "</div>";
  }

  function renderHero(g, codesTotal) {
    const a = g.accent || ["#00e5ff", "#7b2bff"];
    const era = N.era(g.era);
    const plats = N.platformList(g);
    const hasCover = !!g.cover;
    const cover = hasCover
      ? N.coverImage(g, "Обкладинка " + g.title)
      : N.esc(shortLabel(g.title));
    return '<div class="game-hero">' +
      '<div class="game-cover' + (hasCover ? " has-cover" : "") + '" style="background:linear-gradient(135deg,' + a[0] + "," + a[1] + ')">' +
        cover +
      "</div>" +
      "<div>" +
        '<h1 class="font-display" style="margin:0 0 4px;font-size:clamp(1.5rem,3.4vw,2.2rem)">' + N.esc(g.title) + "</h1>" +
        '<p class="game-blurb">' + N.esc(g.blurb || "") + "</p>" +
        '<div class="game-facts">' +
          fact("Рік", g.year) +
          fact("Розробник", g.developer || "—") +
          fact("Видавець", g.publisher || "—") +
          fact("Епоха", era ? era.name : "—") +
          fact("Кодів", codesTotal) +
        "</div>" +
        '<div class="platforms" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:16px">' +
          (g.bonus ? '<span class="badge">\u2605 бонус-гра</span>' : "") +
          (plats.length ? plats.map(function (p) {
            return '<a class="badge ' + N.familyClass(p.family) + '" href="' + N.platformUrl(p.id) + '">' +
              N.esc(p.icon) + " " + N.esc(p.name) + "</a>";
          }).join("") : '<span class="badge soon">коди згодом</span>') +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function fact(label, value) {
    return '<div class="fact"><div class="f-lbl">' + N.esc(label) + '</div><div class="f-val">' + N.esc(value) + "</div></div>";
  }

  function renderTabs(g, activePid) {
    const pids = N.platformIds(g);
    if (!pids.length) return "";
    return '<div class="tabs" role="tablist">' + pids.map(function (pid) {
      const p = N.platform(pid);
      const cnt = N.platformCodeCount(g, pid);
      const active = pid === activePid ? " is-active" : "";
      return '<button class="tab' + active + '" role="tab" data-pid="' + pid + '">' +
        N.esc(p ? p.short : pid) + ' <span class="cnt">' + cnt + "</span></button>";
    }).join("") + "</div>";
  }

  function renderBody(g, pid) {
    const platform = g.platforms[pid];
    const p = N.platform(pid);
    if (!platform) return "";

    let html = "";

    // Instructions
    if (platform.howTo && platform.howTo.length) {
      html += '<div class="howto"><h3>Як ввести код (' + N.esc(p ? p.name : pid) + ")</h3><ol>" +
        platform.howTo.map(function (s) { return "<li>" + N.esc(s) + "</li>"; }).join("") +
        "</ol></div>";
    }

    const codes = platform.codes || [];
    if (!codes.length) {
      html += '<div class="era-empty">' +
        (platform.howTo && platform.howTo.length
          ? "Окремих вбудованих чіт-кодів для цієї платформи немає — деталі розблокування вище."
          : "Для цієї платформи коди ще не додані.") +
        "</div>";
      return html;
    }

    // Group by category (keep first-seen order)
    const order = [];
    const groups = {};
    codes.forEach(function (c) {
      if (!groups[c.category]) { groups[c.category] = []; order.push(c.category); }
      groups[c.category].push(c);
    });

    order.forEach(function (cat) {
      const list = groups[cat];
      html += '<div class="code-group">' +
        '<div class="code-group-head"><h3>' + (CATEGORY_ICON[cat] ? CATEGORY_ICON[cat] + " " : "") + N.esc(cat) + "</h3>" +
        '<span class="cnt">' + list.length + " код.</span></div>" +
        '<div class="code-list">' + list.map(function (c) { return codeRow(c, platform); }).join("") + "</div></div>";
    });

    return html;
  }

  // A platform can mix plain-text codes (passwords, CWCheat/CodeBreaker
  // lines) with button sequences, so platform.input alone is not enough.
  // Detect obvious text formats first; use the platform hint as a fallback.
  const BUTTON_TOKEN = /^(?:[\u25B2\u25BC\u25C0\u25B6\u2190\u2191\u2192\u2193\u25A1\u25B3\u25EF\u2715\u2716]|L[1-3]|R[1-3]|LB|LT|LS|RB|RS|BLK|WHT|Select|Start|Right Shift|Left Shift|Shift|Ctrl|Alt|Space|Enter|Tab|C|B|A|X|Y|Z|L|R|1|2)$/i;

  function isTextCode(code) {
    const s = String(code).trim();
    return /^_L\s/i.test(s) ||
      /^_M\s/i.test(s) ||
      /^EAC\s/i.test(s) ||
      s.indexOf("\n") !== -1 ||
      /^[0-9A-F]{8}(?:\s+[0-9A-F]{4,8})+$/i.test(s) ||
      (/^[0-9A-F]{4,16}$/i.test(s) && /\d/.test(s));
  }

  function buttonTokens(code) {
    return String(code).match(/Right Shift|Left Shift|[^\s]+/gi) || [];
  }

  function isButtonCode(code) {
    const s = String(code).trim();
    if (!s || isTextCode(s)) return false;
    const tokens = buttonTokens(s);
    return tokens.length > 0 && tokens.every(function (t) { return BUTTON_TOKEN.test(t); });
  }

  function codeRow(c, platform) {
    const preferButtons = platform && platform.input === "buttons";
    const isButtons = c.format === "buttons" ||
      (c.format !== "text" && (isButtonCode(c.code) ||
        (preferButtons && /\s/.test(String(c.code)) && !isTextCode(c.code))));
    const valueHtml = isButtons
      ? '<div class="code-buttons">' + buttonTokens(c.code).map(function (t) {
          return '<span class="kbd">' + N.esc(t) + "</span>";
        }).join("") + "</div>"
      : '<div class="code-value">' + N.esc(c.code) + "</div>";

    const unverified = c.verified === false ? ' <span class="badge soon">не перевірено</span>' : "";

    return '<div class="code-row">' +
      '<div class="code-info"><div class="code-name">' + N.esc(c.name) + unverified + "</div>" +
        (c.effect ? '<div class="code-effect">' + N.esc(c.effect) + "</div>" : "") + "</div>" +
      valueHtml +
      '<button class="copy-btn" type="button" data-code="' + N.esc(c.code) + '">Копіювати</button>' +
    "</div>";
  }

  function wireCopy(scope) {
    scope.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        N.copy(btn.getAttribute("data-code"), btn);
      });
    });
  }

  N.load().then(function () {
    const slug = N.params().get("slug");
    const g = slug ? N.game(slug) : null;
    if (!g) { notFound(); return; }

    document.title = g.title + " — чіт-коди | NFS // CHEATBASE";
    document.getElementById("breadcrumbs").innerHTML =
      '<a href="index.html">Головна</a> / <a href="games.html">Ігри</a> / <span>' + N.esc(g.title) + "</span>";

    const pids = N.platformIds(g);
    let preferred = N.params().get("platform");
    if (pids.indexOf(preferred) === -1) {
      // pick first platform that actually has codes
      preferred = pids.filter(function (pid) { return N.platformCodeCount(g, pid) > 0; })[0] || pids[0];
    }

    const root = document.getElementById("gameRoot");
    root.innerHTML = renderHero(g, N.codeCount(g)) +
      '<div id="tabsHolder">' + (pids.length ? renderTabs(g, preferred) : "") + "</div>" +
      '<div id="bodyHolder"></div>';

    const bodyHolder = document.getElementById("bodyHolder");

    function show(pid) {
      bodyHolder.innerHTML = renderBody(g, pid);
      wireCopy(bodyHolder);
    }

    if (pids.length) {
      show(preferred);
      document.getElementById("tabsHolder").addEventListener("click", function (e) {
        const tab = e.target.closest(".tab");
        if (!tab) return;
        document.querySelectorAll("#tabsHolder .tab").forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        show(tab.getAttribute("data-pid"));
      });
    } else {
      bodyHolder.innerHTML = '<div class="era-empty" style="margin-top:24px">' +
        "Для цієї гри коди ще не додані. Заходьте пізніше — база постійно оновлюється.</div>";
    }
  }).catch(function (err) {
    console.error(err);
    notFound();
  });
})();
