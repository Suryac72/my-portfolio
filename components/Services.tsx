/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { Code, Palette } from "lucide-react";
import { urlFor } from "@/utils/sanity-client";
import { DEFAULT_SERVICES } from "@/utils/defaults";

interface ServicesProps {
  servicesData?: any[];
}

// Map a service item from Sanity to the shape expected by the UI.
function mapService(item: any) {
  return {
    // Keep raw Sanity image ref in `icon` when present
    icon: item?.icon || null,
    title: item?.title || "Service",
    description: item?.subtitle || item?.description || "",
    details: item?.details || item?.description || "",
    color: item?.color || "from-blue-400 to-blue-600",
  };
}

export const Services: React.FC<ServicesProps> = ({ servicesData }) => {
  const services = Array.isArray(servicesData) && servicesData.length > 0 ? servicesData.map(mapService) : DEFAULT_SERVICES;
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase">Services</span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">What I Offer</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">I provide a wide range of services to help bring your ideas to life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <div key={index} className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-full relative overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105`}>
                  {service?.icon && service.icon.asset ? (
                    <Image src={urlFor(service.icon).url()} alt={`${service.title} icon`} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {(service?.icon && typeof service.icon === 'function') ? (
                        React.createElement(service.icon, { className: 'w-10 h-10 text-white' })
                      ) : (
                        <Code className="w-10 h-10 text-white" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium mb-3">{service.description}</p>
              </div>

              <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-center">{service.details}</div>

              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Interested in working together?</p>
          <Link href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">Let's Talk</Link>
        </div>
      </div>
    </section>
  );
};
