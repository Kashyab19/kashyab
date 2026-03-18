// Script to generate sitemap.xml dynamically
// Run with: node scripts/generate-sitemap.js

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://kashyabmurali.com'; // Update with your domain
const postsDir = join(__dirname, '../src/posts');

// Get all markdown files
import { glob } from 'glob';

async function generateSitemap() {
  const posts = [];
  
  try {
    const files = await glob('src/posts/*.md');
    
    for (const file of files) {
      const content = readFileSync(join(__dirname, '..', file), 'utf-8');
      const slug = file.split('/').pop().replace('.md', '');
      
      // Extract date from frontmatter
      const dateMatch = content.match(/date:\s*["']?([^"'\n]+)["']?/);
      const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
      
      posts.push({
        slug,
        date,
      });
    }
  } catch (error) {
    console.log('No posts found or error reading posts:', error.message);
  }

  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/writings</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/influence</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

  // Add blog posts
  posts.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  writeFileSync(join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log(`✅ Sitemap generated with ${posts.length} posts`);
}

generateSitemap().catch(console.error);
