import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return this.store.findRecord('content', '_index');
  }
}
