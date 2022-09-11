const _ = require('lodash')
const { MULTI_KEY, OTHERWISE } = require('./constants')

function fancyObject(POJO, options) {
  const chosenOptions = {}
  const defaultOptions = {}
  _.merge(chosenOptions, defaultOptions, options)
  const proxy = new Proxy(POJO, {
    get(_obj, givenKey) {
      let field
      for (const key of Object.keys(POJO)) {
        const multiKeys = key.split(MULTI_KEY)
        if (multiKeys.includes(givenKey)) field = POJO[key]
      }
      if (!field) {
        if (OTHERWISE in POJO) return POJO[OTHERWISE]
        else Reflect.get(...arguments)
      }
      return field
    },
  })
  return proxy
}

module.exports = fancyObject
