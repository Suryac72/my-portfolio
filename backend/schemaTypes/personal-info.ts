import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'personalInformation',
  title: 'Personal Information',
  type: 'document',
  fields: [
  
    // Additional fields
    defineField({
      name: 'contactUsImage',
      title: 'Contact Us Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactUsDescription',
      title: 'Contact Us Description',
      type: 'text',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'contactUsTitle',
      title: 'Contact Us Title',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'contactUsTitle',
      media: 'contactUsImage',
    },
  },
});
