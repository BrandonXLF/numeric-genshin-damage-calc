import { SVGProps } from "react";

export default function SyncSVG(props: { noSync?: boolean; } & SVGProps<SVGSVGElement>) {
    const domProps = {...props};
    delete domProps.noSync;

    return <svg {...domProps} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
        {props.noSync && <path d="M3 3l18 18"></path>}
    </svg>
}