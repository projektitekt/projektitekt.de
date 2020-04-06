import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service fastboot;
  @service instagram;

  async model() {
    try {
      if (this.fastboot.isFastBoot) {
        return { loading: true };
      } else {
        return { posts: await this.instagram.getPosts() };
      }
    } catch (error) {
      return { error };
    }
  }
}
