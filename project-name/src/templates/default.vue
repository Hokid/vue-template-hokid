<template>
  <div class="template-default">
    <div class="l-content">
      <transition name="fade" mode="out-in">
        <slot></slot>
      </transition>
    </div>
    <div class="l-footer"></div>
  </div>
</template>
<script>
import lHeader from '@/components/layout/header';

export default {
  name: 'Default',
  translations: ['main'],
  updateLodingsLangList(list) {
    this.$root.isViewLoading = list.length !== 0;
  },
  computed: {
    isHome() {
      return this.$route.name === 'Home';
    }
  },
  components: {
    lHeader,
    MainNav
  }
};
</script>
<style src="@/assets/sass/templates/default.scss" lang="scss"></style>
