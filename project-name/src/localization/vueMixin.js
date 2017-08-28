import LocaleLoader from './LocaleLoader';

export default {
  created() {
    if (this.$options.translations !== undefined) {
      this.localeLoader = new LocaleLoader(this.$options.translations);
      this.localeLoader.init(this);
    }
  },
  beforeDestroy() {
    if (this.localeLoader instanceof LocaleLoader) {
      this.localeLoader.destroy();
      delete this.$options.translations;
      delete this.localeLoader;
    }
  }
};
