import Image from "next/image";
import React from "react";
import Link from "next/link";

interface ProjectItemProps {
  title: string;
  backgroundImg: string;
  projectUrl: string;
  projectTech: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  backgroundImg,
  projectUrl,
  projectTech,
}) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl bg-[#EEEEEE] dark:bg-[#405D72] shadow-gray-400 dark:shadow-none  rounded-xl p-4 group hover:bg-gradient-to-r from-[#5651e5] to-[#709dff]">
      <Image
        className="rounded-xl group-hover:opacity-10 w-full h-[300px]"
        src={backgroundImg}
        alt="/"
        width={400}
        height={400}
      />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl text-white tracking-wider text-center">
          {title}
        </h3>
        <p className="pb-4 pt-2 text-white text-center">{projectTech}</p>
        <Link href={projectUrl}>
          <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
            More Info
          </p>
        </Link>
      </div>
    </div>
  );
};


