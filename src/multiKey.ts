import { MULTI_KEY } from './constants'

import type { ObjectKey } from './types'

export function multiKey(keys: ObjectKey[]) {
  const fancyMultiKey = keys.join(MULTI_KEY)
  return fancyMultiKey
}

export default multiKey
