// src/playground.ts
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
