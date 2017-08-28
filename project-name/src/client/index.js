// @flow
/**
Иформацию о типе аккаунта можно взять из поля 'group' аккаунта, подполе 'type' - номер типа
*/

import GlobalEvents from '@/core/events';
import { error, log } from '@/core/handlers';
import Store from '@/store';
import { UPDATE } from '@/store/modules/client/types';
import api from '@/api';
import { prependLangRegExp, prependLang } from '@/localization';

let loginTmId;

class Client {
  RELOGIN_TIMEOUT: number = 5000; // 5 сек.
  enableRelogin: boolean = true;
  static TEST = true;

  // Авторизация по токену
  login(token: string): Promise<any> {
    clearTimeout(loginTmId);

    if (typeof token === 'string') {
      GlobalEvents.emit('client:login:request');

      return api.get('/client', null, { meta: { token } })
        .then((_response) => {
          Store.commit('client/' + UPDATE, _response.data.data.result);
          GlobalEvents.emit('client:login:success', _response);
          return Promise.resolve(_response);
        })
        .catch((_error) => {
          if (_error.response !== undefined) {
            // DO SOMTHING
          } else if (_error.request !== undefined) {
            // Отсутствует соединение с интернетом, api не доступен
            if (_error.request.status === 0) {
              if (client.enableRelogin) {
                loginTmId = setTimeout(() => client.login(token), client.RELOGIN_TIMEOUT);
              }
            }
          }
          GlobalEvents.emit('client:login:error', _error);
          return Promise.reject(_error);
        });
    } else {
      return Promise.reject();
    }
  }

  logut() {
    // #client: +logout - разлогин
  }

  // Проверка: авторизован ли клиент
  isAuth() {
    return Store.getters['client/isAuth'];
  }

  hasAccounts() {
    return Store.state.client.accounts.length > 0;
  }

  token() {
    return Store.state.client.token;
  }
}

const client = new Client();

export default client;

// Поддержка страниц, требующих авторизацию
export function patchRouter(Router: any) {
  Router.beforeEach((to, from, next) => {
    // #router: придумать как корректно разрулить циклическую переадресацию
    if (to.meta[404] === true) {
      return next();
    }
    // Если для доступа к странице нужна автозация
    if (to.meta.requireAuth === true) {
      // Если не авторизован
      if (!client.isAuth()) {
        // Если в store существует токен
        if (Store.state.client.token !== null) {
          // Логинимся по токену
          client.login(Store.state.client.token)
            .then(() => {
              // Пускам на страницу
              next();
            })
            .catch(() => {
              // перебрасываем на авторизация
              next(prependLang('/login'));
            });
          // Если токена нет в store
        } else {
          // перебрасываем на авторизация
          next(prependLang('/login'));
        }
        // Если клиент не авторизован
      } else {
        // продожаем, если уже авторизован
        next();
      }
      // Если для доступа к не странице нужна автозация
    } else {
      next();
    }
  });
};
