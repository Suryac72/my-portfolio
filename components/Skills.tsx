import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/utils/sanity-client";
import { Skill } from "@/models/models";
import { DEFAULT_LANGUAGES, DEFAULT_EXTRA_SKILLS } from "@/utils/defaults";

interface SkillsProps {
  skillsData: Skill[];
  languages?: { name: string; level: number }[];
  extraSkills?: string[];
}

export const Skills: React.FC<SkillsProps> = ({ skillsData, languages: langsProp, extraSkills: extraSkillsProp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const languages = Array.isArray(langsProp) && langsProp.length > 0 ? langsProp : DEFAULT_LANGUAGES;

  const extraSkills = Array.isArray(extraSkillsProp) && extraSkillsProp.length > 0
    ? extraSkillsProp
    : DEFAULT_EXTRA_SKILLS;

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase">Skills</span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">What I Can Do</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {skillsData.map((skill, index) => (
                <div key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      {skill?.icon ? (
                        <Image src={urlFor(skill.icon).url()} width={40} height={40} alt={skill.name} />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {skill?.name ? skill.name.charAt(0).toUpperCase() : ""}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{skill.name}</h4>
                      <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000 ${isVisible ? "animate-fillBar" : "w-0"}`} style={{ width: isVisible ? `${85 + Math.random() * 15}%` : "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Languages</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{lang.name}</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">{lang.level}%</span>
                    </div>
                    <div className="h-2 bg-white dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000" style={{ width: isVisible ? `${lang.level}%` : "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Extra Skills</h3>
              <ul className="space-y-3">
                {extraSkills.map((skill, index) => (
                  <li key={index} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="/resume" className="block w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="flex items-center justify-center space-x-2">
                <span>Download CV</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: var(--final-width); }
        }
      `}</style>
    </section>
  );
};
