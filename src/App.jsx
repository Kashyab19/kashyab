import "./App.css";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Analytics } from "@vercel/analytics/react";
import TopicsLearning from "./components/TopicsLearning";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Badge } from "@/components/ui/badge";
import { OpportunityToast } from "./components/Toast";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; // We'll create this component

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100; // Adjust this value based on your navbar height

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <OpportunityToast />
        <Analytics />
        <SpeedInsights />
        <div className="space-y-12">
          <section id="about">
            <About />
          </section>
          <section id="topics-learning">
            <TopicsLearning />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="achievements">
            <Achievements />
          </section>
          <SocialLinks />
          <Footer />
        </div>
      </div>
    </div>
  );
}
