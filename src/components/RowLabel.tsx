import { ReactElement } from "react";
import Popup from "reactjs-popup";
import '../less/RowLabel.less';

export default function RowLabel(props: {
	label: string | ReactElement;
	desc?: string | ReactElement;
	icon?: ReactElement;
}) {
	return <div className="row-label">
		<span className="label-icon">{props.icon}</span>
		{props.desc
			? <><Popup
				trigger={<span className="label-text has-desc">{props.label}</span>}
				position={['top center', 'bottom center', 'top right']}
				on={['hover', 'focus']}
				arrow={true}
			>
				{props.desc}
			</Popup> </>
			: <span className="label-text">{props.label}</span>
		}
	</div>;
}