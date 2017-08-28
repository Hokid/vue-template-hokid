<template>
  <div>
    <button @click="setToken">Set Token</button>
    <button @click="resetToken">Reset Token</button><br><br><br>
    <router-link to="/">Перейти на главную</router-link>
  </div>
</template>
<script>
import Store from '@/store';
import { UPDATE } from '@/store/modules/client/types';

export default {
  name: 'NotFound',
  methods: {
    setToken() {
      Store.commit('client/' + UPDATE, {
        token: 'testtoken'
      });
    },

    resetToken() {
      Store.commit('client/' + UPDATE, {
        token: null
      });
    }
  }
}
</script>
<styles></styles>
