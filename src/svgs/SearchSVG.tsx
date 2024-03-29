import { SVGProps } from "react";

export default function SearchSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round">
		<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
		<path d="M21 21l-6 -6"></path>
	</svg>;
}