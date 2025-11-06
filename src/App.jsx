import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import profileImage from "./assets/kashyab-murali.jpg";
import { socialLinks, personalInfo, works, beliefs, navLinks } from "./data/personal.jsx";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((module) => ({ default: module.Analytics }))
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((module) => ({ default: module.SpeedInsights }))
);
const MableResources = lazy(() => import("./components/Library/MableResources"));

function Header() {
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
      </nav>
    </header>
  );
}

function Home() {
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

    
       {/* · <a href="https://cal.com/kashyab/15min" target="_blank" rel="noreferrer" className="link-external">book a time to chat about tech, startups</a>
       */}

      <section className="section-item">
        <h2 className="section-title">works</h2>
        <ul className="section-list">
          {works.map((work, index) => (
            <li key={index}>
              <a href={work.url} target="_blank" rel="noreferrer" className="link-external">{work.title}</a> — {work.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-item">
        <h2 className="section-title">a few things i believe in</h2>
        <ul className="section-list">
          {beliefs.map((belief, index) => (
            <li key={index}>{belief}</li>
          ))}
        </ul>
      </section>

      <nav className="nav-links">
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
            path="/meetmable"
            element={
              <Suspense fallback={<div />}>
                <MableResources />
              </Suspense>
            }
          />
        </Routes>
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </div>
    </Router>
  );
}