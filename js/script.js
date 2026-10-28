/* =====================================================================
   1. CONTENT: edit everything here. Empty strings/arrays hide the item.
   All values below are SAMPLE placeholders. Replace with your own.
   ===================================================================== */
const CONFIG = {
  name: "AJAY C",
  initials: "YN",
  role: "DATA ANALYTICS & WEB DEVELOPER",
  headline: "I build fast, accessible DATA DASHBOARDS.",
  roles: ["DATA ANALYST", "DASHBOARD DEVELOPER", "WEB DEVELOPER"],
  tagline: "I transform raw data into meaningful insights through data analysis and interactive dashboards. Using Python, SQL, and Excel, I uncover trends and present data-driven insights that support smarter business decisions. I am passionate about leveraging data to drive innovation and improve processes, and I am always eager to learn new tools and techniques to enhance my skills in data analytics and web development.",
  availability: "Available for new opportunities", // "" hides the badge
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLiH2M33tGU2O04uKGeFEKCoqHvs1X-Iw06qpg-GXkQ&s=10",            // e.g. "assets/images/profile.jpg" ("" shows initials)
  resume: "",           // e.g. "assets/resume.pdf" ("" hides the button)
  about: [
    "I am a BCA graduate from Koshys Institute of Management Studies, Bangalore, with a strong interest in data analytics and software development. I have skills in Python, SQL, MySQL, and Excel, and I have worked on projects such as Sales Data Analysis using Excel to clean, analyze, and visualize data using pivot tables and charts..",
    "As a fresher, I am eager to apply my technical knowledge to real-world problems and continuously improve my skills. I enjoy working with data, identifying patterns, solving problems, and building practical solutions. My approach is to understand the problem clearly, break it into manageable steps, analyze the available information, and develop an effective solution. I am looking for opportunities to learn, contribute to a team, and grow professionally in the field of data analytics..."
  ],
  focus: ["DATA ANALYTICS", "Web applications", "APIs and databases", "DATA ENGINEERING"],
  stats: [],            // e.g. [{ value: "3+", label: "Years of experience" }] (only verified facts)
  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "REST APIs"],
    "Databases": ["MongoDB", "PostgreSQL", "SQL"],
    "Tools": ["Git", "GitHub", "VS Code", "Figma", "EXCEL", "Power BI", "Tableau"]
  },
  projects: [
    { title: "Sample Project One", category: "Web Development", image: "", description: "A short description of the problem this project solves.", features: ["Key feature one", "Key feature two"], tech: ["JavaScript", "Node.js"], demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", image: "", description: "Describe the data, method and outcome.", features: ["Interactive dashboard", "Automated reporting"], tech: ["Python", "SQL"], demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", image: "", description: "Describe the model, dataset and results.", features: ["Feature engineering", "Model evaluation"], tech: ["Python", "scikit-learn"], demo: "", code: "", caseStudy: "" }
  ],
  experience: [
    { title: "Your Job Title", org: "Company Name", period: "Start – End", points: ["Describe a responsibility or achievement."], tech: ["Tech A", "Tech B"] },
    { title: "Your Qualification", org: "Institution Name", period: "Start – End", points: ["Describe relevant coursework or achievements."], tech: [] }
  ],
  certifications: [],   // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025", url: "" }]
  contact: {            // empty values are hidden
    email: "ajay.ajayc2005@gmail.com",
    phone: "+918129509812",
    whatsapp: "918129509812",   // digits only, with country code
    whatsappMessage: "Hi! I found your portfolio and would like to connect.",
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    instagram: "",
    location: "Kerala, India"
  },
  categories: ["Web Development", "Data Analytics", "Data Science", "Other"] // filter order
};

/* =====================================================================
   2. HELPERS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ext = 'target="_blank" rel="noopener noreferrer"';
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
const chips = (arr) => arr.map((t) => `<li class="chip">${esc(t)}</li>`).join("");

/* =====================================================================
   3. RENDER
   ===================================================================== */
function contactItems() {
  const c = CONFIG.contact, out = [];
  if (c.email) out.push({ icon: "mail", label: "Email", text: c.email, href: `mailto:${c.email}` });
  if (c.phone) out.push({ icon: "phone", label: "Phone", text: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` });
  if (c.whatsapp) {
    const msg = c.whatsappMessage ? `?text=${encodeURIComponent(c.whatsappMessage)}` : "";
    out.push({ icon: "message-circle", label: "WhatsApp", text: "Start a chat", href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}${msg}`, external: true });
  }
  if (c.linkedin) out.push({ icon: "linkedin", label: "LinkedIn", text: "View profile", href: c.linkedin, external: true });
  if (c.github) out.push({ icon: "github", label: "GitHub", text: "Browse code", href: c.github, external: true });
  if (c.instagram) out.push({ icon: "instagram", label: "Instagram", text: "Follow along", href: c.instagram, external: true });
  if (c.location) out.push({ icon: "map-pin", label: "Location", text: c.location });
  return out;
}

function render() {
  document.title = `${CONFIG.name} | ${CONFIG.role} Portfolio`;
  $$("[data-bind]").forEach((el) => { el.textContent = CONFIG[el.dataset.bind] ?? ""; });
  if (CONFIG.availability) $("#avail").hidden = false;

  const links = (cls) => NAV.map(([id, l]) => `<a href="#${id}" class="${cls}" data-nav="${id}">${l}</a>`).join("");
  $("#nav-desktop").innerHTML = links("nav-link");
  $("#nav-mobile").innerHTML = links("nav-link");
  $("#nav-footer").innerHTML = NAV.map(([id, l]) => `<a href="#${id}" class="text-muted">${l}</a>`).join("");

  const socials = contactItems().filter((i) => ["github", "linkedin", "instagram"].includes(i.icon));
  const soc = socials.map((s) => `<a class="icon-btn" href="${esc(s.href)}" ${ext} aria-label="${s.label} (opens in a new tab)"><i data-lucide="${s.icon}"></i></a>`).join("");
  $("#hero-socials").innerHTML = soc; $("#footer-socials").innerHTML = soc;

  $("#hero-visual").innerHTML = `<div class="avatar">${CONFIG.image ? `<img src="${esc(CONFIG.image)}" alt="Portrait of ${esc(CONFIG.name)}" width="400" height="400">` : `<span aria-hidden="true">${esc(CONFIG.initials)}</span>`}</div>`;

  $("#about-text").innerHTML = CONFIG.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#about-focus").innerHTML = chips(CONFIG.focus);
  $("#about-stats").innerHTML = CONFIG.stats.map((s) => `<div class="card p-4"><p class="font-heading text-2xl font-bold text-accent">${esc(s.value)}</p><p class="text-sm text-muted">${esc(s.label)}</p></div>`).join("");
  if (CONFIG.resume) { const r = $("#resume-btn"); r.href = CONFIG.resume; r.hidden = false; }

  $("#skills-grid").innerHTML = Object.entries(CONFIG.skills).filter(([, v]) => v.length).map(([cat, items]) =>
    `<div class="card reveal p-6"><h3 class="font-heading mb-4 text-lg font-semibold">${esc(cat)}</h3><ul class="flex flex-wrap gap-2">${chips(items)}</ul></div>`).join("");

  const cats = ["All", ...CONFIG.categories.filter((c) => CONFIG.projects.some((p) => p.category === c))];
  $("#filters").innerHTML = cats.length > 2 ? cats.map((c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "";
  const link = (href, icon, text) => href ? `<a class="btn btn-ghost !min-h-10 !px-3 !py-1 text-sm" href="${esc(href)}" ${ext}><i data-lucide="${icon}"></i>${text}</a>` : "";
  $("#projects-grid").innerHTML = CONFIG.projects.map((p) => `
    <article class="card proj reveal flex flex-col overflow-hidden" data-category="${esc(p.category)}">
      <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="360">` : `<i data-lucide="layout-dashboard" aria-hidden="true"></i>`}</div>
      <div class="flex flex-1 flex-col p-5">
        <h3 class="font-heading text-xl font-semibold">${esc(p.title)}</h3>
        <p class="mt-2 text-sm text-muted">${esc(p.description)}</p>
        ${p.features?.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <ul class="mt-4 flex flex-wrap gap-2">${chips(p.tech || [])}</ul>
        <div class="mt-auto flex flex-wrap gap-2 pt-5">${link(p.demo, "external-link", "Live demo")}${link(p.code, "code", "Source code")}${link(p.caseStudy, "book-open", "Case study")}</div>
      </div>
    </article>`).join("");

  $("#timeline").innerHTML = CONFIG.experience.map((e) => `
    <li class="tl-item reveal"><p class="text-sm font-medium text-muted">${esc(e.period)}</p>
      <div><h3 class="font-heading text-xl font-semibold">${esc(e.title)}</h3><p class="text-accent">${esc(e.org)}</p>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${e.tech?.length ? `<ul class="mt-3 flex flex-wrap gap-2">${chips(e.tech)}</ul>` : ""}</div></li>`).join("");

  if (CONFIG.certifications.length) {
    $("#achievements").hidden = false;
    $("#cert-grid").innerHTML = CONFIG.certifications.map((c) => {
      const inner = `<span class="ico"><i data-lucide="award"></i></span><span><span class="font-heading block font-semibold">${esc(c.title)}</span><span class="text-sm text-muted">${esc([c.issuer, c.year].filter(Boolean).join(", "))}</span></span>`;
      return c.url ? `<a class="card reveal flex gap-4 p-5" href="${esc(c.url)}" ${ext}>${inner}</a>` : `<div class="card reveal flex gap-4 p-5">${inner}</div>`;
    }).join("");
  }

  $("#contact-grid").innerHTML = contactItems().map((i) => {
    const inner = `<span class="ico"><i data-lucide="${i.icon}"></i></span><span class="min-w-0"><span class="font-heading block font-semibold">${i.label}</span><span class="block truncate text-sm text-muted">${esc(i.text)}</span></span>`;
    return i.href ? `<a class="card reveal flex items-center gap-4 p-5" href="${esc(i.href)}" ${i.external ? ext : ""}>${inner}</a>` : `<div class="card reveal flex items-center gap-4 p-5">${inner}</div>`;
  }).join("");

  $("#year").textContent = new Date().getFullYear();
  window.lucide?.createIcons();
}

/* =====================================================================
   4. BEHAVIOUR (each initialiser runs once, so no duplicate listeners)
   ===================================================================== */
function initTheme() {
  const root = document.documentElement;
  const btn = $("#theme-toggle");
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

function initMenu() {
  const btn = $("#menu-toggle"), menu = $("#mobile-menu");
  const set = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  btn.addEventListener("click", () => set(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
  matchMedia("(min-width: 768px)").addEventListener("change", (m) => m.matches && set(false));
}

function initActiveNav() {
  const links = $$("[data-nav]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => { const on = l.dataset.nav === en.target.id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

function initReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return items.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

function initFilters() {
  const bar = $("#filters");
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]"); if (!b) return;
    $$("[data-filter]", bar).forEach((x) => x.setAttribute("aria-pressed", x === b));
    $$(".proj").forEach((card) => { card.hidden = b.dataset.filter !== "All" && card.dataset.category !== b.dataset.filter; });
  });
}

function initTyping() {
  const el = $("#role-text"), roles = CONFIG.roles;
  if (!el || !roles.length) return;
  if (reduceMotion) { el.textContent = roles[0]; return; }
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    c += del ? -1 : 1;
    el.textContent = word.slice(0, c);
    let wait = del ? 40 : 80;
    if (!del && c === word.length) { del = true; wait = 1600; }
    else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 400; }
    setTimeout(tick, wait);
  })();
}

function initToTop() {
  $("#to-top").addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  initTheme(); initMenu(); initActiveNav(); initReveal(); initFilters(); initTyping(); initToTop();
});
// Lucide loads with `defer`; make sure icons render even if it finishes after DOMContentLoaded.
window.addEventListener("load", () => window.lucide?.createIcons());
