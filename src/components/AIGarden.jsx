import { useSEO } from "../hooks/useSEO";

const artifacts = [
  {
    title: "Particle Garden",
    description: "An interactive particle system that grows and evolves with your input.",
    src: "/ai-garden/particle-garden.html",
  },
  {
    title: "Synth Canvas",
    description: "A visual synthesizer — draw sounds and shapes on a reactive canvas.",
    src: "/ai-garden/synth-canvas.html",
  },
  {
    title: "Cosmos OS",
    description: "A miniature operating system interface set in outer space.",
    src: "/ai-garden/cosmos-os.html",
  },
];

export default function AIGarden() {
  useSEO({
    title: "AI Garden - Kashyab Murali",
    description: "Interactive HTML creations — particle systems, visual synths, and more.",
  });

  return (
    <main className="app-container">
      <h1 className="heading-large">AI Garden</h1>
      <p className="text-body">
        A collection of interactive HTML experiments built with AI. Click inside each frame to explore.
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
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
