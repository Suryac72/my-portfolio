import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity-client";
import { ExternalLink, Github } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["All", "Web", "Design"];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase">Portfolio</span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">My Recent Works</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Here are some of my latest projects that showcase my skills and expertise</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter.toLowerCase())} className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeFilter === filter.toLowerCase() ? "bg-yellow-400 text-white shadow-lg scale-105" : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image src={urlFor(project.thumbnailImage)?.url() || "/placeholder.jpg"} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Link href={`/projects/${project._id}`}>
                      <button className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </Link>
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-300">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.subTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">{tech}</span>
                  ))}
                </div>

                <Link href={`/projects/${project._id}`}>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-yellow-500 hover:text-yellow-600 cursor-pointer group/link">
                    <span className="font-medium">View Details</span>
                    <svg className="w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">Load More Projects</button>
          </div>
        )}
      </div>
    </section>
  );
};
