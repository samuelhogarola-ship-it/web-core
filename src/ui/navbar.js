function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getDefaultNavbarLinks() {
  return [
    { key: "home", label: "Home", href: "/" },
    { key: "services", label: "Services", href: "/services/" },
    { key: "about", label: "About", href: "/about/" },
    { key: "blog", label: "Blog", href: "/blog/" },
    { key: "contact", label: "Contact", href: "/contact/" }
  ];
}

function normalizeLinks(links) {
  const source = Array.isArray(links) && links.length ? links : getDefaultNavbarLinks();

  return source.map((item, index) => ({
    key: item?.key || `link-${index}`,
    label: item?.label || `Link ${index + 1}`,
    href: item?.href || "#",
    external: Boolean(item?.external)
  }));
}

function isActiveLink(link, options = {}) {
  const currentPath = String(options.currentPath || "");

  if (!currentPath || !link?.href || link.href === "#") {
    return false;
  }

  if (options.activeKey && link.key === options.activeKey) {
    return true;
  }

  return link.href === currentPath;
}

function renderNavbarLink(link, options = {}) {
  const active = isActiveLink(link, options);
  const target = link.external ? ' target="_blank"' : "";
  const rel = link.external ? ' rel="noreferrer"' : "";

  return `<a class="web-core-navbar-link${active ? " is-active" : ""}" href="${escapeHtml(link.href)}"${target}${rel}>${escapeHtml(link.label)}</a>`;
}

function createNavbarMarkup(options = {}) {
  const brandName = options.brandName || "Your Company";
  const brandHref = options.brandHref || "/";
  const links = normalizeLinks(options.links);
  const cta = options.cta;
  const ctaMarkup = cta?.label
    ? `<a class="web-core-navbar-cta" href="${escapeHtml(cta.href || "#")}">${escapeHtml(cta.label)}</a>`
    : "";

  return `
    <header class="web-core-navbar-shell">
      <div class="web-core-navbar">
        <a class="web-core-navbar-brand" href="${escapeHtml(brandHref)}">${escapeHtml(brandName)}</a>
        <button
          class="web-core-navbar-toggle"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-navbar-toggle
        >
          Menu
        </button>
        <div class="web-core-navbar-panel" data-navbar-panel>
          <nav class="web-core-navbar-links" aria-label="Primary navigation">
            ${links.map((link) => renderNavbarLink(link, options)).join("")}
          </nav>
          ${ctaMarkup}
        </div>
      </div>
    </header>
  `.trim();
}

function bindNavbarEvents(root) {
  if (!root) {
    return root;
  }

  const toggle = root.querySelector("[data-navbar-toggle]");
  const panel = root.querySelector("[data-navbar-panel]");

  if (!toggle || !panel) {
    return root;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    panel.classList.toggle("is-open", !expanded);
  });

  return root;
}

function mountNavbar(target, options = {}) {
  const root =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!root) {
    return null;
  }

  root.innerHTML = createNavbarMarkup(options);
  bindNavbarEvents(root);
  return root.firstElementChild;
}

export {
  bindNavbarEvents,
  createNavbarMarkup,
  getDefaultNavbarLinks,
  mountNavbar
};
