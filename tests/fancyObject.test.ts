import { fancyObject } from '../src/fancyObject'
describe('fancyObject() function', () => {
  test('works if called normally as if it was a normal object', () => {})
  const obj = fancyObject({
    key1: 'string 1',
    key2: 'string 2',
    key3: 'string 3',
  })
  expect(obj).toEqual({
    key1: 'string 1',
    key2: 'string 2',
    key3: 'string 3',
  })
})
