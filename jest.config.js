module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  }
}
