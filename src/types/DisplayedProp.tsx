type DisplayedProp<T> = {
	name: string;
	desc?: React.ReactNode;
	prop: keyof T;
};

export default DisplayedProp;