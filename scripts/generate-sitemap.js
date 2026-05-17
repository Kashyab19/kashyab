// Generates public/sitemap.xml from static routes + src/posts/*.md frontmatter.
// Runs automatically before `vite build` via the prebuild npm script.

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const baseUrl = 'https://kashyab.xyz';
const postsDir = join(__dirname, '../src/posts');
const outputPath = join(__dirname, '../public/sitemap.xml');

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/writings', changefreq: 'weekly', priority: '0.8' },
  { path: '/influence', changefreq: 'monthly', priority: '0.7' },
  { path: '/claurden', changefreq: 'monthly', priority: '0.5' },
];

const today = new Date().toISOString().split('T')[0];

const posts = readdirSync(postsDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const content = readFileSync(join(postsDir, file), 'utf-8');
    const dateMatch = content.match(/^date:\s*["']?([^"'\n]+)["']?/m);
    return {
      slug: file.replace(/\.md$/, ''),
      date: dateMatch ? dateMatch[1].trim() : today,
    };
  });

const urlEntries = [
  ...staticRoutes.map((route) => ({
    loc: `${baseUrl}${route.path === '/' ? '/' : route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  })),
  ...posts.map((post) => ({
    loc: `${baseUrl}/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(outputPath, xml);
console.log(`Sitemap written: ${urlEntries.length} URLs (${posts.length} posts)`);
