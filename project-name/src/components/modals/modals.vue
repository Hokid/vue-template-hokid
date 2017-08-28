<template>
  <div class="modals-layers" v-show="hasActivModal">
    <div class="modal is-layer-1" :class="{ 'is-active': isLayerOneActive  }">
      <div class="modal-background" @click="close(1)"></div>
      <component :is="layerOne" :data="layerOneData" @close="close(1)"></component>
      <button class="modal-close"></button>
    </div>
    <div class="modal is-layer-2" :class="{ 'is-active': isLayerTwoActive  }">
      <div class="modal-background" @click="close(2)" :class="{ 'is-fadeout': isLayerOneActive }"></div>
      <component :is="layerTwo" :data="layerTwoData" @close="close(2)"></component>
      <button class="modal-close"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalsLayer',
  created() {
    this.$on('open', this.open);
    this.$on('close', this.close);
  },
  data() {
    return {
      layerOne: null,
      layerTwo: null,
      isLayerOneActive: false,
      isLayerTwoActive: false,
      layerOneData: null,
      layerTwoData: null
    }
  },
  computed: {
    hasActivModal() {
      return this.isLayerOneActive || this.isLayerTwoActive;
    }
  },
  methods: {
    open(options) {
      if (options.layer > 2) {
        options.layer = 2;
      }

      switch (options.layer) {
        case 1:
          this.layerOne = options.component;
          this.layerOneData = options.data;
          this.isLayerOneActive = true;
          break;
        default:
          this.layerTwo = options.component;
          this.layerTwoData = options.data;
          this.isLayerTwoActive = true;
      }

      this.$emit('opened', options);
    },

    close(layer) {
      switch (layer) {
        case 1:
          if (!this.isLayerOneActive) {
            return;
          }
          this.layerOne = null;
          this.layerOneData = null;
          this.isLayerOneActive = false;
          break;
        default:
          if (!this.isLayerTwoActive) {
            return;
          }
          this.layerTwo = null;
          this.layerTwoData = null;
          this.isLayerTwoActive = false;
      }

      this.$emit('closed', layer);
    },

    closeAll() {
      this.close(1);
      this.close(2);
    }
  }
};
</script>
<style lang="scss" scoped>
  .modal-background.is-fadeout {
    opacity: 0.3;
  }
</style>
