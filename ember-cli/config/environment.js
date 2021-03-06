/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'project-andrzej-swaton-cli',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_SERVER_URL: 'http://localhost:3000'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_SERVER_URL = 'http://toptalbackend-57350.onmodulus.net';//TODO
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token'
  };

  ENV['ember-simple-auth-token'] = {
    identificationField: 'identification',
    serverTokenEndpoint: ENV.APP.API_SERVER_URL + '/api/token-auth/',
    serverTokenRefreshEndpoint: ENV.APP.API_SERVER_URL + '/api/token-refresh/',
    timeFactor: 1000,
    refreshLeeway: 24 * 60 * 60, //24 hrs before expiration
  }

  return ENV;
};
