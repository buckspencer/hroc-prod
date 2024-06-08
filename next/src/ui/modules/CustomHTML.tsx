import parse from 'html-react-parser'
export default function CustomHTML({ html }) {
	const options = {
		htmlparser2: {
			lowerCaseTags: false,
		},
	}
	if (!html?.code) return null
	return <div>{parse(html.code, options)}</div>
}
