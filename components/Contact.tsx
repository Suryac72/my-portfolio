"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { DEFAULT_CONTACT } from "@/utils/defaults";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity-client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

interface FormValues {
	name: string;
	phone: string;
	email: string;
	subject: string;
	message: string;
}

interface ContactProps {
	contactDetails: any;
}

export const Contact: React.FC<ContactProps> = ({ contactDetails }) => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
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
				toast.success("Message sent successfully! I'll get back to you soon.");
				reset();
			} else {
				toast.error("Failed to send message. Please try again.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const contactInfo = [
		{
			icon: Mail,
			title: "Email",
			value: contactDetails?.email || contactDetails?.contactEmail || DEFAULT_CONTACT.email,
			href: contactDetails?.email ? `mailto:${contactDetails.email}` : DEFAULT_CONTACT.linkedin || '#',
		},
		{
			icon: Phone,
			title: "Phone",
			value: contactDetails?.phone || contactDetails?.contactPhone || DEFAULT_CONTACT.phone,
			href: contactDetails?.phone ? `tel:${contactDetails.phone}` : '#',
		},
		{
			icon: MapPin,
			title: "Location",
			value: contactDetails?.location || contactDetails?.address || DEFAULT_CONTACT.location,
			href: contactDetails?.location ? `https://www.google.com/maps/search/${encodeURIComponent(contactDetails.location)}` : '#',
		},
	];

	return (
		<section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
			<ToastContainer position="top-center" />

			<div className="absolute top-0 left-0 w-96 h-96 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-10 blur-3xl" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl" />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase">Contact</span>
					<h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Get In Touch</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Have a project in mind? Let's work together to create something amazing</p>
				</div>

				<div className="grid lg:grid-cols-5 gap-8">
					<div className="lg:col-span-2">
						<div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl h-full">
							<div className="mb-8">
								<div className="relative w-32 h-32 mx-auto mb-4">
									<Image src={urlFor(contactDetails?.contactUsImage).url()} alt={contactDetails.name} fill className="object-cover rounded-full shadow-lg" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">{contactDetails.name || DEFAULT_CONTACT.name}</h3>
								<p className="text-center text-gray-700 dark:text-gray-300 font-medium mb-3">{contactDetails.contactUsTitle || DEFAULT_CONTACT.contactUsTitle}</p>
								<p className="text-center text-gray-600 dark:text-gray-400 text-sm">{contactDetails.contactUsDescription || DEFAULT_CONTACT.contactUsDescription}</p>
							</div>

							<div className="space-y-4 mb-8">
								{contactInfo.map((info, index) => (
									<a key={index} href={info.href} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all duration-300 group">
										<div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<info.icon className="w-6 h-6 text-white" />
										</div>
										<div>
											<p className="text-sm text-gray-600 dark:text-gray-400">{info.title}</p>
											<p className="font-semibold text-gray-900 dark:text-white">{info.value}</p>
										</div>
									</a>
								))}
							</div>

							<div>
								<p className="text-center uppercase text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Connect With Me</p>
								<div className="flex items-center justify-center space-x-4">
									<a href={contactDetails?.linkedin || '#'} target="_blank" rel="noreferrer" className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:scale-110 transition-all duration-300">
										<FaLinkedinIn size={24} />
									</a>
									<a href={contactDetails?.github || '#'} target="_blank" rel="noreferrer" className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:scale-110 transition-all duration-300">
										<FaGithub size={24} />
									</a>
									<div className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:scale-110 transition-all duration-300 cursor-pointer">
										<AiOutlineMail size={24} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-3">
						<div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
										<input type="text" {...register("name", { required: true })} className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-colors duration-300`} placeholder="Your name" />
										{errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
										<input type="text" {...register("phone", { required: true })} className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 ${errors.phone ? "border-red-500" : "border-gray-200 dark:border-gray-700"} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-colors duration-300`} placeholder="Your phone number" />
										{errors.phone && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
									<input type="email" {...register("email", { required: true })} className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-colors duration-300`} placeholder="your.email@example.com" />
									{errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
									<input type="text" {...register("subject", { required: true })} className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 ${errors.subject ? "border-red-500" : "border-gray-200 dark:border-gray-700"} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-colors duration-300`} placeholder="What is this about?" />
									{errors.subject && <p className="text-red-500 text-sm mt-1">Subject is required</p>}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
									<textarea {...register("message", { required: true })} rows={6} className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border-2 ${errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-700"} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-colors duration-300 resize-none`} placeholder="Tell me about your project..." />
									{errors.message && <p className="text-red-500 text-sm mt-1">Message is required</p>}
								</div>

								<button type="submit" disabled={loading} className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
									{loading ? <ClipLoader size={20} color={"#fff"} /> : (<><span>Send Message</span><Send className="w-5 h-5" /></>)}
								</button>
							</form>
						</div>
					</div>
				</div>

				<div className="flex justify-center mt-12">
					<Link href="#home" scroll={false}>
						<div className="p-4 bg-yellow-400 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
							<HiOutlineChevronDoubleUp className="text-white" size={28} />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Contact;
