import { getSite } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import React from 'react'

export default async function Menu() {
	const { headerMenu } = await getSite()

	return (
		<nav className="max-md:anim-fade-to-r text-md flex justify-end gap-y-2 [grid-area:ctas] max-md:my-4 max-md:flex-col max-md:header-closed:hidden">
			{headerMenu?.items?.map((item, key) => {
				const isLastItem = key === headerMenu.items.length - 1

				return (
					<React.Fragment key={key}>
						{item._type === 'link' && (
							<CTA className="hover:link text-slate-50 md:px-3" link={item} />
						)}
						{item._type === 'link.list' && <LinkList {...item} />}
						{!isLastItem && <span className="mx-2 text-slate-50">|</span>}
					</React.Fragment>
				)
			})}
		</nav>
	)
}
