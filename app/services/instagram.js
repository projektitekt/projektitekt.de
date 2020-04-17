import Service from '@ember/service';
import fetch from 'fetch';

let FIVE_MINUTES = 5 * 60 * 1000;

export default class extends Service {
  lastResponse = null;
  lastResponseTime = null;

  async getPosts() {
    if (this.lastResponseTime === null || Date.now() - this.lastResponseTime > FIVE_MINUTES) {
      this.lastResponse = await this.loadPosts();
      this.lastResponseTime = Date.now();
    }
    return this.lastResponse;
  }

  async loadPosts() {
    let response = await fetch('https://www.instagram.com/projektitekt.de/?__a=1');
    let { graphql: { user } } = await response.json();
    return user.edge_owner_to_timeline_media.edges.map(it => {
      let { node } = it;
      let id = node.shortcode;
      let src = node.thumbnail_src;
      let alt = node.accessibility_caption;
      let date = node.taken_at_timestamp * 1000;
      let { edge_media_to_caption: { edges: captionEdges } } = node;
      let caption = captionEdges[0].node.text;
      return { id, caption, src, alt, date }
    });
  }
}
