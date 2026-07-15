import { Link } from "react-router-dom";
import {
  podcasts,
  podcastsUpdatedOn,
  books,
  people,
} from "../../data/personal.jsx";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Influence.css";

// Returns [[year, items], ...] sorted newest first.
// "Undated" bucket (entries without a year) sinks to the bottom.
function groupByYear(items) {
  const groups = items.reduce((acc, item) => {
    const key = item.year ?? "Undated";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === "Undated") return 1;
    if (b === "Undated") return -1;
    return Number(b) - Number(a);
  });
}

function InfluenceList({ items, renderItem, emptyText }) {
  if (items.length === 0) {
    return <p className="text-body influence-empty">{emptyText}</p>;
  }

  const groups = groupByYear(items);
  const showYearHeaders = groups.length > 1;

  return (
    <>
      {groups.map(([year, entries]) => (
        <div key={year} className="influence-year-group">
          {showYearHeaders && <h3 className="influence-year-header">{year}</h3>}
          <ul className="section-list">
            {entries.map((item, i) => (
              <li key={`${year}-${i}`} className="influence-list-item">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function Takeaway({ text }) {
  if (!text) return null;
  return <span className="text-tertiary influence-description">{" — "}{text}</span>;
}

function renderLinked(item, labelKey) {
  const label = item[labelKey];
  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="link-external influence-link"
      >
        {label}
      </a>
    );
  }
  return <span className="influence-link-plain">{label}</span>;
}

function Influence() {
  useSEO({
    title: "Influence",
    description:
      "Podcasts, books, and people that shaped my thinking about systems, technology, and business.",
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
          Charlie Munger read voraciously to build his mental models. I try to implement the same in my life by listening to podcasts. Auditory learning helps me absorb the information better. Although, I am trying to read a lot more these days.
        </p>
        <InfluenceList
          items={podcasts}
          emptyText="No podcasts listed yet."
          renderItem={(podcast) => (
            <>
              {renderLinked(podcast, "name")}
              <Takeaway text={podcast.takeaway} />
            </>
          )}
        />
      </section>

      <section className="section-item">
        <h2 className="section-title">Books</h2>
        <InfluenceList
          items={books}
          emptyText="Building this list. Check back."
          renderItem={(book) => (
            <>
              {renderLinked(book, "title")}
              {book.author && (
                <span className="influence-meta"> by {book.author}</span>
              )}
              <Takeaway text={book.takeaway} />
            </>
          )}
        />
      </section>

      <section className="section-item">
        <h2 className="section-title">Ideas I owe to people</h2>
        <p className="text-body">
          A non-exhaustive list of people whose thinking I&apos;ve absorbed.
        </p>
        <InfluenceList
          items={people}
          emptyText="I am still putting this list together."
          renderItem={(person) => (
            <>
              {renderLinked(person, "name")}
              <Takeaway text={person.takeaway} />
            </>
          )}
        />
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
