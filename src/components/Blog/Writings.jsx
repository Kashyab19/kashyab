import { Link } from "react-router-dom";
import { getAllPosts } from "../../utils/posts";
import "./Blog.css";

function Writings() {
  const posts = getAllPosts();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <main className="app-container">
      <div style={{ marginBottom: "24px" }}>
        <Link to="/" className="writings-link" style={{ fontSize: "16px" }}>
          ← home
        </Link>
      </div>
      <h1 className="heading-large" style={{ marginBottom: "40px" }}>writings</h1>
      
      {posts.length === 0 ? (
        <p className="text-body">No posts yet. I mean I am writing them as we speak!</p>
      ) : (
        <div className="writings-table">
          <table>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="writings-date">{formatDate(post.date)}</td>
                  <td>
                    <Link to={`/${post.slug}`} className="writings-link">
                      {post.title}
                    </Link>
                    {post.tags && post.tags.length > 0 && (
                      <span className="writings-tags">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="writings-tag">{tag}</span>
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Writings;

