// @flow
import * as types from './types';

export default {
  [types.SET_LANG] (state: any, lang: string) {
    state.lang = lang;
  }
};
