import { urlFor } from "@/utils/sanity-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface AboutProps {
  title: string;
  subtitle: string;
  innerSubTitle: string;
  description: string;
  aboutImage: string;
}

export const About = (aboutProps: AboutProps) => {
  return (
    <div id="about" className="w-full md,md:h-screen px-4 py-16 flex items-center bg-gray-50 dark:bg-gray-700">
      <div className="max-w-[1240px] m-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-2 space-y-6">
          <p className="uppercase text-xl tracking-widest text-[#5651e5] font-semibold">
            {aboutProps.title}
          </p>
          <h2 className="text-3xl font-bold dark:text-white">{aboutProps.subtitle}</h2>
          <p className="text-lg text-gray-400 dark:text-gray-300">
            {aboutProps.innerSubTitle}
          </p>
          <p className="text-justify text-gray-700 dark:text-gray-400 leading-relaxed">
            {aboutProps.description}
          </p>
          <Link href="/#projects" scroll={false}>
            <p className="inline-block py-2 px-4 mt-4 bg-[#5651e5] text-white rounded-md hover:bg-[#4338ca] transition-colors cursor-pointer font-Roboto-Slab">
              Check out some of my latest projects
            </p>
          </Link>
        </div>
        <div className="w-full h-auto md:h-[510px] shadow-xl shadow-gray-400 dark:shadow-gray-700 rounded-xl overflow-hidden flex items-center justify-center hover:scale-105 transform transition-transform duration-300">
          <Image
            className="w-full h-full object-cover"
            src={urlFor(aboutProps.aboutImage).url()}
            alt="About Image"
            width={520}
            height={610}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

