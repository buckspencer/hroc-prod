// import { GoogleTagManager } from '@next/third-parties/google'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import '@/styles/app.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: `https://fav.farm/⛪`,
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/* <GoogleTagManager gtmId='' /> */}
			<head>
				<script
					id="mcjs"
					dangerouslySetInnerHTML={{
						__html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/ded5162816efa4487ce6d0267/e4f276efe9b25cc9ce3ce67f2.js");`,
					}}
				/>
			</head>
			<body className="pattern-clouds-red-200/10 font-lora text-ink">
				<SkipToContent />
				<Announcement />
				<Header />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer />

				{draftMode().isEnabled && <VisualEditing />}
			</body>
		</html>
	)
}
