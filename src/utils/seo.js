import { profile } from "../data/profile";

// SEO utility functions
export const siteConfig = {
  name: profile.name,
  title: "Kashyab Murali | Engineer Building AI-Native Systems",
  description: profile.summary,
  url: profile.website,
  image: "https://kashyab.xyz/og.png",
  imageAlt: "Kashyab Murali, AI-native software and backend systems",
  twitter: "@karpathism",
};

export function updateSEO({ title, description, image, url, type = "website" }) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const fullDescription = description || siteConfig.description;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const fullImage = image || siteConfig.image;

  // Update document title
  document.title = fullTitle;

  // Update or create meta tags
  const updateMetaTag = (name, content, attribute = "name") => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Basic meta tags
  updateMetaTag("description", fullDescription);
  updateMetaTag("author", siteConfig.name);
  updateMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

  // Open Graph tags
  updateMetaTag("og:title", fullTitle, "property");
  updateMetaTag("og:description", fullDescription, "property");
  updateMetaTag("og:image", fullImage, "property");
  updateMetaTag("og:image:alt", siteConfig.imageAlt, "property");
  updateMetaTag("og:image:width", "1200", "property");
  updateMetaTag("og:image:height", "630", "property");
  updateMetaTag("og:url", fullUrl, "property");
  updateMetaTag("og:type", type, "property");
  updateMetaTag("og:site_name", siteConfig.name, "property");

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", fullTitle);
  updateMetaTag("twitter:description", fullDescription);
  updateMetaTag("twitter:image", fullImage);
  updateMetaTag("twitter:image:alt", siteConfig.imageAlt);
  updateMetaTag("twitter:creator", siteConfig.twitter);

  // Canonical URL
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", fullUrl);
}

const personId = `${siteConfig.url}/#person`;

export function personStructuredData() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/og.png`,
    jobTitle: profile.jobTitle,
    description: siteConfig.description,
    knowsAbout: profile.knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: profile.employer,
    },
    alumniOf: [
      { "@type": "Organization", name: "Tradible Marketplace", url: "https://tradible.io" },
      { "@type": "Organization", name: "Verizon", url: "https://verizon.com" },
      { "@type": "Organization", name: "summerize.ai", url: "https://summerize.ai" },
    ],
    sameAs: profile.sameAs,
  };
}

export function profilePageStructuredData() {
  const person = personStructuredData();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile-page`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": personId },
      },
      person,
    ],
  };
}

export function generateStructuredData({ type, title, description, datePublished, dateModified, url }) {
  if (type === "BlogPosting") {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      author: { "@id": personId },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      url: url,
    };
  }

  return { "@context": "https://schema.org", ...personStructuredData() };
}
