import { openDB } from 'idb';

import { dbName, dbVersion, tableName } from './types';

export const getPokemonIndexedDB = async () => {
  const indexedDB = await openDB(dbName, dbVersion, {
    upgrade(db) {
      // Initialize and check if table name exist, if no, create store
      if (!db.objectStoreNames.contains(tableName)) {
        db.createObjectStore(tableName, { autoIncrement: true, keyPath: "id" })
      }
    },
  })
  return indexedDB
}
