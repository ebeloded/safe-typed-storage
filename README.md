# safe-typed-storage 🗃

A safe, typed, and easy to use key-value storage library for the browser. Allows saving and retrieving serializable objects to localStorage, sessionStorage, with memory fallback.

## Features

- 🤩 **Simple** - Easy to use API
- 🪢 **Versatile** - Use localStorage, sessionStorage, or memory
- ⏱ **TTL** - Set a time to live for your data
- 🔒 **Safe** - Can be safely used in browser (no need to check if localStorage is available) or Node.js
- 🚀 **Small** - Only 0.5kb gzipped

## Installation

```sh
npm install safe-typed-storage
```

## Usage

```ts
import sts from "safe-typed-storage";

// Create a new instance of the storage
const fooStorage = sts("FOO_KEY", { storage: "localStorage" });

// Set a value
fooStorage.set({ value: "bar" });

// Get a value
fooStorage.get(); // { value: 'bar' }

// Delete a value
fooStorage.remove();
```
