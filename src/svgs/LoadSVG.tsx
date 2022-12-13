import { SVGProps } from "react";

export default function LoadSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none">
		<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
		<polyline points="7 9 12 4 17 9"></polyline>
		<line x1="12" y1="4" x2="12" y2="16"></line>
	</svg>;
}