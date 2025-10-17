import Date from '@/ui/Date'
import Categories from './Categories'
import ReadTime from './ReadTime'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '../RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './Post.module.css'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article>
			<header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-4">
					<Date value={post.publishDate} />
					<Categories categories={post.categories} />
					{post.showReadTime && <ReadTime value={post.readTime} />}
				</div>
			</header>

			<div className="section">
				{/* <aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-[250px]">
					<TableOfContents headings={post.headings} />
				</aside> */}

				<Content
					value={post.body}
					className={cn(css.body, 'mx-auto max-w-4xl')}
				/>
			</div>
		</article>
	)
}
