import { SVGProps, useId } from "react";

const bases = {
	damage: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 8.49 1.89 l -0.84 0.84 a 0.26 0.26 90 0 0 0 0.37 l 0.96 0.96 l -8.16 8.16 a 0.52 0.52 90 0 0 -0.15 0.36 a 24.33 24.33 90 0 0 -0.27 3.37 a 24.5 24.5 90 0 0 3.37 -0.27 a 0.52 0.52 90 0 0 0.36 -0.15 l 8.16 -8.16 l 0.97 0.97 a 0.26 0.26 90 0 0 0.37 0 l 0.82 -0.85 a 0.26 0.26 90 0 0 0 -0.37 l -1.88 -1.88 l 2.2 -2.2 h 1.28 a 0.26 0.26 90 0 0 0.26 -0.26 v -2.48 a 0.26 0.26 90 0 0 -0.26 -0.26 h -2.48 a 0.26 0.26 90 0 0 -0.26 0.26 v 1.27 l -2.2 2.2 l -1.88 -1.88 a 0.26 0.26 90 0 0 -0.37 0 z"
	/>,
	em: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 9.23 9.32 l -0.02 -0.06 A 4.95 4.95 90 0 0 8.34 7.77 a 5.06 5.06 90 0 0 -0.37 -0.4 A 2.41 2.41 90 1 0 8 2.54 a 2.45 2.45 90 0 0 -2.1 3.63 a 5 5 90 0 0 -1.37 -0.19 a 5.05 5.05 90 0 0 -0.86 0.08 l -0.04 0.01 C 2.1 -0.27 12.23 -1.91 12.53 4.96 a 4.55 4.55 90 0 1 -3.3 4.35 z m 4.19 -2.44 a 4.51 4.51 90 0 0 -0.72 -0.27 a 5.11 5.11 90 0 1 -1.26 1.94 h 0.04 a 2.41 2.41 90 1 1 -2.41 2.41 a 4.67 4.67 90 0 0 -0.03 -0.51 a 4.53 4.53 90 0 0 -2.13 -3.35 l -0.22 -0.13 a 4.53 4.53 90 1 0 0.74 7.47 c 0.09 -0.08 0.18 -0.16 0.27 -0.24 L 7.66 14.16 a 4.99 4.99 90 0 1 -1.02 -2.02 a 2.41 2.41 90 1 1 -1.01 -3.33 q 0.11 0.06 0.22 0.13 a 2.41 2.41 90 0 1 1.08 1.7 a 2.47 2.47 90 0 1 0.02 0.32 a 4.53 4.53 90 1 0 6.47 -4.09 z"
	/>,
	enemy: (props?: SVGProps<SVGGElement>) => <g {...props}>
		<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M 8 9.14 c 8 -2.29 4.57 -5.71 4 -6.86 M 8 9.14 c -8 -2.29 -4.57 -5.71 -4 -6.86" />
		<path strokeWidth="2" stroke="currentColor" d="M 5.14 9.14 a 4 2.86 90 1 1 0 0.0001" />
	</g>,
	shield: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="M 15.36 0.83 a 0.33 0.33 90 0 0 -0.2 -0.31 C 14.7 0.33 13.15 0 8 0 S 1.31 0.33 0.84 0.52 a 0.33 0.33 90 0 0 -0.2 0.31 v 8.5 a 0.99 0.99 90 0 0 0.14 0.52 c 1.8 2.97 6.11 5.55 7.04 6.1 a 0.33 0.33 90 0 0 0.34 0 c 0.9 -0.55 5.21 -3.07 7.05 -6.1 a 0.99 0.99 90 0 0 0.15 -0.52 z"
	/>,
	percent: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 10.58 1 h 3.52 q 0.22 0.08 0.16 0.26 q -8.57 11.94 -10.14 13.88 q -0.09 0.2 -0.38 0.16 h -2.26 q -0.4 0 -0.47 -0.22 q 8.85 -11.85 9.47 -13.03 q 0.1 -0.14 0.1 -0.33 q 0 -0.2 -0.24 -0.57 q 0.04 -0.16 0.24 -0.16 z m -6.9 -0.25 a 1.15 1.05 90 0 0 0 7.17 v -1.1 a 1.15 0.61 90 0 1 0 -4.94 z a 1.1 1.05 90 0 1 0 7.17 v -1.1 a 1.1 0.61 90 0 0 0 -4.94 z m 8.65 6.85 a 1.15 1.05 90 0 0 0 7.17 v -1.1 a 1.1 0.61 90 0 1 0 -4.94 z a 1.15 1.05 90 0 1 0 7.17 v -1.1 a 1.1 0.61 90 0 0 0 -4.94 z"
	/>,
	stats: (props?: SVGProps<SVGPathElement>) => <g {...props}>
		<g transform="scale(0.45) translate(1 0)">{bases.damage()}</g>
		<g transform="scale(0.45) translate(18 0)">{bases.hp()}</g>
		<g transform="scale(0.45) translate(0 19)">{bases.def()}</g>
		<g transform="scale(0.45) translate(18 18)">{bases.em()}</g>
	</g>,
	hp: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="M 4.2319 8.7113 a 1.097 1.097 90 0 1 0.4947 -0.6238 c 1.6993 -0.968 4.0225 2.3662 7.3352 0.6023 c 2.1726 6.8189 -9.9595 7.0125 -7.8299 0.0215 z m 3.915 7.12 c -3.7859 0 -7.5718 -2.7104 -5.7649 -8.1311 a 20.7794 20.7794 90 0 1 5.2916 -7.3136 a 0.8389 0.8389 90 0 1 0.4732 -0.2581 a 0.8389 0.8389 90 0 1 0.4947 0.2581 a 20.7794 20.7794 90 0 1 5.2701 7.3136 c 1.8069 5.4207 -1.979 8.1311 -5.7649 8.1311 z m 0.2581 -13.6593 a 0.7099 0.7099 90 0 0 -0.2581 -0.086 a 0.7314 0.7314 90 0 0 -0.2366 0.086 c -1.9145 1.4842 -4.5818 5.9154 -4.4312 8.2816 a 4.4957 4.4957 90 0 0 4.6678 3.9795 a 4.4957 4.4957 90 0 0 4.6678 -3.958 c 0.1506 -2.3877 -2.4952 -6.8189 -4.4097 -8.3031 z"
	/>,
	def: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="M 15.1723 0.9848 a 0.3201 0.3201 90 0 0 -0.1921 -0.2988 c -0.4481 -0.1921 -1.9633 -0.5122 -6.9782 -0.5122 c -4.9936 0 -6.5087 0.3201 -6.9568 0.5122 a 0.3201 0.3201 90 0 0 -0.1921 0.2988 v 8.2799 a 0.9603 0.9603 90 0 0 0.1494 0.5122 c 1.7499 2.8809 5.9539 5.399 6.8501 5.9325 a 0.3201 0.3201 90 0 0 0.3414 0 c 0.8749 -0.5335 5.0789 -2.9876 6.8501 -5.9325 a 0.9603 0.9603 90 0 0 0.128 -0.5122 z m -7.1702 12.5052 c 0.064 0 -3.9479 -2.2407 -5.3563 -4.8655 v -6.7221 c 0 0 0 -0.5122 5.3563 -0.5122 z"
	/>,
	character: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="M 7.5 8 c 2.21 0 4 -1.79 4 -4 S 9.71 0 7.5 0 S 3.5 1.79 3.5 4 s 1.79 4 4 4 z m -1.43 1.5 C 3 9.5 0.5 12 0.5 15.07 C 0.5 15.58 0.92 16 1.43 16 H 13.57 c 0.51 0 0.93 -0.42 0.93 -0.93 C 14.5 12 12 9.5 8.93 9.5 H 6.07 z"
	/>,
	critRate: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 16 0 l -7.71 4 l -6.04 -2.33 l 1.75 5.46 l -4 8.87 l 8.29 -4 l 5.46 1.75 l -1.75 -5.46 z m -3.7 3.7 l -2.15 4.46 l 0.94 2.93 l -2.93 -0.94 l -4.46 2.15 l 2.15 -4.77 l -0.94 -2.93 l 3.25 1.25 z"
	/>,
	critDmg: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 0 16 l 4 -8.87 l -1.75 -5.45 l 6.04 2.33 l 7.71 -4 l -4 8.29 l 1.75 5.45 l -5.45 -1.75 l -8.29 4"
	/>
};

const indicators = {
	decrease: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 11.99 15.97 l -3.98 -2.66 v -2.83 l 3.98 2.66 l 3.98 -2.66 v 2.83 z m 0 -3.89 l -3.99 -2.66 v -2.83 l 3.98 2.66 l 3.98 -2.66 v 2.83 z"
	/>,
	increase: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 11.99 6.59 l -3.98 2.66 v 2.83 l 3.98 -2.66 l 3.98 2.66 v -2.83 z m 0 3.89 l -3.98 2.66 v 2.83 l 3.98 -2.66 l 3.98 2.66 v -2.83 z"
	/>,
	percent: (props?: SVGProps<SVGPathElement>) => <path
		{...props}
		d="m 12.67 6.64 h 2.29 q 0.14 0.05 0.1 0.17 q -5.57 7.76 -6.59 9.02 q -0.06 0.13 -0.25 0.1 h -1.47 q -0.26 0 -0.31 -0.14 q 5.75 -7.7 6.16 -8.47 q 0.07 -0.09 0.07 -0.21 q 0 -0.13 -0.16 -0.37 q 0.03 -0.1 0.16 -0.1 z m -4.49 -0.16 a 0.75 0.68 90 0 0 0 4.66 v -0.72 a 0.75 0.4 90 0 1 0 -3.21 z a 0.71 0.68 90 0 1 0 4.66 v -0.72 a 0.72 0.4 90 0 0 0 -3.21 z m 5.62 4.45 a 0.75 0.68 90 0 0 0 4.66 v -0.72 a 0.72 0.4 90 0 1 0 -3.21 z a 0.75 0.68 90 0 1 0 4.66 v -0.72 a 0.72 0.4 90 0 0 0 -3.21"
	/>
};

const masks = {
	enemySmall: (props?: SVGProps<SVGGElement>) => <g {...props}>
		<path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M 8 9.14 c 8 -2.29 4.57 -5.71 4 -6.86 M 8 9.14 c -8 -2.29 -4.57 -5.71 -4 -6.86" />
		<path strokeWidth="2" stroke="currentColor" d="M 5.14 9.14 a 4 2.86 90 1 1 0 0.0001" />
	</g>
};

export default function StatIcon(props: {
	base: keyof typeof bases;
	mask?: keyof typeof masks;
	indicator?: keyof typeof indicators;
}) {
	let maskID = useId();
	let hasMask = Boolean(props.indicator || props.mask);
	
	return <svg viewBox="0 0 16 16" fill="currentColor">
		{bases[props.base](hasMask ? { mask: `url(#${maskID})` } : undefined)}
		{hasMask && <mask id={maskID}>
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			{props.indicator && indicators[props.indicator]({
				fill: 'black',
				stroke: 'black',
				strokeWidth: '3',
				strokeLinejoin: 'round',
				strokeLinecap: 'round'
			})}
			{props.mask && masks[props.mask]({
				color: 'black'
			})}
		</mask>}
		{props.indicator && indicators[props.indicator]()}
	</svg>;
}