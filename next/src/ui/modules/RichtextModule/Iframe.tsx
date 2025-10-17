export default function Iframe({
	value,
}: {
	value: {
		url: string
		height?: number
		title?: string
	}
}) {
	return (
		<iframe
			src={value.url}
			width="100%"
			height={value.height || 500}
			frameBorder="0"
			title={value.title || 'Embedded content'}
			className="rounded-lg"
		/>
	)
}