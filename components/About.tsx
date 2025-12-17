import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity-client";
import { AboutProps } from "@/models/models";
import { HiArrowRight } from "react-icons/hi";
import { DEFAULT_ABOUT, DEFAULT_ABOUT_STATS } from "@/utils/defaults";

interface AboutSectionProps {
  aboutData: AboutProps;
  personal?: any;
}

export const About: React.FC<AboutSectionProps> = ({ aboutData, personal }) => {
  const _rawStats = (aboutData as any) && (aboutData as any).stats;
  const stats: { label: string; value: string }[] = _rawStats && _rawStats.length
    ? (_rawStats as { label: string; value: string }[])
    : DEFAULT_ABOUT_STATS;

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase">
            {aboutData.title || DEFAULT_ABOUT.title}
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
            {aboutData.subtitle || DEFAULT_ABOUT.subtitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left - Image (2 columns) */}
          <div className="lg:col-span-2 relative group sticky top-24 lg:pr-8">
            <div className="relative w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl lg:mt-10">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
              <Image
                src={urlFor(aboutData.aboutImage).url()}
                alt="About Image"
                width={500}
                height={600}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-400 rounded-2xl -z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full -z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Right - Content (3 columns) */}
          <div className="lg:col-span-3 space-y-6 lg:pl-10 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-none border border-transparent lg:border-gray-100 dark:lg:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {aboutData.innerSubTitle || DEFAULT_ABOUT.innerSubTitle}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {aboutData.description || DEFAULT_ABOUT.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-3xl font-bold text-yellow-500">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Personal Info */}
              <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">Age:</span>
                  <span className="text-gray-600 dark:text-gray-400">{personal?.age || (aboutData as any)?.age || '—'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">Residence:</span>
                  <span className="text-gray-600 dark:text-gray-400">{personal?.residence || (aboutData as any)?.residence || '—'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">Freelance:</span>
                  <span className="text-green-500 font-semibold">{personal?.freelance || (aboutData as any)?.freelance || 'Available'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">Address:</span>
                  <span className="text-gray-600 dark:text-gray-400">{personal?.address || (aboutData as any)?.address || '—'}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <Link href="/#projects" scroll={false}>
                  <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <span>{DEFAULT_ABOUT.cta}</span>
                    <HiArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};