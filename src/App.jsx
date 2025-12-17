import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import profileImage from "./assets/kashyab-murali.jpg";
import { socialLinks, personalInfo, works, projects, beliefs, navLinks } from "./data/personal.jsx";
import { useTheme } from "./contexts/ThemeContext";
import { useSEO } from "./hooks/useSEO";

const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((module) => ({ default: module.SpeedInsights }))
);
const MableResources = lazy(() => import("./components/Library/MableResources"));
const Writings = lazy(() => import("./components/Blog/Writings"));
const Post = lazy(() => import("./components/Blog/Post"));
const Influence = lazy(() => import("./components/Influence/Influence"));

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="site-header">
      <nav className="socials" aria-label="social links">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            className="icon-link"
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}

function Home() {
  useSEO({ 
    title: "Kashyab Murali - Backend Engineer & Systems Thinker",
    description: "I study systems. Whether it is history, economics, or computer science, I am obsessed with how complex parts fit together to function as a whole.",
  });

  return (
    <main className="app-container">
      <div className="profile-header">
        <div className="profile-pic-wrap">
          <img className="profile-pic" src={profileImage} alt={`${personalInfo.name} profile`} />
        </div>
        <h1 className="heading-large">{personalInfo.heading}</h1>
      </div>

      <p className="text-body">{personalInfo.bio}</p>

      <p className="text-body-bold">
        {personalInfo.current}
      </p>

      <section className="section-item">
        <h2 className="section-title">Works</h2>
        <ul className="section-list">
          {works.map((work, index) => (
            <li key={index}>
              <a href={work.url} target="_blank" rel="noreferrer" className="link-external">{work.title}</a> — {work.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-item">
        <h2 className="section-title">Projects</h2>
        <ul className="section-list">
          {projects.map((project, index) => (
            <li key={index}>
              <a href={project.url} target="_blank" rel="noreferrer" className="link-external">{project.title}</a>
              {project.wip && <span className="pill">WIP</span>}
              {project.type === "mini" && <span className="pill">Mini app</span>}
              <span className="pill">{project.year}</span>
              <span className="project-desc"> — {project.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-item">
        <h2 className="section-title">A few things I believe in</h2>
        <ul className="section-list">
          {beliefs.map((belief, index) => (
            <li key={index}>{belief}</li>
          ))}
        </ul>
      </section>

      <nav className="nav-links">
        <Link to="/writings">Writings</Link>
        <Link to="/influence">Influence</Link>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/writings"
            element={
              <Suspense fallback={<div />}>
                <Writings />
              </Suspense>
            }
          />
          <Route
            path="/influence"
            element={
              <Suspense fallback={<div />}>
                <Influence />
              </Suspense>
            }
          />
          <Route
            path="/meetmable"
            element={
              <Suspense fallback={<div />}>
                <MableResources />
              </Suspense>
            }
          />
          <Route
            path="/:slug"
            element={
              <Suspense fallback={<div />}>
                <Post />
              </Suspense>
            }
          />
        </Routes>
        <Analytics />
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
      </div>
    </Router>
  );
}