module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/test/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-firebase)/)', // Allow transformations for certain modules
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS modules
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub', // Mock image files
  },
};
