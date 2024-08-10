import React from "react";
import experience from "../data/experience.json";

const Experience = () => {
  return (
    <section id="experience" className="mt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Experience
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {experience.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {item.company}
    </h4>
    <p className="leading-7 [&:not(:first-child)]:mt-6"
    dangerouslySetInnerHTML={{ __html: item.description }}>
      
    </p>

    <p className="leading-2 [&:not(:first-child)]:mt-6">
    <strong>Stack:</strong> {item.stack}
    </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
