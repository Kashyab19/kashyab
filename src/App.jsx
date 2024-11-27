import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { OpportunityToast } from "./components/Toast";
import { trackPortfolioView } from './services/Tracking';
import ListeningCard from "./components/ListeningCard";
import DemoCard from "./components/DemoCard"; // Import the DemoCard component


// Lazy load components
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Achievements = lazy(() => import("./components/Achievements"));
const TopicsLearning = lazy(() => import("./components/TopicsLearning"));
const SocialLinks = lazy(() => import("./components/SocialLinks"));
// const TechStack = lazy(() => import("./components/TechStack"));

// Lazy load third-party components
const Analytics = lazy(() => import("@vercel/analytics/react").then(module => ({ default: module.Analytics })));
const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then(module => ({ default: module.SpeedInsights })));

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Debounce scroll event
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 100;

        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
            setActiveSection(section.id);
            break;
          }
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    // Delay non-critical operations
    const timer = setTimeout(() => {
      trackPortfolioView();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <OpportunityToast />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-12">
            <section id="about"><About /></section>
            <section id="demo-card"><DemoCard/></section>
            <section id="projects"><Projects /></section>
            <section id="topics-learning"><TopicsLearning /></section>
            <section id="experience"><Experience /></section>
            <section id="achievements"><Achievements /></section>
            {/* <section id="tech-stack"><TechStack /></section> */}
            <SocialLinks />
          </div>
        </Suspense>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <Analytics />
        <SpeedInsights />
      </Suspense>
    </div>
  );
}
