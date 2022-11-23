import { IAddPokemon } from '@api/pokemon/addPokemonAPI';
import { useQuery } from '@tanstack/react-query';

export const getAddedPokemonsQueryKey = "get-added-pokemons"

const getAddedPokemonFromIndexDb = () => {
  return [] as IAddPokemon[]
}

export const useGetAddedPokemons = () => {
  return useQuery(
    [getAddedPokemonsQueryKey],
    getAddedPokemonFromIndexDb
  )
}
