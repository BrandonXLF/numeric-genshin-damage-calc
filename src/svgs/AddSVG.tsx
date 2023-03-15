import { SVGProps } from "react";

export default function AddSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
		<path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M 2 8 L 14 8 M 8 2 L 8 14" />
	</svg>;
}