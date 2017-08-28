// @flow
import * as types from './types';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import find from 'lodash/find';

export default {
  [types.UPDATE] (state: any, payload: any) {
    mergeWith(state, payload, (to, from) => {
      return isArray(to) ? from : undefined;
    });
  },
  [types.UPDATE_ACCOUNT] (state: any, payload: any) {
    if (payload.id === null) {
      return;
    }

    let account = find(state.accounts, { id: payload.id });

    if (account == null) {
      return state.accounts.push(payload);
    }

    mergeWith(account, payload, (to, from) => {
      return isArray(to) ? from : undefined;
    });
  },
  [types.UPDATE_ACCOUNT_SMS_NOTIFICATIONS] (state: any, payload: any) {
    if (payload.id === null) {
      return;
    }

    let account = find(state.accounts, { id: payload.id });

    if (account === null && (!account.SMSNotifications || !account.SMSNotifications.length)) {
      return;
    }

    if (payload.SMSNotifications && payload.SMSNotifications.length && account.SMSNotifications) {
      payload.SMSNotifications.forEach(item => {
        const found = find(account.SMSNotifications, { id: item.id });
        found.enabled = item.enabled;
      });
    }
  }
};
