import React from 'react'
import rmsImage from "../public/assets/projects/rms.jpg";
import { descriptions } from "@/components/data/project-description";
import ProjectCard from '@/components/ProjectCard';

const rms = () => {
  return (
    <ProjectCard
      title="Result Management System"
      imageUrl={rmsImage}
      subtitle="Node JS / CSS / MySQL"
      description={descriptions.portfolio.description}
      codeUrl="https://github.com/Suryac72/result-management-system"
      projectUrl="https://result-management-system-qaqv.onrender.com/"
      technologies={["Node JS","MYSQL", "CSS","Javascript", "EJS"]}
    />
  )
}

export default rms