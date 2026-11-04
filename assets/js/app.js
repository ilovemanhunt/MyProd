/* ==========================================================================
   NFS // CHEATBASE — shared application logic (vanilla JS, zero build)
   Exposes a single global: window.NFS
   ========================================================================== */
(function () {
  "use strict";

  const NFS = {};
  const FAMILY_CLASS = {
    pc: "f-pc",
    playstation: "f-playstation",
    xbox: "f-xbox",
    nintendo: "f-nintendo",
    mobile: "f-mobile"
  };

  /* ----------------------------------------------------------- utilities */
  NFS.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  NFS.familyClass = function (fam) { return FAMILY_CLASS[fam] || ""; };

  NFS.params = function () { return new URLSearchParams(window.location.search); };

  /* --------------------------------------------------------------- data */
  NFS.load = async function () {
    if (NFS.data) return NFS.data;
    try {
      const res = await fetch("data/games.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      NFS.data = await res.json();
    } catch (err) {
      // file:// fallback — data/games.js defines window.NFS_DATA
      if (window.NFS_DATA) {
        NFS.data = window.NFS_DATA;
      } else {
        throw err;
      }
    }
    NFS._index();
    return NFS.data;
  };

  NFS._index = function () {
    const d = NFS.data;
    d._platforms = {};
    d._families = {};
    d._eras = {};
    d._games = {};
    d.platforms.forEach(function (p) { d._platforms[p.id] = p; });
    d.families.forEach(function (f) { d._families[f.id] = f; });
    d.eras.forEach(function (e) { d._eras[e.id] = e; });
    d.games.forEach(function (g) { d._games[g.slug] = g; });
  };

  NFS.platform = function (id) { return NFS.data._platforms[id] || null; };
  NFS.family = function (id) { return NFS.data._families[id] || null; };
  NFS.era = function (id) { return NFS.data._eras[id] || null; };
  NFS.game = function (slug) { return NFS.data._games[slug] || null; };

  NFS.coverImage = function (game, alt) {
    if (!game || !game.cover) return "";
    return '<img class="cover-img" src="' + NFS.esc(game.cover) + '" alt="' +
      NFS.esc(alt || "") + '" loading="lazy" decoding="async">';
  };

  NFS.platformIds = function (game) { return Object.keys(game.platforms || {}); };

  NFS.platformList = function (game) {
    return NFS.platformIds(game).map(NFS.platform).filter(Boolean);
  };

  NFS.familiesOf = function (game) {
    const set = [];
    NFS.platformIds(game).forEach(function (pid) {
      const p = NFS.platform(pid);
      if (p && set.indexOf(p.family) === -1) set.push(p.family);
    });
    return set;
  };

  NFS.codeCount = function (game) {
    let n = 0;
    Object.keys(game.platforms || {}).forEach(function (pid) {
      n += (game.platforms[pid].codes || []).length;
    });
    return n;
  };

  NFS.pluralCode = function (n) {
    if (n % 10 === 1 && n % 100 !== 11) return "код";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return "коди";
    return "кодів";
  };

  NFS.pluralGame = function (n) {
    if (n % 10 === 1 && n % 100 !== 11) return "гра";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return "ігри";
    return "ігор";
  };

  NFS.platformCodeCount = function (game, pid) {
    const p = game.platforms && game.platforms[pid];
    return p ? (p.codes || []).length : 0;
  };

  NFS.familyCodeCount = function (game, fid) {
    let n = 0;
    NFS.platformIds(game).forEach(function (pid) {
      const p = NFS.platform(pid);
      if (p && p.family === fid) n += NFS.platformCodeCount(game, pid);
    });
    return n;
  };

  /* Основна база — лише ігри серії NFS; бонусні живуть в окремому розділі */
  NFS.coreGames = function () {
    return NFS.data.games.filter(function (g) { return !g.bonus; });
  };

  NFS.bonusGames = function () {
    return NFS.data.games.filter(function (g) { return !!g.bonus; });
  };

  NFS.gamesByFamily = function (fam) {
    return NFS.coreGames().filter(function (g) {
      return NFS.familiesOf(g).indexOf(fam) !== -1;
    });
  };

  NFS.gamesByPlatform = function (pid) {
    return NFS.coreGames().filter(function (g) {
      return NFS.platformIds(g).indexOf(pid) !== -1;
    });
  };

  NFS.popularGames = function () {
    return NFS.coreGames().slice().sort(function (a, b) {
      if (!!b.featured !== !!a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return b.year - a.year;
    });
  };

  NFS.recentGames = function () {
    return NFS.coreGames().slice().sort(function (a, b) {
      return String(b.lastUpdated || "").localeCompare(String(a.lastUpdated || ""));
    });
  };

  /* --------------------------------------------------------------- search */
  NFS.search = function (query) {
    const q = String(query || "").trim().toLowerCase();
    const out = { games: [], codes: [] };
    if (!q) return out;

    NFS.data.games.forEach(function (g) {
      const hay = (g.title + " " + g.slug + " " + g.year + " " + (g.developer || "")).toLowerCase();
      if (hay.indexOf(q) !== -1) out.games.push(g);
    });

    NFS.data.games.forEach(function (g) {
      Object.keys(g.platforms || {}).forEach(function (pid) {
        const p = g.platforms[pid];
        (p.codes || []).forEach(function (c) {
          const hay = (c.code + " " + c.name + " " + (c.effect || "") + " " + c.category).toLowerCase();
          if (hay.indexOf(q) !== -1) out.codes.push({ game: g, platformId: pid, code: c });
        });
      });
    });

    out.games = out.games.slice(0, 5);
    out.codes = out.codes.slice(0, 8);
    return out;
  };

  /* ------------------------------------------------------------ navigation */
  NFS.gameUrl = function (slug, platformId) {
    return "game.html?slug=" + encodeURIComponent(slug) +
      (platformId ? "&platform=" + encodeURIComponent(platformId) : "");
  };

  NFS.platformUrl = function (slug) {
    return "platform.html?slug=" + encodeURIComponent(slug);
  };

  /* ------------------------------------------------------ platform badges */
  NFS.platformBadges = function (game, limit) {
    const fams = NFS.familiesOf(game);
    const list = fams.slice(0, limit || 4);
    let html = list.map(function (fam) {
      const f = NFS.family(fam);
      if (!f) return "";
      return '<span class="badge ' + NFS.familyClass(fam) + '">' +
        NFS.esc(f.icon) + " " + NFS.esc(f.name) + "</span>";
    }).join("");
    if (fams.length > list.length) {
      html += '<span class="badge">+' + (fams.length - list.length) + "</span>";
    }
    if (!game.hasCodes) {
      html += '<span class="badge soon">коди згодом</span>';
    }
    return html;
  };

  /* ---------------------------------------------------------------- copy */
  NFS.copy = async function (text, btn) {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (e) { ok = false; }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (e) { ok = false; }
    }
    if (btn) {
      const original = btn.getAttribute("data-label") || btn.textContent;
      btn.setAttribute("data-label", original);
      btn.classList.toggle("is-copied", ok);
      btn.textContent = ok ? "Скопійовано" : "Не вдалось";
      window.setTimeout(function () {
        btn.classList.remove("is-copied");
        btn.textContent = original;
      }, 1400);
    }
    return ok;
  };

  /* ------------------------------------------------------- header + footer */
  const NAV = [
    { href: "index.html", key: "home", label: "Головна" },
    { href: "games.html", key: "games", label: "Ігри" },
    { href: "platform.html", key: "platforms", label: "Платформи" },
    { href: "bonus.html", key: "bonus", label: "Бонус" }
  ];

  NFS.mount = function () {
    const active = document.body.getAttribute("data-page") || "home";
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");

    if (header) {
      const nav = NAV.map(function (n) {
        return '<a class="nav-link' + (n.key === active ? " is-active" : "") +
          '" href="' + n.href + '">' + n.label + "</a>";
      }).join("");
      const mobile = NAV.map(function (n) {
        return '<a href="' + n.href + '">' + n.label + "</a>";
      }).join("");
      header.className = "site-header";
      header.innerHTML =
        '<div class="wrap"><div class="bar">' +
          '<a class="logo" href="index.html">' +
            '<span class="logo-mark">N</span>' +
            '<span class="logo-text">NFS<b>//</b>CHEATBASE</span>' +
          "</a>" +
          '<nav class="nav">' + nav + "</nav>" +
          '<button class="menu-btn" id="menuBtn" aria-label="Відкрити меню" aria-expanded="false">\u2630</button>' +
        "</div>" +
        '<div class="tagline"><b>\u2605</b> База чіт-кодів Need for Speed \u2014 з 1994 року <b>\u2605</b> Працює офлайн <b>\u2605</b> Кожен код із фанатських архівів <b>\u2605</b></div>' +
        '<div class="mobile-nav" id="mobileNav">' + mobile + "</div></div>";

      const btn = document.getElementById("menuBtn");
      const mn = document.getElementById("mobileNav");
      if (btn && mn) {
        btn.addEventListener("click", function () {
          const open = mn.classList.toggle("open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
      }
    }

    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="wrap"><div class="footer-grid">' +
          '<div class="note">' +
            '<strong class="font-display">NFS // CHEATBASE</strong><br>' +
            "Незалежний каталог чіт-кодів для серії Need for Speed. " +
            "Проєкт не пов\u2019язаний з Electronic Arts." +
          "</div>" +
          '<div class="spacer"></div>' +
          '<div class="footer-links">' +
            '<a href="index.html">Головна</a>' +
            '<a href="games.html">Ігри</a>' +
            '<a href="platform.html">Платформи</a>' +
            '<a href="bonus.html">Бонус</a>' +
            '<a href="README.md">README</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span class="hit-counter">Відвідувачів: <span class="hc-digits">1&nbsp;337&nbsp;042</span></span>' +
          '<span class="best-viewed">Найкраще видно в <b>Internet Explorer 6</b> при <b>1024&times;768</b></span>' +
          '<span class="copyright">&copy; 2005&mdash;2026 NFS // CHEATBASE \u00B7 усі права захищено</span>' +
        "</div></div>";
    }
  };

  /* ------------------------------------------------------- search widget */
  NFS.initSearch = function (input, results) {
    if (!input || !results) return;
    let activeIndex = -1;
    let items = [];

    function close() {
      results.hidden = true;
      results.innerHTML = "";
      activeIndex = -1;
      items = [];
    }

    function render() {
      const q = input.value.trim();
      if (!q) { close(); return; }
      const r = NFS.search(q);
      items = [];
      let html = "";

      if (r.games.length) {
        html += '<div class="search-group-label">Ігри</div>';
        r.games.forEach(function (g) {
          const idx = items.length;
          items.push({ url: NFS.gameUrl(g.slug) });
          const thumb = g.cover
            ? '<img class="si-thumb" src="' + NFS.esc(g.cover) + '" alt="" loading="lazy" decoding="async">'
            : "";
          html += '<div class="search-item" data-idx="' + idx + '">' +
            thumb +
            '<div class="si-main"><div class="si-title">' + NFS.esc(g.title) + "</div>" +
            '<div class="si-meta">' + g.year + " \u00B7 " + NFS.esc(g.developer || "") + "</div></div>" +
            '<span class="si-code">' + NFS.codeCount(g) + ' код.</span></div>';
        });
      }

      if (r.codes.length) {
        html += '<div class="search-group-label">Коди</div>';
        r.codes.forEach(function (c) {
          const idx = items.length;
          items.push({ url: NFS.gameUrl(c.game.slug, c.platformId) });
          const plat = NFS.platform(c.platformId);
          html += '<div class="search-item" data-idx="' + idx + '">' +
            '<div class="si-main"><div class="si-title">' + NFS.esc(c.code.name) + "</div>" +
            '<div class="si-meta">' + NFS.esc(c.game.title) + " \u00B7 " + NFS.esc(plat ? plat.name : c.platformId) + "</div></div>" +
            '<span class="si-code">' + NFS.esc(c.code.code) + "</span></div>";
        });
      }

      if (!html) html = '<div class="search-empty">Нічого не знайдено для \u00AB' + NFS.esc(q) + '\u00BB</div>';
      results.innerHTML = html;
      results.hidden = false;

      results.querySelectorAll(".search-item").forEach(function (el) {
        el.addEventListener("click", function () {
          const it = items[Number(el.getAttribute("data-idx"))];
          if (it) window.location.href = it.url;
        });
      });
    }

    function highlight(dir) {
      if (!items.length) return;
      activeIndex = (activeIndex + dir + items.length) % items.length;
      results.querySelectorAll(".search-item").forEach(function (el, i) {
        el.classList.toggle("is-active", i === activeIndex);
      });
    }

    input.addEventListener("input", render);
    input.addEventListener("focus", function () { if (input.value.trim()) render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); highlight(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); highlight(-1); }
      else if (e.key === "Enter") {
        const target = activeIndex > -1 ? items[activeIndex] : items[0];
        if (target) window.location.href = target.url;
      } else if (e.key === "Escape") { close(); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      if (!results.contains(e.target) && e.target !== input) close();
    });

    const clear = document.getElementById("searchClear");
    if (clear) clear.addEventListener("click", function () { input.value = ""; close(); input.focus(); });
  };

  window.NFS = NFS;
})();
