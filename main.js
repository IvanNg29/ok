const DATA_URL = "data/content.json";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const isExternal = href => /^https?:\/\//i.test(href || "");

function renderHeader(site, navigation, currentPage) {
  const links = navigation.map(item => `
    <li><a class="nav-link ${item.key === currentPage ? "active" : ""}" href="${escapeHTML(item.href)}" ${item.key === currentPage ? 'aria-current="page"' : ""}>${escapeHTML(item.label)}</a></li>
  `).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="index.html" aria-label="Đồng Tháp - Trang chủ">
        <span class="brand-mark" aria-hidden="true">✿</span>
        <span class="brand-text"><strong>${escapeHTML(site.name)}</strong><small>${escapeHTML(site.tagline)}</small></span>
      </a>
      <nav aria-label="Điều hướng chính">
        <ul class="nav-list" id="nav-list">${links}</ul>
      </nav>
      <a class="nav-cta" href="thong-tin.html">Tìm hiểu tỉnh <span>↗</span></a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="nav-list">
        <span></span><span></span>
      </button>
    </div>
  `;

  const toggle = document.getElementById("menu-toggle");
  const list = document.getElementById("nav-list");
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Mở menu" : "Đóng menu");
    list.classList.toggle("open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });
  list.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });
}

function closeMenu() {
  const toggle = document.getElementById("menu-toggle");
  const list = document.getElementById("nav-list");
  if (!toggle || !list) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Mở menu");
  list.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function renderFooter(site, navigation) {
  const pageLinks = navigation.map(item => `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`).join("");
  document.getElementById("site-footer").innerHTML = `
    <div class="footer-main">
      <div class="footer-brand">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true">✿</span>
          <span class="brand-text"><strong>${escapeHTML(site.name)}</strong><small>${escapeHTML(site.tagline)}</small></span>
        </a>
        <p>${escapeHTML(site.description)} ${escapeHTML(site.footerNote)}</p>
      </div>
      <div class="footer-col"><h4>Khám phá website</h4>${pageLinks}</div>
      <div class="footer-col"><h4>Thông tin</h4>
        <a href="https://dongthap.gov.vn/" target="_blank" rel="noopener noreferrer">Cổng thông tin tỉnh ↗</a>
        <a href="https://dulich.dongthap.gov.vn/" target="_blank" rel="noopener noreferrer">Du lịch Đồng Tháp ↗</a>
        <a href="thong-tin.html">Nguồn tham khảo</a>
      </div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} · Website giới thiệu tỉnh Đồng Tháp</span><span>Thiết kế với cảm hứng từ sắc sen và miền sông nước.</span></div>
  `;
}

function renderHero(hero) {
  const external = isExternal(hero.button?.href);
  return `
    <section class="hero">
      ${hero.image ? `<img class="hero-image" src="${escapeHTML(hero.image)}" alt="${escapeHTML(hero.imageAlt || "")}" fetchpriority="high">` : ""}
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHTML(hero.eyebrow)}</p>
          <h1>${escapeHTML(hero.title)}</h1>
          <p class="hero-lead">${escapeHTML(hero.lead)}</p>
          <a class="button-primary" href="${escapeHTML(hero.button?.href || "#main-content")}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            ${escapeHTML(hero.button?.label || "Khám phá")} <span>→</span>
          </a>
          <div class="hero-note">${escapeHTML(hero.note || "ĐỒNG THÁP · VIỆT NAM")}</div>
        </div>
      </div>
      <div class="hero-decoration" aria-hidden="true">THE LAND OF LOTUS</div>
    </section>
  `;
}

function renderIntro(intro) {
  if (!intro) return "";
  return `
    <section class="section intro-band">
      <div class="intro-mark reveal" aria-hidden="true"><span>ĐẤT SEN HỒNG</span></div>
      <div class="intro-copy reveal reveal-delay-1">
        <p class="eyebrow dark">${escapeHTML(intro.eyebrow)}</p>
        <h2>${escapeHTML(intro.title)}</h2>
        <p>${escapeHTML(intro.text)}</p>
      </div>
    </section>
  `;
}

function renderStats(stats = []) {
  if (!stats.length) return "";
  return `
    <section class="stats-strip" aria-label="Một số số liệu về Đồng Tháp">
      <div class="stats-inner">
        ${stats.map((item, index) => `
          <div class="stat reveal reveal-delay-${index + 1}">
            <strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.unit)}</span>
            <small>${escapeHTML(item.label)}</small>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCards(cards = [], title = "", lead = "") {
  if (!cards.length) return "";
  return `
    <section class="section" id="${title ? "diem-den" : "noi-dung"}">
      ${title ? `<div class="section-heading"><p class="eyebrow dark">GÓC NHÌN ĐỒNG THÁP</p><h2>${escapeHTML(title)}</h2>${lead ? `<p>${escapeHTML(lead)}</p>` : ""}</div>` : ""}
      <div class="card-grid">
        ${cards.map((card, index) => {
          const link = card.href ? `<a class="card-link" href="${escapeHTML(card.href)}">${escapeHTML(card.link || "Tìm hiểu thêm")} <span>→</span></a>` : `<span class="card-meta">${escapeHTML(card.meta || "ĐỒNG THÁP")}</span>`;
          return `
            <article class="feature-card reveal reveal-delay-${(index % 3) + 1}">
              <div class="card-media">${card.image ? `<img src="${escapeHTML(card.image)}" alt="${escapeHTML(card.alt || card.title)}" loading="lazy">` : ""}</div>
              <div class="card-body">
                <span class="card-tag">${escapeHTML(card.tag || "ĐỒNG THÁP")}</span>
                <h3>${escapeHTML(card.title)}</h3>
                <p>${escapeHTML(card.text)}</p>
                <div class="card-meta">${card.meta ? `<span>${escapeHTML(card.meta)}</span>` : ""}${link}</div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderQuote(quote) {
  if (!quote) return "";
  return `<section class="quote-band"><p class="reveal">“${escapeHTML(quote)}”</p><span>— ĐỒNG THÁP, ĐẤT SEN HỒNG —</span></section>`;
}

function renderCallout(callout) {
  if (!callout) return "";
  const external = callout.button?.external || isExternal(callout.button?.href);
  return `
    <section class="section compact">
      <div class="callout reveal">
        <div><h3>${escapeHTML(callout.title)}</h3><p>${escapeHTML(callout.text)}</p></div>
        <a class="button-primary" href="${escapeHTML(callout.button?.href || "index.html")}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHTML(callout.button?.label || "Tìm hiểu thêm")} <span>→</span></a>
      </div>
    </section>
  `;
}

function renderFacts(page) {
  if (!page.facts?.length) return "";
  return `
    <section class="section compact">
      <div class="section-heading"><p class="eyebrow dark">TỔNG QUAN HÀNH CHÍNH</p><h2>${escapeHTML(page.factsTitle || "Thông tin khái quát")}</h2></div>
      <dl class="fact-list">
        ${page.facts.map(item => `<div class="fact-row"><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.value)}</dd></div>`).join("")}
      </dl>
    </section>
  `;
}

function renderTimeline(page) {
  if (!page.timeline?.length) return "";
  return `
    <section class="section compact" id="moc-thoi-gian">
      <div class="section-heading center"><p class="eyebrow dark">CÁC MỐC ĐÁNG CHÚ Ý</p><h2>${escapeHTML(page.timelineTitle || "Dòng thời gian")}</h2></div>
      <div class="timeline">
        ${page.timeline.map(item => `<article class="timeline-item reveal"><span class="timeline-date">${escapeHTML(item.date)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function renderSources(page) {
  if (!page.sources?.length) return "";
  return `
    <section class="section compact">
      <div class="section-heading"><p class="eyebrow dark">ĐỌC THÊM</p><h2>${escapeHTML(page.sourcesTitle || "Nguồn tham khảo")}</h2><p>${escapeHTML(page.sourcesLead || "")}</p></div>
      <ul class="source-list">
        ${page.sources.map(item => `<li><a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.label)}<span>↗</span></a></li>`).join("")}
      </ul>
    </section>
  `;
}

function activateInteractions() {
  const header = document.getElementById("site-header");
  const progress = document.getElementById("page-progress");
  const backTop = document.getElementById("back-to-top");

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    progress.style.width = `${percent}%`;
    header.classList.toggle("scrolled", scrollTop > 20);
    backTop.classList.toggle("visible", scrollTop > 450);
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.querySelectorAll(".card-media img, .hero-image").forEach(img => {
    img.addEventListener("error", () => {
      img.remove();
      img.parentElement?.classList.add("image-fallback");
    }, { once: true });
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("is-visible"));
  }
}

async function init() {
  const currentPage = document.body.dataset.page || "home";
  const main = document.getElementById("main-content");
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Không thể tải content.json (HTTP ${response.status}).`);
    const data = await response.json();
    const page = data.pages[currentPage];
    if (!page) throw new Error(`Không tìm thấy nội dung cho trang: ${currentPage}.`);

    document.title = `${page.title} | ${data.site.name}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", page.description || data.site.description);

    renderHeader(data.site, data.navigation, currentPage);
    renderFooter(data.site, data.navigation);

    main.innerHTML = [
      renderHero(page.hero),
      renderIntro(page.intro),
      renderStats(page.stats),
      renderCards(page.cards, page.highlightsTitle || page.sectionTitle, page.highlightsLead || page.sectionLead),
      renderFacts(page),
      renderTimeline(page),
      renderSources(page),
      renderQuote(page.quote),
      renderCallout(page.callout)
    ].join("");

    activateInteractions();
  } catch (error) {
    console.error(error);
    main.innerHTML = `
      <section class="error-state">
        <h1>Chưa thể tải nội dung website</h1>
        <p>${escapeHTML(error.message)}</p>
        <p>Hãy chạy website qua máy chủ nội bộ (không mở trực tiếp bằng file://). Xem file README.md để biết cách chạy bằng VS Code Live Server hoặc Python.</p>
      </section>
    `;
  }
}

document.addEventListener("DOMContentLoaded", init);
