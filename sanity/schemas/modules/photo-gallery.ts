import { defineField, defineType } from 'sanity'
import { TfiGallery } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default defineType({
  name: 'photo-gallery',
  title: 'Photo Gallery',
  icon: TfiGallery,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Gallery Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'size',
              type: 'string',
              title: 'Size',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'loading',
              type: 'string',
              title: 'Loading',
              options: {
                layout: 'radio',
                list: ['lazy', 'eager'],
              },
              initialValue: 'lazy',
            }),
          ],
        },
      ],
      validation: Rule => Rule.min(1).error('At least one image is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0', // Use the first image as the preview
    },
    prepare: ({ title, media }) => ({
      title: title || 'Untitled Gallery',
      subtitle: 'Photo Gallery',
      media,
    }),
  },
})
