import { getAddedPokemonAPI } from '@api/pokemon/getAddedPokemonAPI';
import { useQuery } from '@tanstack/react-query';

export const getAddedPokemonsQueryKey = "get-added-pokemons"

export const useGetAddedPokemons = () => {
  return useQuery([getAddedPokemonsQueryKey], getAddedPokemonAPI)
}
