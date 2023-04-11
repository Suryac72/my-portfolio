import { Inter } from 'next/font/google'
import Head from 'next/head'
import Main from '@/components/Main'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Project from '@/components/Project'
import Contact from '@/components/Contact'
import { siteData } from '@/components/data/site-content';
import surya from '../public/assets/surya.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Surya Prakash Chaudhary | Full-Stack Developer</title>
        <meta name="description" content="Welcome to my portfolio website"/>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Main title={siteData.main.title} subtitle={siteData.main.subtitle} innerSubTitle={siteData.main.innerSubTitle} description={siteData.main.description} linkedInUrl={siteData.main.linkedInUrl} githubUrl={siteData.main.githubUrl}/>
      <About title={siteData.about.title} subtitle={siteData.about.subtitle} description={siteData.about.description} innerSubTitle={siteData.about.innerSubTitle} aboutImage={surya}/>
      <Skills/>
      <Project/>
      <Contact/>
    </>
    
  )
}
