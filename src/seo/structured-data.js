import { normalizeText } from "../utils/text.js";
import { toArray } from "../utils/array.js";

function normalizeUrl(value, baseUrl = "") {
  const rawValue = normalizeText(value);
  if (!rawValue) {
    return "";
  }

  return new URL(rawValue, baseUrl || rawValue).toString();
}

function createImageObject(image, baseUrl = "") {
  if (!image) {
    return undefined;
  }

  if (typeof image === "string") {
    return {
      "@type": "ImageObject",
      url: normalizeUrl(image, baseUrl)
    };
  }

  const url = normalizeUrl(image.url, baseUrl);
  if (!url) {
    return undefined;
  }

  return {
    "@type": "ImageObject",
    url,
    width: image.width,
    height: image.height
  };
}

function createOrganizationSchema(config = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: normalizeText(config.name),
    url: normalizeUrl(config.url),
    logo: createImageObject(config.logo, config.url),
    sameAs: toArray(config.sameAs).map((item) => normalizeUrl(item)).filter(Boolean)
  };
}

function createOfferSchema(offer, baseUrl = "") {
  if (!offer) {
    return undefined;
  }

  return {
    "@type": "Offer",
    name: normalizeText(offer.name),
    price: offer.price !== undefined && offer.price !== null ? String(offer.price) : undefined,
    priceCurrency: normalizeText(offer.priceCurrency),
    description: normalizeText(offer.description),
    url: normalizeUrl(offer.url, baseUrl) || undefined
  };
}

function createContactPointSchema(contactPoint = {}) {
  if (!contactPoint) {
    return undefined;
  }

  return {
    "@type": "ContactPoint",
    contactType: normalizeText(contactPoint.contactType || "sales"),
    email: normalizeText(contactPoint.email),
    telephone: normalizeText(contactPoint.telephone),
    availableLanguage: toArray(contactPoint.availableLanguage)
      .map((item) => normalizeText(item))
      .filter(Boolean)
  };
}

function createAreaServed(value) {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return {
      "@type": "Place",
      name: normalizeText(value)
    };
  }

  return {
    "@type": normalizeText(value.type || "Place"),
    name: normalizeText(value.name)
  };
}

function createWebSiteSchema(config = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: normalizeText(config.name),
    url: normalizeUrl(config.url),
    description: normalizeText(config.description),
    inLanguage: normalizeText(config.language),
    publisher: config.publisher || undefined
  };
}

function createProfessionalServiceSchema(config = {}) {
  const baseUrl = normalizeText(config.url || config.baseUrl);
  const offer = createOfferSchema(config.offers, baseUrl);
  const contactPoint = createContactPointSchema(config.contactPoint);
  const image = createImageObject(config.image, baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": normalizeText(config.type || "ProfessionalService"),
    name: normalizeText(config.name),
    url: normalizeUrl(config.url, baseUrl),
    description: normalizeText(config.description),
    image,
    serviceType: normalizeText(config.serviceType),
    areaServed: toArray(config.areaServed).map(createAreaServed).filter(Boolean),
    offers: offer,
    contactPoint
  };
}

function createBreadcrumbSchema(items = [], options = {}) {
  const baseUrl = normalizeText(options.baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: toArray(items)
      .map((item, index) => {
        const name = normalizeText(item?.name);
        const url = normalizeUrl(item?.url || item?.path, baseUrl);

        if (!name || !url) {
          return null;
        }

        return {
          "@type": "ListItem",
          position: index + 1,
          name,
          item: url
        };
      })
      .filter(Boolean)
  };
}

function createPersonReference(author, baseUrl = "") {
  if (!author) {
    return undefined;
  }

  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: normalizeText(author)
    };
  }

  return {
    "@type": "Person",
    name: normalizeText(author.name),
    url: normalizeUrl(author.url, baseUrl)
  };
}

function createBlogPostingSchema(config = {}) {
  const baseUrl = normalizeText(config.baseUrl || config.siteUrl);
  const authors = toArray(config.authors)
    .map((author) => createPersonReference(author, baseUrl))
    .filter(Boolean);
  const image = createImageObject(config.image, baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: normalizeText(config.title),
    description: normalizeText(config.description),
    datePublished: normalizeText(config.datePublished),
    dateModified: normalizeText(config.dateModified || config.datePublished),
    mainEntityOfPage: normalizeUrl(config.url || config.path, baseUrl),
    url: normalizeUrl(config.url || config.path, baseUrl),
    image,
    author: authors.length <= 1 ? authors[0] : authors,
    publisher: config.publisher || undefined,
    keywords: toArray(config.keywords).map((item) => normalizeText(item)).filter(Boolean),
    articleSection: normalizeText(config.section)
  };
}

function createFaqSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: toArray(items)
      .map((item) => {
        const question = normalizeText(item?.question);
        const answer = normalizeText(item?.answer);

        if (!question || !answer) {
          return null;
        }

        return {
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        };
      })
      .filter(Boolean)
  };
}

function renderJsonLdScript(schema) {
  if (!schema) {
    return "";
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderJsonLdScripts(schemas = []) {
  return toArray(schemas)
    .filter(Boolean)
    .map((schema) => renderJsonLdScript(schema))
    .join("\n");
}

export {
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createProfessionalServiceSchema,
  createOrganizationSchema,
  createWebSiteSchema,
  renderJsonLdScript,
  renderJsonLdScripts
};
