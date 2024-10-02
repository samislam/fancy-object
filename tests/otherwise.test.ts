import { fancyObject, otherwise } from '../src'

describe('otherwise() modifier', () => {
  const obj = fancyObject({
    key1: 'value1',
    key2: 'value2',
    [otherwise()]: 'the key you requested is not found!',
  })
  test('should fallback to otherwise when key does not exist', () => {
    expect(obj['not found']).toBe('the key you requested is not found!')
  })

  test('should still be able to access the other keys on the object', () => {
    expect(obj['key2']).toBe('value2')
  })
})
