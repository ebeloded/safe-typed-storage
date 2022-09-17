import { describe, expect, it } from 'vitest'
import safeTypedStorage from './safe-typed-storage'

describe('safe-typed-storage', () => {
  it('should work', () => {
    const storage = safeTypedStorage<any>('test', {})

    storage.set(1)
    expect(storage.get()).toBe(1)
  })
})
