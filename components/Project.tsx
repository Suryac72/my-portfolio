import Image from "next/image";
import React from "react";
import rms from "../public/assets/projects/rms.jpg";
import data from "../public/assets/projects/data.png";
import blog from "../public/assets/projects/blog.png";
import portfolio from "../public/assets/projects/portfolio.png";
import ProjectItem from "./ProjectItem";
const Project = () => {
  return (
    <div id='projects'className="w-full">
      <div className="max-w-[1240px] mx-auto px-10 py-16 ">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&#39;ve Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectItem
            title="Result Management System"
            backgroundImg={rms}
            projectUrl="/result-management-system"
            projectTech="MERN Stack"
          />

          <ProjectItem
            title="Data Finance Website Front-End"
            backgroundImg={data}
            projectUrl="/data-finance"
            projectTech="NextJS & Tailwind CSS"
          />

          <ProjectItem
            title="Blog Website"
            backgroundImg={blog}
            projectUrl="/blogs"
            projectTech="React JS"
          />

          <ProjectItem
            title="Portfolio Website"
            backgroundImg={portfolio}
            projectUrl="/portfolio"
            projectTech="Next JS & Tailwind CSS"
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
