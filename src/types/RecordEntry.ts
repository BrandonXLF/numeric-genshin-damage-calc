export enum RecordEntryTypes {
	Note = 'note',
	Value = 'value',
	Mathematical = 'math'
};

type RecordEntry = {
	value: React.ReactNode;
	type: RecordEntryTypes;
}

export default RecordEntry;