# NFS // CHEATBASE — генерація структур і кодів для нульового покриття

**Дата:** 28 жовтня 2026  
**Статус:** `applied / Variant C (структура)` — канонічні дані оновлено до `1.2.8`; UGR-кандидати **не додані**  
**База до застосування:** `data/games.json` **1.2.7** (42 гри, 699 кодів, 125 `unverified`, 108 platform-блоків)  
**Поточний стан:** `1.2.8` — 42 гри, 699 кодів, 125 `unverified`, **120 platform-блоків**  
**Примітка:** системний аудит починався з `1.2.6`; після нього застосовано Variant A (PC-блоки World/Unbound і Shift 2) і Variant C (структурні блоки без кодів).

> **Оновлення 2026-10-31:** усі шість NDS-блоків заповнено — 22 Action Replay-коди, див. `NDS-COVERAGE-2026-10-31.md`. Рядок Nitro у таблиці нижче та цифри `1.2.8 / 699` є історичним baseline на 28.10.2026; на 31.10.2026 дані — `1.3.0 / 721 код`, поточна версія — `1.5.1 / 721 код`.

---

## 0. TL;DR

- **Нових кодів `verified:true`: 0.** Жодна гра зі списку не має двох незалежних підтверджень.
- **5 кандидатів Underground Rivals (PSP)** із GameGenie — єдине джерело; GameFAQs не наводить жодного з них. Максимум `verified:false`, і лише після окремого рішення.
- **10 NFS-ігор без UGR** (Nitro, World, Hot Pursuit 2010, Shift 2, Most Wanted 2012, Rivals, NFS 2015, Payback, Heat, Unbound) не мають вбудованих чіт-кодів. Для них правильно залишити `codes: []`.
- **Структури вже є** для всіх 11 core-ігор зі списку. Неповні платформні набори виправлено у Variant C:
  - Hot Pursuit 2010: додано `ps3`, `xbox360`;
  - Rivals: додано `ps3`, `xbox360`;
  - Unbound: додано `ps4`, `xboxone`; `ps5`, `xboxseries`, `switch` відсутні в таксономії.
- **6 бонусних GT-ігор** (GT4 Prologue, GT5 Prologue, GT5, GT6, GT Sport, GT7) отримали platform-блоки без кодів.
- **Застосовано +12 platform-блоків без кодів** (6 core + 6 GT); **+5 кандидатів UGR не додані**.
- **Рекомендація:** структуру додано; UGR-кандидатів не додавати без ручного тесту або другого джерела.

---

## 1. Поточний стан

### 1.1. Основні NFS з нульовим покриттям

| Гра | Блоки в даних | Кодів | Стан структури | Що робити з кодами |
|---|---|---:|---|---|
| Underground Rivals (2005) | `psp` | 0 | блок є, але `howTo` каже «кодів немає» | 5 кандидатів `verified:false` — тільки за рішенням |
| Nitro (2009) | `wii`, `nds` | 0 | повна | залишити 0 |
| World (2010) | `pc` | 0 | повна | залишити 0 |
| Hot Pursuit 2010 | `pc`, `ps3`, `xbox360`, `wii` | 0 | повна (Variant C) | залишити 0 |
| Shift 2: Unleashed (2011) | `pc`, `ps3`, `xbox360` | 0 | повна | залишити 0 |
| Most Wanted 2012 | `pc`, `ps3`, `xbox360`, `wiiu`, `vita` | 0 | повна | залишити 0 |
| Rivals (2013) | `pc`, `ps3`, `xbox360`, `ps4`, `xboxone` | 0 | повна (Variant C) | залишити 0 |
| NFS 2015 | `pc`, `ps4`, `xboxone` | 0 | повна | залишити 0 |
| Payback (2017) | `pc`, `ps4`, `xboxone` | 0 | повна | залишити 0 |
| Heat (2019) | `pc`, `ps4`, `xboxone` | 0 | повна | залишити 0 |
| Unbound (2022) | `pc`, `ps4`, `xboxone` | 0 | повна для наявної таксономії (Variant C); `ps5`/`xboxseries`/`switch` немає в таксономії | залишити 0 |

### 1.2. Бонусні GT з нульовим покриттям

| Гра | Блоки в даних | Кодів | Стан структури | Що робити з кодами |
|---|---|---:|---|---|
| Gran Turismo 4 Prologue | `ps2` | 0 | додано (Variant C) | залишити 0 |
| Gran Turismo 5 Prologue | `ps3` | 0 | додано (Variant C) | залишити 0 |
| Gran Turismo 5 | `ps3` | 0 | додано (Variant C) | залишити 0 |
| Gran Turismo 6 | `ps3` | 0 | додано (Variant C) | залишити 0 |
| Gran Turismo Sport | `ps4` | 0 | додано (Variant C) | залишити 0 |
| Gran Turismo 7 | `ps4` | 0 | додано (Variant C); `ps5` немає в таксономії | залишити 0 |

---

## 2. Результати перевірки джерел

### 2.1. Underground Rivals (PSP)

**GameGenie** подає 5 комбінацій кнопок. Сторінка каже «Enter … as a code», але не уточнює, у якому меню/на якому екрані це робити.

| # | Категорія | Назва | Код | Ефект за джерелом | Статус |
|---:|---|---|---|---|---|
| 1 | Ігровий процес | Прискорення x2, крутний момент x6, потужність x2, керованість x9 | `L1 L1 L1 R1 R1 R1 ◀ ▶` | Acceleration x2, Torque x6, Power x2, Handling x9, All Type Grip x99000000 | `verified:false` |
| 2 | Автомобілі | DJ Wes — Chevrolet Corvette Z06 | `R1 R1 R2 R2 ▶ ▶ ◀ ◀` | Відкриває авто DJ Wes | `verified:false` |
| 3 | Автомобілі | GT King — Nissan Skyline R34 GTR | `L1 L1 L2 L2 ◀ ◀ ▶ ▶` | Відкриває авто GT King | `verified:false` |
| 4 | Автомобілі | Tank — 1969 Dodge Charger | `R1 L1 R2 L2 ▶ ◀ ▶ ◀` | Відкриває авто Tank | `verified:false` |
| 5 | Автомобілі | Triple Dub — Subaru Impreza WRX STi | `L1 R1 L2 R2 ◀ ▶ ◀ ▶` | Відкриває авто Triple Dub | `verified:false` |

> GameGenie пише «DJ Wess»; GameFAQs і поширена назва — «DJ Wes». У даних використано «DJ Wes».

**Чому не `verified:true`:**

- GameGenie — одне user-submitted джерело, не офіційна документація.
- GameFAQs для тієї ж гри наводить лише glitches і способи відкриття boss-авто; жодної комбінації кнопок немає.
- NFS Wiki не має розділу чит-кодів для цієї гри.
- Немає підтвердження на реальній PSP або емуляторі.
- Поточний `howTo` у даних каже «вбудованих чіт-кодів немає»; якщо додавати кандидатів, цей текст треба замінити, інакше сторінка суперечитиме сама собі.

**Висновок:** не додавати як `verified:true`. Якщо додавати — тільки `verified:false`, з чесним `howTo`, після ручного тесту або другого джерела.

### 2.2. Інші NFS (без UGR)

Перевірено сторінки NFS Wiki (Fandom) через `action=parse&prop=wikitext`:

- Nitro
- World
- Hot Pursuit (2010)
- Most Wanted (2012)
- Rivals
- NFS (2015)
- Payback
- Heat
- Unbound
- Shift 2: Unleashed

У wikitext немає змістовних згадок `cheat` або `password`. Поодинокі `code` — це «codename» розробки або бінарний код у трейлері, а не чит-код. Для цих ігор правильно залишити `codes: []`.

### 2.3. Бонусні GT

Перевірено GT Wiki (Fandom) для GT4 Prologue, GT5 Prologue, GT5, GT6, GT Sport, GT7. Змістовних чит-кодів немає. У GT5 згадуються anti-cheat/save locking і редагування save-файлів — це не чіт-коди і не додається.

---

## 3. Застосовані структури (без кодів)

Ці зміни не додають жодного коду. Вони лише роблять сторінки повнішими. **Variant C застосовано 28.10.2026.**

### 3.1. Hot Pursuit 2010 — додано `ps3`, `xbox360`

```json
"nfs-hot-pursuit-2010": {
  "platforms": {
    "ps3": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — автомобілі та події відкриваються через кар'єру."
      ],
      "codes": []
    },
    "xbox360": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — автомобілі та події відкриваються через кар'єру."
      ],
      "codes": []
    }
  }
}
```

### 3.2. Rivals — додано `ps3`, `xbox360`

```json
"nfs-rivals": {
  "platforms": {
    "ps3": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — прогрес відкривається через SpeedLists і завдання."
      ],
      "codes": []
    },
    "xbox360": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — прогрес відкривається через SpeedLists і завдання."
      ],
      "codes": []
    }
  }
}
```

### 3.3. Unbound — додано `ps4`, `xboxone`

```json
"nfs-unbound": {
  "platforms": {
    "ps4": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру та онлайн-сезони."
      ],
      "codes": []
    },
    "xboxone": {
      "input": "buttons",
      "howTo": [
        "Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру та онлайн-сезони."
      ],
      "codes": []
    }
  }
}
```

**Обмеження:** `ps5`, `xboxseries`, `switch` у таксономії відсутні. Це окрема зміна схеми, а не просто блоки.

### 3.4. GT-ігри — додано по одному блоку

```json
[
  {
    "slug": "gran-turismo-4-prologue",
    "platforms": {
      "ps2": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру."],
        "codes": []
      }
    }
  },
  {
    "slug": "gran-turismo-5-prologue",
    "platforms": {
      "ps3": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру."],
        "codes": []
      }
    }
  },
  {
    "slug": "gran-turismo-5",
    "platforms": {
      "ps3": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру."],
        "codes": []
      }
    }
  },
  {
    "slug": "gran-turismo-6",
    "platforms": {
      "ps3": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру."],
        "codes": []
      }
    }
  },
  {
    "slug": "gran-turismo-sport",
    "platforms": {
      "ps4": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру та онлайн-сезони."],
        "codes": []
      }
    }
  },
  {
    "slug": "gran-turismo-7",
    "platforms": {
      "ps4": {
        "input": "buttons",
        "howTo": ["Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру та онлайн-сезони."],
        "codes": []
      }
    }
  }
]
```

**Примітка:** платформні сторінки зараз використовують `NFS.coreGames()`, тому бонусні GT-блоки з'являться на сторінках ігор, але не на платформних сторінках, доки не буде перемикача «включно з бонусом».

---

## 4. Кандидати Underground Rivals (не застосовано)

Це **не** підтверджені коди. Вони **не додані** в `data/games.json`; додавати лише за окремим рішенням, з `verified:false`.

```json
"nfs-underground-rivals": {
  "platforms": {
    "psp": {
      "input": "buttons",
      "howTo": [
        "Комбінації вводяться кнопками PSP у грі.",
        "GameGenie подає їх як послідовність натискань; точне місце введення (меню/екран) у джерелі не вказане.",
        "Це кандидати з одним джерелом, тому вони позначені як «не перевірено»."
      ],
      "codes": [
        {
          "category": "Ігровий процес",
          "name": "Прискорення x2, крутний момент x6, потужність x2, керованість x9",
          "code": "L1 L1 L1 R1 R1 R1 ◀ ▶",
          "effect": "Acceleration x2, Torque x6, Power x2, Handling x9, All Type Grip x99000000",
          "verified": false
        },
        {
          "category": "Автомобілі",
          "name": "DJ Wes — Chevrolet Corvette Z06",
          "code": "R1 R1 R2 R2 ▶ ▶ ◀ ◀",
          "effect": "Відкриває авто DJ Wes",
          "verified": false
        },
        {
          "category": "Автомобілі",
          "name": "GT King — Nissan Skyline R34 GTR",
          "code": "L1 L1 L2 L2 ◀ ◀ ▶ ▶",
          "effect": "Відкриває авто GT King",
          "verified": false
        },
        {
          "category": "Автомобілі",
          "name": "Tank — 1969 Dodge Charger",
          "code": "R1 L1 R2 L2 ▶ ◀ ▶ ◀",
          "effect": "Відкриває авто Tank",
          "verified": false
        },
        {
          "category": "Автомобілі",
          "name": "Triple Dub — Subaru Impreza WRX STi",
          "code": "L1 R1 L2 R2 ◀ ▶ ◀ ▶",
          "effect": "Відкриває авто Triple Dub",
          "verified": false
        }
      ]
    }
  }
}
```

Якщо колись застосовувати цей блок (зараз — ні):

- `nfs-underground-rivals.hasCodes` → `true`;
- `lastUpdated` → `2026-10-28`;
- кількість кодів: **704**, core: **555**, PSP: **43**, `unverified`: **130**, core `unverified`: **72**;
- **жоден новий код не стає `verified:true`**.
- Поточний `codeRow()` ігнорує `platform.input`, але ці коди містять `L/R` і стрілки, тому евристика все одно відрендерить їх як keycaps.

---

## 5. Вплив на дані

| Сценарій | Ігор | Кодів | Core-кодів | PSP-кодів | `unverified` | Блоків | `verified:true` |
|---|---:|---:|---:|---:|---:|---:|---:|
| До C (`1.2.7`) | 42 | 699 | 550 | 38 | 125 | 108 | — |
| C застосовано (`1.2.8`) | 42 | 699 | 550 | 38 | 125 | **120** | 0 |
| Лише UGR-кандидати (гіпотетично) | 42 | **704** | **555** | **43** | **130** | 108 | 0 |
| C + UGR (гіпотетично) | 42 | **704** | **555** | **43** | **130** | **120** | 0 |

Додатково:

- Hot Pursuit 2010 + Rivals: core-ігор на PS3 стало **9**, на Xbox 360 — **9**.
- Unbound: core-ігор на PS4 стало **5**, на Xbox One — **5**.
- GT-блоки: бонусні блоки `ps2` +1, `ps3` +3, `ps4` +2; на core-лічильники платформних сторінок не впливають.

---

## 6. Джерела

- GameGenie — Underground Rivals (PSP):  
  `https://www.gamegenie.com/cheats/psp/nfsundergroundrivals.html`
- GameFAQs — Underground Rivals (PSP), Cheats:  
  `https://gamefaqs.gamespot.com/psp/920772-need-for-speed-underground-rivals/cheats`
- NFS Wiki (Fandom):
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Nitro`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_World`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Hot_Pursuit_(2010)`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Most_Wanted_(2012)`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Rivals`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed_(2015)`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Payback`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Heat`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Unbound`
  - `https://needforspeed.fandom.com/wiki/Shift_2:_Unleashed`
  - `https://needforspeed.fandom.com/wiki/Need_for_Speed:_Underground_-_Rivals`
- Gran Turismo Wiki (Fandom):
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_4_Prologue`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_5_Prologue`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_5`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_6`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_Sport`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_7`

Дата доступу: **28.10.2026**.

---

## 7. Рішення

1. **A — залишити як є.** Нові коди не додаються; структура core-ігор уже є.
2. **B — додати 5 кандидатів UGR** з `verified:false` (не рекомендую без ручного тесту). **Не застосовано.**
3. **C — додати лише структуру:** Hot Pursuit 2010 (`ps3`, `xbox360`), Rivals (`ps3`, `xbox360`), Unbound (`ps4`, `xboxone`) і 6 GT-блоків. **Застосовано 28.10.2026.**
4. **D — B + C.** **Не застосовано.**

**Рекомендація:** **C** — виконано. Це дає повніші сторінки без жодного вигаданого коду. UGR-кандидатів залишено в карантині, доки не буде ручного тесту або другого джерела.

---

## 8. Чекліст застосування

- [x] `data/games.json`: додано лише структурні блоки, без кодів.
- [x] `data/games.js`: перегенеровано точним дзеркалом.
- [x] `meta.version` → `1.2.8`, `meta.updated` → `2026-10-28`.
- [x] `?v=` у 5 HTML → `18`.
- [x] README: додано примітку про структуру; лічби кодів не змінилися.
- [x] Перевірено: mirror, duplicate slugs, platform refs, `hasCodes`, code/category duplicates, counts.
- [x] Перевірено сторінки: UGR, HP2010, Rivals, Unbound, GT, платформи PS3/Xbox 360/PS4/Xbox One.
- [x] UGR не підвищено до `verified:true`; кандидатів не додано.
