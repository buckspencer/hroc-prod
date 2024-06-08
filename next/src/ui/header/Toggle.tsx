export default function Toggle() {
	const hamburger = (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="3" y="6" width="18" height="2" fill="currentColor" />
			<rect x="3" y="11" width="18" height="2" fill="currentColor" />
			<rect x="3" y="16" width="18" height="2" fill="currentColor" />
		</svg>
	)

	return (
		<label className="pr-10 [grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">{hamburger}</span>
			<span className="header-open:hidden">{hamburger}</span>
		</label>
	)
}
