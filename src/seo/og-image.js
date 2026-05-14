function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createServiceOgImageHtml(config = {}) {
  const badge = config.badge || "Available in 48 hours";
  const title = config.title || "The website your business deserves.";
  const subtitle =
    config.subtitle ||
    "Fast, clear, and professional websites built to help your next customers understand what you do.";
  const primaryCta = config.primaryCta || "Get a quote";
  const secondaryCta = config.secondaryCta || "View work";
  const brand = config.brand || "Your Studio";
  const mockupBrand = config.mockupBrand || "YOUR BRAND";
  const mockupEyebrow = config.mockupEyebrow || "Local business website";
  const mockupHeadline = config.mockupHeadline || "GROW YOUR BUSINESS.";
  const mockupAccent = config.mockupAccent || "ONLINE.";
  const mockupBody =
    config.mockupBody ||
    "A focused landing page designed to explain your offer clearly and drive more enquiries.";
  const floatingBadge = config.floatingBadge || "48h";
  const floatingLabel = config.floatingLabel || "to launch your site";
  const priceBadge = config.priceBadge || "Fixed-price quote";
  const accent = config.accentColor || "#d4a017";
  const background = config.backgroundColor || "#f0ede8";
  const dark = config.darkColor || "#111111";
  const muted = config.mutedColor || "#555555";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: ${escapeHtml(background)};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    display: flex;
    align-items: center;
    padding: 0 72px;
    gap: 48px;
  }
  .left { flex: 1; display: flex; flex-direction: column; gap: 20px; }
  .badge {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    background: #fff;
    border: 1.5px solid #d0cdc8;
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${escapeHtml(dark)};
  }
  h1 {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: ${escapeHtml(dark)};
  }
  .sub {
    max-width: 420px;
    font-size: 17px;
    line-height: 1.5;
    color: ${escapeHtml(muted)};
  }
  .btns { display: flex; gap: 12px; margin-top: 4px; }
  .btn-primary, .btn-secondary {
    border-radius: 50px;
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 600;
  }
  .btn-primary {
    color: #fff;
    background: ${escapeHtml(dark)};
    border: none;
  }
  .btn-secondary {
    color: ${escapeHtml(dark)};
    background: transparent;
    border: 1.5px solid #bbb;
  }
  .right { position: relative; width: 500px; flex-shrink: 0; }
  .screen-wrap {
    background: #1a1a1a;
    border-radius: 14px 14px 0 0;
    padding: 8px 8px 0;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  }
  .screen-inner {
    background: ${escapeHtml(dark)};
    border-radius: 8px;
    overflow: hidden;
    height: 290px;
  }
  .site-nav {
    background: ${escapeHtml(dark)};
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #222;
  }
  .site-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo-box {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: ${escapeHtml(accent)};
    color: ${escapeHtml(dark)};
    font-size: 10px;
    font-weight: 800;
  }
  .logo-text { color: #fff; font-size: 9px; font-weight: 600; line-height: 1.2; }
  .site-links { display: flex; gap: 16px; }
  .site-link {
    color: #aaa;
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .site-hero { padding: 28px 20px 20px; }
  .site-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    color: ${escapeHtml(accent)};
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .site-eyebrow::before {
    content: "";
    display: block;
    width: 24px;
    height: 1.5px;
    background: ${escapeHtml(accent)};
  }
  .site-h1 {
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #fff;
  }
  .site-h1 span { color: ${escapeHtml(accent)}; }
  .site-body {
    margin-top: 12px;
    max-width: 240px;
    color: #888;
    font-size: 8px;
    line-height: 1.5;
  }
  .stand-neck { width: 60px; height: 28px; background: #c8c5c0; margin: 0 auto; }
  .stand-base { width: 140px; height: 10px; background: #c0bdb8; border-radius: 0 0 8px 8px; margin: 0 auto; }
  .badge-floating, .price-badge {
    position: absolute;
    background: #fff;
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  }
  .badge-floating {
    top: -18px;
    right: -10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    padding: 10px 16px;
  }
  .badge-floating .num {
    color: ${escapeHtml(dark)};
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
  }
  .badge-floating .label {
    color: #444;
    font-size: 12px;
    line-height: 1.3;
    font-weight: 500;
  }
  .price-badge {
    left: -10px;
    bottom: 60px;
    border-left: 4px solid ${escapeHtml(accent)};
    border-radius: 12px;
    padding: 10px 18px;
    color: ${escapeHtml(dark)};
    font-size: 15px;
    font-weight: 800;
  }
  .watermark {
    position: absolute;
    right: 72px;
    bottom: 24px;
    color: #aaa;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
  <div class="left">
    <div class="badge">${escapeHtml(badge)}</div>
    <h1>${escapeHtml(title)}</h1>
    <p class="sub">${escapeHtml(subtitle)}</p>
    <div class="btns">
      <div class="btn-primary">${escapeHtml(primaryCta)}</div>
      <div class="btn-secondary">${escapeHtml(secondaryCta)}</div>
    </div>
  </div>
  <div class="right">
    <div class="badge-floating">
      <span class="num">${escapeHtml(floatingBadge)}</span>
      <span class="label">${escapeHtml(floatingLabel)}</span>
    </div>
    <div class="imac">
      <div class="screen-wrap">
        <div class="screen-inner">
          <div class="site-nav">
            <div class="site-logo">
              <div class="logo-box">${escapeHtml(mockupBrand.slice(0, 2).toUpperCase())}</div>
              <div class="logo-text">${escapeHtml(mockupBrand)}</div>
            </div>
            <div class="site-links">
              <span class="site-link">Services</span>
              <span class="site-link">About</span>
              <span class="site-link">Contact</span>
            </div>
          </div>
          <div class="site-hero">
            <div class="site-eyebrow">${escapeHtml(mockupEyebrow)}</div>
            <div class="site-h1">${escapeHtml(mockupHeadline)}<br><span>${escapeHtml(mockupAccent)}</span></div>
            <div class="site-body">${escapeHtml(mockupBody)}</div>
          </div>
        </div>
      </div>
      <div class="stand-neck"></div>
      <div class="stand-base"></div>
    </div>
    <div class="price-badge">${escapeHtml(priceBadge)}</div>
  </div>
  <div class="watermark">${escapeHtml(brand)}</div>
</body>
</html>`;
}

export {
  createServiceOgImageHtml
};
