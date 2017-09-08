<template>
  <div id="root">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <loader v-if="isViewLoading" size="56"></loader>
        <router-view v-else ref="template">
          <keep-alive>
            <loader v-if="isPageLoading" size="56"></loader>
            <router-view v-else name="page" ref="page"></router-view>
          </keep-alive>
        </router-view>
      </keep-alive>
    </transition>
    <modals ref="modals"></modals>
  </div>
</template>
<script>
// @flow
// #view: реализация лоадеров

import modals from '@/components/modals/modals';
import Store from '@/store';
import Loader from '@/components/elements/loader';
import GlobalEvents from '@/core/events';

export default {
  name: 'Root',
  metaInfo() {
    return {
      htmlAttrs: {
        lang: Store.state.lang
      }
    };
  },
  // created() {
  //   GlobalEvents.on('localization:before:setLang', this.beforeSetLang);
  //   GlobalEvents.on('localization:after:setLang', this.afterSetLang);
  // },
  components: {
    modals,
    Loader
  },
  data() {
    return {
      // Показывает лоадер на уровне root
      isViewLoading: false,
      // Показывает лоадер на уровне контента
      isPageLoading: false
    };
  },
  methods: {
    // beforeSetLang() {
    //   this.isViewLoading = true;
    // },
    // afterSetLang() {
    //   this.isViewLoading = false;
    // }
  }
}
</script>
<style lang="sass" src="@/assets/sass/App.scss"></style>
