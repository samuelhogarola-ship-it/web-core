import { normalizeText } from "../utils/text.js";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function replaceTemplate(template, values = {}) {
  return String(template || "").replace(/\{(\w+)\}/g, (_match, key) => {
    return values[key] === undefined || values[key] === null ? "" : values[key];
  });
}

function buildShareableUrl(config = {}) {
  const rawBaseUrl = normalizeText(config.baseUrl || config.url);
  const queryParam = normalizeText(config.queryParam || "ref");
  const queryValue = normalizeText(config.queryValue);

  if (!rawBaseUrl) {
    return "";
  }

  const nextUrl = new URL(rawBaseUrl, rawBaseUrl);

  if (queryValue) {
    nextUrl.searchParams.set(queryParam, queryValue);
  } else {
    nextUrl.searchParams.delete(queryParam);
  }

  return nextUrl.toString();
}

function buildWhatsAppShareUrl(text) {
  return `https://wa.me/?text=${encodeURIComponent(normalizeText(text))}`;
}

function buildSharePayload(config = {}) {
  const values = {
    appName: normalizeText(config.appName),
    level: normalizeText(config.level),
    category: normalizeText(config.category),
    title: normalizeText(config.title),
    correct: config.correct,
    total: config.total,
    url: buildShareableUrl(config)
  };
  const text = replaceTemplate(config.textTemplate, values);
  const clipboardText = replaceTemplate(
    config.clipboardTemplate || config.textTemplate,
    values
  );

  return {
    mode: config.mode || "share",
    text,
    url: values.url,
    whatsappUrl: buildWhatsAppShareUrl(text),
    clipboardText
  };
}

function createSeoMetadata(config = {}) {
  const baseUrl = normalizeText(config.baseUrl);
  const canonicalUrl = normalizeText(config.canonicalUrl) || baseUrl;
  const title = normalizeText(config.title);
  const description = normalizeText(config.description);
  const imageUrl = normalizeText(config.imageUrl);
  const siteName = normalizeText(config.siteName || config.appName);
  const imageAlt = normalizeText(config.imageAlt || config.title || siteName);
  const twitterCard = normalizeText(config.twitterCard || "summary_large_image");

  return {
    title,
    description,
    canonicalUrl,
    openGraph: {
      type: normalizeText(config.ogType || "website"),
      siteName,
      title,
      description,
      url: canonicalUrl,
      image: imageUrl,
      imageAlt
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      image: imageUrl
    }
  };
}

function setMetaContent(doc, attribute, key, value) {
  if (!doc || typeof doc.querySelector !== "function" || !normalizeText(key)) {
    return;
  }

  const meta = doc.querySelector(`meta[${attribute}="${key}"]`);
  if (meta && value !== undefined && value !== null && value !== "") {
    meta.setAttribute("content", value);
  }
}

function applySeoMetadata(doc, metadata) {
  if (!doc || !metadata) {
    return metadata || null;
  }

  if (metadata.title) {
    doc.title = metadata.title;
  }

  const canonical =
    typeof doc.querySelector === "function"
      ? doc.querySelector('link[rel="canonical"]')
      : null;

  if (canonical && metadata.canonicalUrl) {
    canonical.setAttribute("href", metadata.canonicalUrl);
  }

  setMetaContent(doc, "name", "description", metadata.description);
  setMetaContent(doc, "property", "og:type", metadata.openGraph?.type);
  setMetaContent(doc, "property", "og:site_name", metadata.openGraph?.siteName);
  setMetaContent(doc, "property", "og:title", metadata.openGraph?.title);
  setMetaContent(doc, "property", "og:description", metadata.openGraph?.description);
  setMetaContent(doc, "property", "og:url", metadata.openGraph?.url);
  setMetaContent(doc, "property", "og:image", metadata.openGraph?.image);
  setMetaContent(doc, "property", "og:image:alt", metadata.openGraph?.imageAlt);
  setMetaContent(doc, "name", "twitter:card", metadata.twitter?.card);
  setMetaContent(doc, "name", "twitter:title", metadata.twitter?.title);
  setMetaContent(doc, "name", "twitter:description", metadata.twitter?.description);
  setMetaContent(doc, "name", "twitter:image", metadata.twitter?.image);

  return metadata;
}

function renderSeoMetadata(html, metadata) {
  if (!html || !metadata) {
    return html;
  }

  return String(html)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${escapeHtml(metadata.description)}">`
    )
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}">`
    )
    .replace(
      /<meta property="og:type" content="[^"]*">/,
      `<meta property="og:type" content="${escapeHtml(metadata.openGraph.type)}">`
    )
    .replace(
      /<meta property="og:site_name" content="[^"]*">/,
      `<meta property="og:site_name" content="${escapeHtml(metadata.openGraph.siteName)}">`
    )
    .replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${escapeHtml(metadata.openGraph.title)}">`
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${escapeHtml(metadata.openGraph.description)}">`
    )
    .replace(
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${escapeHtml(metadata.openGraph.url)}">`
    )
    .replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${escapeHtml(metadata.openGraph.image)}">`
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*">/,
      `<meta property="og:image:alt" content="${escapeHtml(metadata.openGraph.imageAlt)}">`
    )
    .replace(
      /<meta name="twitter:card" content="[^"]*">/,
      `<meta name="twitter:card" content="${escapeHtml(metadata.twitter.card)}">`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${escapeHtml(metadata.twitter.title)}">`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${escapeHtml(metadata.twitter.description)}">`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${escapeHtml(metadata.twitter.image)}">`
    );
}

export {
  applySeoMetadata,
  buildShareableUrl,
  buildSharePayload,
  buildWhatsAppShareUrl,
  createSeoMetadata,
  renderSeoMetadata,
  replaceTemplate
};
