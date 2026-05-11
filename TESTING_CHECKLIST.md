# Testing Checklist

## Desktop Responsive Test

- [x] App builds successfully.
- [ ] Open at 1440px width.
- [ ] Confirm desktop top navigation appears.
- [ ] Confirm mobile bottom navigation is hidden.
- [ ] Confirm home page cards align cleanly.
- [ ] Confirm calculator forms do not stretch awkwardly.
- [ ] Confirm footer remains readable.

## Mobile Responsive Test

- [ ] Open at 390x844 or similar mobile viewport.
- [ ] Confirm bottom navigation appears.
- [ ] Confirm desktop nav is hidden.
- [ ] Confirm no horizontal scrolling.
- [ ] Confirm header text does not overlap controls.
- [ ] Confirm bottom nav does not cover content.
- [ ] Confirm tap targets feel comfortable.

## PWA Installability Check

- [x] Manifest exists at `public/manifest.json`.
- [x] Manifest references PNG icons.
- [x] `display` is `standalone`.
- [x] `start_url` is `/`.
- [x] `theme_color` and `background_color` are set.
- [x] Apple touch icon exists.
- [x] Service worker exists.
- [ ] Run Lighthouse PWA audit after deployment.
- [ ] Test Add to Home Screen on iOS Safari.
- [ ] Test Install App on Android Chrome.

## Splash Screen Check

- [x] Splash component exists.
- [x] Splash uses existing logo.
- [x] Splash duration is around 2.1 seconds in normal motion mode.
- [ ] Confirm splash appears on fresh load.
- [ ] Confirm splash transitions smoothly to home.
- [ ] Confirm splash does not reappear during internal navigation.

## Reduced Motion Check

- [x] Reduced-motion media query is respected in CSS.
- [x] App detects reduced-motion preference.
- [x] Splash duration shortens for reduced motion.
- [ ] Test with OS reduced motion enabled.

## RTL Check

- [x] Existing Arabic/RTL setup preserved.
- [ ] Confirm Arabic layout is RTL on first load.
- [ ] Confirm English switches to LTR.
- [ ] Confirm directional icons mirror correctly where needed.
- [ ] Confirm numbers remain readable.

## Calculator Logic Check

- [x] `src/lib/calculators.ts` is unchanged from original.
- [ ] Ex-price calculator: enter closing price and bonus, calculate result.
- [ ] Ex-price calculator: test all adjustment type chips.
- [ ] Dividend calculator: test shares, cash dividend, bonus shares.
- [ ] Average cost calculator: test current and new purchase values.
- [ ] Confirm reset actions clear fields.
- [ ] Confirm copy actions copy expected text.
- [ ] Confirm share actions create shareable URLs.

## Navigation Check

- [x] Adaptive navigation model preserved in code.
- [ ] Desktop: top navigation switches calculators.
- [ ] Mobile: bottom navigation switches calculators.
- [ ] Active states are visible.
- [ ] Keyboard focus is visible.

## Build Check

- [x] `npm install`
- [x] `npm run build`
- [x] Local Vite server served the app at `http://127.0.0.1:4174/`.
- [x] Manifest returned valid JSON.
- [x] Icon files were created with expected dimensions.

## Console / Runtime Check

- [ ] Open browser devtools.
- [ ] Confirm no console errors on load.
- [ ] Confirm no console errors when switching calculators.
- [ ] Confirm no console errors when calculating.
- [ ] Confirm service worker registration succeeds in production preview/deployment.
