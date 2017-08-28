<template>
  <div class="template-default">
    <div class="l-content">
      <div v-if="$root.isPageLoading"></div>
      <transition v-else name="fade" mode="out-in">
        <keep-alive>
          <slot></slot>
        </keep-alive>
      </transition>
    </div>
    <div class="l-footer"></div>
  </div>
</template>
<script>

export default {
  name: 'Default',
  translations: ['main']
};
</script>
<style src="@/assets/sass/templates/default.scss" lang="sass"></style>
