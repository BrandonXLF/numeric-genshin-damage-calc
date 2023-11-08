import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadColumnsPopup.less';
import Group from "../utils/Group";
import PopupHeader from "./PopupHeader";
import ImportSVG from "../svgs/ImportSVG";
import ImportArea from "./ImportArea";

export default function ImportPopup(props: {
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	return <Popup trigger={
		<SVGButton svg={<ImportSVG />} label="Import" />
	} ref={ref} modal>
		<PopupHeader title="Import Stats" ref={ref} />
		<ImportArea setGroups={props.setGroups} />
	</Popup>
}