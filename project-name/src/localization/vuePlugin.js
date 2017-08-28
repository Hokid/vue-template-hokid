// @flow
import Store from '@/store';
import link from './components/link';
import { prependLang } from './';

const $locale = {
  // Преобразует обычное ссылку на страницу, подставляее текущий язык
  path (path: string): string {
    return prependLang(path);
  }
};

export default function plugin(Vue: any) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.$locale = $locale;

  Object.defineProperties(Vue.prototype, ({
    $locale: {
      get() {
        return $locale;
      }
    }
  }: Object));

  Vue.component('locale-link', link);
};
