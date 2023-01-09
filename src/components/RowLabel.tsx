import { ReactElement } from "react";
import Popup from "reactjs-popup";
import '../css/RowLabel.css';

export default function RowLabel(props: {
	label: string | ReactElement;
	desc?: string | ReactElement;
	icon?: ReactElement;
}) {
	return <div className="row-label">
		<span className="label-icon">{props.icon}</span>
		{props.desc
			? <><Popup
				trigger={<span className="has-desc">{props.label}</span>}
				position={['top center', 'bottom center', 'top right']}
				on={['hover', 'focus']}
				arrow={true}
			>
				{props.desc}
			</Popup> </>
			: <span>{props.label}</span>
		}
	</div>;
}