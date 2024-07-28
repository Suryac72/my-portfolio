export interface AboutProps {
  title: string;
  subtitle: string;
  innerSubTitle: string;
  description: string;
  aboutImage: string;
}

export interface Skill {
  name: string;
  icon: string;
  bgColor?: string;
}

export interface ProjectDTO {
  title: string;
  subTitle: string;
  innerSubTitle: string;
  description: string;
  image: string;
  thumbnailImage: string;
  url: string;
  projectUrl: string;
  technologies: string[];
}
