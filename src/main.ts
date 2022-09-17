import safeTypedStorage from './lib/safe-typed-storage'

const test1 = safeTypedStorage('test')

test1.set('hello world')

console.log(test1.get())

const test2 = safeTypedStorage('test2', 'sessionStorage')

test2.set([1, 2, 3])
console.log('test2', test2.get())

const test3 = safeTypedStorage('test3', 'localStorage')

test3.set({ a: "'asdf'" })

console.log('test3', test3.get())
