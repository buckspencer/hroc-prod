import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	fields: [
		defineField({
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },
				defineArrayMember({
					type: 'image',
					icon: IoIosImage,
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'loading',
							type: 'string',
							options: {
								list: ['lazy', 'eager'],
							},
							initialValue: 'lazy',
						}),
					],
					preview: {
						select: {
							title: 'caption',
							subtitle: 'alt',
							media: 'asset',
						},
					},
				}),
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
				defineArrayMember({
					type: 'object',
					name: 'iframe',
					title: 'Iframe',
					fields: [
						defineField({
							name: 'url',
							type: 'url',
							title: 'URL',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'height',
							type: 'number',
							title: 'Height (px)',
							initialValue: 500,
						}),
						defineField({
							name: 'title',
							type: 'string',
							title: 'Title (for accessibility)',
						}),
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'url',
						},
						prepare: ({ title, subtitle }) => ({
							title: title || 'Iframe',
							subtitle,
						}),
					},
				}),
			],
		}),
		defineField({
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'showReadTime',
			type: 'boolean',
			title: 'Show read time',
			description: 'Display the estimated read time for this post',
			initialValue: true,
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'metadata.title',
			subtitle: 'publishDate',
			media: 'metadata.image',
		},
	},
	orderings: [
		{
			title: 'Date',
			name: 'date',
			by: [{ field: 'publishDate', direction: 'desc' }],
		},
		{
			title: 'Title',
			name: 'metadata.title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
