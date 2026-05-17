import { Link } from "react-router-dom";
import { getAllPosts } from "../../utils/posts";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function Writings() {
  const posts = getAllPosts();
  
  useSEO({
    title: "Writings",
    description: "Thoughts on systems, technology, and the intersection of engineering and economics.",
  });

  return (
    <main className="app-container">
      <div className="back-link-container">
        <Link to="/" className="writings-link back-link">
          ← Home
        </Link>
      </div>
      <h2 className="page-heading">Writings</h2>
      
      <p className="text-body">
        Thoughts on systems, technology, and the intersection of engineering and economics.
      </p>

      {posts.length === 0 ? (
        <p className="text-body">No posts yet. I mean I am writing them as we speak!</p>
      ) : (
        <ul className="writings-list">
          {posts.map((post) => {
            const formattedDate = formatDate(post.date);
            return (
              <li key={post.slug} className="writings-item">
                <span className="writings-date">{formattedDate || "—"}</span>
                <div className="writings-body">
                  <div className="writings-title-row">
                    <Link to={`/${post.slug}`} className="writings-title">
                      {post.title}
                    </Link>
                    {post.tags.length > 0 && (
                      <span className="writings-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="writings-tag">{tag}</span>
                        ))}
                      </span>
                    )}
                  </div>
                  {post.subtitle && (
                    <p className="writings-subtitle">{post.subtitle}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Writings;

