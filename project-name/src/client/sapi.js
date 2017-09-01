// @flow
// API запросы с токеном. SAPI - Secure API

import Client from './';
import { API } from '@/api';
import { logIt } from '@/core/handlers';
import merge from 'lodash/merge';

class SAPI extends API {
  request(url: string, data: any, options: any): any {
    merge(options, { meta: { token: Client.token() } });
    return super.request(url, data, options);
  }

  addHook() {
    logIt({
      tag: 'SAPI',
      message: 'addHook not implemented',
      style: 'warn',
      trace: true
    });
  }

  removeHook() {
    logIt({
      tag: 'SAPI',
      message: 'removeHook not implemented',
      style: 'warn',
      trace: true
    });
  }
}

const sapi = new SAPI();

export default sapi;
