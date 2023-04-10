/* eslint-disable */
export default {
	displayName: 'data-api',
	// preset: '../../jest.preset.js',
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
};
