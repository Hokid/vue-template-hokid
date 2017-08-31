// @flow
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Store from '@/store';
import GlobalEvents from '@/core/events';
import localizationMixin from './vueMixin';
import localizationPlugin from './vuePlugin';
import { log } from '@/core/handlers';

const JOINED_LANGS = process.env.ALLOWED_LANGS.join('|');
const MATCH_LANG_IN_PATH_FOR_ROUTER: string = '/:lang(' + JOINED_LANGS + ')?';
const EVENT_PREFIX: string = 'localization:';
const MATCH_LANG_IN_PATH_REGEXP = new RegExp('^(/)(' + JOINED_LANGS + ')(/.*|$)')

Vue.use(VueI18n);
Vue.use(localizationPlugin);
Vue.mixin(localizationMixin);

const i18n = new VueI18n({
  locale: Store.state.lang,
  messages: getLangListAsObject(),
  missing(locale, key, vm) {
    logIt({
      tag: 'i18n',
      message: 'miss: ' + locale + ', ' + key
    });
  }
});

// Патчим роутер, вводим поддержку языков в url
export function patchRouter(Router: any) : void {
  Router.beforeEach((to, from, next) => {
    // #router: придумать как корректно разрулить циклическую переадресацию
    if (to.meta[404] === true) {
      return next();
    }
    // Обрабатываем случай, когда в url не задан язык
    if (to.params.lang === undefined) {
      to.params.lang = Store.state.lang;
      let toPathWithLang = '/' + Store.state.lang + to.path;

      // Обрабатываем случай, когда текущий url соотвествует перенаправляемому
      if (from.params.lang !== undefined && from.path === toPathWithLang) {
        return next(false);
      }
      return next(toPathWithLang);
    }

    // Обрабатываем случай когда язык в url соотвествует текущему
    if (to.params.lang === Store.state.lang) {
      return next();
    }

    setLang(to.params.lang).then(() => {
      next();
    }).catch((e) => {
      next();
    });
  });
};

// Дополнение обычной ссылки определителем языка
export function prependLangRegExp(url: string): string {
  return MATCH_LANG_IN_PATH_FOR_ROUTER + url;
};

// Составляет ссылку с содержанием текущего языка
export function prependLang(url: string): string {
  return `/${Store.state.lang}${url}`;
};

// Составляет ссылку с содержанием текущего языка
export function replaceLang(url: string, lang: string): string {
  return url.replace(MATCH_LANG_IN_PATH_REGEXP, '$1' + lang + '$3');
};

// Установка языка глобально
export async function setLang(lang: string) {
  try {
    let oldLang = Store.state.lang;
    GlobalEvents.emit(EVENT_PREFIX + 'before:setLang', lang, oldLang);
    Store.dispatch('setLang', lang);
    i18n.locale = lang;
    GlobalEvents.emit(EVENT_PREFIX + 'after:setLang', lang, oldLang);
    return lang;
  } catch (e) {
    GlobalEvents.emit(EVENT_PREFIX + 'error:setLang', e);
    return e;
  }
};

export function getLangListAsObject() {
  return process.env.ALLOWED_LANGS.reduce((o, l) => { o[l] = {}; return o; }, {});
}

export { i18n };
