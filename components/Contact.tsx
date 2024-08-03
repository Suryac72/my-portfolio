import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import ContactImg from "../public/assets/contact.jpg";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { ContactForm } from "@/models/models";
import { urlFor } from "@/utils/sanity-client";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}


export const Contact = ({contactUsDescription,contactUsImage,contactUsTitle,name}: ContactForm) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/mnnadlvw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          "Your response recorded successfully. I will get back to you soon."
        );
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="w-full lg:h-[200vh]">
      <ToastContainer position="top-center" />
      <div className="max-w-[1240px] m-auto px-10 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl dark:shadow-none bg-[#EEEEEE] dark:bg-[#405D72] shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div>
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src={urlFor(contactUsImage).url()}
                  alt="/"
                  width={500}
                  height={500}
                />
              </div>
              <div>
                <h3 className="py-2 text-3xl">{name}</h3>
                <p>{contactUsTitle}</p>
                <p className="py-4">
                 {contactUsDescription}
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
                    <div className="rounded-full shadow-lg shadow-gray-400 dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <FaGithub />
                    </div>
                  </a>

                  <div className="rounded-full shadow-lg shadow-gray-400 dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                  <Link href="/resume">
                    <div className="rounded-full shadow-lg shadow-gray-400 dark:bg-[#131842] dark:shadow-none p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <BsFillPersonLinesFill />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 bg-[#EEEEEE] dark:bg-[#405D72] dark:shadow-none rounded-xl lg:p-4">
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <Input
                      label="Name"
                      inputType="text"
                      inputName="name"
                      isRequired={true}
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Phone Number"
                      inputType="text"
                      inputName="phone"
                      isRequired={true}
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <Input
                    label="Email"
                    inputType="email"
                    inputName="email"
                    isRequired={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <Input
                    label="Subject"
                    inputType="text"
                    inputName="subject"
                    isRequired={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <Input
                    label="Message"
                    inputType="text"
                    inputName="message"
                    isRequired={true}
                    isTextArea={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <button
                  className="w-full p-4 text-gray-100 mt-4 dark:shadow-none flex justify-center items-center"
                  disabled={loading} 
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#fff"} />
                  ) : (
                    "Send Message"
                  )}
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
