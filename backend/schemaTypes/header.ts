import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'innerSubTitle',
      title: 'Inner Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'string',
    }),

    defineField({
      name: 'githubUrl',
      title: 'Github URL',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
