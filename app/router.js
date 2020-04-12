import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('news');
  this.route('referenzen');
  this.route('unternehmen');
  this.route('bingo');
  this.route('imprint');
  this.route('privacy');
});
