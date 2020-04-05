import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class Application extends Route {
  @service pageProgress;

  @action loading(transition) {
    let { pageProgress } = this;

    pageProgress.start(transition.targetName);

    transition.promise.finally(() => {
      pageProgress.done();
    });

    return true;
  }
}
