export const access = <O extends object>(fancyObject: O, key: keyof O) => {
  return fancyObject[key]
}

export default access
