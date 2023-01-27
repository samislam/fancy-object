const _ = require('lodash')
const { MULTI_KEY, OTHERWISE, ADDIF } = require('./constants')

function fancyObject(POJO_, options) {
  const chosenOptions = {}
  const defaultOptions = {}
  _.merge(chosenOptions, defaultOptions, options)
  const POJO = {}
  for (const [key, value] of Object.entries(POJO_)) {
    if (key !== ADDIF) POJO[key] = value
  }
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
