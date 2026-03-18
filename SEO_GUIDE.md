# SEO Implementation Guide

This document outlines the SEO improvements made to your portfolio site.

## What's Been Implemented

### 1. **Meta Tags** (`index.html`)
- Primary meta tags (title, description, keywords, author)
- Open Graph tags for social media sharing (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Robots meta tags

### 2. **Dynamic SEO Hook** (`src/hooks/useSEO.js`)
- Automatically updates page titles and meta tags based on route
- Generates structured data (JSON-LD) for better search engine understanding
- Handles blog posts with automatic description extraction

### 3. **Structured Data (Schema.org)**
- Person schema for the homepage
- BlogPosting schema for individual blog posts
- Includes social media profiles and website information

### 4. **SEO Files**
- `robots.txt` - Tells search engines which pages to crawl
- `sitemap.xml` - Helps search engines discover all pages

## Configuration

### Update Your Domain
In `src/utils/seo.js`, update the `siteConfig` object:
```javascript
url: "https://yourdomain.com", // Replace with your actual domain
image: "https://yourdomain.com/og-image.jpg", // Replace with your OG image
```

### Update Sitemap
The `public/sitemap.xml` file should be updated with:
1. Your actual domain
2. Current dates for `lastmod`
3. All blog post URLs (consider generating dynamically)

### Create Open Graph Image
Create an `og-image.jpg` (1200x630px recommended) and place it in the `public` folder, or update the URL in `seo.js`.

## Next Steps for Better SEO

### 1. **Generate Dynamic Sitemap**
Consider creating a script to automatically generate `sitemap.xml` from your blog posts:
```javascript
// scripts/generate-sitemap.js
import { getAllPosts } from '../src/utils/posts.js';
// Generate XML with all posts
```

### 2. **Add Alt Text to Images**
Ensure all images have descriptive `alt` attributes (already done for profile pic).

### 3. **Page Speed Optimization**
- Already using Vite for optimized builds
- Consider lazy loading images
- Minimize CSS/JS bundles

### 4. **Content Optimization**
- Use descriptive headings (H1, H2, H3)
- Include keywords naturally in content
- Write meta descriptions for each blog post (can be added to frontmatter)

### 5. **Submit to Search Engines**
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

### 6. **Add Analytics**
- Already using Vercel Analytics
- Consider Google Analytics for more detailed insights

### 7. **Internal Linking**
- Ensure good internal linking structure (already implemented with navigation)
- Add related posts suggestions

### 8. **Mobile Optimization**
- Already responsive
- Test with Google's Mobile-Friendly Test

### 9. **SSL Certificate**
- Ensure HTTPS is enabled (Vercel provides this automatically)

### 10. **Regular Content Updates**
- Keep blog posts fresh
- Update sitemap when adding new content

## Testing Your SEO

### Tools to Use:
1. **Google Search Console** - Monitor search performance
2. **Google Rich Results Test** - Test structured data
3. **PageSpeed Insights** - Check page speed
4. **Schema Markup Validator** - Validate structured data
5. **Facebook Sharing Debugger** - Test Open Graph tags
6. **Twitter Card Validator** - Test Twitter cards

## Current SEO Score

After implementation, you should see improvements in:
- ✅ Meta tags coverage
- ✅ Structured data
- ✅ Social media sharing
- ✅ Search engine discoverability

## Notes

- The SEO hook automatically updates meta tags on route changes
- Blog posts get automatic SEO from their content
- All pages have proper canonical URLs
- Structured data helps search engines understand your content better
