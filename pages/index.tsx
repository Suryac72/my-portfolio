import Head from "next/head";
import { Main, About, Skills, Projects, ToggleButton } from "@/components";
import Contact from "@/components/Contact";
import { GetStaticProps } from "next";
import { client } from "@/utils/sanity-client";
import { AboutProps, Skill } from "@/models/models";
import { siteData } from "@/components/data/site-content";


interface HomePageProps {
  aboutData: AboutProps[];
  skillsData: Skill[];
  projects: any;
}

export default function Home({
  aboutData,
  skillsData,
  projects,
}: HomePageProps) {
  return (
    <>
      <Head>
        <title>Surya Prakash Chaudhary | Full-Stack Developer</title>
        <meta name="description" content="Welcome to my portfolio website" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
        <ToggleButton className="absolute top-4 right-4" />
        <Main
          title={siteData.main.title}
          subtitle={siteData.main.subtitle}
          innerSubTitle={siteData.main.innerSubTitle}
          description={siteData.main.description}
          linkedInUrl={siteData.main.linkedInUrl}
          githubUrl={siteData.main.githubUrl}
        />
        <About {...aboutData[0]} />
        <Skills skillsData={skillsData} />
        <Projects projects={projects} />
        <Contact />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await client.fetch(`*[_type == "about"]`);
  const skillsData = await client.fetch(`*[_type == "skills"]`);
  const projects = await client.fetch(`*[_type == "works"]`);

  return {
    props: {
      aboutData,
      skillsData,
      projects,
    },
  };
};
