import substackPosts from "./substack-posts.json";

export const SUBSTACK_URL = "https://thefirstderivative.substack.com/";

const editorial = {
  "reverse-engineering-the-steer-mode": {
    theme: "AI engineering",
    note: "A teardown of how an active coding agent absorbs new instructions without being interrupted.",
  },
  "the-machine-inside-the-machine": {
    theme: "AI engineering",
    note: "A practical mental model for what an AI agent actually does after you press enter.",
    featured: 1,
  },
  "how-i-optimized-a-semantic-cache": {
    theme: "AI infrastructure",
    note: "How semantic caching changes the cost and latency profile of retrieval-heavy AI products.",
    featured: 2,
  },
  "holiday-edition-how-i-built-a-video": {
    theme: "Applied AI",
    note: "The engineering behind searching a video with natural language and jumping to the right moment.",
    featured: 3,
  },
  "how-to-design-a-vector-database-like": { theme: "AI infrastructure" },
  "the-abstraction-tax": { theme: "Engineering notes" },
  "thread-the-node": { theme: "Engineering notes" },
  "how-to-design-a-circuit-breaker": { theme: "Distributed systems" },
  "how-to-design-a-message-queue-like": { theme: "Distributed systems" },
  "how-to-design-a-load-balancer": { theme: "Distributed systems" },
  "how-to-design-a-rate-limiter": { theme: "Distributed systems" },
  "how-to-design-a-webhook": { theme: "Distributed systems" },
  "how-to-design-an-autocomplete-system": { theme: "Distributed systems" },
  "how-to-design-a-notification-system": { theme: "Distributed systems" },
  "robinhoods-notification-system-1": { theme: "Distributed systems" },
  "how-to-design-a-geo-generative-engine": { theme: "AI discovery" },
};

function slugFromUrl(url) {
  return url.split("/p/")[1] || url;
}

function inferTheme(title) {
  const normalized = title.toLowerCase();
  if (normalized.includes("ai") || normalized.includes("vector") || normalized.includes("semantic")) {
    return "AI infrastructure";
  }
  if (normalized.startsWith("how to design")) return "Distributed systems";
  return "Engineering notes";
}

export const writings = substackPosts.map((post) => {
  const slug = slugFromUrl(post.url);
  const details = editorial[slug] || {};
  return {
    ...post,
    slug,
    theme: details.theme || inferTheme(post.title),
    note: details.note || post.description,
    featured: details.featured || null,
  };
});

export const featuredWritings = writings
  .filter((post) => post.featured)
  .sort((a, b) => a.featured - b.featured);

export const latestWritings = writings.slice(0, 4);

export function writingCollectionStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Writing by Kashyab Murali",
    url: "https://kashyab.xyz/writings",
    description: "Essays about AI engineering, backend infrastructure, and distributed systems.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: writings.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: post.url,
        name: post.title,
      })),
    },
  };
}
