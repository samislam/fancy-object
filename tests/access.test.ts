import { access, addIf, fancyObject, multiKey, otherwise } from '../src'

describe('access() function', () => {
  const obj = fancyObject({
    key1: 'string 1',
    [addIf(true, 'key2')]: 'value of addIf true',
    [addIf(false, 'key3')]: 'should not be accessible',
    [multiKey(['admin', 'user'])]: 'value of multi key',
    [otherwise()]: 'value of otherwise',
  })

  test('should access normaly defined properties', () => {
    expect(access(obj, 'key1')).toBe('string 1')
  })

  test('should access addIf `true` values', () => {
    expect(access(obj, 'key2')).toBe('value of addIf true')
  })

  test('should return the otherwise() caluse when accessing an addIf false property', () => {
    expect(access(obj, 'key3')).toBe('value of otherwise')
  })

  test('should access multiKey property members', () => {
    expect(access(obj, 'admin')).toBe('value of multi key')
    expect(access(obj, 'user')).toBe('value of multi key')
  })

  test('should fallback to the `otherwise()` clause when trying to access a non-existent key', () => {
    expect(access(obj, 'not found')).toBe('value of otherwise')
  })
})
