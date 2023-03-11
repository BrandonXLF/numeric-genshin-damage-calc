export enum RecordEntryTypes {
	Note = 'note',
	Number = 'number',
	Symbols = 'symbols',
	Function = 'function'
};

type RecordEntry = {
	value: React.ReactNode;
	type: RecordEntryTypes;
}

export default RecordEntry;