# web-core

`web-core` es una base reusable para tus webs y templates comerciales.

El foco de esta primera versión es lo que mejor encaja con un producto transversal:

- SEO metadata y social sharing
- JSON-LD para `WebSite`, `Organization`, `BreadcrumbList`, `BlogPosting` y `FAQPage`
- helpers de blog para index y posts
- navbar base para empresas y servicios
- utilidades pequeñas de texto y arrays

## Qué migré de `core`

Se reutilizó y adaptó especialmente la lógica de `src/share-seo.js`, quitando el acoplamiento a `VokabelLab` y convirtiéndola en una API más genérica.

También extraje helpers base inspirados en utilidades compartidas del repo original, pero sin arrastrar lógica de producto.

## Qué dejé fuera a propósito

Estas piezas no entraron porque hoy están demasiado ligadas a apps concretas, branding o flujos educativos:

- configs de dashboard y errores persistidos
- práctica, flashcards, quiz review y mistake review
- naming legacy de `window.VokabelLabCore` y `window.LabWorldCore`

Eso mantiene `web-core` más vendible y más limpio para templates generales.

## Estructura

```text
src/
  content/
    blog.js
  seo/
    share.js
    structured-data.js
  ui/
    navbar.js
  utils/
    array.js
    text.js
styles/
  navbar.css
```

## Uso rápido

```js
import {
  createBlogPostSeoBundle,
  createFaqSchema,
  mountNavbar,
  renderJsonLdScripts
} from "web-core";

const seo = createBlogPostSeoBundle({
  siteUrl: "https://example.com",
  siteName: "Example Studio",
  title: "How to structure a blog for SEO",
  description: "A practical guide for commercial templates.",
  imageUrl: "https://example.com/og/blog-seo.jpg",
  datePublished: "2026-05-14",
  author: "Samuel",
  tags: ["seo", "blog", "template"]
});

const faqSchema = createFaqSchema([
  {
    question: "Does blog schema help ranking?",
    answer: "It helps search engines understand the page better."
  }
]);

const jsonLd = renderJsonLdScripts([...seo.schemas, faqSchema]);

mountNavbar("#site-header", {
  brandName: "Example Studio",
  brandHref: "/",
  currentPath: "/blog/",
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: "About", href: "/about/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" }
  ]
});
```

## API principal

- `createSeoMetadata`
- `applySeoMetadata`
- `renderSeoMetadata`
- `buildShareableUrl`
- `buildSharePayload`
- `createOrganizationSchema`
- `createWebSiteSchema`
- `createBreadcrumbSchema`
- `createBlogPostingSchema`
- `createFaqSchema`
- `renderJsonLdScript`
- `renderJsonLdScripts`
- `createBlogIndexMetadata`
- `createBlogPostMetadata`
- `createBlogPostSeoBundle`
- `getDefaultNavbarLinks`
- `createNavbarMarkup`
- `mountNavbar`
- `slugify`
- `createExcerpt`
- `estimateReadingTime`
- `shuffle`
- `uniqueBy`

## Verificación

```bash
npm run check
```
