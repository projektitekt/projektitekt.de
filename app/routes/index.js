import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service layout;

  model() {
    return this.store.findRecord('content', '_index');
  }

  activate() {
    this.layout.wide = true;
  }

  deactivate() {
    this.layout.wide = false;
  }
}
