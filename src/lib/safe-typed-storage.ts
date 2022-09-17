type StorageLocation = 'localStorage' | 'sessionStorage'

interface StorageOptions {
  location?: StorageLocation
  ttl?: number
}
const isLocationAvailable = (location: 'localStorage' | 'sessionStorage') => {
  try {
    if (typeof window !== 'undefined' && window[location]) {
      return true
    }
  } catch (err) {
    // Local storage is not available. Changes won't persist.
  }

  return false
}

const isLocation = (
  locationOrOptions: StorageLocation | StorageOptions
): locationOrOptions is StorageLocation => typeof locationOrOptions === 'string'

const storages: {
  [name in 'localStorage' | 'sessionStorage']: Storage | undefined
} = {
  localStorage: isLocationAvailable('localStorage')
    ? window.localStorage
    : void 0,
  sessionStorage: isLocationAvailable('sessionStorage')
    ? window.sessionStorage
    : void 0,
}
type StoredItem<T = any> = { value: T; expires?: number }

const memoMap = new Map<string, StoredItem>()

function safeTypedStorage<T>(
  key: string,
  locationOrOptions?: StorageLocation | StorageOptions
) {
  const { location, ttl } = locationOrOptions
    ? isLocation(locationOrOptions)
      ? { location: locationOrOptions, ttl: void 0 }
      : locationOrOptions
    : { location: void 0, ttl: void 0 }

  const storage = location && storages[location]

  function set(value: T): void {
    console.log('set', { value })
    const memo: StoredItem<T> = {
      value,
      expires: ttl ? Date.now() + ttl : void 0,
    }
    memoMap.set(key, memo)
    storage?.setItem(key, JSON.stringify(memo))
  }

  function remove() {
    memoMap.delete(key)
    storage?.removeItem(key)
  }

  function get(): T | undefined {
    const memo = memoMap.get(key)
    if (memo) {
      const { value, expires } = memo
      if (!expires || expires > Date.now()) return value
    }

    const itemStr = storage?.getItem(key)

    if (!itemStr) return

    try {
      const { value, expires } = JSON.parse(itemStr) as StoredItem<T>
      if (!expires) return value

      if (expires > Date.now()) {
        memoMap.set(key, { value, expires })
        return value
      } else {
        remove()
        return
      }
    } catch {}
    return
  }

  return {
    get,
    set,
    remove,
  }
}

export default safeTypedStorage
