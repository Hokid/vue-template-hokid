// @flow
import GlobalEvents from './events';
import { defaults } from 'lodash';

const store = {
  logs: []
};

const COLORS = {
  error: '\
  color: #4a2713;\
  background: #f51717;\
  font-size: 12px;\
  font-weight: 900;\
  padding: 1px;',

  info: '\
  color: #4a2713;\
  background: #f59417;\
  font-size: 12px;\
  font-weight: 900;\
  padding: 1px;',

  warn: '\
  color: #fff;\
  background: blue;\
  font-size: 12px;\
  font-weight: 900;\
  padding: 1px;'
};

export function logIt(options = {}) {
  defaults(options, { timestamp: Date.now(), style: 'info' });

  if (process.env.NODE_ENV !== 'production') {
    GlobalEvents.emit('core:handlers:logIt', options);
    console.info(`%c [${(options.tag || 'Unnamed')}]: ${(options.message || 'no message')}`, COLORS[options.style], options.debug);
    store.logs.push(options);

    if (options.trace) {
      if ('trace' in console) {
        console.trace();
      } else {
        try {
          throw new Error();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};

export function getStore() {
  if (process.env.NODE_ENV !== 'production') {
    return store;
  }
};
