var consts = require('../configs/const');
var causes = require('../configs/errorCodes');
var _ = require('lodash');

module.exports = {
  beforeHandRequest: function(cb) {
    return function(req, res) {
      console.log('requested url: ', req.originalUrl);
      if(!req.body || !req.body.action) {
          return res.json({
            status: 6
          });
      }

      if(consts.ACTIONS.indexOf(req.body.action) === -1) {
        return res.json({
          status: 2
        });
      }

      if(req.body.data !== undefined) {

        if(typeof req.body.data !== 'object') {
          return res.json({
            status: 6,
            data: {
              cause: causes.CAUSE_DATA_PARAM_MUST_BE_OBJECT
            }
          });
        }
      }

      return cb(req, res);
    }
  },

  beforeHandSecureRequest: function(cb) {
    return this.beforeHandRequest(function(req, res) {
      if (req.body.token !== consts.TOKEN) {
        return res.json({
          status: 6,
          data: {
            cause: causes.CAUSE_INCORRECT_TOKEN
          }
        });
      }

      return cb(req, res);
    });
  },

  softMerge: function (dest, source) {
    return Object.keys(dest).reduce(function (dest, key) {
      var sourceVal = source[key];

      if (!_.isUndefined(sourceVal)) {
        dest[key] = sourceVal;
      }

      return dest;
    }, dest);
  }
}
