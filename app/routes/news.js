import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service fastboot;
  @service instagram;

  async model() {
    if (this.fastboot.isFastBoot) {
      try {
        let posts = await this.instagram.getPosts();
        this.fastboot.shoebox.put('insta-posts', posts);
      } catch (error) {
        // ignore error
      }

      return { loading: true };
    }

    try {
      return { posts: await this.instagram.getPosts() };
    } catch (error) {
      return { error, posts: this.fastboot.shoebox.retrieve('insta-posts') };
    }
  }
}
