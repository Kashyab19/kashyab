import { Link } from "react-router-dom";
import { podcasts, podcastsUpdatedOn } from "../../data/personal.jsx";
import { useSEO } from "../../hooks/useSEO";
import "./Influence.css";

function Influence() {
  useSEO({
    title: "Influence",
    description: "Podcasts and resources that influence my thinking about systems, technology, and business.",
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
      <h2 className="page-heading">Influence</h2>
      
      <section className="section-item">
        <h2 className="section-title">Podcasts</h2>
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
                  <span className="text-tertiary" style={{ marginLeft: "8px" }}>
                    — {podcast.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        
        {podcastsUpdatedOn && (
          <div style={{ marginTop: "24px" }}>
            <span className="text-tertiary" style={{ fontSize: "15px" }}>Updated on </span>
            <span className="text-tertiary" style={{ fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>
              {formatDate(podcastsUpdatedOn)}
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

export default Influence;

