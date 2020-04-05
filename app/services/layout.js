import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LayoutService extends Service {
  @tracked wide = false;
}
