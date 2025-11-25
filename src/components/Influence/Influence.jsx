import { Link } from "react-router-dom";
import { podcasts, podcastsUpdatedOn } from "../../data/personal.jsx";
import "./Influence.css";

function Influence() {
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
        <Link to="/" className="influence-link" style={{ fontSize: "16px" }}>
          ← home
        </Link>
      </div>
      <h1 className="heading-large" style={{ marginBottom: "40px" }}>influence</h1>
      
      <section className="section-item">
        <h2 className="section-title">podcasts</h2>
        <p className="text-body">Charlie Munger read voraciously to build his mental models. I try to implement the same in my life by listening to podcasts. Auditory learns helps me absorb the information better. Although, I am trying to read a lot more these days.</p>
        
        {podcasts.length === 0 ? (
          <p className="text-body">No podcasts listed yet.</p>
        ) : (
          <ul className="section-list">
            {podcasts.map((podcast, index) => (
              <li key={index} style={{ marginBottom: "12px" }}>
                <a 
                  href={podcast.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="link-external"
                  style={{ fontSize: "16px" }}
                >
                  {podcast.name}
                </a>
                {podcast.description && (
                  <span style={{ color: "#666", marginLeft: "8px" }}>
                    — {podcast.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        
        {podcastsUpdatedOn && (
          <div style={{ marginTop: "24px" }}>
            <span style={{ fontSize: "15px", color: "#666" }}>updated on </span>
            <span style={{ fontSize: "15px", color: "#666", fontVariantNumeric: "tabular-nums" }}>
              {formatDate(podcastsUpdatedOn)}
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

export default Influence;

