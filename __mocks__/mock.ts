import {
  AboutProps,
  Skill,
  ProjectDTO,
  ContactForm,
  PersonalInformation,
  Service,
} from "@/models/models";

export const mockAboutData: AboutProps = {
  title: "About Me",
  subtitle: "Driven by Innovation",
  innerSubTitle: "Full Stack Developer & UI/UX Enthusiast",
  description:
    "I am a passionate developer with over 5 years of experience in building digital products. I love solving complex problems and turning ideas into reality using modern web technologies.",
  aboutImage: {
    asset: {
      _ref: "image-about-me-123456",
      _type: "reference",
    },
    alt: "Portrait of the developer",
  },
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "40+" },
    { label: "Happy Clients", value: "25+" },
  ],
};

export const mockSkills: Skill[] = [
  {
    name: "React",
    icon: { asset: { _ref: "image-react-icon" } },
    bgColor: "#61DAFB",
  },
  {
    name: "TypeScript",
    icon: { asset: { _ref: "image-ts-icon" } },
    bgColor: "#3178C6",
  },
  {
    name: "Node.js",
    icon: { asset: { _ref: "image-node-icon" } },
    bgColor: "#339933",
  },
  {
    name: "Tailwind CSS",
    icon: { asset: { _ref: "image-tailwind-icon" } },
    bgColor: "#06B6D4",
  },
];

export const mockProjects: ProjectDTO[] = [
  {
    title: "E-Commerce Dashboard",
    subTitle: "Next.js, Prisma, Stripe",
    innerSubTitle: "A comprehensive admin dashboard for online stores",
    description:
      "Built a full-featured dashboard allowing merchants to manage inventory, view analytics, and process orders in real-time. Integrated Stripe for payments and Prisma for efficient database management.",
    image: "/assets/projects/dashboard-main.jpg",
    thumbnailImage: "/assets/projects/dashboard-thumb.jpg",
    url: "https://demo-ecommerce-dashboard.com",
    projectUrl: "https://github.com/username/ecommerce-dashboard",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
  {
    title: "AI Chat Interface",
    subTitle: "React, OpenAI API",
    innerSubTitle: "Conversational AI Assistant",
    description:
      "An elegant chat interface connecting to OpenAI's GPT models. Features include message history persistence, code syntax highlighting, and customizable system prompts.",
    image: "/assets/projects/ai-chat.jpg",
    thumbnailImage: "/assets/projects/ai-chat-thumb.jpg",
    url: "https://my-ai-chat-app.com",
    projectUrl: "https://github.com/username/ai-chat-interface",
    technologies: ["React", "Vite", "OpenAI API", "Framer Motion"],
  },
];

export const mockContactForm: ContactForm = {
  name: "Jane Doe",
  contactUsTitle: "Let's Work Together",
  contactUsImage: "image-contact-hero-ref", // Assuming string based on interface
  contactUsDescription:
    "Have a project in mind? Fill out the form below or reach out via social media.",
};

export const mockPersonalInformation: PersonalInformation = {
  name: "John Smith",
  contactUsTitle: "Get In Touch",
  contactUsImage: { asset: { _ref: "image-contact-123" } },
  contactUsDescription:
    "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  address: "123 Tech Avenue, Silicon Valley",
  linkedin: "https://linkedin.com/in/johnsmith-dev",
  github: "https://github.com/johnsmith",
  age: "28",
  residence: "USA",
  freelance: "Available",
  languages: [
    { name: "English", level: 100 },
    { name: "Spanish", level: 60 },
    { name: "German", level: 30 },
  ],
  extraSkills: [
    "System Design",
    "CI/CD Pipelines",
    "Agile Methodology",
    "Technical Writing",
  ],
};

export const mockServices: Service[] = [
  {
    title: "Web Development",
    subtitle: "Modern & Responsive",
    description:
      "I build fast, responsive, and accessible websites using the latest frameworks.",
    details:
      "From landing pages to complex web applications, I ensure high performance and SEO optimization.",
    icon: { asset: { _ref: "icon-web-dev" } },
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "UI/UX Design",
    subtitle: "User-Centric Design",
    description:
      "Designing intuitive interfaces that provide an exceptional user experience.",
    details:
      "I create wireframes, prototypes, and high-fidelity mockups using Figma and Adobe XD.",
    icon: { asset: { _ref: "icon-design" } },
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Mobile App Dev",
    subtitle: "Cross-Platform",
    description:
      "Developing mobile applications that run smoothly on both iOS and Android.",
    details:
      "Using React Native to deliver native-like performance with a single codebase.",
    icon: { asset: { _ref: "icon-mobile" } },
    color: "from-green-400 to-green-600",
  },
];

export const mockPersonalData = {
  age: "25",
  residence: "Earth",
  freelance: "Available",
  address: "123 Street",
};
