import { ReactElement } from "react";
import Popup from "reactjs-popup";

export default function RowLabel(props: {
	label: string | ReactElement;
	desc?: string | ReactElement;
}) {
	return <div className="vertical-align">
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