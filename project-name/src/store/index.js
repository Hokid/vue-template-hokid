// @flow
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions';
import mutations from './mutations';
import client from './modules/client';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lang: process.env.DEFAULT_LANG
  },
  actions,
  mutations,
  modules: {
    client
  },
  // #client: брать token из cookie
  plugins: [createPersistedState({
    key: 'store',
    paths: [
      'lang',
      'client.token'
    ]
  })]
});

export default store;
