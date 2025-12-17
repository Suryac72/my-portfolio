import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useRouter } from "next/router";
import { useTheme } from "@/utils/theme-context";
import { client } from "@/utils/sanity-client";
import logo from "../public/assets/nav-logo.svg";

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [siteName, setSiteName] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<{ linkedin?: string; github?: string } | null>(null);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    // fetch header and personal info from Sanity on client-side to avoid hardcoded values
    let mounted = true;
    (async () => {
      try {
        const [header] = await client.fetch(`*[_type == "header"]`);
        const [personal] = await client.fetch(`*[_type == "personalInformation"]`);
        if (!mounted) return;
        if (header?.title) setSiteName(header.title);
        if (personal) setSocialLinks({ linkedin: personal.linkedin, github: personal.github });
      } catch (e) {
        // ignore fetch errors; fallbacks below used
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        shadow
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/#home" scroll={false} className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              {siteName ? siteName.split(' ').slice(0,2).map(s=>s[0]).join('') : 'SP'}
            </div>
            <span className="font-bold text-xl dark:text-white hidden sm:block">{siteName || 'Surya Prakash'}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} scroll={false}>
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.href.substring(1)
                      ? "bg-yellow-400 text-gray-900"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNav}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${nav ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} scroll={false}>
              <span onClick={() => setNav(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === link.href.substring(1) ? "bg-yellow-400 text-gray-900" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                {link.name}
              </span>
            </Link>
          ))}
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link href={socialLinks?.linkedin || 'https://www.linkedin.com'} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors">
              <FaLinkedinIn size={20} />
            </Link>
            <Link href={socialLinks?.github || 'https://github.com'} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors">
              <FaGithub size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

