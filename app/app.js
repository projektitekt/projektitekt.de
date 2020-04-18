import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

import * as Sentry from '@sentry/browser'
import { Ember as EmberIntegration } from '@sentry/integrations/esm/ember';

import config from './config/environment';

if (config.sentry.enabled) {
  Sentry.init({
    ...config.sentry,
    integrations: [new EmberIntegration()]
  });
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
