// Utility to load and parse blog posts
const postModules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

// Words-per-minute target for the average reader. 200 is the common heuristic.
const WPM = 200;

function getReadingTime(content) {
  const text = content.replace(/```[\s\S]*?```/g, "").replace(/[#*`>_~]/g, "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}

function getExcerpt(content) {
  // Strip code fences, headings, blockquotes, then take the first sentence-ish.
  const firstParagraph = content
    .replace(/```[\s\S]*?```/g, "")
    .split("\n\n")
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith(">"));
  if (!firstParagraph) return "";
  const stripped = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // markdown links → link text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")    // images → drop
    .replace(/[#*`_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const firstSentence = stripped.split(/(?<=[.!?])\s/)[0];
  return firstSentence.length > 180 ? `${firstSentence.slice(0, 177)}...` : firstSentence;
}

export function getAllPosts() {
  const posts = Object.entries(postModules).map(([path, content]) => {
    const slug = path.split('/').pop().replace('.md', '');

    // Extract frontmatter from markdown
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (frontmatterMatch) {
      const frontmatter = {};
      frontmatterMatch[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        }
      });

      // Parse tags (can be comma-separated string or array)
      let tags = [];
      if (frontmatter.tags) {
        if (typeof frontmatter.tags === 'string') {
          tags = frontmatter.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (Array.isArray(frontmatter.tags)) {
          tags = frontmatter.tags;
        }
      }

      const body = frontmatterMatch[2];

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
        tags,
        subtitle: frontmatter.subtitle || getExcerpt(body),
        readingTime: getReadingTime(body),
        content: body,
        frontmatter,
      };
    }

    return {
      slug,
      title: slug,
      date: '',
      tags: [],
      subtitle: getExcerpt(content),
      readingTime: getReadingTime(content),
      content,
      frontmatter: {},
    };
  });
  
  // Sort by date (newest first), posts without dates go to the end
  return posts.sort((a, b) => {
    // If both have dates, sort by date (newest first)
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    // Posts without dates go to the end
    if (!a.date && b.date) return 1;
    if (a.date && !b.date) return -1;
    // If neither has a date, maintain original order
    return 0;
  });
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

