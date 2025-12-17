/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/utils/sanity-client";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

interface HeroProps {
  header: {
    title: string;
    subtitle: string;
    innerSubTitle: string;
    description: string;
    githubUrl: string;
    linkedInUrl: string;
    image?: any;
  };
}

export const Hero: React.FC<HeroProps> = ({ header }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-20 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"
          style={{
            right: `${mousePosition.x * 0.015}px`,
            bottom: `${mousePosition.y * 0.015}px`,
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase animate-pulse">
                {header.title || "Welcome"}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {header.subtitle || "Surya Prakash"}
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300">
                {header.innerSubTitle || "Front-end Developer"}
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {header.description ||
                "Passionate about creating beautiful, functional, and user-friendly digital experiences."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/#contact" scroll={false}>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                  <span>Hire Me</span>
                  <AiOutlineMail size={20} />
                </button>
              </Link>
              <Link href="/resume">
                <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-gray-200 dark:border-gray-700">
                  <span>Download CV</span>
                  <HiDownload size={20} />
                </button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 justify-center lg:justify-start pt-4">
              <a
                href={header.linkedInUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href={header.githubUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaGithub size={20} />
              </a>
              <Link href="/#contact" scroll={false}>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer">
                  <AiOutlineMail size={20} />
                </div>
              </Link>
              <Link href="/resume">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer">
                  <BsFillPersonLinesFill size={20} />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Profile Image Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-pulse opacity-20" />
              <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                  {header.image ? (
                    <Image
                      src={urlFor(header.image).url()}
                      alt={header.title || "Profile"}
                      fill
                      className="object-cover rounded-full"
                      sizes="(max-width: 768px) 200px, 384px"
                    />
                  ) : (
                    <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                      SPC
                    </div>
                  )}
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-lg shadow-xl animate-bounce flex items-center justify-center text-2xl">
                💻
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400 rounded-lg shadow-xl animate-bounce delay-150 flex items-center justify-center text-2xl" style={{ animationDelay: '0.5s' }}>
                🚀
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Scroll Down</span>
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
