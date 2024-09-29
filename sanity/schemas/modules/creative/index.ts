import { defineArrayMember, defineField, defineType } from 'sanity';
import creativeCtas from './creativeCtas';
import creativeIcon from './creativeIcon';
import creativeImage from './creativeImage';
import creativeRichtext from './creativeRichtext';
import { count } from '../../../src/utils';

import { VscExtensions } from 'react-icons/vsc';

const sanitizeString = (value) => {
    if (!value) return '';
    return value
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '') // Remove zero-width characters
        .replace(/\s+/g, ' ')                      // Replace multiple spaces with a single space
        .trim();                                   // Trim leading and trailing whitespace
};

export default defineType({
    name: 'creative-module',
    title: 'Creative module',
    icon: VscExtensions,
    type: 'object',
    groups: [{ name: 'content', default: true }, { name: 'options' }],
    fieldsets: [
        { name: 'alignment', title: 'Alignment', options: { columns: 2 } },
    ],
    fields: [
        defineField({
            name: 'wrapperClasses',
            type: 'string',
            title: 'Wrapper CSS Classes',
            description: 'Add custom Tailwind CSS classes for the wrapper element.',
            group: 'content',
            validation: (Rule) =>
                Rule.custom((value) => {
                    if (!value) return true; // Allow empty values
                    const sanitizedValue = sanitizeString(value);
                    return sanitizedValue === value || 'Please remove unwanted characters or extra spaces.';
                }),
        }),
        defineField({
            name: 'modules',
            type: 'array',
            of: [
                defineArrayMember({
                    title: 'module',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'subModules',
                            type: 'array',
                            of: [
                                creativeCtas,
                                creativeIcon,
                                creativeImage,
                                creativeRichtext,
                                { type: 'custom-html' },
                            ],
                        }),
                        defineField({
                            name: 'colSpan',
                            title: 'Column span',
                            type: 'number',
                            validation: (Rule) => Rule.min(1).integer(),
                        }),
                    ],
                    preview: {
                        select: {
                            subModules: 'subModules',
                            colSpan: 'colSpan',
                        },
                        prepare: ({ subModules, colSpan }) => ({
                            title: subModules
                                .map((subModule) => subModule._type)
                                .filter(Boolean)
                                .join(' + '),
                            subtitle: colSpan > 1 ? `${colSpan}-column span` : undefined,
                        }),
                    },
                }),
            ],
            group: 'content',
        }),
        defineField({
            name: 'columns',
            type: 'number',
            description: 'Leave empty to use the number of modules as columns',
            validation: (Rule) => Rule.min(1).integer(),
            group: 'options',
        }),
        defineField({
            name: 'textAlign',
            type: 'string',
            options: {
                list: ['left', 'center', 'right'],
            },
            initialValue: 'left',
            group: 'options',
            fieldset: 'alignment',
        }),
        defineField({
            name: 'alignItems',
            title: 'Vertical alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Top', value: 'start' },
                    'center',
                    { title: 'Bottom', value: 'end' },
                ],
            },
            initialValue: 'center',
            group: 'options',
            fieldset: 'alignment',
        }),
    ],
    preview: {
        select: {
            wrapperClasses: 'wrapperClasses',
            modules: 'modules',
        },
        prepare: ({ wrapperClasses, modules }) => ({
            title: wrapperClasses || 'Creative Module',
            subtitle: count(modules, 'module'),
        }),
    },
});
