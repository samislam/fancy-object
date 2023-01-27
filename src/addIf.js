const { ADDIF } = require('./constants')
module.exports = function addIf(condition, key) {
  if (condition) return key
  else return ADDIF
}
