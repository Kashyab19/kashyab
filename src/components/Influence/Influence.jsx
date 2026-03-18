import { Link } from "react-router-dom";
import { podcasts, podcastsUpdatedOn, people } from "../../data/personal.jsx";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Influence.css";

function Influence() {
  useSEO({
    title: "Influence",
    description: "Podcasts and people that influence my thinking about systems, technology, and business.",
  });
  
  return (
    <main className="app-container">
      <div className="back-link-container">
        <Link to="/" className="writings-link back-link">
          ← Home
        </Link>
      </div>
      <h2 className="page-heading">Influence</h2>
      
      <section className="section-item">
        <h2 className="section-title">Podcasts</h2>
        <p className="text-body">
          Charlie Munger read voraciously to build his mental models. I try to implement the same in my life by listening to podcasts. Auditory learns helps me absorb the information better. Although, I am trying to read a lot more these days.
        </p>
        
        {podcasts.length === 0 ? (
          <p className="text-body">No podcasts listed yet.</p>
        ) : (
          <ul className="section-list">
            {podcasts.map((podcast, index) => (
              <li key={index} className="influence-list-item">
                <a
                  href={podcast.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-external influence-link"
                >
                  {podcast.name}
                </a>
                {podcast.description && (
                  <span className="text-tertiary influence-description">
                    — {podcast.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section-item">
        <h2 className="section-title">People</h2>
        <p className="text-body">
          A non-exhaustive list of people whose work and thinking I look up to.
        </p>

        {people.length === 0 ? (
          <p className="text-body">I am still putting this list together.</p>
        ) : (
          <ul className="section-list">
            {people.map((person, index) => (
              <li key={index}>
                {person.url ? (
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-external"
                  >
                    {person.name}
                  </a>
                ) : (
                  person.name
                )}
                {person.description && (
                  <span className="text-tertiary influence-description">
                    — {person.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {podcastsUpdatedOn && (
        <div className="influence-updated">
          <span className="text-tertiary influence-updated-text">Updated on </span>
          <span className="text-tertiary influence-updated-date">
            {formatDate(podcastsUpdatedOn)}
          </span>
        </div>
      )}
    </main>
  );
}

export default Influence;

