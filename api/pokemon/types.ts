import { IPokemon } from '@model/pokemon/types';

export type IPokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"

export type IAddPokemon = {
  imageData?: string
  name: string
  types: IPokemonType[]
}

export type IGetPokemonsItem = {
  name: string
  url: string
}
export type IGetPokemonsAPIParams = {
  limit?: number
  page?: number
}

export type IGetPokemonsAPIResponse = {
  count: number
  next: true | null
  previous: true | null
  results: IGetPokemonsItem[]
}

export type IGetPokemonDetailsAPIParams = {
  nDex?: number
  name?: string
}

export type IGetPokemonDetailsAPIResponse = IPokemon

export const dbName = "pokemon"
export const dbVersion = 1
export const tableName = "added-pokemons"
export const PokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
] as IPokemonType[]
