// import axios from "axios"
import { IAddPokemon } from './types';

export const addPokemonAPI = async (formData: IAddPokemon) => {
  // Store added pokemon into indexedDB
  console.log('formData', formData)
  // const db = await getPokemonIndexedDB()
  // const tx = db.transaction(tableName, 'readwrite');
  // const store = tx.objectStore(tableName)
  // const result = await store.put(formData)
  // console.log('Put Data ', JSON.stringify(result));
  
  // What an actual Add Pokemon API might look like
  // const resp = await axios.post<IAddPokemon>("https://pokeapi.co/api/v2/pokemon", formData)
  // return resp.data
  return formData
}
