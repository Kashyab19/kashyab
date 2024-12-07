// src/components/MableResources.js
import React from "react";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    name: "Insurance Management",
    status: "Database",
    variant: "default",
    link: "https://github.com/Kashyab19/Insurance-Management",
    description: "An Insurance Claims Processing System aimed at improving the efficiency and accuracy of claims management in the insurance industry",
    type: "I helped to build the Claim Management's package, triggers, stored procedures and different business reports."
  },
  {
    name: "Fintelligent, a credit card manager app",
    status: "Backend",
    variant: "success",
    link: "https://github.com/Kashyab19/financial-insight-ai",
    description: "A one-stop credit card manager app for providing insights, trend analysis.",
    type: "I designed and built the iOS app's UI, Backend from scratch and hosted it on quick cloud deploying service"
  }
];

const MableResources = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h4 className="scroll-m-20 border-b pb-2 text-2xl font-medium tracking-tight first:mt-0">
        Hi Jared, 
          <br/> I compiled a list on how my current projects align with the Mable's requirements and, some notes on Mable's website
      </h4>
      <div className="mt-6 gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col items-start space-y-4">
  <p className="text-md text-gray-800">
    I ran a Lighthouse report on Mable's landing page to identify areas for improvement in Mable's system (both frontend and backend). You can find my detailed findings in the case study linked below:
  </p>
  <a
    href="https://hackmd.io/@ZlHUP-dGQNSoVw-1ixAd6A/B1MJEIZ4Je#Descriptive-texts-in-links-can-help-improve-SEO"
    className="text-blue-600 hover:underline font-medium"
    target="_blank"
  >
    Kashyab's Mable Case Study
  </a>
</div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">
                {resource.link ? (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {resource.name}
                  </a>
                ) : (
                  resource.name
                )}
              </p>
              <Badge variant={resource.variant}>{resource.status}</Badge>
            </div>
            <p className="leading-2 mt-4">
              <strong>Description:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: resource.description }} />
            </p>
            <p className="leading-2 mt-4">
              <strong>Responsibilities:</strong> {resource.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MableResources;