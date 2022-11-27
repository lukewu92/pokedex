import { getPokemonIndexedDB } from '@api/pokemon/getPokemonIndexedDB';

import { IAddPokemon, tableName } from './types';

// Get Added Pokemon from indexedDB
export const getAddedPokemonAPI = async () => {
  const db = await getPokemonIndexedDB()
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName)
  const result: IAddPokemon[] = await store.getAll()
  return result
}
