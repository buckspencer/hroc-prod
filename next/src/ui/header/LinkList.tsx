import { cn } from '@/lib/utils'
import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'
import { CgChevronRight } from 'react-icons/cg'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="group relative" closeAfterNavigate>
			<summary className="flex items-center gap-1 text-slate-50 md:px-3 pl-2 md:pl-0">
				{label}
				<CgChevronRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="text-slate-800 left-0 top-full px-3 py-2 max-md:border-l md:absolute md:min-w-max md:rounded md:border md:bg-canvas md:shadow-md">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA
							className={cn(
								'hover:link inline-block py-px',
								link.external?.startsWith('http') && 'is-external',
							)}
							link={link}
						/>
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
