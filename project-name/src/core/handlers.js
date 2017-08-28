// @flow
import GlobalEvents from './events';

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

export function error(msg: string | number, Type: Function, data: any) {
  if (process.env.NODE_ENV !== 'production') {
    // Ни в коем случае не производить событие с именем 'error' ->
    // Node.js EventEmmiter выбрасывает реальную ошибку, заложено в коде метода $emit
    GlobalEvents.emit('core:handlers:error', msg, Type);
    console.info('%c error: ', redHighlight, msg, data);
    store.errors.push({
      msg,
      Type,
      timestamp: Date.now()
    });
  }

  throw new Type(msg);
};

export function log(data: any) {
  if (process.env.NODE_ENV !== 'production') {
    GlobalEvents.emit('core:handlers:error', data);
    console.info('%c log [' + data.name + ']: ', orangeHighlight, data);
    store.logs.push({
      data,
      timestamp: Date.now()
    });
  }
};

export function warn(data: any) {
  if (process.env.NODE_ENV !== 'production') {
    GlobalEvents.emit('core:handlers:warn', data);
    console.info('%c warn [' + data.name + ']: ' + data.msg, orangeHighlight, data);
    store.warn.push({
      data,
      timestamp: Date.now()
    });
  }
};

export function getStore() {
  if (process.env.NODE_ENV !== 'production') {
    return store;
  }
};
