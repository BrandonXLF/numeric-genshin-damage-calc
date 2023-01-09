import { SVGProps } from "react";

export default function CloseSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
		<path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M 2 2 L 14 14 M 14 2 L 2 14" />
	</svg>;
}