<template>
  <div class="is-overlay">
    <div class="loader-box">
      <span class="loader" :style="{ 'font-size': `${size}px` }"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 24
    }
  },
  name: 'Loader'
};
</script>
