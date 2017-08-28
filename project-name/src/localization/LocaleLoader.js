// @flow
import Store from '@/store';
import merge from 'lodash/merge';

// Управление загрузкой локализаций
export default class LocaleLoader {
  translations: Array<string>;
  _Vue: any;
  storeUnWatch: Function;
  loadingLangs: Array<string>;

  constructor (translations: Array<string>) {
    if (translations === undefined || translations.length === 0) {
      return;
    }

    this.translations = translations.slice();
    this.loadingLangs = [];
  };

  init(Vue: any) {
    this._Vue = Vue;

    this.storeUnWatch = Store.watch((state) => state.lang, this.updateTranslations.bind(this), {
      immediate: true
    });
  };

  destroy() {
    this.storeUnWatch();
  };

  triggerUpdateLoadingLangs() {
    if (typeof this._Vue.$options.updateLodingsLangList === 'function') {
      this._Vue.$options.updateLodingsLangList(this.loadingLangs);
    }
  };

  updateTranslations() {
    const _this = this;
    const lang = Store.state.lang;

    this.loadingLangs.push(lang);
    this.triggerUpdateLoadingLangs();

    this.loadTranslations(Store.state.lang)
      .then((loaded) => {
        _this._Vue.$i18n.mergeLocaleMessage(lang, loaded);
        _this.loadingLangs.splice(_this.loadingLangs.indexOf(lang), 1);
        _this.triggerUpdateLoadingLangs();
      })
      .catch((e) => {
        _this._Vue.$emit('localization:error:loadTranslations', e);
        _this.loadingLangs.splice(_this.loadingLangs.indexOf(lang), 1);
        _this.triggerUpdateLoadingLangs();
      });
  };

  async loadTranslations(lang: string) {
    const loaded = await Promise.all(this.translations.map(async (url) => {
      return await import(`@/localization/translations/${lang}/${url}.json`);
    }));

    return loaded.reduce((p, c) => merge(p, c), {});
  };
};
