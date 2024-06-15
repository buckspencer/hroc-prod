import { defineField, defineType } from 'sanity';
import { VscBook } from 'react-icons/vsc'; // Example icon, adjust as needed

export default defineType({
  name: 'daily-passage',
  title: 'Daily Passage',
  icon: VscBook, // Example icon from react-icons/vsc, replace with appropriate icon
  type: 'object',
	fields: [defineField({
		name: 'name',
		type: 'string',
	})],
});

