import React from 'react'
import blogImage from "../public/assets/projects/blog.png";
import { descriptions } from "@/components/data/project-description";
import ProjectCard from '@/components/ProjectCard';
const blog = () => {
  return (
    <div>
      <ProjectCard
        title="Blog Website"
        imageUrl={blogImage}
        subtitle="React / CSS"
        description={descriptions.blogs.description}
        codeUrl="https://github.com/Suryac72/blog-website"
        projectUrl="https://myblogger-react-app.surge.sh/"
        technologies={["React", "CSS","Javascript"]}
      />
    </div>
  )
}

export default blog;