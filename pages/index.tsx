import Head from "next/head";
import { GetStaticProps } from "next";
import { fetchQuery } from "@/utils/sanity-client";
import { AboutProps, Skill } from "@/models/models";
import dynamic from "next/dynamic";
import { Hero, About, Services, Skills, Projects } from "@/components";
const Contact = dynamic(() => import("@/components").then((mod) => mod.Contact), { ssr: false });
import { DEFAULT_HEADER } from "@/utils/defaults";

interface HomePageProps {
  aboutData: AboutProps[];
  skillsData: Skill[];
  projects: any;
  header: any;
  contactDetails: any;
  servicesData: any[];
}

export default function Home({
  aboutData,
  skillsData,
  projects,
  header,
  contactDetails,
  servicesData,
}: HomePageProps) {
  return (
    <>
      <Head>
        <title>{`${header?.[1]?.title} | ${header?.[1]?.subtitle}` || DEFAULT_HEADER.title}</title>
        <meta
          name="description"
          content={header?.[0]?.description || DEFAULT_HEADER.description}
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <Hero header={header?.[0]} />
        <About aboutData={aboutData?.[0]} personal={contactDetails?.[0]} />
        <Services servicesData={servicesData} />
        <Skills
          skillsData={skillsData}
          languages={contactDetails?.[0]?.languages}
          extraSkills={contactDetails?.[0]?.extraSkills}
        />
        <Projects projects={projects} />
        <Contact contactDetails={contactDetails?.[0]} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await fetchQuery(`*[_type == "about"]`);
  const skillsData = await fetchQuery(`*[_type == "skills"]`);
  const projects = await fetchQuery(`*[_type == "works"]`);
  const header = await fetchQuery(`*[_type == "header"]`);
  const contactDetails = await fetchQuery(`*[_type == "personalInformation"]`);
  const servicesData = await fetchQuery(`*[_type == "services"]`);

  // Debug logs: surface counts to the build output so we can verify what Sanity returns
  // (remove these logs after diagnosis)
  // eslint-disable-next-line no-console
  console.log("Sanity fetch counts:", {
    about: Array.isArray(aboutData) ? aboutData.length : 0,
    skills: Array.isArray(skillsData) ? skillsData.length : 0,
    projects: Array.isArray(projects) ? projects.length : 0,
    header: Array.isArray(header) ? header.length : 0,
    contactDetails: Array.isArray(contactDetails) ? contactDetails.length : 0,
    services: Array.isArray(servicesData) ? servicesData.length : 0,
  });

  return {
    props: {
      aboutData,
      skillsData,
      projects,
      header,
      contactDetails,
      servicesData,
    },
    revalidate: 60,
  };
};
