import SVGButton from "./SVGButton";
import CloseSVG from "../svgs/CloseSVG";
import { PopupActions } from "reactjs-popup/dist/types";
import "../less/PopupHeader.less";
import React, { RefObject } from "react";

type PopupHederProps = {
	title: string;
};

export default React.forwardRef<PopupActions, PopupHederProps>((props, ref) =>
	<div className="popup-header">
		<h2>{props.title}</h2>
		<SVGButton
			svg={<CloseSVG className="neg" />}
			label="Close"
			hideLabel={true}
			onClick={() => (ref as RefObject<PopupActions>).current?.close()}
		/>
	</div>
);