<template>
  <div class="modal-popup modal-content" :class="classes">
    <div class="modal-popup__head">
      <button class="modal-popup__closer" @click="close">
        <svg-icon width="36" height="36" name="closer" fill="#fff"></svg-icon>
      </button>
    </div>
    <div class="modal-popup__body"></div>
      <div class="columns is-mobile is-vcentered">
        <div class="column is-3">
          <svg-icon class="modal-popup__ico" :name="iconName" width="100%"></svg-icon>
        </div>
        <div class="column is-9">
          <div class="modal-popup__text" v-html="$t(data.message)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  props: ['data'],
  computed: {
    classes() {
      return {
        ['modal-popup--' + this.data.type]: true
      }
    },
    iconName() {
      return this.data.type;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },

    select(widget) {
      this.$emit('select', widget);
      this.$emit('close');
    }
  }
};
</script>
