import Model, { attr } from '@ember-data/model';

export default class ContentModel extends Model {
  @attr title;
  @attr html;
}
