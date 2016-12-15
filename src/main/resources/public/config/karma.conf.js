module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js');
  config.set({

    basePath: '',
    frameworks: ['jasmine', 'sinon', 'source-map-support'],
    exclude: [],

    files: [
      'node_modules/systemjs/dist/system.src.js',
      'coffee/stomp.js',
      // 'node_modules/karma-coverage/lib/index.js',
      // 'coffee/stomp-node.js',
      'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
      //  'node_modules/karma-jasmine-sinon/index.js',
      'node_modules/sinon/pkg/sinon.js',
      'js/sockjs-0.3.4.js',
      //      'coffee/websocket.mock.js',
      //    'coffee/server.mock.js',
      {
        pattern: 'systemjs.config.js',
        included: false,
        watched: false
      },
      {
        pattern: './config/spec-bundle.js',
        watched: false
      },
    //  { pattern: './app/*.ts', included: false, watched: false },
     // { pattern: './app/*.js.map', included: false, watched: false },
     // { pattern: './app/*.js', included: false, watched: false }
    //  './app/*.ts',
    // './app/*.spec.ts',
    // './app/domain/*.ts',
    //'./app/*.js',
    // './app/domain/*.js',
    //  './templates/*.html'
    ],

    preprocessors: {
      './config/spec-bundle.js': ['webpack', 'sourcemap'],
     // './app/*.ts': ['webpack', 'coverage', 'sourcemap'],
      './app/!*.js': ['webpack', 'coverage', 'sourcemap'],
      './app/!*.js.map': ['webpack', 'coverage', 'sourcemap']
    },
    webpack: testWebpackConfig,
    webpackServer: {
      noInfo: true
    },
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": "base/app/"

    },
    reporters: ['mocha', 'coverage', "karma-remap-istanbul"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome'],
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      includeAllSources: true,
      reports: {
        lcovonly: 'coverage/lcov.info',
        html: 'coverage/html',
        'text': null
      },
      timeoutNotCreated: 1000, // default value
      timeoutNoMoreFiles: 1000 // default value
    },

    coverageReporter: {
      dir: 'coverage/',
      includeAllSources: true,
      reporters: [

        {
          type: 'json',
          dir: 'coverage',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },

    singleRun: true
  });
};
