import parse from 'html-react-parser' // Importing parse function from html-react-parser

export default function CustomHTML({ html }: { html: string }) {
	// Explicitly typing the 'html' prop
	const options = {
		htmlparser2: {
			lowerCaseTags: false,
		},
	}

	return <div>{parse(html, options)}</div> // Parse the HTML string using parse function
}
