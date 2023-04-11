import React from "react";
import { RiRadioButtonFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import dataImage from "../public/assets/projects/data1.png";
import { descriptions } from "@/components/data/project-description";

const data = () => {
  return (
    <div>
      <ProjectCard
        title="Data Finance Website"
        imageUrl={dataImage}
        subtitle="Next JS / Tailwind CSS"
        description={descriptions.dataFinance.description}
        codeUrl="https://github.com/Suryac72/data-finance-frontend-project/tree/master"
        projectUrl="https://data-finance-react-tailwind.netlify.app/"
        technologies={["React", "Next JS", "Tailwind CSS", "Javascript"]}
      />
    </div>
  );
};

export default data;
