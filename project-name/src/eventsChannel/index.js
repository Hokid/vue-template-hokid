// @flow
/*
Пока реализован канал через EventSource

#EventSource: добавить полифил
*/

import {
  merge,
  bindAll,
  find
} from 'lodash';
import Client from '@/client';

export class EventSourceChannel {
  _events = null;
  _eventsource = null;
  _url = null;
  _tm = null;
  // Дефолтные опции
  options = {
    parseAsJSON: true, // Применять ли JSON парсер к data
    reconnectOnError: true, // Делать ли реконнект при ошибке установления соединения
    recconectTimeout: 2000 // Таймаут попытки реконнекта
  };

  // В Конструктор передаем урл стрима и опиции
  constructor(url: string, options: any = {}) {
    merge(this.options, options);
    bindAll(this, ['_reconnect', '_rebindEvents', '_connect']);
    this._url = url;
    this._events = [];
    this._connect();
  }

  _connect() {
    // При тестировании прода токен через слеш слать
    if (process.env.NODE_ENV === 'development') {
      this._eventsource = new EventSource(`${this._url}`);
    } else {
      // При тести пока нет авторизации отсылать ID клиента
      this._eventsource = new EventSource(`${this._url}/${Client.token()}`);
    }
    this._eventsource.onerror = this._reconnect;
  }

  _rebindEvents() {
    if (this._events.length && this._eventsource != null) {
      const _this = this;
      this._events.forEach((d) => {
        return _this._eventsource.addEventListener(d.type, d.listener, d.options);
      });
    }
  }

  _reconnect(e) {
    clearTimeout(this._tm);
    if (this.options.reconnectOnError) {
      if (this._eventsource == null ||
          (this._eventsource.readyState === EventSource.OPEN ||
           this._eventsource.readyState === EventSource.CONNECTING)) {
        return;
      }
      const _this = this;
      this._tm = setTimeout(() => {
        _this._connect();
        _this._eventsource.onopen = _this._rebindEvents;
      }, this.options.recconectTimeout);
    }
  }

  // Добавить обработчик события
  addEventListener(type: string, listener: Function, options: any) {
    let current = find(this._events, { type, originListener: listener });

    if (current == null) {
      let _listener = function (d, e) {
        let data = e != null ? e.data : null;
        if (this.options.parseAsJSON) {
          if (data != null) {
            try {
              data = JSON.parse(data);
            } catch (e) {
              data = e.data;
            }
          }
        }
        d.originListener(data);
      };

      current = {
        type,
        originListener: listener,
        options
      };

      current.listener = _listener.bind(this, current);

      this._events.push(current);
      this._eventsource.addEventListener(type, current.listener, options);
      return () => this.removeEventListener(type, listener);
    }
  }

  // Удалить обработчик события
  removeEventListener(type: string, listener: Function) {
    let found = find(this._events, { type, originListener: listener });

    if (found != null) {
      this._eventsource.removeEventListener(type, found.listener);
      this._events.splice(this._events.indexOf(found), 1);
    }
  }

  // Сгенерировать события
  dispatchEvent(e) {
    if (this._eventsource != null) {
      return this._eventsource.dispatchEvent(e);
    }
  }

  // Закрыть соединение полностью
  close() {
    if (this._eventsource) {
      this._eventsource.close();
      this._eventsource = null;
      this._events = [];
    }
  }
}
