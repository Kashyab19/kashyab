import { Badge } from "../../../components/ui/badge";
import "./MableResources.css";

const resources = [
  {
    name: "Insurance Management",
    status: "Database",
    variant: "default",
    link: "https://github.com/Kashyab19/Insurance-Management",
    description:
      "An Insurance Claims Processing System aimed at improving the efficiency and accuracy of claims management in the insurance industry",
    type:
      "I helped to build the Claim Management package, triggers, stored procedures and different business reports.",
  },
  {
    name: "Fintelligent, a credit card manager app",
    status: "Backend",
    variant: "success",
    link: "https://github.com/Kashyab19/financial-insight-ai",
    description:
      "A one-stop credit card manager app for providing insights, trend analysis.",
    type:
      "I designed and built the iOS app's UI, backend from scratch and hosted it on quick cloud deploying service",
  },
];

const MableResources = () => {
  return (
    <main className="app-container">
      <h2 className="mable-banner">
        <span className="mable-banner-tag">[Archived]</span>
        <br />I compiled a list for an interview on how my current projects align with Mable's requirements and, some notes on Mable's website
      </h2>

      <div className="mable-case-study">
        <p className="text-body">
          I ran a Lighthouse report on Mable's landing page to identify areas for improvement in Mable's system (both frontend and backend). You can find my detailed findings in the case study linked below:
        </p>
        <a
          href="https://hackmd.io/@ZlHUP-dGQNSoVw-1ixAd6A/B1MJEIZ4Je#Descriptive-texts-in-links-can-help-improve-SEO"
          className="link-external"
          target="_blank"
          rel="noreferrer"
        >
          Kashyab's Mable Case Study
        </a>
      </div>

      <div className="mable-grid">
        {resources.map((resource, index) => (
          <div key={index} className="mable-card">
            <div className="mable-card-header">
              <p className="mable-card-title">
                {resource.link ? (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-external"
                  >
                    {resource.name}
                  </a>
                ) : (
                  resource.name
                )}
              </p>
              <Badge variant={resource.variant}>{resource.status}</Badge>
            </div>
            <p className="mable-card-body">
              <strong>Description:</strong> {resource.description}
            </p>
            <p className="mable-card-body">
              <strong>Responsibilities:</strong> {resource.type}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MableResources;
