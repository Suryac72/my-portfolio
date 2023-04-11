/* eslint-disable react/jsx-no-comment-textnodes */
import Image, { StaticImageData } from "next/image";
import React from "react";



interface AboutProps { 
  title : string;
  subtitle : string;
  innerSubTitle : string;
  description : string;
  aboutImage : StaticImageData
}
const About = (aboutProps : AboutProps) => {
  return (
    <div id='about' className="w-full md:screen p-10 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#5651e5]">{aboutProps.title}</p>
          <h2 className="py-4">{aboutProps.subtitle}</h2>
          <p className="py-2 text-gray-600 font-Roboto-Slab">{aboutProps.innerSubTitle}</p>
          <p className="py-2 text-gray-700 text-justify">
            {aboutProps.description}
          </p>
          <p className="py-2 text-gray-700 underline cursor-pointer font-Roboto-Slab">Check out some of my latest projects</p>
        </div>
        <div className="w-full h-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center hover:scale-105 ease-in duration-300 ">
            <Image className="w-[520px] h-[610px] md:h-[510px] rounded-xl"src={aboutProps.aboutImage} alt="/"/>
        </div>
      </div>
    </div>
  );
};

export default About;
