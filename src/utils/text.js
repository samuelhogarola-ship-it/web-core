function normalizeText(value) {
  return String(value || "").trim();
}

function stripDiacritics(value) {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value, options = {}) {
  const separator = options.separator || "-";
  const normalizedSeparator = String(separator).slice(0, 1) || "-";

  return stripDiacritics(value)
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, normalizedSeparator)
    .replace(new RegExp(`\\${normalizedSeparator}+`, "g"), normalizedSeparator)
    .replace(new RegExp(`^\\${normalizedSeparator}|\\${normalizedSeparator}$`, "g"), "");
}

function createExcerpt(value, maxLength = 160) {
  const text = normalizeText(value).replace(/\s+/g, " ");

  if (!text || text.length <= maxLength) {
    return text;
  }

  const nextText = text.slice(0, Math.max(0, maxLength - 1)).trim();
  return `${nextText}\u2026`;
}

function estimateReadingTime(value, wordsPerMinute = 220) {
  const words = normalizeText(value)
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    words,
    minutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / wordsPerMinute))
  };
}

export {
  createExcerpt,
  estimateReadingTime,
  normalizeText,
  slugify,
  stripDiacritics
};
