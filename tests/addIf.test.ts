import { addIf, fancyObject } from '../src'

describe('addIf() modifier', () => {
  const obj = fancyObject({
    key1: 'value1',
    key2: 'value2',
    [addIf(true, 'key3')]: 'value3',
    [addIf(false, 'key4')]: 'value4',
  })

  test('should add a property when the condition is true', () => {
    expect(obj['key3']).toBe('value3')
  })

  test('The object will not hold the property completly when the conditon is not met', () => {
    expect(obj).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    })
  })
})
