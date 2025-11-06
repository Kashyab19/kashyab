import { Link } from "react-router-dom";
import { getAllPosts } from "../../utils/posts";
import "./Blog.css";

function Archive() {
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
      <h1 className="heading-large" style={{ marginBottom: "40px" }}>archive</h1>
      
      {posts.length === 0 ? (
        <p className="text-body">No posts yet. Check back soon!</p>
      ) : (
        <div className="archive-table">
          <table>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="archive-date">{formatDate(post.date)}</td>
                  <td>
                    <Link to={`/posts/${post.slug}`} className="archive-link">
                      {post.title}
                    </Link>
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

export default Archive;

