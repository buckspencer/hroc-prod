import { defineField, defineType } from 'sanity';
import { VscNote } from 'react-icons/vsc'; // Example icon, adjust as needed

export default defineType({
  name: 'contact-form',
  title: 'Contact Form',
  icon: VscNote, // Example icon from react-icons/vsc, replace with appropriate icon
  type: 'object',
	fields: [defineField({
		name: 'name',
		type: 'string',
	})],
});

