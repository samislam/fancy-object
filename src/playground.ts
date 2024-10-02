import addIf from './addIf'
import multiKey from './multiKey'
import otherwise from './otherwise'
import { fancyObject } from './fancyObject'

const obj = fancyObject({
  key1: 'value1',
  key2: 'value2',
  ...addIf(false, 'key3', 'value3'), // This key will be excluded
  ...addIf(true, 'key4', 'value4'), // This key will be included
  ...multiKey(['admin', 'user'], 'value5'),
  [otherwise()]: 'the key you requested is not found!',
})

console.log(obj)

const obj1 = fancyObject({
  key1: 123,
  [otherwise()]: 'Default value when key is not found',
})

console.log(obj1.key1) // Output: 'value1'
console.log(obj1.unknownKey) // Output: 'Default value when key is not found'

const obj2 = fancyObject({
  key1: 123,
  ...addIf(true, 'key2', () => 123),
})

obj2.key2

const c = fancyObject({
  key1: '23',
  ...addIf(true, 'key2', () => 'some string'),
})
