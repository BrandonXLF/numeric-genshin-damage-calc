import { SVGProps } from "react";

export default function SaveSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round">
		<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
		<path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
		<path d="M14 4l0 4l-6 0l0 -4"></path>
	</svg>;
}