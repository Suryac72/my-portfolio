import {ProjectCard} from "@/components/ProjectCard";
import { ProjectDTO } from "@/models/models";
import { client, urlFor } from "@/utils/sanity-client";

interface ProjectProps {
  project: ProjectDTO;
}
const Project = ({ project }: ProjectProps) => {
  return (
    <div>
      <ProjectCard
        title={project.title}
        imageUrl={urlFor(project.image).url()}
        subtitle={project.subTitle}
        description={project.description}
        codeUrl={project.projectUrl}
        projectUrl={project.url}
        technologies={project.technologies}
      />
    </div>
  );
};

export const getStaticPaths = async () => {
  const projects = await client.fetch(`*[_type == "works"]{_id}`);
  const paths = projects.map((project: any) => ({
    params: { id: project._id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: any) => {
  const { id } = params;
  const project = await client.fetch(
    `*[_type == "works" && _id == $id][0]`,
    { id }
  );

  return {
    props: {
      project,
    },
  };
};

export default Project;
