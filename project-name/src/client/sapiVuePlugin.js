import api from './sapi';

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.$sapi = api;

  Object.defineProperties(Vue.prototype, {

    $sapi: {
      get() {
        return api;
      }
    }
  });
};
