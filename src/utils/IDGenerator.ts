export default class IDGenerator {
	private static id = 0;
	
	static generate() {
		return IDGenerator.id++;
	}
}