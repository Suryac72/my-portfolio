import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import ContactImg from "../public/assets/contact.jpg";
import { Input } from "./Input";


export const Contact = () => {
  return (
    <div id="contact" className="w-full lg:h-[200vh]">
      <div className="max-w-[1240px] m-auto px-10 py-16 w-full ">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl dark:shadow-none bg-[#EEEEEE] dark:bg-[#405D72] shadow-gray-400  rounded-xl p-4">
            <div className="lg:p-4 h-full ">
              <div>
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src={ContactImg}
                  alt="/"
                />
              </div>
              <div>
                <h3 className="py-2 text-3xl">Surya Prakash Chaudhary</h3>
                <p>Full-Stack Developer</p>
                <p className="py-4">
                  I am available for freelance or full-time positions. Contact
                  me and let&apos;s talk.
                </p>
              </div>
              <div>
                <p className="uppercase pt-8 text-[#5651e5] dark:text-[#3FA2F6]">
                  Connect With Me
                </p>
                <div className="flex items-center justify-between py-4">
                  <a
                    href="https://www.linkedin.com/in/surya-prakash-chaudhary/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400 dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <FaLinkedinIn />
                    </div>
                  </a>
                  <a
                    href="https://github.com/suryac72"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400  dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <FaGithub />
                    </div>
                  </a>

                  <div className="rounded-full shadow-lg shadow-gray-400  dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                  <Link href="/resume">
                    <div className="rounded-full shadow-lg shadow-gray-400  dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <BsFillPersonLinesFill />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400  bg-[#EEEEEE] dark:bg-[#405D72] dark:shadow-none rounded-xl lg:p-4">
            <div className="p-4">
              <form
                action="https://getform.io/f/57d00a1e-cb8c-494a-9257-d5277f3d6880"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <Input
                      label="Name"
                      inputType="text"
                      inputName="name"
                      errorMessage=""
                      isRequired={true}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Phone Number"
                      inputType="text"
                      inputName="phone"
                      errorMessage=""
                      isRequired={true}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                   <Input
                      label="Email"
                      inputType="email"
                      inputName="email"
                      errorMessage=""
                      isRequired={true}
                    />
                </div>
                <div className="flex flex-col py-2">
                  <Input
                      label="Subject"
                      inputType="text"
                      inputName="subject"
                      errorMessage=""
                      isRequired={true}
                    />
                </div>
                <div className="flex flex-col py-2">
                   <Input
                      label="Message"
                      inputType="text"
                      inputName="message"
                      errorMessage=""
                      isRequired={true}
                      isTextArea={true}
                    />
                </div>
                <button className="w-full p-4 text-gray-100 mt-4 dark:shadow-none">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Link href="#home" scroll={false}>
            <div className="rounded-full shadow-lg shadow-gray-400 dark:bg-[#405D72] dark:shadow-none p-4 cursor-pointer hover:scale-110 ease-in duration-300">
              <HiOutlineChevronDoubleUp className="text-[#5651e5]" size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
