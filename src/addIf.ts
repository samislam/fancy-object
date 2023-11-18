import { ADDIF } from './constants'
import type { ObjectKey } from './types'

type ReturnedType<C extends boolean, K extends ObjectKey> = C extends true ? K : `${typeof ADDIF}_${K}`

export function addIf<C extends boolean, K extends ObjectKey>(condition: C, key: K): ReturnedType<C, K> {
  if (condition) return key as any
  else return (ADDIF + '_' + key) as any
}

export default addIf
