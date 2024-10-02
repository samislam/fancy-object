import type { ObjectKey } from './types'

export function addIf<C extends boolean, K extends ObjectKey, V>(
  condition: C,
  key: K,
  value: V
): C extends true ? Record<K, V> : {} {
  if (condition) return { [key]: value } as any
  else return {} as any
}

export default addIf
