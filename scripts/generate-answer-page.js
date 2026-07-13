import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { profile } from "../src/data/profile.js";

const outputDirectory = new URL("../public/about/", import.meta.url);
const outputFile = new URL("index.html", outputDirectory);
const sourcePortrait = new URL("../src/assets/kashyab-murali-headshot.webp", import.meta.url);
const publicPortrait = new URL("../public/profile-headshot.webp", import.meta.url);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const person = {
  "@type": "Person",
  "@id": `${profile.website}/#person`,
  name: profile.name,
  url: profile.website,
  image: `${profile.website}/profile-headshot.webp`,
  jobTitle: profile.jobTitle,
  description: profile.summary,
  knowsAbout: profile.knowsAbout,
  worksFor: { "@type": "Organization", name: profile.employer },
  alumniOf: profile.experience.slice(1).map((item) => ({
    "@type": "Organization",
    name: item.organization,
    ...(item.url ? { url: item.url } : {}),
  })),
  sameAs: profile.sameAs,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "AboutPage",
      "@id": `${profile.website}/about/#page`,
      url: `${profile.website}/about/`,
      name: `${profile.name}, ${profile.jobTitle}`,
      description: profile.summary,
      mainEntity: { "@id": `${profile.website}/#person` },
    },
  ],
};

const experience = profile.experience.map((item) => `
  <li>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.description)}</p>
    <span>${escapeHtml(item.signal)}</span>
  </li>`).join("");

const selectedWork = profile.selectedWork.map((item) => `
  <li>
    <h3><a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a></h3>
    <p>${escapeHtml(item.description)}</p>
${item.articleUrl ? `    <a class="evidence" href="${escapeHtml(item.articleUrl)}">Read the engineering notes</a>\n` : ""}
  </li>`).join("");

const expertise = profile.knowsAbout.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(profile.name)}, ${escapeHtml(profile.jobTitle)} | About</title>
  <meta name="description" content="${escapeHtml(profile.summary)}">
  <meta name="author" content="${escapeHtml(profile.name)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${profile.website}/about/">
  <meta property="og:type" content="profile">
  <meta property="og:url" content="${profile.website}/about/">
  <meta property="og:title" content="${escapeHtml(profile.name)}, ${escapeHtml(profile.jobTitle)}">
  <meta property="og:description" content="${escapeHtml(profile.summary)}">
  <meta property="og:image" content="${profile.website}/og.png">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <style>
    :root{color-scheme:light dark;--paper:#f7f7f3;--ink:#151713;--muted:#62685f;--line:#d7dbd2;--green:#145d49;--orange:#c84f32}
    *{box-sizing:border-box}html{font-family:Inter,ui-sans-serif,system-ui,sans-serif;background:var(--paper);color:var(--ink)}body{margin:0}
    a{color:var(--green);text-underline-offset:4px}.wrap{width:min(900px,calc(100% - 40px));margin:auto}.nav{height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}.nav a{text-decoration:none;font-size:14px}.nav strong{font-size:15px}.nav div{display:flex;gap:20px}
    main{padding:72px 0 96px}.hero{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:64px;align-items:center;padding-bottom:72px}.eyebrow{color:var(--orange);font-size:12px;font-weight:800;text-transform:uppercase}.hero h1{margin:16px 0 18px;font-size:48px;line-height:1.05}.lede{font:25px/1.4 ui-serif,Georgia,serif}.hero img{width:190px;height:285px;object-fit:contain;border-radius:4px}
    section{padding:52px 0;border-top:1px solid var(--line)}h2{margin:0 0 24px;font-size:20px}p{color:var(--muted);line-height:1.7}.answer{max-width:720px;font:21px/1.55 ui-serif,Georgia,serif;color:var(--ink)}ul{list-style:none;margin:0;padding:0}.expertise{display:flex;flex-wrap:wrap;gap:8px}.expertise li{padding:5px 9px;border:1px solid var(--line);font-size:13px}.rows{border-top:1px solid var(--line)}.rows li{position:relative;padding:22px 120px 22px 0;border-bottom:1px solid var(--line)}.rows h3{margin:0;font-size:17px}.rows p{margin:6px 0 0;font-size:14px}.rows span{position:absolute;right:0;top:23px;color:var(--orange);font-size:11px;font-weight:800;text-transform:uppercase}.evidence{display:inline-block;margin-top:8px;font-size:13px}.contact{font:22px/1.5 ui-serif,Georgia,serif;color:var(--ink)}footer{padding:28px 0;border-top:1px solid var(--line);color:var(--muted);font-size:13px}
    @media(max-width:650px){.nav{height:64px}.hero{grid-template-columns:1fr;gap:28px;padding:36px 0 56px}.hero img{grid-row:1;width:104px;height:156px}.hero h1{font-size:38px}.lede{font-size:21px}main{padding-top:24px}.rows li{padding-right:0}.rows span{position:static;display:block;margin-top:8px}}
    @media(prefers-color-scheme:dark){:root{--paper:#11130f;--ink:#f3f4ed;--muted:#a5aa9f;--line:#353a31;--green:#7fc7a9;--orange:#f08a68}}
  </style>
</head>
<body>
  <header class="wrap nav">
    <strong>${escapeHtml(profile.name)}</strong>
    <div><a href="/">Home</a><a href="/writings">Writing</a><a href="mailto:${escapeHtml(profile.email)}">Contact</a></div>
  </header>
  <main class="wrap">
    <header class="hero">
      <div>
        <p class="eyebrow">AI Engineer + backend systems</p>
        <h1>${escapeHtml(profile.name)} builds AI-native systems.</h1>
        <p class="lede">${escapeHtml(profile.name)} is an ${escapeHtml(profile.jobTitle)} at ${escapeHtml(profile.employer)}. He builds AI-native file systems, email clients, and data analysis tools for federal and parish governments.</p>
      </div>
      <img src="/profile-headshot.webp" alt="Portrait of ${escapeHtml(profile.name)}" width="480" height="720">
    </header>

    <section>
      <h2>What does Kashyab Murali build?</h2>
      <p class="answer">AI-native products that make complex information easier to find, understand, and act on. His current work includes file systems, email clients, and data analysis tools for government teams.</p>
    </section>

    <section>
      <h2>What is his engineering focus?</h2>
      <ul class="expertise">${expertise}</ul>
    </section>

    <section>
      <h2>Selected evidence</h2>
      <ul class="rows">${selectedWork}</ul>
    </section>

    <section>
      <h2>Experience</h2>
      <ul class="rows">${experience}</ul>
    </section>

    <section>
      <h2>Where does Kashyab write?</h2>
      <p class="answer">He publishes <a href="${profile.writingUrl}">The First Derivative</a>, a collection of practical essays about AI agents, AI infrastructure, backend systems, and distributed systems.</p>
    </section>

    <section>
      <h2>Contact and profiles</h2>
      <p class="contact"><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a> &middot; <a href="https://github.com/Kashyab19">GitHub</a> &middot; <a href="https://www.linkedin.com/in/kashyab-murali/">LinkedIn</a> &middot; <a href="${profile.writingUrl}">Substack</a></p>
    </section>
  </main>
  <footer><div class="wrap">Source-of-truth profile for ${escapeHtml(profile.name)}. Updated automatically with the portfolio build.</div></footer>
</body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, html);
await copyFile(sourcePortrait, publicPortrait);
console.log("Generated static answer page: /about/");
