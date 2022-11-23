import { IPokemon } from '@model/pokemon/types';

export type IGetPokemonsItem = {
  name: string;
  url: string;
}
export type IGetPokemonsAPIParams = {
  limit?: number;
  page?: number;
}

export type IGetPokemonsAPIResponse = {
  count: number;
  next: true | null;
  previous: true | null;
  results: IGetPokemonsItem[]
}

export type IGetPokemonDetailsAPIParams = {
  nDex?: number;
  name?: string;
}

export type IGetPokemonDetailsAPIResponse = IPokemon
