const { MULTI_KEY } = require('./constants')

function multiKey(keys) {
  const fancyMultiKey = keys.join(MULTI_KEY)
  return fancyMultiKey
}
module.exports = multiKey
