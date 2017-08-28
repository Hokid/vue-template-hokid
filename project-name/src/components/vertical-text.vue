<template>
    <div class="rotated-text"><span class="rotated-text__inner"><slot></slot></span></div></div>
</template>
<script>
// https://gist.github.com/aiboy/7406727

export default {
  name: 'VerticalText'
};
</script>
<style lang="scss">

  .rotated-text {
    display: inline-block;
    overflow: hidden;
    width: 1.5em;

    &__inner {
      display: inline-block;
      white-space: nowrap;
      transform: translate(0, 0) rotate(-90deg);
      transform-origin: center;

     &:before {
       content: "";
       float: left;
       margin-top: 100%;
     }
    }
  }
</style>
