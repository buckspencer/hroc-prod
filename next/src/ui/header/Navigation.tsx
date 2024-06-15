import { getSite } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import React from 'react'

export default async function Menu() {
  const { headerMenu } = await getSite()

  return (
    <nav className="text-md flex justify-end gap-y-2 [grid-area:ctas] my-4 flex-wrap max-w-5xl mx-auto max-md:header-closed:hidden">
      {headerMenu?.items?.map((item, key) => {
        const isLastItem = key === (headerMenu?.items?.length ?? 0) - 1;

        return (
          <React.Fragment key={key}>
            {item._type === 'link' && (
              <CTA className="hover:link text-slate-50 md:px-3" link={item} />
            )}
            {item._type === 'link.list' && <LinkList {...item} />}
            {!isLastItem && <span className="mx-.5 text-slate-50">|</span>}
          </React.Fragment>
        );
      })}
    </nav>
  )
}
