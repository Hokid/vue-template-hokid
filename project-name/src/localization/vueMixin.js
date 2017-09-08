import LocaleLoader from './LocaleLoader';

export default {
  beforeCreate() {
    if (this.$options.translations !== undefined) {
      this.localeLoader = new LocaleLoader(this.$options.translations);
      this.localeLoader.init(this);
    }
  },
  beforeDestroy() {
    if (this.localeLoader instanceof LocaleLoader) {
      this.localeLoader.destroy();
      this.$options.translations = undefined;
      this.localeLoader = undefined;
    }
  }
};
