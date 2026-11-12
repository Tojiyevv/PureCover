# PureCover Ultimate 5.0

Built on the existing Ultimate 4.0 React/TypeScript/Tailwind/Three.js codebase. The original visual language and product sections are retained.

## New in 5.0
- Floating, responsive Studio Dock (navigation, customization, share and save)
- Command menu with Cmd/Ctrl + K and Escape
- Live shape, shade, and edition controls synchronized with the existing 3D scenes
- Local presets (up to 8, stored only in this browser)
- Shareable configuration URLs (`?shape=round&shade=shade-3&edition=standard`)
- Export current configuration as JSON
- Reset 3D camera and exploded view
- Accessible button labels, keyboard shortcuts and status notifications

## Run on macOS
```bash
npm install
npm run dev
npm run build
```

## Verification
`tsc -b` completed successfully in the authoring environment. Full Vite build was blocked by a missing platform-specific Rollup binary in the available preinstalled node_modules, not by a reported TypeScript error. Reinstall dependencies on the target Mac and run `npm run build` to verify.

## Scientific disclaimer
The product and 3D scenes are concept illustrations. Material composition, performance, availability, measurements and clinical claims require independent product validation.
