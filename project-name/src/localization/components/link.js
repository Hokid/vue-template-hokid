// @flow
// Компонент - обертка для компонета router-link, приносящий поддержку авто-подстановки текущего языка в ссылки
import { mapState } from 'vuex';

const toTypes: Array<Function> = [String, Object]
const pathRegExpt = /\{.*path\s*:['"](?=,.*['"])}/;

export default {
  name: 'locale-link',
  props: {
    to: {
      type: toTypes,
      required: true
    }
  },
  computed: mapState(['lang']),
  render(h: Function) {
    let to = this.to;

    // обрабатываем :to="{path: 'path'}", v-bind:
    if (typeof to === 'object') {
      if (to.path !== undefined) {
        to = { ...to };
        to.path = '/' + this.lang + to.path;
      }
      // обычное to="/path"
    } else {
      to = '/' + this.lang + to;
    }

    return h('router-link', { props: { to } }, this.$slots.default);
  }
};
