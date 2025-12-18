import { Link } from "react-router-dom";
import { getAllPosts } from "../../utils/posts";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function Writings() {
  const posts = getAllPosts();
  
  useSEO({
    title: "Writings",
    description: "Thoughts on systems, technology, and the intersection of engineering and economics.",
  });

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
        <Link to="/" className="writings-link" style={{ fontSize: "16px" }}>
          ← Home
        </Link>
      </div>
      <h2 className="page-heading">Writings</h2>
      
      {posts.length === 0 ? (
        <p className="text-body">No posts yet. I mean I am writing them as we speak!</p>
      ) : (
        <ul className="writings-list">
              {posts.map((post) => (
            <li key={post.slug} className="writings-item">
              <span className="writings-date">{formatDate(post.date)}</span>
              <Link to={`/${post.slug}`} className="writings-title">
                      {post.title}
                    </Link>
            </li>
                        ))}
        </ul>
      )}
    </main>
  );
}

export default Writings;

