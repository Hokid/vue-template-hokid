// @flow
import axios from 'axios';
import merge from 'lodash/merge';
import GlobalEvents from '@/core/events';
import { error } from '@/core/handlers';

let CancelToken = axios.CancelToken;
let beforeHooks = [];
let afterHooks = [];
const axiosInst = axios.create({
  baseURL: '/api' // process.env.API_URL
});

function prepareForRequest(data, fields) {
  return merge({}, { data }, fields);
}

function callHook(name, data) {
  switch (name) {
    case 'before':
      return beforeHooks.reduce((data, cb) => {
        return cb(data);
      }, data);
    case 'after':
      return afterHooks.reduce((data, cb) => {
        return cb(data);
      }, data);
  }
}

export class API {
  axios: any = null;

  constructor(): void {
    this.axios = axiosInst;
  }

  request(url: string, data: any, options: any): any {
    let _options = merge({}, options);
    let cancel;
    const { meta } = options;
    const _data = { ...meta };

    delete _options.meta;

    GlobalEvents.emit('api:request', { url, data, options });

    if (data != null) {
      data = callHook('before', data);
      _data.data = data;
    }

    if (_options.cancelable === true) {
      _options.cancelToken = new CancelToken((c) => {
        cancel = c;
      });
    }

    const promise = this.axios.post(url, _data, _options)
      .then((resp) => {
        if (resp.data.status > 0) {
          return Promise.reject(resp);
        }
        resp.data.data = callHook('after', resp.data.data);
        GlobalEvents.emit('api:response', resp);
        return Promise.resolve(resp);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          err.isCancel = true;
          return Promise.reject(err);
        }

        // Если переданы данные
        if (err.response) {
          // Запуск хука after
          err.response.data = callHook('after', err.response.data);
        }
        // Генерируем событие
        GlobalEvents.emit('api:error', err);
        return Promise.reject(err);
      });
    if (_options.cancelable === true) {
      return { promise, cancel };
    } else {
      return promise;
    }
  }

  get(url: string, data: any, options: any = {}) {
    merge(options, { meta: { action: 'get' } });
    return this.request(url, data, options);
  }

  create(url: string, data: any, options: any = {}) {
    merge(options, { meta: { action: 'create' } });
    return this.request(url, data, options);
  }

  update(url: string, data: any, options: any = {}) {
    merge(options, { meta: { action: 'update' } });
    return this.request(url, data, options);
  }

  delete(url: string, data: any, options: any = {}) {
    merge(options, { meta: { action: 'delete' } });
    return this.request(url, data, options);
  }

  exist(url: string, data: any, options: any = {}) {
    merge(options, { meta: { action: 'exist' } });
    return this.request(url, data, options);
  }

  addHook(name: string, cb: Function) {
    switch (name) {
      case 'before':
        beforeHooks.push(cb);
        break;
      case 'after':
        afterHooks.push(cb);
        break;
    }
  }

  removeHook(name: string, cb: Function) {
    switch (name) {
      case 'before':
        beforeHooks = beforeHooks.filter((_cb) => {
          return _cb !== cb;
        });
        break;
      case 'after':
        afterHooks = afterHooks.filter((_cb) => {
          return _cb !== cb;
        });
        break;
    }
  }
}

const api = new API();

export default api;
