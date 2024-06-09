import CustomHTML from '../CustomHTML'

export type CustomHTMLSubmoduleType = Sanity.Module<'custom-html'> &
	Partial<{
		html: {
			code: string
		}
	}>

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	// Check if module?.html is defined and module?.html?.code is a string
	const htmlCode =
		typeof module?.html?.code === 'string' ? module.html.code : ''

	return <CustomHTML html={htmlCode} />
}
