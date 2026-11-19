# LUM. Photography

Public marketing website for a fictional California wedding and couples photography studio. Built with Next.js App Router, TypeScript, and Tailwind CSS. This milestone has no authentication, database, CMS, payment, booking, or AI functionality.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run typecheck` for TypeScript validation and `npm run build` for the production static export in `out/`. The build uses Next.js’s supported Webpack compiler because Turbopack’s CSS worker failed in this restricted environment. Because the site uses static export, serve `out/` with a static web server for production; `next start` is not supported for this configuration.

## Content and design

Nine requested sections: navigation, hero, selected portfolio, photographer introduction, services, testimonials, FAQ, contact CTA, and footer. Responsive editorial layout with local photography, a mobile menu, native FAQ disclosures, visible keyboard focus, a skip link, and reduced-motion support.

The photographer name, biography, testimonials, turnaround information, and portfolio captions are fictional demonstration content. The contact links use `hello@lumphotography.example`, a reserved sample domain, and must be replaced with a real business email before launch. Photography is sample stock work, not work by LUM.

## Photography sources

Locally stored sample assets are sourced from Unsplash and its free-use photo listings:

- `coast.jpg`: Nathan Dumlao, photo `h_czqryuuok`, via [California.com](https://www.california.com/enviable-california-wedding-destinations/). [Unsplash source](https://unsplash.com/photos/h_czqryuuok).
- `hands.jpg`: [Groom and bride holding hands](https://unsplash.com/photos/groom-and-bride-holding-hands-4TET084JWaA).
- `couple.jpg`: [Couple holding hands on the beach at sunset](https://unsplash.com/photos/couple-holding-hands-on-the-beach-at-sunset-j7qtze8E1bM).
- `portrait.jpg`: [Woman holding black DSLR camera](https://unsplash.com/photos/woman-holding-black-dslr-camera-zrk7WirlxgM).

[Unsplash license](https://unsplash.com/license). Replace sample photography with the studio’s own work for a real launch.

## Contact form delivery

The contact section includes responsive, accessible required fields, inline validation, a sending state, and success/error feedback. It preserves the existing static export and uses no extra packages.

The form submits asynchronously to `https://formspree.io/f/xqppwpeo` using JSON and an `Accept: application/json` header. This public submission URL requires no private API keys. To override it, copy `.env.example` to `.env.local`, update `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, and restart development or rebuild.

A synchronous submission guard and disabled controls prevent duplicate submissions while a request is pending. Success appears only after an HTTP 2xx response, then the fields reset. Rejected requests, network failures, and timeouts show an accessible error and preserve entered details for retry. No inquiries are stored locally. Recipient delivery and spam settings are managed in Formspree.

## Static export assets and SEO

The image loader maps each photo and configured width to a checked-in WebP in
`public/images/responsive/`. When replacing a hero, portrait, or gallery photo,
regenerate its WebP variants at 256, 384, 640, 828, and 1080 pixels wide using
quality 86. The lightbox loads the original gallery JPEG on demand.

Set `SITE_URL` to the actual HTTPS production origin before running
`npm run build` for deployment. The build uses it for the homepage canonical,
the homepage entry in `sitemap.xml`, and the sitemap URL in `robots.txt`.
Without it, local builds omit those URLs.
