import { SVGProps } from "react";

export default function DeleteSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
		<line x1="4" y1="7" x2="20" y2="7"></line>
		<line x1="10" y1="11" x2="10" y2="17"></line>
		<line x1="14" y1="11" x2="14" y2="17"></line>
		<path d="M 5 7 l 1 12 a 2 2 0 0 0 2 2 h 8 a 2 2 0 0 0 2 -2 l 1 -12"/>
		<path d="M 9 7 v -3 a 1 1 0 0 1 1 -1 h 4 a 1 1 0 0 1 1 1 v 3"/>
	</svg>;
}