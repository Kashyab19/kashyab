import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "../../utils/posts";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  
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
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="app-container">
      <div style={{ marginBottom: "24px" }}>
        <Link to="/writings" className="writings-link" style={{ fontSize: "16px" }}>
          ← Writings
        </Link>
      </div>

      <article className="post-content">
        <h1 className="heading-large">{post.title}</h1>
        {post.date && (
          <p className="post-date" style={{ marginBottom: "32px", fontSize: "15px" }}>
            {formatDate(post.date)}
          </p>
        )}
        
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <nav className="post-navigation post-navigation-border" style={{ marginTop: "48px", paddingTop: "32px" }}>
        {prevPost && (
          <Link to={`/${prevPost.slug}`} className="writings-link">
            ← {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link to={`/${nextPost.slug}`} className="writings-link" style={{ marginLeft: "auto" }}>
            {nextPost.title} →
          </Link>
        )}
      </nav>
    </main>
  );
}

export default Post;

