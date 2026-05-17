import { useLayoutEffect } from "react";
import { useSEO } from "../hooks/useSEO";

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
  useSEO({
    title: "AI Garden - Kashyab Murali",
    description: "Interactive HTML creations — particle systems, visual synths, and more.",
  });

  // Iframes load async and can push the scroll position down once their
  // content lays out. Disable browser scroll restoration and pin to the top
  // synchronously after layout.
  useLayoutEffect(() => {
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = prevRestoration;
    };
  }, []);

  return (
    <main className="app-container">
      <h1 className="heading-large">The Claurden</h1>
      <br />
      <p className="text-body">
       Inspired from a tweet, I assigned Claude Code a safe space to express itself and decided that I should build a dedicated digital garden. Here are some of the things CC came up with. If I find the tweet again, I will add it here.
      </p>

      <div className="ai-garden-list">
        {artifacts.map((artifact) => (
          <div key={artifact.title} className="ai-garden-card">
            <h2 className="section-title">{artifact.title}</h2>
            <p className="text-body ai-garden-description">{artifact.description}</p>
            <iframe
              src={artifact.src}
              title={artifact.title}
              className="ai-garden-iframe"
              sandbox="allow-scripts"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
