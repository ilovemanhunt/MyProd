# NDS coverage — 2026-10-31

## Result

Added **22 Action Replay codes** to the six Nintendo DS platform blocks that previously had no codes:

| Game | Codes | Verified | Region / Game ID |
|------|------:|---------:|------------------|
| Need for Speed: Underground 2 | 6 | 6 | USA / `AUGE-0C567405` |
| Need for Speed: Most Wanted | 5 | 5 | USA |
| Need for Speed: Carbon: Own the City | 3 | 3 | USA / `AN7E-D14147DF` |
| Need for Speed: ProStreet | 5 | 4 | USA / `YNPE-7294AF99` |
| Need for Speed: Undercover | 2 | 0 | USA `CNDP-4669CFBB`; EU variant |
| Need for Speed: Nitro | 1 | 1 | EU `BNNP-dd62d851`; same address reported for USA `BNNE-76C4C084` |
| **Total** | **22** | **19** | |

The three unverified codes are:

- ProStreet — «Вимкнути суперників (ШІ)»: only Neoseeker.
- Undercover — Max Cash (USA): only Neoseeker.
- Undercover — Max Cash (EU): only HookedGamers.

No code was invented. Codes with two independent sources were marked `verified: true` only when the
exact same address/value lines appeared in both sources.

## Sources

- **CodeJunkies** — Action Replay code pages for Underground 2, Most Wanted, Carbon: Own the City
  and ProStreet.
- **Neoseeker** — Action Replay pages for all six games.
- **Cheat Happens** — Nitro, EU `Disable AI` (`020c0714 e12fff1e`).
- **HookedGamers** — Undercover, EU `Max Cash` (`021f33f8 05f00000`).

The NDS blocks are curated, not exhaustive: individual car-purchase codes and individual paint
colour codes from the larger CodeJunkies lists were deliberately left out. The high-level codes
(max money/points, all cars/stages, event completion and gameplay toggles) were selected instead.

## Data changes

- `meta.version`: `1.3.0`
- `meta.updated`: `2026-10-31`
- `meta.note`: added CodeJunkies, Cheat Happens and HookedGamers.
- All six NDS blocks now use `input: "text"` and explain Action Replay / emulator setup.
- `nfs-nitro.hasCodes` changed from `false` to `true`.
- `lastUpdated` set to `2026-10-31` for the six affected games.
- `data/games.js` regenerated as an exact mirror of `data/games.json`.
- HTML cache versions bumped from `?v=20` to `?v=21`.

## Validation

- 42 games, 721 codes, 128 unverified.
- Core: 25 games, 572 codes, 70 unverified.
- Bonus: 17 games, 149 codes, 58 unverified.
- 120 platform blocks, 48 empty, 16 games without any codes.
- Mirror equality, unique slugs, platform references, `hasCodes`, duplicate `(code, category)` and
  HTML `?v=` checks passed.
- Browser smoke tests: all six NDS game pages show the expected number of codes with zero console
  errors; copy button, home, catalog, platforms, NDS platform page and bonus page checked.
