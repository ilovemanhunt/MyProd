# NFS // CHEATBASE — нульове покриття: дослідження та пропозиція

**Дата:** 24 жовтня 2026  
**Статус:** `applied / Variant A + C (структура)`  
**Застосовано:** PC-блоки для `NFS World` і `NFS Unbound`; `Shift 2: Unleashed` (PC/PS3/Xbox 360) без кодів. 28.10.2026 — структура Hot Pursuit 2010 (PS3/Xbox 360), Rivals (PS3/Xbox 360), Unbound (PS4/Xbox One) і шести GT-ігор.  
**Не застосовано:** 5 кандидатів Underground Rivals — залишено в карантині.  
**Канонічні дані:** `data/games.json` оновлено до `1.2.8`; `data/games.js` синхронізовано.

> Розділи 4.1–4.3 застосовано. Розділ 4.4 (GT-платформи) застосовано 28.10.2026 у Variant C (структура); 5.2 (коди Underground Rivals) — ні.
>
> **28.10.2026:** пакет структур/кандидатів — `ZERO-COVERAGE-GENERATION-2026-10-28.md`; Variant C (структура) застосовано, UGR-кандидати — ні.

---

## 0. TL;DR

- **Підтверджених двома незалежними джерелами нових чіт-кодів: 0.**
- Для **10 NFS-ігор** (Nitro, World, Hot Pursuit 2010, Most Wanted 2012, Rivals, NFS 2015, Payback, Heat, Unbound, а також Shift 2) у відкритих джерелах **немає вбудованих чіт-кодів**. Це не прогалина даних, а властивість самих ігор.
- Для **Underground Rivals (PSP)** є **5 кандидатів** із GameGenie (комбінації кнопок). Це **одне джерело**; GameFAQs для цієї гри не наводить жодного коду, лише glitches/unlockables. Тому набір не можна вважати підтвердженим.
- Для **6 бонусних GT-ігор** (GT4 Prologue, GT5 Prologue, GT5, GT6, GT Sport, GT7) вбудованих чіт-кодів не знайдено. GT5/GT6 мають save-editing/hybriding, але це не чіт-коди.
- **Структурні прогалини (на момент дослідження):** `NFS World` і `NFS Unbound` не мали жодного platform-блоку; `Shift 2: Unleashed` був відсутній у каталозі; GT-ігри без платформ; у таксономії немає PS5 / Xbox Series / Switch. **Застосовано:** World/Unbound отримали PC-блоки, Shift 2 додано; 28.10.2026 додано структуру HP2010/Rivals/Unbound і GT. Нові платформи — ні.
- **Рекомендація:** не додавати вигадані коди. Структуру застосовано; кандидати Underground Rivals залишено в карантині.

---

## 1. Методика

Перевірено:

- `data/games.json` — поточні блоки, кількості, `hasCodes`, `howTo`;
- **NFS Wiki (Fandom)** — сторінки ігор через API, пошук слів `cheat`, `code`, `password`, `unlock`;
- **GameFAQs** — сторінка читів для Underground Rivals;
- **GameGenie** — єдина знайдена сторінка з конкретними комбінаціями для Underground Rivals;
- **Gran Turismo Wiki (Fandom)** — сторінки GT4 Prologue, GT5 Prologue, GT5, GT6, GT Sport, GT7.

Дата доступу до джерел: **24.10.2026**.

Що **не** входить у це дослідження:

- коди для чит-пристроїв (Action Replay, CodeBreaker, Gecko, CWCheat) — це окремий формат і окрема перевірка;
- trainers, save-editing, hex-редагування, glitches;
- промокоди та сезонні нагороди (NFS World, Unbound);
- коди, які потребують конкретної версії гри/регіону, без підтвердження версії.

Критерій:

1. Є конкретний код і спосіб його введення.
2. Є **два незалежні** джерела → `verified:true`.
3. Одне джерело → максимум `verified:false`.
4. Джерела суперечать або код неможливо перевірити → **не додавати**.

> Важливо: відсутність згадки коду на сторінці не доводить, що коду не існує. Але вона не дає права вигадувати код. Для цієї задачі краще залишити «0 кодів», ніж додати фальшивку.

---

## 2. Результати по іграх

### 2.1. Основні NFS

| Гра | Платформи в даних | Кодів зараз | Що показали джерела | Висновок |
|---|---|---:|---|---|
| **Underground Rivals** (2005) | PSP | 0 | GameGenie: 5 комбінацій кнопок; GameFAQs: лише glitches і способи відкриття boss-авто, кодів немає; NFS Wiki: без розділу читів | **5 кандидатів, одне джерело → карантин / максимум `verified:false`** |
| **Nitro** (2009) | Wii, NDS | 0 | NFS Wiki: немає згадок cheat/code/password; розблокування — зірками та проходженням | Вбудованих кодів немає; **0 — правильно** |
| **World** (2010) | PC | 0 | NFS Wiki: немає чит-кодів; це F2P-гра з промокодами/сезонами | Вбудованих кодів немає; **PC-блок додано** |
| **Hot Pursuit 2010** | PC, Wii | 0 | NFS Wiki: немає чит-кодів; авто/події відкриваються кар'єрою | **0 — правильно** |
| **Most Wanted 2012** | PC, PS3, Xbox 360, Wii U, Vita | 0 | NFS Wiki: немає чит-кодів; є Limited Edition/DLC, не коди | **0 — правильно** |
| **Rivals** (2013) | PC, PS4, Xbox One | 0 | NFS Wiki: немає чит-кодів; прогрес через SpeedLists/завдання | **0 — правильно** |
| **NFS 2015** | PC, PS4, Xbox One | 0 | NFS Wiki: немає чит-кодів; авто купуються за ігрову валюту | **0 — правильно** |
| **Payback** (2017) | PC, PS4, Xbox One | 0 | NFS Wiki: немає чит-кодів; прогрес/відкриття через кар'єру | **0 — правильно** |
| **Heat** (2019) | PC, PS4, Xbox One | 0 | NFS Wiki: немає чит-кодів; прогрес через репутацію/події | **0 — правильно** |
| **Unbound** (2022) | PC | 0 | NFS Wiki: немає чит-кодів; авто/прогрес через гру та онлайн-сезони | **0 — правильно; PC-блок додано; PS4/Xbox One/PS5/XS/Switch не додані** |
| **Shift 2: Unleashed** (2011) | PC, PS3, Xbox 360 | 0 | NFS Wiki: сторінка без жодної згадки cheat/code/password; платформи PC/PS3/Xbox 360 | **Гру додано як `hasCodes:false`, без кодів** |

### 2.2. Бонусні серії

| Гра | Платформи в даних | Кодів зараз | Що показали джерела | Висновок |
|---|---|---:|---|---|
| Gran Turismo 4 Prologue | — | 0 | GT Wiki: без чит-кодів | 0 — правильно; опційно додати PS2-блок |
| Gran Turismo 5 Prologue | — | 0 | GT Wiki: без чит-кодів | 0 — правильно; опційно PS3-блок |
| Gran Turismo 5 | — | 0 | GT Wiki: без чит-кодів; згадується anti-cheat/save locking, не коди | 0 — правильно; опційно PS3-блок |
| Gran Turismo 6 | — | 0 | GT Wiki: без чит-кодів | 0 — правильно; опційно PS3-блок |
| Gran Turismo Sport | — | 0 | GT Wiki: без чит-кодів | 0 — правильно; опційно PS4-блок |
| Gran Turismo 7 | — | 0 | GT Wiki: без чит-кодів | 0 — правильно; опційно PS4-блок; PS5 відсутній у таксономії |
| Інші Gran Turismo | ps1/ps2/psp | 72 | Поточні коди вже є | Нових підтверджених не знайдено |
| Midnight Club (4 гри) | ps2/psp/ps3/xbox/xbox360/pc | 75 | Поточні коди вже є | Нових підтверджених не знайдено |
| Street Supremacy | psp | 2 | Поточні коди вже є | Нових підтверджених не знайдено |

---

## 3. Кандидати Underground Rivals (PSP)

Джерело: **GameGenie.com**, сторінка `Need For Speed Underground Rivals` (PSP), доступ 24.10.2026.  
URL: `https://www.gamegenie.com/cheats/psp/nfsundergroundrivals.html`

GameGenie подає їх як комбінації, які треба «ввести як код». Точне місце введення на сторінці не описане.

| # | Категорія | Назва | Код | Ефект за джерелом | Статус |
|---:|---|---|---|---|---|
| 1 | Ігровий процес | Прискорення x2, крутний момент x6, потужність x2, керованість x9 | `L1 L1 L1 R1 R1 R1 ◀ ▶` | Acceleration x2, Torque x6, Power x2, Handling x9, All Type Grip x99000000 | `verified:false` |
| 2 | Автомобілі | DJ Wess — Chevrolet Corvette Z06 | `R1 R1 R2 R2 ▶ ▶ ◀ ◀` | Відкриває авто DJ Wess | `verified:false` |
| 3 | Автомобілі | GT King — Nissan Skyline R34 GTR | `L1 L1 L2 L2 ◀ ◀ ▶ ▶` | Відкриває авто GT King | `verified:false` |
| 4 | Автомобілі | Tank — 1969 Dodge Charger | `R1 L1 R2 L2 ▶ ◀ ▶ ◀` | Відкриває авто Tank | `verified:false` |
| 5 | Автомобілі | Triple Dub — Subaru Impreza WRX STi | `L1 R1 L2 R2 ◀ ▶ ◀ ▶` | Відкриває авто Triple Dub | `verified:false` |

### 3.1. Чому це не `verified:true`

- GameGenie — **одне** джерело. Це user-submitted архів, не офіційна документація.
- GameFAQs для тієї ж гри наводить **лише** glitches і способи відкриття boss-авто; серед них немає жодної комбінації кнопок.
- NFS Wiki не має розділу чит-кодів для цієї гри.
- Немає підтвердження, що комбінації працюють на реальній PSP або емуляторі.
- Поточний `howTo` у даних каже: «PSP-ексклюзив — вбудованих чіт-кодів немає». Якщо додавати кандидатів, цей текст треба змінити, інакше сторінка суперечитиме сама собі.

### 3.2. Рішення

**Рекомендую карантин:** не додавати ці 5 кодів у `games.json`, доки хтось не перевірить їх вручну на грі та не знайде друге незалежне джерело. Якщо все ж додавати — тільки `verified:false`, з поясненням у `howTo`, і після ручного тесту.

---

## 4. Запропоновані структурні зміни (без кодів)

Ці зміни не додають жодного коду. Вони роблять сторінки чеснішими й повнішими.

### 4.1. NFS World — PC-блок (додано)

```json
"nfs-world": {
  "platforms": {
    "pc": {
      "input": "text",
      "howTo": [
        "Онлайн-гра; сервери закрито у 2015 році. Вбудованих чіт-кодів немає.",
        "Промокоди та сезонні нагороди не є чіт-кодами і не додаються до каталогу."
      ],
      "codes": []
    }
  }
}
```

### 4.2. NFS Unbound — PC-блок (додано)

```json
"nfs-unbound": {
  "platforms": {
    "pc": {
      "input": "text",
      "howTo": [
        "Вбудованих чіт-кодів немає — автомобілі та прогрес відкриваються через гру та онлайн-сезони."
      ],
      "codes": []
    }
  }
}
```

**Окремо:** у таксономії немає `ps5`, `xboxseries`, `switch`. Тому Unbound не може мати повний набір платформ. Це зміна схеми, а не просто кодів; потребує окремого рішення.

### 4.3. Shift 2: Unleashed — гру додано

```json
{
  "slug": "nfs-shift-2-unleashed",
  "title": "Shift 2: Unleashed",
  "year": 2011,
  "developer": "Slightly Mad Studios",
  "publisher": "Electronic Arts",
  "era": "mid",
  "featured": false,
  "hasCodes": false,
  "added": "2026-10-24",
  "lastUpdated": "2026-10-24",
  "accent": ["#ff8a00", "#3a0ca3"],
  "blurb": "Трековий симулятор від Slightly Mad Studios; продовження Need for Speed: Shift.",
  "platforms": {
    "pc": {
      "input": "text",
      "howTo": ["Вбудованих чіт-кодів немає — прогрес і авто відкриваються через гру."],
      "codes": []
    },
    "ps3": {
      "input": "text",
      "howTo": ["Вбудованих чіт-кодів немає."],
      "codes": []
    },
    "xbox360": {
      "input": "text",
      "howTo": ["Вбудованих чіт-кодів немає."],
      "codes": []
    }
  }
}
```

### 4.4. GT-ігри — опційно

Можна додати platform-блоки без кодів:

- GT4 Prologue → `ps2`
- GT5 Prologue → `ps3`
- GT5 → `ps3`
- GT6 → `ps3`
- GT Sport → `ps4`
- GT7 → `ps4` (PS5 відсутній у таксономії)

Це покращить сторінки, але не додасть жодного коду. Робити лише за окремим дозволом.

---

## 5. Вплив на дані (Variant A застосовано)

### 5.1. Лише структура (World + Unbound + Shift 2) — застосовано 24.10.2026

| Показник | Було | Стало (Variant A) |
|---|---:|---:|
| Усього ігор | 41 | **42** |
| Основних ігор | 24 | **25** |
| Бонусних ігор | 17 | 17 |
| Усього кодів | 699 | 699 |
| Platform-блоків | 103 | **108** |
| Core-ігор на PC | 20 | **23** |
| Core-ігор на PS3 | 6 | **7** |
| Core-ігор на Xbox 360 | 6 | **7** |

Після **Variant C (структура)** (28.10.2026): **120 platform-блоків**; core-ігор на PS3 — **9**, на Xbox 360 — **9**, на PS4 — **5**, на Xbox One — **5**.

Виконано 2026-10-24:

- `meta.version` → `1.2.7`, `meta.updated` → `2026-10-24` — виконано;
- `?v=16` → `?v=17` у 5 HTML — виконано;
- README: 24→25, додано примітку про Shift 2 — виконано;
- `data/games.js` перегенеровано — виконано;
- каталог, сторінка Shift 2 і платформні сторінки — перевірено.

### 5.2. 5 кандидатів Underground Rivals — не застосовано

| Показник | Було | Якби додали |
|---|---:|---:|
| Усього кодів | 699 | **704** |
| Core-кодів | 550 | **555** |
| PSP-кодів | 38 | **43** |
| Усього `unverified` | 125 | **130** |
| Core `unverified` | 67 | **72** |
| `hasCodes` для Underground Rivals | false | **true** |

Якби додавали:

- `psp.input` → `buttons` (бо це комбінації кнопок);
- `howTo` для PSP переписати, щоб він не казав «кодів немає»;
- оновити README-лічильники;
- перевірити рендеринг: зараз `codeRow()` ігнорує `platform.input`, тому кнопкові коди все одно будуть keycaps;
- після ручного тесту або другого джерела можна змінити `verified` на `true`.

### 5.3. Разом із UGR (не застосовано)

- 42 гри, 704 коди, 25 core-ігор, 130 unverified;
- але **жоден новий код не є `verified:true`**.

---

## 6. Рекомендація (Variant A застосовано)

### Варіант A — застосовано

1. **Не додано** 5 кандидатів Underground Rivals без ручного тесту.
2. Додано структуру для `NFS World` і `NFS Unbound` (PC-блоки без кодів).
3. Додано `Shift 2: Unleashed` як гру без кодів.
4. GT-платформи не додано — окреме рішення.
5. Оновлено версії, дзеркало, README; сторінки перевірено.

**Результат:** каталог повніший, жодних вигаданих кодів, нульові сторінки мають чесне пояснення.

### Варіант B — не застосовано

Плюс 5 кодів Underground Rivals з `verified:false` **після ручного тесту**. Якщо тест не вдався — не додавати.

### Варіант C (історичний) — чит-пристрої

> **Термінологічна примітка (28.10.2026):** у новому пакеті `ZERO-COVERAGE-GENERATION-2026-10-28.md` «Variant C» означає **структуру** HP2010/Rivals/Unbound + GT, а не чит-пристрої з цього розділу.

Окремий проєкт: Action Replay / CodeBreaker / Gecko / CWCheat коди для Nitro (NDS/Wii), Underground Rivals (PSP) тощо. Це потребує:

- точних версій гри та регіону;
- перевірки на емуляторі/консолі;
- окремої категорії `Чит-пристрої` або поля `format`;
- другого джерела для кожного коду.

Не змішувати з вбудованими чіт-кодами.

---

## 7. Джерела

- GameGenie — Underground Rivals (PSP):  
  `https://www.gamegenie.com/cheats/psp/nfsundergroundrivals.html`
- GameFAQs — Underground Rivals (PSP), Cheats:  
  `https://gamefaqs.gamespot.com/psp/920772-need-for-speed-underground-rivals/cheats`
- NFS Wiki (Fandom) — сторінки:
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Nitro`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_World`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Hot_Pursuit_(2010)`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Most_Wanted_(2012)`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Rivals`
  - `https://nfs.fandom.com/wiki/Need_for_Speed_(2015)`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Payback`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Heat`
  - `https://nfs.fandom.com/wiki/Need_for_Speed:_Unbound`
  - `https://nfs.fandom.com/wiki/Shift_2:_Unleashed`
- Gran Turismo Wiki (Fandom):
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_4_Prologue`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_5_Prologue`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_5`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_6`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_Sport`
  - `https://gran-turismo.fandom.com/wiki/Gran_Turismo_7`

---

## 8. Рішення та статус

Обрано варіант **A** — лише структура, без кодів.

1. **A — застосовано:** World, Unbound, Shift 2.
2. **B — не застосовано:** 5 кандидатів Underground Rivals залишено в карантині.
3. **C — не обрано.**
4. **D — не застосовано:** GT-платформи залишено на потім.

Що зроблено:

- змінено `data/games.json` і синхронізовано `data/games.js`;
- оновлено `meta.version` до `1.2.7`, `?v=` до `17`, README-лічби;
- перевірено дзеркало, дублікати, посилання, підрахунки й ключові сторінки;
- підготовлено diff і звіт.
