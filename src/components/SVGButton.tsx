import React, { ReactElement } from "react";
import '../css/SVGButton.css';

type SVGButtonProps = {
	svg?: ReactElement;
	label: string;
	onClick?: () => any;
	hideLabel?: boolean;
	mini?: boolean;
	disabled?: boolean;
};

const SVGButton = React.forwardRef<HTMLButtonElement, SVGButtonProps>((props, ref) =>
	<button
		className={`svg-button${props.mini ? ' svg-button-mini' : ''}`}
		disabled={props.disabled}
		type="button"
		onClick={() => !props.disabled && props.onClick?.()}
		aria-label={props.label}
		title={props.hideLabel ? props.label : ''}
		ref={ref}
	>
		{props?.svg}{props.hideLabel ? '' : <> <span>{props.label}</span></>}
	</button>
);

export default SVGButton;