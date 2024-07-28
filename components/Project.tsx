import React from "react";
import ProjectItem from "./ProjectItem";
import { urlFor } from "@/utils/sanity-client";


const Projects = (projects:any) => {
  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-10 py-16 ">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&#39;ve Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.projects.map((project : any, key: any) => {
            return (
              <ProjectItem
                title={project.title}
                backgroundImg={urlFor(project.thumbnailImage).url()}
                projectUrl={`/projects/${project._id}`}
                projectTech={project.subTitle}
                key={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
