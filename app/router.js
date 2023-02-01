import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('news');
  this.route('presse');
  this.route('referenzen');
  this.route('vita');
  this.route('unternehmen');
  this.route('bingo');
  this.route('imprint');
  this.route('privacy');
  this.route('wiederaufbau');
  this.route('akademie');
  this.route('beratung');
});
