import { getSite } from '@/lib/sanity/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'
import Img from '../Img'

export default async function Header() {
	const { title, ctas, logo } = await getSite()

	return (
		<Wrapper className="sticky top-0 z-10 bg-slate-500/90 py-2 max-md:header-open:shadow-lg">
			<div
				className={cn(
					css.header,
					'mx-auto grid max-w-screen-xl items-center gap-x-6',
				)}
			>
				<div className="pl-5 [grid-area:logo]">
					<Link className="h4 md:h3" href="/">
						<Img image={logo.image['dark']} imageWidth={200}></Img>
					</Link>
				</div>

				<CTAList
					ctas={ctas}
					className="text-xl [grid-area:ctas] max-md:*:w-full max-md:header-closed:hidden md:ml-auto"
				/>

				<Navigation />

				<Toggle />
			</div>
		</Wrapper>
	)
}
