# Hermes — Landing Page

A one-page marketing site for the Hermes AI Agent, built with plain HTML and CSS.
No build step, no framework, no dependencies.

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — page structure and content
- `styles.css` — all styling and theme tokens
- `script.js` — theme toggle, copy-to-clipboard, scroll reveal

## Theming

Light and dark themes are driven by `data-theme` on `<html>`. Three layers:

1. **Stored choice** — a click on the toggle writes `localStorage['lp-theme']`
2. **OS preference** — `prefers-color-scheme` decides when nothing is stored
3. **Fallback** — light

The resolved theme is applied by a small inline script in `<head>` **before first
paint**, so there is no flash of the wrong theme on load.

### Two blue accents, not one

`styles.css` defines two accent tokens because one value cannot satisfy both jobs:

| Token | Used for | Contrast requirement |
|---|---|---|
| `--blue` | accent text, links, eyebrows | 4.5:1 against `--bg` |
| `--blue-fill` | button backgrounds carrying white labels | 4.5:1 against white |

In dark mode these differ (`#4d84ff` vs `#0053fd`). Collapsing them to a single
value put white-on-blue at 3.47:1 — a WCAG AA failure.

Borders follow the same split: `--line` is a decorative hairline, while `--line-2`
and `--edge` mark interactive controls that must stay perceivable.

## Palette

Taken from the Hermes Desktop app's own tokens
(`apps/desktop/src/styles.css`): primary `#0053fd`, warm `#cf806d`, and the dark
neutrals `#0d0d0e` / `#161618`.

## Accessibility

- Skip link, semantic landmarks, and a labelled theme toggle
- All body text meets WCAG AA (4.5:1); interactive borders meet 3:1
- Touch targets are 44px minimum on mobile
- Visible focus rings, `prefers-reduced-motion`, and `forced-colors` support
- The comparison table scrolls horizontally on narrow screens rather than breaking layout

## Browser support

Modern evergreen browsers. Uses `color-mix()`, `oklch`-free plain hex tokens,
CSS grid, and `IntersectionObserver`.

## License

MIT