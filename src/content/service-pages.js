import { createSeoMetadata } from "../seo/share.js";
import {
  createBreadcrumbSchema,
  createProfessionalServiceSchema,
  createWebSiteSchema
} from "../seo/structured-data.js";
import { createExcerpt, normalizeText } from "../utils/text.js";

function joinUrl(baseUrl, path = "") {
  if (!normalizeText(baseUrl)) {
    return normalizeText(path);
  }

  return new URL(path || "", baseUrl).toString();
}

function createServicePageMetadata(config = {}) {
  const siteUrl = normalizeText(config.siteUrl);
  const path = normalizeText(config.path || "/");
  const canonicalUrl = joinUrl(siteUrl, path);
  const title = normalizeText(config.title);
  const description = createExcerpt(
    config.description || config.summary || "",
    config.descriptionLength || 160
  );

  return createSeoMetadata({
    baseUrl: canonicalUrl,
    canonicalUrl,
    title,
    description,
    imageUrl: config.imageUrl,
    imageAlt: config.imageAlt || title,
    siteName: config.siteName,
    appName: config.siteName,
    ogType: "website",
    twitterCard: config.twitterCard
  });
}

function createServicePageSeoBundle(config = {}) {
  const siteUrl = normalizeText(config.siteUrl);
  const path = normalizeText(config.path || "/");
  const canonicalUrl = joinUrl(siteUrl, path);
  const metadata = createServicePageMetadata(config);
  const websiteSchema = createWebSiteSchema({
    name: config.siteName,
    url: siteUrl,
    description: config.siteDescription,
    language: config.language,
    publisher: config.publisher
  });
  const serviceSchema = createProfessionalServiceSchema({
    type: config.schemaType || "ProfessionalService",
    name: config.businessName || config.siteName,
    url: canonicalUrl,
    baseUrl: siteUrl,
    description: config.schemaDescription || metadata.description,
    image: config.image || config.imageUrl,
    serviceType: config.serviceType,
    areaServed: config.areaServed,
    offers: config.offer,
    contactPoint: config.contactPoint
  });
  const breadcrumbs = createBreadcrumbSchema(
    [
      { name: config.homeLabel || "Home", path: "/" },
      { name: config.pageLabel || config.title, path }
    ],
    { baseUrl: siteUrl }
  );

  return {
    metadata,
    schemas: [websiteSchema, serviceSchema, breadcrumbs]
  };
}

export {
  createServicePageMetadata,
  createServicePageSeoBundle
};
