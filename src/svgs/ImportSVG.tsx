import { SVGProps } from "react";

export default function ImportSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
		<path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8" />
		<path d="M3 10h18" />
		<path d="M10 3v18" />
		<path d="M19 22v-6" />
		<path d="M22 19l-3 -3l-3 3" />
	</svg>;
}