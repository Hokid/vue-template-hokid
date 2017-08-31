// @flow
import GlobalEvents from './events';
import { defaults } from 'lodash';

const store = {
  errors: [],
  logs: [],
  warn: []
};

const orangeHighlight = '\
color: #4a2713;\
background: #f59417;\
font-size: 12px;\
font-weight: 900;\
padding: 1px;';

const redHighlight = '\
color: #4a2713;\
background: #f51717;\
font-size: 12px;\
font-weight: 900;\
padding: 1px;';

export function errorIt(options = {}) {
  defaults(options, { throw: true, timestamp: Date.now(), type: Error });

  if (process.env.NODE_ENV !== 'production') {
    // Ни в коем случае не производить событие с именем 'error' ->
    // Node.js EventEmmiter выбрасывает реальную ошибку, заложено в коде метода $emit
    GlobalEvents.emit('core:handlers:errorIt', options);
    console.info(`%c ${(options.message || 'no message')}`, redHighlight, options.message, options.debug);
    store.errors.push(options);
  }
  if (options.throw) {
    // eslint-disable-next-line
    throw new options.type(options.message);
  } else {
    try {
      // eslint-disable-next-line
      throw new options.type(options.message);
    } catch (e) {
      console.log(e);
    }
  }
};

export function logIt(options = {}) {
  defaults(options, { timestamp: Date.now() });

  if (process.env.NODE_ENV !== 'production') {
    GlobalEvents.emit('core:handlers:logIt', options);
    console.info(`%c [${(options.tag || 'Unnamed')}]: ${(options.message || 'no message')}`, orangeHighlight, options.debug);
    store.logs.push(options);
  }
};

export function getStore() {
  if (process.env.NODE_ENV !== 'production') {
    return store;
  }
};
