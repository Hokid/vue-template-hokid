// @flow

// #locale:20 реализовать недостпуность страницы для заданных языков
import Vue from 'vue';
import Router from 'vue-router';
import Default from '@/templates/default';
import { prependLangRegExp, prependLang } from '@/localization';

Vue.use(Router);

const Routing = new Router({
  mode: 'history',
  routes: [
    {
      path: prependLangRegExp('/'),
      name: 'Home',
      components: {
        default: Default,
        async page() {
          return await import('@/pages/home')
        }
      },
      meta: { requireAuth: true },
      props: { default: true }
    },
    {
      path: prependLangRegExp('/404'),
      components: {
        default: Default,
        async page() {
          return await import('@/pages/404')
        }
      }
    },
    {
      path: '*',
      meta: {
        '404': true
      },
      beforeEnter: (to, from, next) => {
        // if (process.env.NODE_ENV !== 'production') {
        //   return next(prependLang('/404'));
        // }

        // window.location.href = 'https://' + process.env.FALLBACK_DOMEN + to.path;
        return next();
      }
    }
  ]
});

export default Routing;
