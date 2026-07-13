/* eslint-disable react/prop-types */
import { featuredWritings, SUBSTACK_URL, writingCollectionStructuredData, writings } from "../../data/writings";
import { formatDate } from "../../utils/formatDate";
import { useSEO } from "../../hooks/useSEO";
import "./Blog.css";

function ExternalArrow() {
  return <span className="external-arrow" aria-hidden="true">↗</span>;
}

function StartHereItem({ post, index }) {
  return (
    <article className="start-here-item">
      <a href={post.url} target="_blank" rel="noreferrer">
        <div className="start-here-image">
          <img src={post.image} alt="" loading={index === 0 ? "eager" : "lazy"} />
          <span>0{index + 1}</span>
        </div>
        <p className="writing-theme">{post.theme}</p>
        <h3>{post.title}</h3>
        <p className="start-here-note">{post.note}</p>
        <span className="start-here-link">Read essay <ExternalArrow /></span>
      </a>
    </article>
  );
}

function ArchiveItem({ post }) {
  return (
    <li className="writing-archive-item">
      <a href={post.url} target="_blank" rel="noreferrer">
        <time dateTime={post.date}>{formatDate(post.date, { short: true })}</time>
        <div className="writing-archive-copy">
          <p className="writing-theme">{post.theme}</p>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
        <ExternalArrow />
      </a>
    </li>
  );
}

export default function Writings() {
  useSEO({
    title: "Writing on AI Engineering and Distributed Systems",
    description: "Essays by Kashyab Murali about AI engineering, backend infrastructure, distributed systems, and the mechanics behind useful software.",
    structuredData: writingCollectionStructuredData(),
  });

  return (
    <main className="writing-page">
      <header className="writing-intro">
        <p className="writing-intro-kicker">The First Derivative</p>
        <h1>Notes from inside the system.</h1>
        <p>
          I write to understand how software behaves beneath the interface: agents, queues,
          databases, infrastructure, and the decisions that make them useful.
        </p>
        <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="writing-substack-link">
          Follow on Substack <ExternalArrow />
        </a>
      </header>

      <section className="writing-page-section" aria-labelledby="start-here-title">
        <div className="writing-page-heading">
          <span>01</span>
          <h2 id="start-here-title">Start here</h2>
          <p>Three essays that best connect the things I build with the way I think.</p>
        </div>
        <div className="start-here-grid">
          {featuredWritings.map((post, index) => (
            <StartHereItem key={post.url} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="writing-page-section" aria-labelledby="latest-title">
        <div className="writing-page-heading">
          <span>02</span>
          <h2 id="latest-title">Latest</h2>
        </div>
        <ol className="writing-archive-list">
          {writings.map((post) => <ArchiveItem key={post.url} post={post} />)}
        </ol>
      </section>

      <section className="writing-follow" aria-label="Follow the newsletter">
        <p>New essays arrive when I have learned enough to explain something clearly.</p>
        <a href={`${SUBSTACK_URL}subscribe`} target="_blank" rel="noreferrer">
          Subscribe <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
