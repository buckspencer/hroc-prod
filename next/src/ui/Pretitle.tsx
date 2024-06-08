import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Pretitle({
	className,
	children,
}: React.HTMLProps<HTMLParagraphElement>) {
	if (!children) return null

	return (
		<p className={cn('technical text-3xl text-slate-50', className)}>
			{stegaClean(children)}
		</p>
	)
}
