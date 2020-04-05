import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper(function html([content]) {
  return htmlSafe(content.replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http'));
});
