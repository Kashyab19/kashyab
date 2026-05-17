import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
// Languages register themselves onto the Prism singleton on import.
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";
import { getAllPosts } from "../../utils/posts";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function Post() {
  const { slug } = useParams();
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? allPosts[currentIndex] : null;
  const contentRef = useRef(null);

  const postDescription = post?.subtitle
    || (post?.content
      ? post.content.split("\n\n")[0]?.replace(/[#*`]/g, "").trim().substring(0, 160)
      : "Read this article on systems, technology, and engineering.");

  useSEO({
    title: post?.title || "Post",
    description: postDescription,
    type: "article",
    postSlug: post ? slug : null,
  });

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Re-run Prism whenever the rendered markdown changes. react-markdown emits
  // <pre><code class="language-xxx">, which is the format Prism expects.
  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [post?.content]);

  if (!post) {
    return (
      <main className="app-container">
        <h1 className="heading-large">Post not found</h1>
        <p className="text-body">
          <Link to="/writings">← Back to Writings</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="app-container">
      <div className="back-link-container">
        <Link to="/writings" className="writings-link back-link">
          ← Writings
        </Link>
      </div>

      <article className="post-content">
        <h1 className="heading-large">{post.title}</h1>
        <div className="post-meta">
          {post.date && <span>{formatDate(post.date)}</span>}
          {post.date && post.readingTime && <span aria-hidden="true"> · </span>}
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
        {post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="writings-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="markdown-content" ref={contentRef}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <nav className="post-navigation post-navigation-border">
        {prevPost && (
          <Link to={`/${prevPost.slug}`} className="writings-link">
            ← {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link to={`/${nextPost.slug}`} className="writings-link post-nav-next">
            {nextPost.title} →
          </Link>
        )}
      </nav>
    </main>
  );
}

export default Post;
