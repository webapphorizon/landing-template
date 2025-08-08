# Basic Landing (EN) — Reusable Blocks

A lightweight, production-ready landing page scaffold built around reusable, composable UI blocks. The goal is to let you assemble pages quickly from a shared catalog of blocks (Hero, Features, Testimonials, FAQ, Pricing, etc.), keep content and presentation cleanly separated, and ship fast with solid a11y, SEO, and performance.

## Key Features

- **Reusable blocks**: Self-contained, strictly typed components with clear inputs and styles
- **Composable pages**: Build any landing by stacking blocks in any order
- **Strict TypeScript**: No `any` allowed; explicit, safe props and data models
- **Import alias `~/`**: Consistent absolute imports from `src`
- **Good defaults**: Responsive layout, a11y checklist, SEO basics, and performance tips
- **Framework-agnostic usage**: Works with common SPA/MPA setups; adapt examples as needed

## Quickstart

Prerequisites: Node 18+ and npm.

```bash
npm install
npm run dev
```

Common scripts (adjust if your project differs):

- `npm run dev`: start local development server
- `npm run build`: production build
- `npm run preview`: preview production build locally (if supported)
- `npm run lint`: run linter
- `npm run format`: format codebase
- `npm run test`: run tests (unit/component)

## Project Structure

The default structure favors discoverability and reusability.

```text
src/
  blocks/                # Page-level reusable sections (Hero, Features, etc.)
    Hero/
      Hero.tsx
      Hero.types.ts
      Hero.module.(css|scss|tailwind.css)
      index.ts
    Features/
    CTA/
    Testimonials/
    FAQ/
    Pricing/
    Contact/
    Footer/
  components/            # Low-level shared UI (Button, Card, Icon, etc.)
  layouts/               # Page shells / layout scaffolding
  styles/                # Global styles, tokens, variables
  assets/                # Images, fonts, SVGs
  lib/                   # Utilities, hooks, config
  pages/ or app/         # Routing layer (depends on your framework)
  config/                # SEO, theme, constants

public/                  # Static public assets
```

## Philosophy: Blocks First

- **Single responsibility**: Each block renders one section of a landing and receives fully prepared data via props.
- **Strictly typed inputs**: Define a `.types.ts` with explicit props; avoid widening or `any`.
- **Encapsulated styles**: Prefer CSS modules, scoped styles, or utility classes to avoid leaks.
- **Pure by default**: No data fetching inside blocks; compose data at the page/container layer.

## Example: Creating a New Block

1. Create folder `src/blocks/Hero` with strongly typed component and index export.

```tsx
// src/blocks/Hero/Hero.types.ts
export type HeroCta = {
  label: string
  href: string
  external?: boolean
}

export type HeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  imageSrc?: string
  imageAlt?: string
}
```

```tsx
// src/blocks/Hero/Hero.tsx
import type { HeroProps } from '~/blocks/Hero/Hero.types'

export function Hero(props: HeroProps) {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, imageSrc, imageAlt } = props

  return (
    <section aria-labelledby='hero-title'>
      {eyebrow && <p className='eyebrow'>{eyebrow}</p>}
      <h1 id='hero-title'>{title}</h1>
      {subtitle && <p className='subtitle'>{subtitle}</p>}
      {(primaryCta || secondaryCta) && (
        <div className='actions'>
          {primaryCta && (
            <a href={primaryCta.href} target={primaryCta.external ? '_blank' : undefined} rel={primaryCta.external ? 'noreferrer' : undefined} className='btn btn-primary'>
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href} target={secondaryCta.external ? '_blank' : undefined} rel={secondaryCta.external ? 'noreferrer' : undefined} className='btn btn-secondary'>
              {secondaryCta.label}
            </a>
          )}
        </div>
      )}
      {imageSrc && (
        <img src={imageSrc} alt={imageAlt ?? ''} loading='eager' />
      )}
    </section>
  )
}
```

```ts
// src/blocks/Hero/index.ts
export * from '~/blocks/Hero/Hero'
export * from '~/blocks/Hero/Hero.types'
```

1. Use the block in a page or container. Keep content/data outside the block.

```tsx
// Example page/container usage
import { Hero } from '~/blocks/Hero'

export default function Landing() {
  return (
    <>
      <Hero
        eyebrow='Introducing'
        title='A reusable landing system'
        subtitle='Compose any landing from shared blocks'
        primaryCta={{ label: 'Get started', href: '#get-started' }}
        secondaryCta={{ label: 'Learn more', href: '#features' }}
        imageSrc='/hero.png'
        imageAlt='Product preview'
      />
      {/* Add more blocks here */}
    </>
  )
}
```

## Import Alias `~/`

Use absolute imports from `src` via `~/`.

TypeScript config:

```json
// tsconfig.json (excerpt)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

Ensure your bundler/runtime respects the alias. Examples:

Vite:

```ts
// vite.config.ts (excerpt)
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
})
```

Next.js (JS/TS config paths are enough). If needed, also add:

```js
// next.config.js (excerpt)
module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = require('path').resolve(__dirname, 'src')
    return config
  },
}
```

## Content, Theming, and Tokens

- Keep copy in structured objects or CMS adapters, then pass props to blocks
- Centralize design tokens (colors, spacing, fonts) in `src/styles` or a theme provider
- Expose minimal, typed style handles per block for safe customization

## Accessibility Checklist (a11y)

- Landmarks: Use `header`, `main`, `footer`, correct headings order (`h1`…`h2`…)
- Images: Provide `alt` on informative images; empty `alt` only when decorative
- Links/Buttons: Use correct elements; ensure focus states and contrast
- Keyboard: All interactive elements reachable and operable by keyboard
- ARIA: Only when necessary and correct; prefer semantic HTML

## SEO Basics

- Unique `<title>` and `<meta name='description'>` per page
- Open Graph and Twitter meta for share cards
- Canonical URLs, sitemap, and robots rules where applicable
- Lazy-load non-critical media; prefetch critical routes/assets

## Performance Tips

- Optimize and compress images (responsive sizes, modern formats)
- Code-split at route and block level where possible
- Avoid large client-only libraries in critical path; prefer SSR/SSG if available
- Use `loading='lazy'` where it does not harm LCP; keep Hero media optimized

## Quality Gates

- **Linting**: `npm run lint` — enforce consistent code style
- **Formatting**: `npm run format` — keep diffs small and readable
- **Testing**: `npm run test` — add unit tests for block logic and rendering

## Adding More Blocks (suggested set)

- `Features`: grid of selling points
- `Testimonials`: quotes with avatars, ratings
- `FAQ`: accordion of Q&A
- `Pricing`: tier cards with CTA
- `Contact`: form or mailto links with validation
- `Footer`: links, socials, legal
- `CTA`: focused conversion banner

Each block should ship with:

- `*.types.ts`: strict prop contracts
- `*.tsx`: pure, presentational component
- Styles: module or utility-based
- Minimal story/demo and tests if your stack includes them

## Deployment

The build output depends on your framework:

- Static SPA/MPA (Vite, etc.): output in `dist/`
- Next.js: output in `.next/` (SSG/SSR supported)

Typical commands:

```bash
npm run build
npm run preview
```

Deploy to any static host or server platform (Vercel, Netlify, GitHub Pages, etc.).

## Conventions

- Imports use `~/` from `src`
- No `any` in TypeScript — use precise, descriptive types
- Keep blocks dumb and data-aware containers separate

## Roadmap (suggested)

- Add more blocks (Stats, Logos, Newsletter, Timeline)
- Add visual tests for blocks
- Add theme switcher (light/dark/system)
- Integrate basic analytics and consent UI (if applicable)
