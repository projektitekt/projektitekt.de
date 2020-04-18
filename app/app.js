import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

import * as Sentry from '@sentry/browser'
import { Ember as EmberIntegration } from '@sentry/integrations/esm/ember';

import config from './config/environment';

if (config.environment === 'production') {
  Sentry.init({
    dsn: 'https://45bb93af3b9f4070986722f65d768302@o379737.ingest.sentry.io/5204937',
    integrations: [new EmberIntegration()]
  });
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
