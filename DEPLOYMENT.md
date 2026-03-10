# Production Deployment Guide (Vercel)

## 1) Environment Variables
Set these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `EMAIL_SERVER`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `ADMIN_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## 2) Build and Migration Pipeline
This project is configured for production deployment with Prisma and Next.js:

- `postinstall`: `prisma generate`
- `build`: `npm run prisma:generate && npm run prisma:migrate && next build`
- `prisma:migrate`: `prisma migrate deploy` (auto-skips when `DATABASE_URL` is unset)

In Vercel, `npm run build` is used through `vercel.json`.

## 2.1) Vercel Project Configuration
- Import repository into Vercel.
- Framework preset: `Next.js`.
- Build command: `npm run build`.
- Install command: `npm install`.
- Output directory: leave default for Next.js.
- Add all environment variables from section 1 before first production deploy.

Deploy options:

```bash
# Preview deployment
npx vercel

# Production deployment
npx vercel --prod
```

## 3) Database Migration
Production command:

```bash
npx prisma migrate deploy
```

Migration files are in `prisma/migrations/`.

## 4) Seed Initial Data
Run after your production database is reachable:

```bash
npm run prisma:seed
```

Seed includes:
- 3 starter blog posts
- sample admin user record (`username: admin`)
- sample lead record for dashboard validation

## 5) Admin Access
- Admin login uses `ADMIN_SECRET`.
- Route protection is enforced by middleware and server-side auth checks.

## 6) SEO and Assets
Configured and included:
- metadata, OpenGraph, Twitter cards
- JSON-LD structured data
- `app/sitemap.ts` and `app/robots.ts`
- `public/logo.png`
- OpenGraph and Twitter images use `logo.png`
- `public/favicon.ico`

## 6.1) Social Share Validation
After deploying, validate link previews:

- LinkedIn Post Inspector: `https://www.linkedin.com/post-inspector/inspect/https://YOUR-DOMAIN`
- Twitter Card Validator: `https://cards-dev.twitter.com/validator`
- WhatsApp: paste your URL in a chat and confirm title/description/image preview.

## 7) Analytics Events
Google Analytics integration tracks:
- `page_view`
- `contact_form_submission`
- `demo_request_click`

## 8) Deployment Checklist
- [ ] Build passes (`npm run build`)
- [ ] Migration passes (`npx prisma migrate deploy`)
- [ ] Seed passes (`npm run prisma:seed`)
- [ ] `/admin/login` authentication verified
- [ ] Contact form writes to `Lead` table
- [ ] Blog list and `/blog/[slug]` render with metadata
- [ ] `sitemap.xml` and `robots.txt` load correctly
- [ ] Header and footer display MyBooking logo
- [ ] `/favicon.ico` returns 200
- [ ] OG/Twitter preview image resolves to `/logo.png`

## 9) Lighthouse Targets
Recommended production goals:
- Performance > 90
- SEO > 95
- Accessibility > 90

Use Chrome Lighthouse against deployed Vercel URL after enabling production env vars.
