import withParams from 'vuelidate/lib/withParams';
import { req } from 'vuelidate/lib/validators/common';

export const date = withParams({ type: 'date' }, (value) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/;

  if (value == null || !value.length) {
    return true;
  }

  if (!regex.test(value)) {
    return false;
  }

  return true;
});

export function minNumber(min) {
  return withParams({ type: 'minNumber', min }, (value) => {
    return !req(value) || parseFloat(value) >= min;
  });
};
