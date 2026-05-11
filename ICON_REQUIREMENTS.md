# Icon Requirements

## Existing Logo Used

The app icon assets were generated from the existing Kuwait Bourse Calculator logo:

- Source in app: `src/assets/logo.png`
- Public reference copy: `public/brand/logo-source.png`
- Original copied file: `My Logo2 .PNG`

No unrelated logo was created.

## Icons Already Created

These files now exist:

- `public/icons/favicon-32.png`
  - 32x32
  - Used by `index.html`

- `public/icons/apple-touch-icon.png`
  - 180x180
  - Used by iOS Home Screen metadata

- `public/icons/icon-192.png`
  - 192x192
  - Used by `manifest.json`

- `public/icons/icon-512.png`
  - 512x512
  - Used by `manifest.json`

- `public/icons/maskable-512.png`
  - 512x512
  - Used by `manifest.json`
  - Purpose: `any maskable`

## Manifest References

`public/manifest.json` references:

- `/icons/icon-192.png`
- `/icons/icon-512.png`
- `/icons/maskable-512.png`

## Manual Export Recommendation

The generated icons are usable, but a designer should ideally create a more refined maskable icon master.

Recommended master:

- 1024x1024 PNG
- Existing Arabic logo identity preserved.
- Deep navy background.
- Logo placed inside a safe central zone.
- Minimum 10-15% safe padding for maskable crops.
- Subtle blue ring or glow.
- Optional small gold accent.

## Required Sizes for Future Export

Recommended future icon set:

- 32x32 favicon
- 180x180 Apple touch icon
- 192x192 PWA icon
- 512x512 PWA icon
- 512x512 maskable icon
- 1024x1024 master source

## How to Generate From Existing Logo

1. Start with `src/assets/logo.png`.
2. Crop or frame it into a square composition.
3. Preserve the Arabic signature and dark blue chart feeling.
4. Export the required sizes above.
5. Replace files in `public/icons/`.
6. Keep `manifest.json` paths unchanged.

## What Still Needs Manual Work

- A design-polished maskable icon with intentional safe-zone padding.
- Optional App Store / Google Play master icon if the PWA later becomes a native wrapper.
