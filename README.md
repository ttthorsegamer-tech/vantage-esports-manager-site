# VANTAGE Esports Manager — official website

Static bilingual French/English website served by GitHub Pages at https://vantageesportsmanager.xyz.

- Production source: the repository’s `main` branch.
- Local preview: `python3 -m http.server 8080` from this directory.
- All pages share `assets/style.css` and `assets/lang.js`.
- The selected language persists, and `?lang=fr` / `?lang=en` takes priority.
- Mobile navigation supports the menu button, Escape and outside clicks; navigation remains usable without JavaScript.
- The hero uses a WebP version of the existing logo. Its original PNG remains available for social previews.
- Music loads after interaction, with saved mute/volume settings and an 8% initial volume.
- Public Discord information lives at `/community/`. Set `DISCORD_INVITE` in `assets/lang.js` only to the owner's verified permanent invitation; until then the invitation request uses official support email.
- Change the CSS/script query version in all HTML pages when publishing later asset updates.

## 2.0.0 website refresh

Shared mobile navigation, lighter hero, updated tournament information, current match features, Discord community information, keyboard access, reduced motion, page titles and description cleanup. Legal page contents and account-deletion instructions are preserved.


## Public presentation — October 3, 2026

- Discord navigation and calls to action use the official white Discord symbol, preserved unchanged from the official branding page.
- `assets/app/` contains optimized WebP copies of existing VANTAGE application visuals. Keep their original aspect ratios.
- Public synergy pages explain the roles and encourage experimentation. Do not publish weapon-to-role bonus tables, percentages, caps or calculation formulas on the website.
- French and English content, the mobile menu, music preferences and the existing support/invitation flow remain available.
