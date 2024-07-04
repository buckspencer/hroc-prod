import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Pretitle({
	className,
	children,
}: React.HTMLProps<HTMLParagraphElement>) {
	if (!children) return null

	const classes = className?.includes('no-technical')
		? cn('text-2xl text-slate-50 md:text-5xl', className.replace('no-technical', ''))
		: cn('technical text-2xl text-slate-50 md:text-5xl', className)

	return (
		<p className={classes}>
			{stegaClean(children)}
		</p>
	)
}
