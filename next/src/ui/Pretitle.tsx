import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Pretitle({
	className,
	children,
}: React.HTMLProps<HTMLParagraphElement>) {
	if (!children) return null

	return (
		<p
			className={cn('technical text-2xl text-slate-50 md:text-5xl', className)}
		>
			{stegaClean(children)}
		</p>
	)
}
