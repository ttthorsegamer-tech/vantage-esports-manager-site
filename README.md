# VANTAGE Esports Manager — official website

Static bilingual French/English website served by GitHub Pages at https://vantageesportsmanager.xyz.

- Production source: the repository’s `main` branch.
- Local preview: `python3 -m http.server 8080` from this directory.
- All pages share `assets/style.css` and `assets/lang.js`.
- The selected language persists, and `?lang=fr` / `?lang=en` takes priority.
- Mobile navigation supports the menu button, Escape and outside clicks; navigation remains usable without JavaScript.
- The hero uses a WebP version of the existing logo. Its original PNG remains available for social previews.
- Music loads after interaction, with saved mute/volume settings and an 8% initial volume.
- Public Discord information lives at `/community/`. Its Join Discord button uses the owner's verified public invitation in both HTML and `DISCORD_INVITE` in `assets/lang.js`, and works without JavaScript. The invitation currently has a 30-day expiry; renew it before it expires. It does not assign the Tester role or expose private test channels.
- Change the CSS/script query version in all HTML pages when publishing later asset updates.

## 2.0.0 website refresh

Shared mobile navigation, lighter hero, updated tournament information, current match features, Discord community information, keyboard access, reduced motion, page titles and description cleanup. Legal page contents and account-deletion instructions are preserved.


## Public presentation — October 3, 2026

- Discord navigation and calls to action use the official white Discord symbol, preserved unchanged from the official branding page.
- `assets/app/` contains optimized WebP copies of existing VANTAGE application visuals. Keep their original aspect ratios.
- Public synergy pages explain the roles and encourage experimentation. Do not publish weapon-to-role bonus tables, percentages, caps or calculation formulas on the website.
- French and English content, the mobile menu, music preferences and the existing support/invitation flow remain available.

## 2.0.2 website update — October 3, 2026

- The home page presents version 2.0.2 and accurately states that its OTA publication is pending.
- Current tournament entry fees and formats are shown in French and English: daily 5,000 / 16; new weekly 10,000 / 32; next Major 25,000 including 5,000 to the shared pool / Top 64 with unlimited registration. Old runs retain their format.
- The weekly champion reward is 250,000 in-game cash; the shared pool belongs to the next Major.
- The community invitation opens Discord directly instead of requesting an invitation by email. Account and purchase support email links remain available.

## 2.0.3 website update — October 3, 2026

- The owner confirmed OTA 2.0.3 is deployed and available for testers.
- The home page presents corrected Nova, crate images and Battle Pass premium icons in French and English.
- Daily entries contribute 1,500 and weekly entries 3,500 in-game cash to the next Major pool.
- Five server-recorded qualifiers against the same opponent series determine the 64 playoff spots, with fresh qualification each edition and frozen standings after the deadline.
- The next native build is 2.1.0 and remains forthcoming. When available on the testing track, testers must update the app through Google Play rather than the in-game menu; that build becomes the next OTA baseline.

## 2.1.0 version baseline — October 3, 2026

- The home page and its English description now present VANTAGE 2.1.0 as the new baseline.
- French and English release status says migration/build preparation is in progress; it does not claim the native build or an OTA 2.1.0 is already available.
- Testers must install the native 2.1.0 update through Google Play once it is available on the test track.
- Add the public Google Play download link only after public publication.
- Existing skin, tournament, community and synergy content remains in place.


## 2.1.1 release notes — October 3, 2026

- Runtime/native baseline remains Android 2.1.0; OTA patch 2.1.1 is prepared, NOT published on Expo yet. Server academy/tutorial fixes are deployed.
- Home summaries and bilingual `/updates/` notes cover tutorial validation/retry, academy training/PP, server synchronization and account/interface fixes.
- Notes distinguish confirmed server deployment, build validation and pending OTA/phone validation.
- Existing public Discord invitation, app artwork, prior tournament/skin corrections, synergy discovery and legal content are retained.


## 2.1.2 release announcement — October 3, 2026

- Owner is publishing OTA 2.1.2; home and bilingual release notes announce availability for testers on runtime/native baseline 2.1.0.
- Cover 24-hour council contracts, Media Campaign at 25,000 in-game cash, owned equipped club frames and the dismissible Battle Pass preview.
- Cumulative tutorial, academy and server improvements retained. Public source package and private tester channel are not linked.
- Promotional artwork includes an app preview; phone testing continues with testers.


## 3.0 launch presentation — October 4, 2026

- Owner requested presenting the full 3.0 launch as enabled for closed testers.
- Home, discovery and bilingual release notes cover Finance bank tiers, weekly repayment, voluntary bankruptcy, permanent Black, new Superstars at 100–200 and uncapped ticket training with gradual match gains.
- Dedicated 3.0 campaign artwork is shared with the tester announcement; 2.1.2 notes are archived at `/updates/2-1-2/`.
- Website publication does not deploy the game backend or submit its Android build. No public Play download link is added.


## Public game presentation — October 5, 2026

- Home, discovery and updates now introduce all core systems in French and English: club and academy, tactics and staff, training and Be A Pro, Season/PvP/tournaments, Arena, Vault, finance and session rewards.
- Premium World Elite Vantage is presented as the eighth division after Global Elite.
- The new public campaign includes the original VANTAGE logo and a bespoke black/blue/gold team illustration. Pages use WebP without cropping; social previews use the full PNG.
- Closed-test access, the existing public Discord invitation, language switching, navigation, music preferences and legal pages remain in place. Public Play availability is not asserted.
- Black pricing is left to the actual Google Play purchase screen; its permanent +25% limit and normal repayment rules are retained.


## Premium update — October 5, 2026

- `/updates/#premium-update` presents the premium update for closed testers in French and English: match highlights (ACE, 1vN CLUTCH, victory, defeat), remodeled shop with fixed tabs, sticky tabs on the main screens, “+” shortcuts (Shards → Shop, cash → Bank/Black), last-drop skin image, premium Settings icons, “AP Store” tab and quieter Google Play purchase prompts.
- VANTAGE Black now adds **+100 %** to the unlocked credit limit: 2 M Bronze, 4 M Silver, 6 M Gold, 8 M Platinum, 10 M Diamond. The old +25 % wording was replaced on the home, discovery and updates pages (the production database migration `20261005063000_black_limit_x2` was applied the same day).
- `assets/vantage-update-premium-{fr,en}.{webp,png}` is the announcement visual shared with the tester Discord channel (built from in-game assets). Pages use WebP without cropping; PNG is kept for social previews.
- The home page shows a short “new” banner linking to the update notes. No stylesheet or script changed, so the CSS/script query versions are unchanged.
- Website publication does not publish the Android OTA itself; the in-game update path is Settings › Version and updates.

## Official release preparation — October 7, 2026

- Home presents the public launch, game modes and actual Battle Pass artwork with a bilingual release section and FAQ.
- Public availability is still forthcoming; announce the date and Google Play link only when confirmed.
- Latest launch news is at `/updates/#lancement`. Support and community copy are public-facing.
- Reward WebP files are optimized copies of app assets. Account deletion, privacy, music preferences and Discord invitation are retained.
