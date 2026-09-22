# Vladysthenics Funnel (v1)

Mobile-first **VSL → application quiz → strategy call** funnel for Vladysthenics.

## Stack

- Next.js (App Router) + React + TypeScript
- CSS tokens (Vladysthenics blue system) + Tailwind v4 base
- YouTube VSL facade (`sqNgTx61PYI`)
- Placeholder media under `public/placeholders/`

## Surfaces

| Route | Purpose |
|-------|---------|
| `/` | Funnel: hero → VSL → quiz → proof → exclusive → manifesto → CTA |
| `/booking` | Calendly (or simulated booking in dev) |
| `/post-booking` | Mandatory show-rate sequence (noindex) |
| `/privacy` `/terms` `/disclaimer` | Legal stubs |

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Env vars

See `.env.example` for Calendly, Zapier, Meta Pixel/CAPI, Clarity, and Sweep OS.

## Replace before launch

1. Real proof / founder photos (swap paths in `src/data/assets.ts`)
2. `NEXT_PUBLIC_CALENDLY_URL`
3. Post-booking Loom in `src/data/videos.ts`
4. Instagram URL in `src/data/social.ts`
5. Counsel-reviewed legal copy
6. Client testimonials (do not fabricate — see `brand.md`)

## Architecture source

Built from `FunnelArchitectureSkill.md` with copy from `sales_letter.md` and tokens from `brand.md`.