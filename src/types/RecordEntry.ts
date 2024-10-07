export enum RecordEntryType {
	Note = 'note',
	Value = 'value',
	Mathematical = 'math'
};

type RecordEntry = {
	value: React.ReactNode;
	type: RecordEntryType;
}

export default RecordEntry;