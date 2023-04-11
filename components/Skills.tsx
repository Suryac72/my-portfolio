import React from 'react'
import Image from 'next/image'
import html from '../public/assets/skills/html.png'
import css from '../public/assets/skills/css.png'
import js from '../public/assets/skills/javascript.png'
import tailwind from '../public/assets/skills/tailwind.png'
import node from '../public/assets/skills/node.png'
import react from '../public/assets/skills/react.png'
import git from '../public/assets/skills/github1.png'
import java from '../public/assets/skills/java.png'

const Skills = () => {
  return (
    <div id='skills' className="w-full lg:h-screen p-10">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">Skills</p>
        <h2 className="py-4">What I Can Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={html} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>HTML</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={css} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>CSS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={js} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>JAVASCRIPT</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={tailwind} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>TAILWIND CSS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={node} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>NODE JS</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={react} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>REACT</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={git} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>GIT</h3>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="m-auto">
                  <Image src={java} width={64} height={64} alt='/'/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>JAVA</h3>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Skills