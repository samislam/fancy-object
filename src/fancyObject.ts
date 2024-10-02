// src/fancyObject.ts
import { OTHERWISE } from './constants'

export function fancyObject<T extends Record<PropertyKey, any>>(
  POJO: T
): Omit<T, typeof OTHERWISE> & (typeof OTHERWISE extends keyof T ? { [x: string]: T[typeof OTHERWISE] } : {}) {
  const POJO_ = { ...POJO } as any

  return new Proxy(POJO_, {
    get(target, givenKey: string) {
      let field = target[givenKey]

      if (field === undefined && OTHERWISE in target) {
        return target[OTHERWISE]
      }

      return field
    },
  })
}
