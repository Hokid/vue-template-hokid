var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEFAULT_LANG: '"en"',
  ALLOWED_LANGS: '["en", "ru", "id", "ar", "zh", "de", "vi", "es", "pt"]',
  API_URL: '"https://api.lk.dev"'
})
