import { fancyObject, multiKey } from '../src'

describe('multiKey() modifier', () => {
  describe('Simple usage tests', () => {
    const obj = fancyObject({
      [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
      key2: 'string 2',
      key3: 'string 3',
    })
    test('multiKey access should work for any defined key', () => {
      expect(obj['admin']).toBe('inside admin/administrator')
      expect(obj['administrator']).toBe('inside admin/administrator')
    })

    test("accessing a key who's a normaly defined key should work", () => {
      expect(obj['key2']).toBe('string 2')
    })

    test("accessing a key who's not defined should return `undefined`", () => {
      expect(obj['not found']).toBe(undefined)
    })
  })

  describe('duplicate keys tests', () => {
    const obj = fancyObject({
      [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
      admin: 'string 2',
      administrator: 'string 3',
    })

    test('`multiKey` keys should be overridden by explicit object keys ', () => {
      expect(obj['admin']).toBe('string 2')
      expect(obj['administrator']).toBe('string 3')
    })

    test('Accessing an undefined member should return undefined ', () => {
      expect(obj['not found']).toBe(undefined)
    })
  })
})
