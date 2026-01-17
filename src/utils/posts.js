// Utility to load and parse blog posts
const postModules = import.meta.glob('../posts/*.md', { 
  eager: true,
  query: '?raw',
  import: 'default'
});

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
      
      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
        tags,
        content: frontmatterMatch[2],
        frontmatter,
      };
    }
    
    return {
      slug,
      title: slug,
      date: '',
      tags: [],
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

