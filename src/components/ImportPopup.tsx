import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadSavedPopup.less';
import Column from "../utils/Column";
import PopupHeader from "./PopupHeader";
import ImportSVG from "../svgs/ImportSVG";
import ImportArea from "./ImportArea";

export default function ImportPopup(props: Readonly<{
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	const ref = React.useRef<PopupActions>(null);
	
	return <Popup trigger={
		<SVGButton svg={<ImportSVG />} label="Import" />
	} ref={ref} modal>
		<PopupHeader title="Import Stats" ref={ref} />
		<ImportArea setColumns={props.setColumns} />
	</Popup>
}