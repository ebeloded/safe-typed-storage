import { stringify, parse } from "devalue";

type PersistentStorage = "localStorage" | "sessionStorage";

interface StorageOptions {
  storage?: PersistentStorage;
  ttl?: number;
}
const isLocationAvailable = (location: "localStorage" | "sessionStorage") => {
  try {
    if (typeof window !== "undefined" && window[location]) {
      return true;
    }
  } catch (err) {
    // Local storage is not available. Changes won't persist.
  }

  return false;
};

const isLocation = (
  locationOrOptions: PersistentStorage | StorageOptions
): locationOrOptions is PersistentStorage =>
  typeof locationOrOptions === "string";

const storages: {
  [name in "localStorage" | "sessionStorage"]: Storage | undefined;
} = {
  localStorage: isLocationAvailable("localStorage")
    ? window.localStorage
    : void 0,
  sessionStorage: isLocationAvailable("sessionStorage")
    ? window.sessionStorage
    : void 0,
};
type StoredItem<T = any> = { value: T; expires?: number };

const memoMap = new Map<string, StoredItem>();

function safeTypedStorage<T>(
  key: string,
  locationOrOptions?: PersistentStorage | StorageOptions
) {
  const { storage, ttl } = locationOrOptions
    ? isLocation(locationOrOptions)
      ? { storage: locationOrOptions, ttl: void 0 }
      : locationOrOptions
    : { storage: void 0, ttl: void 0 };

  const persistentStorage = storage && storages[storage];

  function set(value: T): void {
    const memo: StoredItem<T> = {
      value,
      expires: ttl ? Date.now() + ttl : void 0,
    };

    memoMap.set(key, memo);

    persistentStorage?.setItem(key, stringify(memo));
  }

  function remove() {
    memoMap.delete(key);
    persistentStorage?.removeItem(key);
  }

  function get(): T | undefined {
    const memo = memoMap.get(key);
    if (memo) {
      const { value, expires } = memo;
      if (!expires || expires > Date.now()) return value;
    }

    const itemStr = persistentStorage?.getItem(key);

    if (!itemStr) return;

    try {
      const { value, expires } = parse(itemStr) as StoredItem<T>;
      if (!expires) return value;

      if (expires > Date.now()) {
        memoMap.set(key, { value, expires });
        return value;
      } else {
        remove();
        return;
      }
    } catch {}
    return;
  }

  return {
    get,
    set,
    remove,
  };
}

export default safeTypedStorage;
