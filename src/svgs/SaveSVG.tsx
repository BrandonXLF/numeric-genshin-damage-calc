import { SVGProps } from "react";

export default function SaveSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round">
		<path d="M 4 17 V 19 A 2 2 0 0 0 6 21 H 18 A 2 2 0 0 0 20 19 V 17"/>
		<polyline points="7 11 12 16 17 11"></polyline>
		<line x1="12" y1="4" x2="12" y2="16"></line>
	</svg>;
}