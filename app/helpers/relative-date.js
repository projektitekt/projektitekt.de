import { helper } from '@ember/component/helper';

import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

export default helper(function relativeDate([date]) {
  return formatDistanceToNow(date, { locale: de, addSuffix: true });
});
