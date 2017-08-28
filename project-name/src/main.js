// @flow

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import datasetPolyfill from 'element-dataset';
datasetPolyfill();
import 'babel-polyfill';
import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueSimpleBreakpoints from 'vue-simple-breakpoints';
import VueClipboard from 'vue-clipboard2';
import vOutsideEvents from 'vue-outside-events';
import VueMask from 'v-mask';
import Vuen2br from '@/utils/n2brVuePlugin';
import Meta from 'vue-meta';
import SVGIcon from './svg-icons';
import apiPlugin from '@/api/vuePlugin';
import sapiPlugin from '@/client/sapiVuePlugin';
import Store from '@/store';
import router from '@/router';
import { patchRouter as localePatchRouter, i18n } from './localization';
import GlobalEvents from '@/core/events';
import client, { patchRouter as authPatchRouter} from '@/client';
import AppView from '@/App';
import debug from '@/debug';

Vue.config.productionTip = false;

Vue.use(Meta);

Vue.use(Vuen2br);

Vue.use(vOutsideEvents);

Vue.use(VueMask);

Vue.use(VueSimpleBreakpoints, {
  mobile: 768,
  small_desktop: 999,
  large_desktop: 1384
});

// Копирование в буфер обмена
Vue.use(VueClipboard);

// Делаем доступным API во Vue компонентах
Vue.use(apiPlugin);

// Делаем доступным SAPI во Vue компонентах
Vue.use(sapiPlugin);

Vue.use(VueTouch, {name: 'v-touch'});
Vue.use(SVGIcon);

// Поддержка страниц требующих, авторизацию клиента
authPatchRouter(router);

// Поддержка id - языка в url
localePatchRouter(router);

// Добавление плагинов во Vue компоненты
AppView.router = router;
AppView.i18n = i18n;
AppView.store = Store;

GlobalEvents.emit('beforeViewRootMount', AppView);
/* eslint-disable no-new */
const RootView = new Vue(AppView).$mount('#root');
GlobalEvents.emit('afterViewRootMount', RootView);
// #webpack: hotupdate i18n [https://kazupon.github.io/vue-i18n/en/hot-reload.html]
