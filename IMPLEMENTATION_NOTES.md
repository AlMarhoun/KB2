# Implementation Notes

## Summary

This project is a copied and upgraded version of:

`00 Input/Kuwait Bourse Calculator V2/`

Output project:

`00 output/Kuwait Bourse Calculator Mobile PWA/`

The upgrade keeps the existing Kuwait Bourse Calculator identity and calculator behavior, while improving the app-like mobile PWA experience.

## What Was Changed

- Added a premium animated splash screen.
- Added real-logo PWA icon assets.
- Updated PWA manifest metadata.
- Updated HTML app icon links and Apple mobile metadata.
- Added a small production service worker for installability and app-shell caching.
- Improved mobile safe-area handling.
- Improved mobile header density and tap targets.
- Improved mobile bottom navigation spacing and active state.
- Improved desktop navigation tap targets without changing the desktop model.
- Improved calculator screen spacing, input density, and mobile layout.
- Improved result card responsiveness and action layout.
- Added a small Home Screen saveability note on the home page.
- Preserved the existing responsive navigation behavior:
  - desktop/wide screens use top navigation
  - mobile/small screens use bottom navigation

## What Was Preserved

- Existing React/Vite framework.
- Existing Tailwind/CSS-variable styling system.
- Existing logo and brand direction.
- Existing Arabic-first bilingual behavior.
- Existing RTL/LTR handling.
- Existing dark/light theme handling.
- Existing calculator modules:
  - Ex-price
  - Dividend
  - Average cost
- Existing history drawer behavior.
- Existing share/copy/reset features.
- Existing formula disclosure.
- Existing financial formulas and calculation behavior.

## Calculator Logic

The calculator logic was preserved 100%.

Verified by comparing:

`src/lib/calculators.ts`

against the original source file. It is byte-for-byte unchanged.

## Key Files Modified

- `index.html`
- `public/manifest.json`
- `public/sw.js`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `public/icons/maskable-512.png`
- `public/icons/apple-touch-icon.png`
- `public/icons/favicon-32.png`
- `public/brand/logo-source.png`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/components/layout/SplashScreen.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/BottomNav.tsx`
- `src/components/home/HomePage.tsx`
- `src/components/shared/SmartInput.tsx`
- `src/components/shared/UnitToggle.tsx`
- `src/components/shared/ResultCard.tsx`
- `src/components/calculators/ExPriceCalculator.tsx`
- `src/components/calculators/DividendCalculator.tsx`
- `src/components/calculators/AverageCostCalculator.tsx`

## Animated Splash Screen

Location:

`src/components/layout/SplashScreen.tsx`

Supporting styles:

`src/index.css`

How it works:

- The splash appears on initial app load.
- Normal duration is about 2.1 seconds.
- Reduced-motion duration is shorter and visually calmer.
- The logo fades/scales into place.
- Subtle numeric/ticker particles move in the background.
- A light sweep passes behind the logo.
- Arabic app name, English subtitle, and optional Arabic subtitle appear below.
- The splash exits using `AnimatePresence` and Framer Motion.

Reduced motion:

- Uses `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- CSS disables background ticker/sweep animations under `prefers-reduced-motion`.

## PWA Manifest and Icons

Manifest:

`public/manifest.json`

Icon files:

- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `public/icons/maskable-512.png`
- `public/icons/apple-touch-icon.png`
- `public/icons/favicon-32.png`

Source logo reference:

`public/brand/logo-source.png`

The icons were generated from the existing logo. No new logo or unrelated brand was created.

## Service Worker

Location:

`public/sw.js`

Registration:

`src/main.tsx`

Behavior:

- Registers only in production builds.
- Caches the app shell and PWA icons.
- Uses same-origin GET request caching.
- Falls back to cached root when network is unavailable.

This is intentionally lightweight to avoid destabilizing calculator behavior.

## Assumptions Made

- The app should remain a Vite/React PWA.
- The current three calculator modules remain the primary navigation items.
- The existing logo should be used as-is, with only square cropping/resizing for app icon assets.
- Desktop should remain a polished web app, not become a mobile-only layout.

## Issues Found

- The original manifest used inline generic `KB` SVG icons instead of the existing real logo.
- The existing app was mobile-aware, but still had a website-like first impression.
- The mobile header had a lot of content for small screens.
- Calculator forms were usable but could benefit from larger mobile tap/input rhythm.

No calculator formula issue was changed.

## Verification Performed

- `npm install`
- `npm run build`
- Local Vite server launched successfully at `http://127.0.0.1:4174/`
- Root HTML returned HTTP 200.
- Manifest returned valid JSON.
- PWA icon files exist and have expected sizes.
- Calculator logic file confirmed unchanged from original.

## Future Improvements Recommended

- Produce hand-designed maskable icons with more generous safe-zone padding.
- Add a true browser-based Lighthouse PWA audit after deployment.
- Add small automated calculation regression tests for the pure calculator functions.
- Add a dedicated History screen in a future version if the app grows beyond three calculators.
- Consider a first-run onboarding flow only after validating user behavior.
