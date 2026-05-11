# Design Changes

## Current Website Design Observations

The original app already had a strong foundation:

- Arabic-first bilingual product.
- Dark/light theme support.
- Blue/gold fintech visual identity.
- Existing logo with a Kuwait-market chart feeling.
- Calculator cards with clear tool separation.
- Result cards with animated numbers.
- Bottom navigation on mobile and top navigation on desktop.
- Useful trust features like formula disclosure, copy/share, and history.

The main opportunity was to make the experience feel less like a responsive website and more like a saved mobile app.

## What Was Preserved

- Existing logo.
- Existing color direction.
- Existing Cairo/Inter typography setup.
- Existing dark/light surfaces.
- Existing calculator card identity.
- Existing icons and calculator color mapping.
- Existing navigation model:
  - top navigation on desktop
  - bottom navigation on mobile
- Existing calculator result structure.

## What Was Improved

- App launch now has a branded animated splash.
- App icon assets now use the real logo instead of a generic `KB` mark.
- Mobile header is more compact.
- Top/bottom navigation states are more tactile and app-like.
- Mobile content now has safer bottom padding above the phone home indicator.
- Calculator screens have more comfortable mobile rhythm.
- Input fields have larger touch-friendly sizing.
- Result cards scale better on small screens.
- Result action buttons become easier to tap on mobile.
- Home page includes a clear PWA/Home Screen readiness note.

## Mobile Design Improvements

- Added safe-area support for top and bottom UI.
- Increased bottom navigation height and tap target comfort.
- Improved active state contrast in mobile navigation.
- Reduced visible tagline pressure in very small headers.
- Improved mobile hero alignment and hierarchy.
- Added app-shell spacing to prevent bottom nav overlap.
- Improved calculator shell max-width and mobile spacing.
- Improved input panels with more app-like rounded surfaces.

## Desktop Design Improvements

- Desktop top navigation behavior remains intact.
- Desktop content remains centered and wide-screen friendly.
- Navigation tap targets are more consistent.
- The app still reads as a polished web calculator on desktop.

## Navigation Improvements

Preserved:

- Desktop top nav.
- Mobile bottom nav.
- Existing four modules: home, ex-price, dividend, average cost.

Improved:

- Mobile active states.
- Bottom nav safe-area spacing.
- Navigation hit-area size.
- Header density.
- Focus-visible accessibility.

## Calculator Screen Improvements

- Calculator wrappers now use a shared `calculator-shell` width.
- Headers are slightly more compact on mobile.
- Icon blocks scale better.
- Form cards are slightly more mobile-native.
- Primary calculate buttons have a consistent minimum height.
- Type selector chips on the ex-price calculator have larger touch areas.

## Result Screen Improvements

- Main result remains visually dominant.
- Result number is more responsive on small screens.
- Action buttons are easier to tap and become a two-column mobile grid.
- Formula disclosure remains available but does not compete with the result.

## Visual Direction

The upgraded design keeps the current identity:

- deep navy background
- blue primary action color
- gold result emphasis
- practical finance utility tone
- Arabic-first UX

It avoids:

- generic finance rebranding
- stock-market clichés
- crypto-style effects
- heavy or noisy animations
- changing the product into a brokerage/trading app
