// @flow
// API запросы с токеном. SAPI - Secure API

import Client from './';
import { API } from '@/api';
import { warn } from '@/core/handlers';
import merge from 'lodash/merge';

class SAPI extends API {
  request(url: string, data: any, options: any): any {
    merge(options, { meta: { token: Client.token() } });
    return super.request(url, data, options);
  }

  addHook() {
    warn({
      name: 'sapi',
      msg: 'not implemented'
    });
  }

  removeHook() {
    warn({
      name: 'sapi',
      msg: 'not implemented'
    });
  }
}

const sapi = new SAPI();

export default sapi;
