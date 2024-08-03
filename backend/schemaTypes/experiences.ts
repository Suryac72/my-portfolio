

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'experiences',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'year',
    },
  },
})
