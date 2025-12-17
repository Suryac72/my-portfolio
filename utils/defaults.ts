import { Code, Palette } from 'lucide-react'

export const DEFAULT_HEADER = {
  title: 'Surya Prakash Chaudhary | Full-Stack Developer',
  description: 'Welcome to my portfolio website',
}

export const DEFAULT_ABOUT_STATS = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
]

export const DEFAULT_ABOUT = {
  title: 'About Me',
  subtitle: 'Know More About Me',
  innerSubTitle: "I'm a Full Stack Developer",
  description:
    "I'm a passionate developer with expertise in modern web technologies. I love creating beautiful and functional web applications.",
  cta: 'Check My Projects',
}

export const DEFAULT_SERVICES = [
  {
    title: 'Web Development',
    description: 'Build, E-Commerce',
    details: 'Creating responsive and performant web applications using modern technologies',
    color: 'from-blue-400 to-blue-600',
    icon: Code,
  },
  {
    title: 'UI/UX Design',
    description: 'Mobile App, Website Design',
    details: "Designing intuitive and beautiful user interfaces that users love",
    color: 'from-purple-400 to-purple-600',
    icon: Palette,
  },
  {
    title: 'DevOps Services',
    description: 'CI/CD, Cloud Deployment using AWS',
    details: 'Streamlining development and deployment processes for faster delivery',
    color: 'from-red-400 to-red-600',
    icon: Code,
  },
]

export const DEFAULT_LANGUAGES = [
  { name: 'Hindi', level: 100 },
  { name: 'English', level: 90 },
]

export const DEFAULT_EXTRA_SKILLS = [
  'Bootstrap, Materialize',
  'Stylus, Sass, Less',
  'Gulp, Webpack, Grunt',
  'GIT Knowledge',
]

export const DEFAULT_CONTACT = {
  name: 'Your Name',
  email: '',
  phone: '',
  location: '',
  address: '',
  contactUsTitle: '',
  contactUsDescription: '',
  linkedin: '#',
  github: '#',
}

export default {
  DEFAULT_HEADER,
  DEFAULT_ABOUT,
  DEFAULT_ABOUT_STATS,
  DEFAULT_SERVICES,
  DEFAULT_LANGUAGES,
  DEFAULT_EXTRA_SKILLS,
  DEFAULT_CONTACT,
}
