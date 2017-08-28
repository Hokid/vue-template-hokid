import api from './index';

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.$api = api;

  Object.defineProperties(Vue.prototype, {

    $api: {
      get() {
        return api;
      }
    }
  });
};
