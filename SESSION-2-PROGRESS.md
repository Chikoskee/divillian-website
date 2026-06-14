# Session 2 Progress — Divillian Website Next.js Migration

## Branch
`add-admin-nextjs`

## What Was Completed This Session

### Step 4 — Next.js Scaffold ✅
- Ran `npx create-next-app@latest` with: App Router, TypeScript, Tailwind CSS (v4), ESLint, `src/` directory, `@/*` import alias
- Node.js v24.16.0 confirmed installed

### File Reorganization ✅
- All original HTML files moved to `legacy-html/` (index.html, order.html, sauces.html — DO NOT DELETE)
- All images, videos, gif, logo moved to `public/`
- The temp folder `D:\divillian-temp` is an empty leftover outside the project — safe to delete manually

### Step 5 — Supabase Libraries ✅
- Installed `@supabase/supabase-js` and `@supabase/ssr`

### Step 6 — Environment Variables ✅
- `.env.local` created with real Supabase project URL and anon key (gitignored via `.env*`)
- `.env.example` created with empty keys (safe to commit)
- `.gitignore` already covered `.env*` via Next.js default

### Step 7 — globals.css ✅ (partial)
- `src/app/globals.css` fully rewritten with all CSS from all three original pages merged
- Includes: base/body, header/nav, dropdown, shop grid, about, sauces showcase, sauce explorer, lightbox, media section, footer, order page styles
- Lightbox CSS updated to use `opacity + pointer-events` instead of `display: none` so React state toggling works with CSS transitions

---

## What Is Still In Progress

### Step 7 — Next.js Page Conversion ⏳ (NEXT TO DO)
Session ended before these files were written. The following files still need to be created:

#### `src/app/layout.tsx`
Replace the default Next.js scaffold content with:
- Import `Montserrat` from `next/font/google` (weights: 400, 600, 700)
- Set CSS variable `--font-montserrat`
- Apply font via `body` inline style or CSS variable
- Update metadata: title = `"Divil'Lian | Apparel, Food & Hot Sauces"`, description = `"Premium apparel and gourmet hot sauces crafted in New Jersey."`
- Remove Geist font imports

#### `src/app/page.tsx` — Home Page (`'use client'`)
Port from `legacy-html/index.html`. Needs React state for:
- `isMuted: boolean` + `videoRef` — hero video mute toggle button
- `shopFilter: string` — filters shop grid by category ('all' | 'tshirt' | 'hoodie' | 'skimask' | 'facemask' | 'buckethat' | 'socks')
- `currentSauce: string`, `packagingType: 'glass' | 'squeeze'` — sauce explorer switching
- `viewFading: boolean` — opacity fade transition on sauce viewport image swap
- `lightboxSrc: string`, `lightboxOpen: boolean` — lightbox overlay

Key conversion notes:
- All asset paths: `src="SkiMask-2.jpg"` → `src="/SkiMask-2.jpg"` (public/ served at root)
- Internal links: `href="sauces.html"` → `href="/sauces"`, `href="order.html"` → `href="/order"`
- `onclick` → `onClick` (camelCase), same for `autoplay` → `autoPlay`, `playsinline` → `playsInline`
- Shop filter: use `.hidden` CSS class conditionally based on `shopFilter` state
- Sauce explorer `sauceData` object can be defined as a const outside the component
- Lightbox is always rendered in DOM, controlled by `opacity + pointer-events` via `.open` class

#### `src/app/sauces/page.tsx` — Sauces Page (`'use client'`)
Port from `legacy-html/sauces.html`. Needs same sauce explorer + lightbox state as home page.
Nav links back to home: `href="index.html#home"` → `href="/#home"`, etc.

#### `src/app/order/page.tsx` — Order Page (server component, no `'use client'`)
Port from `legacy-html/order.html`. Simple form page, no React interactivity.
- Form action stays as `https://formspree.io/f/mnjlvlnl`
- `href="index.html"` → `href="/"`

---

## Steps Still Remaining After Step 7

### Step 8 — Admin Folder Structure
Create placeholder files:
- `src/app/admin/page.tsx` — placeholder page at `/admin`
- `src/app/admin/layout.tsx` — admin layout shell (empty, ready for Session 3)

### Step 9 — Dev Server Test
Run `npm run dev`, verify all three pages load at:
- `http://localhost:3000` (home)
- `http://localhost:3000/sauces`
- `http://localhost:3000/order`
Then stop the server.

### Step 10 — Session Summary
Final summary of what was done and what to expect in Session 3 (building the actual admin UI with Supabase).

---

## Important Context for Next Session

- **Supabase project URL:** `https://wqfajszamrwntoovakap.supabase.co`
- **`.env.local` is already filled in** with real keys — do not overwrite
- **`legacy-html/` files are the source of truth** for the three pages — reference them when writing the TSX
- The **lightbox CSS** in globals.css uses `opacity/pointer-events` (not `display:none`) — React state just toggles the `.open` class
- **No Tailwind utility classes** needed in the JSX for the ported pages — all styles use the custom CSS classes from globals.css
- **Do not use Next.js `<Image>` component** for the ported pages — use plain `<img>` tags to preserve exact visual sizing behavior
- The `D:\divillian-temp` folder outside the project is empty and can be deleted by hand
- **Do NOT push to GitHub** until explicitly told to
