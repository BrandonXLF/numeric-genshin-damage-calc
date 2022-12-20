import { ReactElement } from "react";

type DisplayedProp<T> = {
	name: string;
	desc?: string | ReactElement;
	prop: keyof T;
};

export default DisplayedProp;