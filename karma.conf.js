// Karma configuration for Distribuidora Gas El Volcán (DSY1104)
export default function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.js', type: 'module' },
      { pattern: 'tests/specs/**/*.spec.js', type: 'module' }
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
