// @flow

import * as types from './types';

export function setLang({ commit }: ArgCommit, lang: string) {
  commit(types.SET_LANG, lang);
};
