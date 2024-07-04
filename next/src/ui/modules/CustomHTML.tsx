'use client'
import { setup, tw } from 'twind'
import { css } from 'twind/css'
import { useEffect } from 'react'

// Ensure Twind is set up
setup({
	/* your twind config here, if needed */
})

export default function CustomHTML({ html }: { html: string }) {
	useEffect(() => {
		// Process the styles when the component mounts
		document.querySelectorAll('[data-tw]').forEach((element) => {
			const classes = element.getAttribute('data-tw')
			if (classes) {
				element.className = tw(classes)
			}
		})
	}, [html])

	return (
		<div className={tw`overflow-x-hidden`}>
			<div 
				className={tw`img:max-w-full img:h-auto long-text:whitespace-normal long-text:word-break[break-word]`}
				dangerouslySetInnerHTML={{ __html: html }} 
			/>
		</div>
	)
}
