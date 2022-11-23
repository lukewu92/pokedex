import { IGetPokemonDetailsAPIParams, IGetPokemonDetailsAPIResponse } from '@api/pokemon/types';
import axios from 'axios';

export const getPokemonDetailAPI = async ({ nDex, name }: IGetPokemonDetailsAPIParams ) => {
  const resp = await axios.get<IGetPokemonDetailsAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${nDex ?? name}`)
  return resp.data
}
