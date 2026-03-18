// SEO utility functions
export const siteConfig = {
  name: "Kashyab Murali",
  title: "Kashyab Murali - Backend Engineer & Systems Thinker",
  description: "I study systems. Whether it is history, economics, or computer science, I am obsessed with how complex parts fit together to function as a whole. I take this understanding of broad mechanics and apply it to backend engineering.",
  url: "https://kashyab.xyz",
  image: "https://kashyab.xyz/og-image.jpg",
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

  // Open Graph tags
  updateMetaTag("og:title", fullTitle, "property");
  updateMetaTag("og:description", fullDescription, "property");
  updateMetaTag("og:image", fullImage, "property");
  updateMetaTag("og:url", fullUrl, "property");
  updateMetaTag("og:type", type, "property");
  updateMetaTag("og:site_name", siteConfig.name, "property");

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", fullTitle);
  updateMetaTag("twitter:description", fullDescription);
  updateMetaTag("twitter:image", fullImage);
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

export function generateStructuredData({ type, title, description, datePublished, dateModified, author, url }) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type || "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      "https://www.linkedin.com/in/kashyab-murali/",
      "https://github.com/Kashyab19",
      "https://x.com/karpathism",
      "https://thefirstderivative.substack.com/",
    ],
  };

  if (type === "BlogPosting") {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      author: {
        "@type": "Person",
        name: siteConfig.name,
      },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      url: url,
    };
  }

  return baseStructuredData;
}
