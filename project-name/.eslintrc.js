// http://eslint.org/docs/user-guide/configuring

// #eslint: +плагин https://www.npmjs.com/package/eslint-plugin-import
// #eslint: +плагин https://www.npmjs.com/package/eslint-plugin-promise
// #eslint: попробовать совмести vue плагин c flowtype-errors, пока работает только с html
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    soruceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'standard',
    'plugin:vue/base'
  ],
  plugins: [
    'vue'
    // 'html',
    // "flowtype-errors"
  ],
  // settings: {
  //   'html/html-extensions': ['.html', '.vue']
  // },
  rules: {
    'no-undef': 0,
    // 'flowtype-errors/show-errors': 2,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'arrow-parens': 0,
    'semi': 0,
    'space-before-function-paren': 0,
    'generator-star-spacing': 0,
    'no-multi-str': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
