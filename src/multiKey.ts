import type { ObjectKey } from './types'

export function multiKey<K extends ObjectKey[], V>(keys: [...K], value: V): Record<K[number], V> {
  const result: Record<ObjectKey, V> = {}
  for (const key of keys) {
    result[key] = value
  }
  return result
}

export default multiKey
