export default function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  plugin.installed = true;

  Vue.filter('n2br', (s) => s.replace(/\n/g, '<br>'));
};
