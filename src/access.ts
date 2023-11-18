import type { ObjectKey } from './types'

export const access = (key: ObjectKey, fancyObject: any) => {
  return fancyObject[key]
}

export default access
