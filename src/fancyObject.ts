import _ from 'lodash'
import { MULTI_KEY, OTHERWISE, ADDIF } from './constants'

export function fancyObject<P extends Record<string, any>>(POJO: P) {
  const POJO_: any = {}
  for (const [key, value] of Object.entries(POJO)) {
    if (!key.startsWith(ADDIF)) POJO_[key] = value
  }

  const proxy = new Proxy(POJO_, {
    get(_obj, givenKey: string) {
      let field
      for (const key of Object.keys(POJO_)) {
        const multiKeys = key.split(MULTI_KEY)
        if (multiKeys.includes(givenKey)) field = POJO_[key]
      }
      if (!field) {
        if (OTHERWISE in POJO_) return POJO_[OTHERWISE]
        else Reflect.get(POJO_, givenKey)
      }
      return field
    },
  })
  return proxy
}

export default fancyObject
