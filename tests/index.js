const log = require('@samislam/log')
const { fancyObject, multiKey } = require('../src/index')

console.clear()
const line = '_'.repeat(process.stdout.columns)

/*--------------------*/
const test1 = fancyObject({
  key1: 'string 1',
  key2: 'string 2',
  key3: 'string 3',
})

log(test1)
/*--------------------*/
const test2 = fancyObject({
  key1: 'string 1',
  key1: 'string 2',
  key1: 'string 3',
})

log(line, test2)
/*--------------------*/
const test3 = fancyObject({
  [multiKey(['admin', 'administrator'])]: 'inside admin/administrator',
  key2: 'string 2',
  key3: 'string 3',
})

log(line, test3)
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

log(line, test4)
log.w(test4['admin'])
log.w(test4['administrator'])
log.w(test4['not found!'])

/*--------------------*/
