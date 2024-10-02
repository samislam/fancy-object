import { addIf, fancyObject } from '../src'

describe('addIf() modifier', () => {
  describe('When value is a normal value', () => {
    const obj = fancyObject({
      key1: 'value1',
      key2: 'value2',
      ...addIf(true, 'key3', 'value3'), // Condition true: should add key3
      ...addIf(false, 'key4', 'value4'), // Condition false: should omit key4
    })

    test('should include property when the condition is true', () => {
      expect(obj['key3']).toBe('value3')
    })

    test('should omit property when the condition is false', () => {
      expect(obj).toEqual({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      })
    })

    test('should not affect other properties when adding', () => {
      expect(obj.key1).toBe('value1')
      expect(obj.key2).toBe('value2')
    })
  })

  describe('When value is a callback function', () => {
    const obj = fancyObject({
      key1: 'value1',
      key2: 'value2',
      ...addIf(true, 'key3', 'value3'), // Condition true: should add key3
      ...addIf(false, 'key4', 'value4'), // Condition false: should omit key4
      ...addIf(true, 'key5', () => 'value5'), // Condition true: should add key5 using callback
    })

    test('should invoke the callback and include the property when the condition is true', () => {
      expect(obj.key5).toBe('value5')
    })

    test('should not add properties when the condition is false', () => {
      const newObj = fancyObject({
        ...addIf(false, 'key6', () => 'value6'), // Condition false: should omit key6
      })
      expect(newObj).toEqual({})
    })

    test('should not affect other properties when adding callback values', () => {
      expect(obj.key1).toBe('value1')
      expect(obj.key2).toBe('value2')
      expect(obj.key3).toBe('value3')
    })
  })

  describe('Edge Cases', () => {
    test('should handle multiple callbacks with true conditions', () => {
      const obj = fancyObject({
        ...addIf(true, 'key7', () => 'value7'), // Condition true: should add key7
        ...addIf(true, 'key8', () => 'value8'), // Condition true: should add key8
      })

      expect(obj.key7).toBe('value7')
      expect(obj.key8).toBe('value8')
    })

    test('should not add properties when all conditions are false', () => {
      const obj = fancyObject({
        ...addIf(false, 'key9', 'value9'), // Condition false: should omit key9
        ...addIf(false, 'key10', () => 'value10'), // Condition false: should omit key10
      })

      expect(obj).toEqual({})
    })
  })
})
