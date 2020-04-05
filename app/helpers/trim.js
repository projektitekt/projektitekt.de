import { helper } from '@ember/component/helper';

export default helper(function trim([content], { characters = 300 }) {
  if (content.length <= characters) {
    return content;
  }

  return content.slice(0, characters) + '…';
});
