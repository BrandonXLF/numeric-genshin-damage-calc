import { SVGProps } from "react";

export default function CalculatorSVG(props: SVGProps<SVGSVGElement>) {
	return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
		<path d="M 336 0 h -288 C 22.38 0 0 22.38 0 48 v 416 C 0 489.6 22.38 512 48 512 h 288 c 25.62 0 48 -22.38 48 -48 v -416 C 384 22.38 361.6 0 336 0 z M 64 208 C 64 199.2 71.2 192 80 192 h 32 C 120.8 192 128 199.2 128 208 v 32 C 128 248.8 120.8 256 112 256 h -32 C 71.2 256 64 248.8 64 240 V 208 z M 64 304 C 64 295.2 71.2 288 80 288 h 32 C 120.8 288 128 295.2 128 304 v 32 C 128 344.8 120.8 352 112 352 h -32 C 71.2 352 64 344.8 64 336 V 304 z M 224 432 c 0 8.8 -7.2 16 -16 16 h -128 C 71.2 448 64 440.8 64 432 v -32 C 64 391.2 71.2 384 80 384 h 128 c 8.8 0 16 7.2 16 16 V 432 z M 224 336 c 0 8.8 -7.2 16 -16 16 h -32 C 167.2 352 160 344.8 160 336 v -32 C 160 295.2 167.2 288 176 288 h 32 C 216.8 288 224 295.2 224 304 V 336 z M 224 240 C 224 248.8 216.8 256 208 256 h -32 C 167.2 256 160 248.8 160 240 v -32 C 160 199.2 167.2 192 176 192 h 32 C 216.8 192 224 199.2 224 208 V 240 z M 320 432 c 0 8.8 -7.2 16 -16 16 h -32 c -8.8 0 -16 -7.2 -16 -16 v -32 c 0 -8.8 7.2 -16 16 -16 h 32 c 8.8 0 16 7.2 16 16 V 432 z M 320 336 c 0 8.8 -7.2 16 -16 16 h -32 c -8.8 0 -16 -7.2 -16 -16 v -32 C 256 295.2 263.2 288 272 288 h 32 C 312.8 288 320 295.2 320 304 V 336 z M 320 240 C 320 248.8 312.8 256 304 256 h -32 C 263.2 256 256 248.8 256 240 v -32 C 256 199.2 263.2 192 272 192 h 32 C 312.8 192 320 199.2 320 208 V 240 z M 320 144 C 320 152.8 312.8 160 304 160 h -224 C 71.2 160 64 152.8 64 144 v -64 C 64 71.2 71.2 64 80 64 h 224 C 312.8 64 320 71.2 320 80 V 144 z" />
	</svg>;
}