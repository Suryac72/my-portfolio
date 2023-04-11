import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import portfolioImage from "../public/assets/projects/portfolio.png";
import { descriptions } from "@/components/data/project-description";
const portfolio = () => {
  return (
    <div>
    <ProjectCard
      title="Portfolio Website"
      imageUrl={portfolioImage}
      subtitle="Next JS / Tailwind CSS"
      description={descriptions.portfolio.description}
      codeUrl="https://github.com/Suryac72/data-finance-frontend-project/tree/master"
      projectUrl="https://myblogger-react-app.surge.sh/"
      technologies={["Next JS","React", "Tailwind CSS","Javascript"]}
    />
  </div>
  )
}

export default portfolio