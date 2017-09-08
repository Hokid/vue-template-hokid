// @flow
import Store from '@/store';
import merge from 'lodash/merge';
import { i18n } from './';
import Vue from 'vue';

// Управление загрузкой локализаций
export default class LocaleLoader {
  translations: Array<string>;
  _Vue: any;
  _isDestroyed = false;
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
    this._isDestroyed = true;
    this.storeUnWatch();
  };

  triggerUpdateLoadingLangs() {
    // if (this._isDestroyed) {
    //   return;
    // }

    if (typeof this._Vue.$options.updateLodingsLangList === 'function') {
      // Может вызвать бесконечный лууп, если компонент делает какие-то изменения в коллбэке,
      // которые приводят к перерендеру в котором он будет destroyed
      this._Vue.$options.updateLodingsLangList.call(this._Vue, this.loadingLangs);
    }
  };

  updateTranslations() {
    const lang = Store.state.lang;

    this.loadingLangs.push(lang);
    this.triggerUpdateLoadingLangs();

    this.loadTranslations(Store.state.lang)
      .then((loaded) => {
        i18n.mergeLocaleMessage(lang, loaded);
        this.loadingLangs.splice(this.loadingLangs.indexOf(lang), 1);
        this.triggerUpdateLoadingLangs();
      })
      .catch((e) => {
        this._Vue.$emit('localization:error:loadTranslations', e);
        this.loadingLangs.splice(this.loadingLangs.indexOf(lang), 1);
        this.triggerUpdateLoadingLangs();
      });
  };

  async loadTranslations(lang: string) {
    const loaded = await Promise.all(this.translations.map(async (url) => {
      return await import(`@/localization/translations/${lang}/${url}.json`);
    }));

    return loaded.reduce((p, c) => merge(p, c), {});
  };
};
