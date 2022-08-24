import { ReactElement } from 'react';
import '../css/FormInput.css';

export default function FormInput(props: {
	children: React.ReactNode,
	frontIcon?: ReactElement | boolean,
	frontIconLabel?: string;
	backIcon?: ReactElement | boolean,
	backIconLabel?: string;
}) {
	return <div className="form-input">
		{props.frontIcon &&
			<div className="input-icon" role="img" title={props.frontIconLabel}>{props.frontIcon}</div>
		}
		{props.children}
		{props.backIcon &&
			<div className="input-icon" role="img" title={props.backIconLabel}>{props.backIcon}</div>
		}
	</div>;
};