import { getSite } from '@/lib/sanity/queries'
import Navigation from './Navigation'
import Link from 'next/link'
import Social from '@/ui/Social'
import { PortableText } from '@portabletext/react'
import Img from '../Img'

export default async function Footer() {
	const { title, copyright, logo } = await getSite()

	return (
		<section className="bg-yellow-600 text-center text-canvas">
			<div className="section py-0">
				<div className="mx-auto max-w-screen-xl space-y-0">
					<Navigation />
					<div className="flex justify-between items-center ">
						<div className="flex-1"></div>
						<Link className="h4 md:h3 py-3" href="/">
							<Img
								image={logo.image['default']}
								imageWidth={600}
								className="mx-auto"
								style={{ width: '150px' }}
							/>
						</Link>
						<Social className="flex-1 flex justify-end pt-4" />
					</div>
					{/* <div className="flex flex-wrap justify-left text-slate-800/50 text-[9px]">
						&copy; {new Date().getFullYear()}{' '}
						{copyright ? <PortableText value={copyright} /> : title}
					</div> */}
				</div>
			</div>
		</section>
	)
}
