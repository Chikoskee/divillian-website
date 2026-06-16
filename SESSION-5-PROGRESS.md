# Session 5 Progress — Cloudflare Workers Deployment

## Status: PHASE 1 COMPLETE — Phase 2 next

## Branch
`add-admin-nextjs`

## Phase 1: Local Cloudflare Build (COMPLETE — commit `b950eed`)

### What was added
- **`open-next.config.ts`** — OpenNext adapter config (`defineCloudflareConfig()`)
- **`wrangler.jsonc`** — Cloudflare Workers config; Worker name `divillian-website-next` (separate from the live `divillian-website` Worker serving divillians.com)
- **`src/middleware.ts`** — Edge-runtime auth middleware: refreshes Supabase session, redirects unauthenticated users from `/admin/*` to `/admin/login`
- **`package.json`** — Added `@opennextjs/cloudflare@1.19.11` (dep) and `wrangler@4.100.0` (devDep); added `build:cloudflare` script
- **`.gitignore`** — Added `/.open-next/` (build artifact, like `.next/`)

### What was removed
- **`src/proxy.ts`** — Session 3's auth proxy (Next.js 16 `proxy.ts` convention runs Node.js runtime, which Cloudflare Workers rejects). Replaced by `src/middleware.ts` (Edge runtime, deprecated `middleware.ts` convention — Next.js 16 warns but compiles it correctly as Edge, which the adapter accepts).

### Key build issue resolved
`@opennextjs/cloudflare` rejects Next.js 16's `proxy.ts` because it runs on Node.js runtime. The fix is to use the deprecated `middleware.ts` convention (Edge runtime), which the adapter expects. Next.js 16 prints a deprecation warning during build but compiles it correctly.

### Verified
- `npm run build:cloudflare` succeeds — produces `.open-next/worker.js`
- Admin auth protection tested in browser: visiting `/admin` while logged out redirects to `/admin/login` ✓
- All four admin routes tested ✓

---

## Phase 2: Deploy to new Cloudflare Worker (TODO)

Goal: deploy `divillian-website-next` Worker to get a `.workers.dev` URL for testing.

Steps:
1. Push `add-admin-nextjs` branch to GitHub
2. Authenticate wrangler (`npx wrangler login`)
3. Set Supabase env vars in Cloudflare dashboard for the new Worker
4. Run `npx wrangler deploy` (or add a `deploy:cloudflare` script)
5. Test the `.workers.dev` URL end-to-end

**Do NOT touch the existing `divillian-website` Worker** (serving divillians.com live).

---

## Phase 3: Domain Transfer (after Phase 2 verified)

Transfer divillians.com from `divillian-website` → `divillian-website-next` in Cloudflare dashboard.
