import Img, { Source } from '@/ui/Img'
import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Border from "@/lib/bottomborder3.png"
import Image from 'next/image'

export default function Hero({
	pretitle,
	content,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	return (
		<section
			className={cn(
				hasImage &&
					'top-0 grid bg-ink text-canvas *:col-span-full *:row-span-full relative',
			)}
		>
			{bgImage && (
				<>
					<picture>
						<Source image={bgImageMobile} imageWidth={1200} />
						<Img
							className="size-full max-h-fold object-cover brightness-50"
							image={bgImage}
							imageWidth={1800}
							draggable={false}
						/>
					</picture>
				</>
			)}

			{content && (
				<div className="section flex w-full flex-col">
					<div
						className={cn(
							'richtext relative max-w-xl [&_:is(h1,h2)]:text-balance',
							bgImage?.asset && 'text-shadow',
							{
								'mb-8 mt-10': stegaClean(alignItems) === 'start',
								'my-auto': stegaClean(alignItems) === 'center',
								'mt-auto': stegaClean(alignItems) === 'end',
							},
							{
								'mr-auto': stegaClean(textAlign) === 'left',
								'mx-auto': stegaClean(textAlign) === 'center',
								'ml-auto': stegaClean(textAlign) === 'right',
							},
						)}
						style={{ textAlign: stegaClean(textAlign) }}
					>
						<Pretitle
							className={cn(hasImage && 'animate-slide-in-left no-technical font-dancing')}
						>
							{pretitle}
						</Pretitle>
						<div className="animate-slide-in-left text-canvas">
							<PortableText value={content} />
						</div>
						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
						/>
					</div>
				</div>
			)}

			{bgImage && (
				<div className="absolute bottom-0 left-0 right-0">
					<Image src={Border} alt="Bottom Border" layout="responsive" width={150} height={50} />
				</div>
			)}
		</section>
	)
}
