import React from "react";
import projects from "../data/projects.json";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  return (
    <section id="projects" className="mt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Projects
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-xl font-medium">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </p>
              <Badge variant={project.variant}>{project.status}</Badge>
            </div>
            <p className="leading-2 mt-4">
              <strong>Description:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: project.description }} />
            </p>
            <p className="leading-2 mt-4">
              <strong>Stack:</strong> {project.stack}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
