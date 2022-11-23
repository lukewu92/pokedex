import { IGetPokemonsAPIParams, IGetPokemonsAPIResponse } from '@api/pokemon/types';
import axios from 'axios';


export const getPokemonsAPI = async ({ limit = 20, page = 1 }: IGetPokemonsAPIParams) => {
  const resp = await axios.get<IGetPokemonsAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`)
  return resp.data
}
