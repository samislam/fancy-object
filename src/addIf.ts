import type { ObjectKey } from './types'

type ValueOrCallback<V> = V | (() => V)

export function addIf<C extends boolean, K extends ObjectKey, V>(
  condition: C,
  key: K,
  value: ValueOrCallback<V>
): C extends true ? Record<K, V> : {} {
  if (condition) {
    const resolvedValue = typeof value === 'function' ? (value as () => V)() : value
    return { [key]: resolvedValue } as any
  } else {
    return {} as any
  }
}

export default addIf
