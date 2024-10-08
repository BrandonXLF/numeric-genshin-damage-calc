import React from "react";
import '../less/SVGButton.less';

type SVGButtonProps = {
	svg?: React.ReactNode;
	label: string;
	onClick?: () => any;
	hideLabel?: boolean;
	mini?: boolean;
	disabled?: boolean;
	title?: string;
	style?: React.CSSProperties;
};

export default React.forwardRef<HTMLButtonElement, SVGButtonProps>((props, ref) =>
	<button
		className={`svg-button${props.mini ? ' svg-button-mini' : ''}`}
		disabled={props.disabled}
		type="button"
		onClick={() => !props.disabled && props.onClick?.()}
		aria-label={props.label}
		title={props.title ?? (props.hideLabel ? props.label : undefined)}
		ref={ref}
		style={props.style}
	>
		{props?.svg}{
			props.hideLabel ? '' : <> <span>{props.label}</span></>
		}
	</button>
);