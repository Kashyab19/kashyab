/* eslint-disable react/prop-types */
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import profileImage from "./assets/kashyab-murali-headshot.webp";
import { navLinks, people, personalInfo, projects, works } from "./data/personal.jsx";
import { latestWritings } from "./data/writings";
import { useTheme } from "./contexts/ThemeContext";
import { useSEO } from "./hooks/useSEO";
import { formatDate } from "./utils/formatDate";
import { profilePageStructuredData } from "./utils/seo";
import ErrorBoundary from "./components/ErrorBoundary";

const MableResources = lazy(() => import("./components/Library/MableResources"));
const Writings = lazy(() => import("./components/Blog/Writings"));
const Post = lazy(() => import("./components/Blog/Post"));
const Influence = lazy(() => import("./components/Influence/Influence"));
const VideoGallery = lazy(() => import("./components/VideoGallery/VideoGallery"));
const AIGarden = lazy(() => import("./components/AIGarden"));

const isVideoGalleryEnabled = import.meta.env.VITE_ENABLE_VIDEO_GALLERY === "true";
const footerLinks = navLinks.filter((link) => ["Email", "GitHub", "LinkedIn", "Substack"].includes(link.label));

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "light" ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21.75 15a9.7 9.7 0 0 1-3.75.75A9.75 9.75 0 0 1 9 2.25 9.75 9.75 0 1 0 21.75 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function Header() {
  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Main navigation">
        <Link to="/" className="site-name">Kashyab Murali</Link>
        <div className="header-links">
          <NavLink to="/writings" className={({ isActive }) => isActive ? "header-link active" : "header-link"}>
            Writing
          </NavLink>
          <a href="/#work" className="header-link">Work</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-note">Build carefully. Explain clearly.</p>
        <nav className="footer-links" aria-label="Contact links">
          <a href="/about/">About</a>
          {footerLinks.map((link) => (
            <a key={link.label} href={link.url} target={link.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {link.label}
            </a>
          ))}
          <Link to="/claurden" className="footer-easter-egg" aria-label="Open the AI garden">Garden</Link>
        </nav>
      </div>
    </footer>
  );
}

function SectionHeading({ index, title, action }) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
      {action}
    </div>
  );
}

function ExternalArrow() {
  return <span className="external-arrow" aria-hidden="true">↗</span>;
}

function WritingRow({ post }) {
  return (
    <li className="writing-row">
      <a href={post.url} target="_blank" rel="noreferrer">
        <div className="writing-row-meta">
          <span>{post.theme}</span>
          <time dateTime={post.date}>{formatDate(post.date, { short: true })}</time>
        </div>
        <div className="writing-row-copy">
          <h3>{post.title}</h3>
          <p>{post.note}</p>
        </div>
        <ExternalArrow />
      </a>
    </li>
  );
}

function Home() {
  const [leadWriting, ...supportingWritings] = latestWritings;

  useSEO({
    title: "Engineer Building AI-Native Systems",
    description: "Kashyab Murali builds AI-native government software, backend infrastructure, and clear explanations of how these systems work.",
    structuredData: profilePageStructuredData(),
  });

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="hero-kicker">Backend systems + applied AI</p>
          <h1 id="home-title">{personalInfo.heading}</h1>
          <p className="hero-role">{personalInfo.role}</p>
          <p className="hero-bio">{personalInfo.bio}</p>
          <div className="hero-actions">
            <a href="mailto:hi@kashyab.xyz">Email me <ExternalArrow /></a>
            <a href="#writing">Read my thinking <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-portrait">
          <img src={profileImage} alt="Portrait of Kashyab Murali" width="240" height="240" />
          <span aria-hidden="true" className="portrait-mark">KM / 26</span>
        </div>
      </section>

      <section className="home-section writing-section" id="writing">
        <SectionHeading
          index="01"
          title="Writing"
          action={<Link to="/writings" className="section-action">View all <span aria-hidden="true">→</span></Link>}
        />

        {leadWriting && (
          <a className="featured-writing" href={leadWriting.url} target="_blank" rel="noreferrer">
            <div className="featured-writing-media">
              <img src={leadWriting.image} alt="" loading="eager" />
            </div>
            <div className="featured-writing-copy">
              <div className="writing-row-meta">
                <span>{leadWriting.theme}</span>
                <time dateTime={leadWriting.date}>{formatDate(leadWriting.date, { short: true })}</time>
              </div>
              <h3>{leadWriting.title}</h3>
              <p>{leadWriting.note}</p>
              <span className="featured-writing-link">Read on Substack <ExternalArrow /></span>
            </div>
          </a>
        )}

        <ul className="writing-list compact-writing-list">
          {supportingWritings.map((post) => <WritingRow key={post.url} post={post} />)}
        </ul>
      </section>

      <section className="home-section" id="work">
        <SectionHeading index="02" title="Selected Systems" />
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <span className="project-number">0{index + 1}</span>
              <div className="project-copy">
                <h3><a href={project.url} target="_blank" rel="noreferrer">{project.title} <ExternalArrow /></a></h3>
                <p>{project.description}</p>
                <span className="project-detail">{project.detail}</span>
              </div>
              <div className="project-links" aria-label={`${project.title} links`}>
                {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Demo</a>}
                {project.articleUrl && <a href={project.articleUrl} target="_blank" rel="noreferrer">Essay</a>}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">Code</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section experience-section">
        <SectionHeading index="03" title="Experience" />
        <ol className="experience-list">
          {works.map((work) => (
            <li key={work.title}>
              <div>
                <h3>
                  {work.url ? (
                    <a href={work.url} target="_blank" rel="noreferrer">{work.title} <ExternalArrow /></a>
                  ) : work.title}
                </h3>
                <p>{work.description}</p>
              </div>
              <span className="experience-signal">{work.signal}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section people-section">
        <SectionHeading
          index="04"
          title="Ideas I owe to people"
          action={<Link to="/influence" className="section-action">More influences <span aria-hidden="true">→</span></Link>}
        />
        <ul className="people-list">
          {people.map((person) => (
            <li key={person.name}>
              <span className="person-name">{person.name}</span>
              <p>{person.takeaway}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="closing-note" aria-label="Contact">
        <p>I like hard infrastructure problems, useful AI, and people who care about the details.</p>
        <a href="mailto:hi@kashyab.xyz">Let&apos;s talk <span aria-hidden="true">→</span></a>
      </section>
    </main>
  );
}

function RouteFallback() {
  return (
    <main className="route-placeholder" aria-hidden="true">
      <span />
      <span />
      <span />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/writings" element={<Suspense fallback={<RouteFallback />}><Writings /></Suspense>} />
            <Route path="/influence" element={<Suspense fallback={<RouteFallback />}><Influence /></Suspense>} />
            <Route path="/meetmable" element={<Suspense fallback={<RouteFallback />}><MableResources /></Suspense>} />
            {isVideoGalleryEnabled && (
              <Route path="/videos" element={<Suspense fallback={<RouteFallback />}><VideoGallery /></Suspense>} />
            )}
            <Route path="/claurden" element={<Suspense fallback={<RouteFallback />}><AIGarden /></Suspense>} />
            <Route path="/:slug" element={<Suspense fallback={<RouteFallback />}><Post /></Suspense>} />
          </Routes>
        </ErrorBoundary>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}
