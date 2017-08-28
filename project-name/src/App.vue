<template>
  <div id="root">
    <div v-if="$root.isViewLoading" class="is-overlay">
      <span class="spiner"></span>
    </div>
    <transition v-else name="fade" mode="out-in">
      <router-view ref="template">
        <div v-if="$root.isPageLoading" class="is-overlay">
          <span class="spiner"></span>
        </div>
        <router-view v-else name="page" ref="page"></router-view>
      </router-view>
    </transition>
    <modals ref="modals"></modals>
  </div>
</template>
<script>
// @flow
// #view: реализация лоадеров

import modals from '@/components/modals/modals';
import Store from '@/store';

export default {
  name: 'Root',
  metaInfo() {
    return {
      htmlAttrs: {
        lang: Store.state.lang
      }
    };
  },
  components: {
    modals
  },
  data() {
    return {
      isViewLoading: false,
      isPageLoading: false
    };
  }
}
</script>
<style lang="sass" src="@/assets/sass/App.scss"></style>
