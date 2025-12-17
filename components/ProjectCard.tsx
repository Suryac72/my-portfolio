import React from "react";
import { RiRadioButtonFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  codeUrl: string;
  projectUrl: string;
  technologies: string[];
}

export const ProjectCard = (projectCardProps: ProjectCardProps) => {
  const { technologies } = projectCardProps;
  return (
    <div className="w-full overflow-x-hidden dark:bg-gray-900">
      <div className="w-screen h-[50vh] relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black/70  dark:text-white z-10" />
        <Image
          className="absolute z-1"
          src={projectCardProps.imageUrl}
          alt="/"
          fill
          style={{objectFit:'cover'}}
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">{projectCardProps.title}</h2>
          <h3>{projectCardProps.subtitle}</h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8 px-10  dark:text-white dark:shadow-none">
        <div className="col-span-4">
          <p className="text-xl mb-1">Project</p>
          <h2>Overview</h2>
          <br />
          <p>
            {projectCardProps.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {/* Code button - outline style */}
            {projectCardProps.codeUrl ? (
              <a href={projectCardProps.codeUrl} target="_blank" rel="noreferrer" aria-label={`View source code for ${projectCardProps.title}`}>
                <button className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm" type="button">
                  Code
                </button>
              </a>
            ) : (
              <button disabled className="px-6 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" title="Code not available">
                Code
              </button>
            )}

            {/* Demo button - primary style */}
            {projectCardProps.projectUrl ? (
              <a href={projectCardProps.projectUrl} target="_blank" rel="noreferrer" aria-label={`Open demo for ${projectCardProps.title}`}>
                <button className="px-6 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow hover:opacity-95 transition-all" type="button">
                  Demo
                </button>
              </a>
            ) : (
              <button disabled className="px-6 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed" title="Demo not available">
                Demo
              </button>
            )}
          </div>
        </div>
          <div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-200 dark:shadow-none bg-white dark:bg-gray-800 dark:text-white rounded-xl py-4">
          <div className="p-2">
            <p className="text-center font-bold pb-2">Technologies</p>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                {technologies?.map((tech, idx) => (
                  <p key={idx} className="text-gray-600 py-2 flex items-center dark:text-white text-sm">
                    <RiRadioButtonFill className="pr-2 text-yellow-500" /> {tech}
                  </p>
                ))}
              </div>
          </div>
        </div>
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

