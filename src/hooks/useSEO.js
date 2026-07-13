import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateSEO, generateStructuredData } from "../utils/seo";
import { getPostBySlug } from "../utils/posts";

export function useSEO({ title, description, image, type, postSlug, structuredData: suppliedStructuredData }) {
  const location = useLocation();

  useEffect(() => {
    let metaDescription = description;
    let metaTitle = title;
    let structuredData = suppliedStructuredData || null;

    // Handle blog posts
    if (postSlug) {
      const post = getPostBySlug(postSlug);
      if (post) {
        metaTitle = post.title;
        // Extract first paragraph or use description
        const firstParagraph = post.content.split("\n\n")[0]?.replace(/[#*`]/g, "").trim();
        metaDescription = firstParagraph || description;
        
        structuredData = generateStructuredData({
          type: "BlogPosting",
          title: post.title,
          description: metaDescription,
          datePublished: post.date,
          dateModified: post.date,
          url: `${window.location.origin}/${post.slug}`,
        });
      }
    } else if (!structuredData) {
      // Default structured data for person
      structuredData = generateStructuredData({ type: "Person" });
    }

    // Update SEO meta tags
    updateSEO({
      title: metaTitle,
      description: metaDescription,
      image,
      url: location.pathname,
      type: type || "website",
    });

    // Add structured data
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Reset to default on unmount
      updateSEO({});
    };
  }, [location.pathname, title, description, image, type, postSlug, suppliedStructuredData]);
}
