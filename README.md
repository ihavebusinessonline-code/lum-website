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
