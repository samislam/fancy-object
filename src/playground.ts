const REMOVE_CONST = 'removeMe'
const addIf = <T extends string>(condition: boolean, key: T): T | typeof REMOVE_CONST => {
  if (condition) return key
  else return REMOVE_CONST
}

function fancyObject<T extends Record<string, unknown>, K extends keyof T>(POJO: T) {
  const { [REMOVE_CONST]: _REMOVE_CONST_VAL, ...POJO_ } = POJO
  return POJO_ as Omit<T, typeof REMOVE_CONST>
}

const myObj = fancyObject({
  a: 'apple',
  b: 'banana',
  c: 'cajo',
  [addIf(true, 'd')]: () => 'mew',
})
