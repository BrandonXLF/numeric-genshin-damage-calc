export type SingleOption = {
	name: string;
	value?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
};

type SelectOption = SingleOption | {
	label: string;
	options: SingleOption[];
};

export default SelectOption;