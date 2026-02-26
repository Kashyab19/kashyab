import { useLayoutEffect, useRef } from "react";
import { useSEO } from "../hooks/useSEO";

function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const artifacts = [
  {
    title: "Cosmos OS",
    description: "A miniature operating system interface set in outer space.",
    src: "/claurden/cosmos-os.html",
  },
  {
    title: "Particle Garden",
    description: "An interactive particle system that grows and evolves with your input. Channel your inner Picasso and let the particles dance!",
    src: "/claurden/particle-garden.html",
  },
  {
    title: "Synth Canvas",
    description: "A visual synthesizer — draw sounds and shapes on a reactive canvas. Turn up the volume and see the magic.",
    src: "/claurden/synth-canvas.html",
  },
];

export default function AIGarden() {
  const mainRef = useRef(null);

  useSEO({
    title: "AI Garden - Kashyab Murali",
    description: "Interactive HTML creations — particle systems, visual synths, and more.",
  });

  useLayoutEffect(() => {
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    scrollToTop();
    mainRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
      mainRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      requestAnimationFrame(() => {
        scrollToTop();
        mainRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      });
    });
    const t = setTimeout(() => {
      scrollToTop();
      mainRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }, 100);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
      history.scrollRestoration = prevRestoration;
    };
  }, []);

  return (
    <main ref={mainRef} className="app-container">
      <h1 className="heading-large">The Claurden</h1>
      <br />
      <p className="text-body">
       Inspired from a tweet, I assigned Claude Code a safe space to express itself and decided that I should build a dedicated digital garden. Here are some of the things CC came up with. If I find the tweet again, I will add it here.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
        {artifacts.map((artifact) => (
          <div key={artifact.title} className="ai-garden-card">
            <h2 className="section-title">{artifact.title}</h2>
            <p className="text-body" style={{ marginBottom: "0.75rem" }}>{artifact.description}</p>
            <iframe
              src={artifact.src}
              title={artifact.title}
              className="ai-garden-iframe"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
