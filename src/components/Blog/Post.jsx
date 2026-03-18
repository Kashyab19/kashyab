import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts } from "../../utils/posts";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function Post() {
  const { slug } = useParams();
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const post = currentIndex !== -1 ? allPosts[currentIndex] : null;

  // Extract description from post content for SEO
  const postDescription = post?.content
    ? post.content.split("\n\n")[0]?.replace(/[#*`]/g, "").trim().substring(0, 160)
    : "Read this article on systems, technology, and engineering.";

  useSEO({
    title: post?.title || "Post",
    description: postDescription,
    type: "article",
    postSlug: post ? slug : null,
  });
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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
        {post.date && (
          <p className="post-date">
            {formatDate(post.date)}
          </p>
        )}
        
        <div className="markdown-content">
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

