import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadColumnsPopup.less';
import LoadSVG from "../svgs/LoadSVG";
import Group from "../utils/Group";
import PopupHeader from "./PopupHeader";
import GroupListUtils from "../utils/GroupListUtils";

export default function LoadColumnsPopup(props: {
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
	closedGroups: Group[];
	setClosedGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	useEffect(() => {
		if (ref.current && !props.closedGroups.length)
			ref.current.close();
	});
	
	return <Popup trigger={
		<SVGButton
			svg={<LoadSVG />}
			label="Load Saved"
			disabled={!props.closedGroups.length}
		/>
	} ref={ref} modal>
		<PopupHeader title="Load Columns" ref={ref} />
		<div className="load-columns">
			{props.closedGroups.map((group, i) => <div key={i}>
				<SVGButton
					label={group.first.label || `Saved Column ${i + 1}`}
					onClick={() => {
						let chosenGroup = props.closedGroups[i];

						props.setGroups(columns => GroupListUtils.transfer(columns, chosenGroup));
						props.setClosedGroups(closedColumns => GroupListUtils.remove(closedColumns, chosenGroup));
					}}
				/>
			</div>)}
		</div>
	</Popup>
}