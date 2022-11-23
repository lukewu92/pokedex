import { IAddPokemon } from '@api/pokemon/addPokemonAPI';
import { queryClient } from '@components/queryClient';

import { getAddedPokemonsQueryKey } from './useGetAddedPokemons';

export const useAddPokemon = () => {

  return (params: IAddPokemon) => {
    queryClient.setQueryData<IAddPokemon[]>([getAddedPokemonsQueryKey], (prev => [...prev ?? [], {...params}]))
  }
  
}