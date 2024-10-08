import type { Config } from "jest";

const config: Config = {
	testEnvironment: 'node',
	moduleNameMapper: {
		'csv-stringify/browser/esm/sync': '<rootDir>/node_modules/csv-stringify/dist/cjs/sync.cjs',
		'csv-parse/browser/esm/sync': '<rootDir>/node_modules/csv-parse/dist/cjs/sync.cjs'
	},
	transformIgnorePatterns: []
};

export default config;