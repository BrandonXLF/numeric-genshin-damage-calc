import '../css/FormInput.css';

export default function FormInput(props: {
	children: React.ReactNode,
	frontIcon?: React.ReactNode | boolean,
	frontIconLabel?: string;
	backIcon?: React.ReactNode | boolean,
	backIconLabel?: string;
	after?: React.ReactNode;
}) {
	return <div className="form-input">
		{props.frontIcon &&
			<div className="input-icon" role="img" title={props.frontIconLabel}>{props.frontIcon}</div>
		}
		{props.children}
		{props.backIcon && <>
			<div className="input-icon" role="img" title={props.backIconLabel}>{props.backIcon}</div>{props.after}
		</>}
	</div>;
};