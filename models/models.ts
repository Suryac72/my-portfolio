export interface AboutProps {
  title: string;
  subtitle: string;
  innerSubTitle: string;
  description: string;
  // Sanity image objects are complex, keep as `any` for URL builder usage
  aboutImage: any;
  // Optional stats array used by the About component
  stats?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  // icon may be a Sanity image reference/object or absent
  icon?: any;
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

export interface ContactForm {
  name:string;
  contactUsTitle: string;
  contactUsImage: string;
  contactUsDescription: string;
}

// Personal information document shape used in frontend
export interface PersonalInformation {
  name?: string;
  contactUsTitle?: string;
  contactUsImage?: any;
  contactUsDescription?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  age?: string;
  residence?: string;
  freelance?: string;
  // optional lists driven from Sanity
  languages?: { name: string; level: number }[];
  extraSkills?: string[];
}

export interface Service {
  title: string;
  subtitle?: string;
  description?: string;
  details?: string;
  icon?: any;
  color?: string;
}