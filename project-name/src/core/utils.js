import { isUndefined } from 'lodash';

export function softMerge (dest, source) {
  return Object.keys(dest).reduce(function (dest, key) {
    var sourceVal = source[key];

    if (isUndefined(sourceVal)) {
      dest[key] = sourceVal;
    }

    return dest;
  }, dest);
};
