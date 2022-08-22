export enum RecordEntryTypes {
	Note = 'note',
	Number = 'number',
	Symbols = 'symbols',
	Function = 'function'
};

type RecordEntry = {
	value: string;
	type: RecordEntryTypes;
}

export default RecordEntry;