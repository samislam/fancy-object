const log = require('@samislam/log')
const { fancyObject, multiKey, otherwise, access, addIf } = require('../src/index')

console.clear()
const line = '_'.repeat(process.stdout.columns)

/*--------------------*/
const test1 = fancyObject({
  key1: 'string 1',
  key2: 'string 2',
  key3: 'string 3',
})

log('TEST1', test1)
/*--------------------*/
const test2 = fancyObject({
  key1: 'string 1',
  key1: 'string 2',
  key1: 'string 3',
})

log('TEST2', line, test2)
/*--------------------*/
const test3 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  key2: 'string 2',
  key3: 'string 3',
})

log('TEST3', line, test3)
log.w(test3['admin'])
log.w(test3['administrator'])
log.w(test3['key2'])
log.w(test3['not found!'])
/*--------------------*/
const test4 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  admin: 'string 2',
  administrator: 'string 3',
})

log('TEST4', line, test4)
log.w(test4['admin'])
log.w(test4['administrator'])
log.w(test4['not found!'])

/*--------------------*/

const test5 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  admin: 'string 2',
  administrator: 'string 3',
  [otherwise()]: 'otherwise this one',
})

log('TEST5', line, test5)
log.w(test5['admin'])
log.w(test5['administrator'])
log.w(test5['not found!'])

/*--------------------*/

const test6 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  admin: 'string 2',
  administrator: 'string 3',
  [otherwise()]: 'otherwise this one',
})

log('TEST6', line, test6)
log.w(access('admin', test6))
log.w(access('administrator', test6))
log.w(access('not found!', test6))

/*--------------------*/

const test7 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  [addIf(true, 'myKey')]: "you'll see me",
  [addIf(false, 'myKey2')]: "you can't see me",
  [otherwise()]: 'otherwise this one',
})

log('TEST7', line, test7)

/*--------------------*/
