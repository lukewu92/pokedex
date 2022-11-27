import { addPokemonAPI } from '@api/pokemon/addPokemonAPI';
import { IAddPokemon } from '@api/pokemon/types';
import { queryClient } from '@components/queryClient';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getAddedPokemonsQueryKey } from './useGetAddedPokemons';

// Hook that adds a pokemon to react query state
export const useAddPokemon = () => {
  return useMutation<IAddPokemon, AxiosError, IAddPokemon>({
    mutationFn: addPokemonAPI,
    onSuccess: (resp) => {
      queryClient.setQueryData<IAddPokemon[]>([getAddedPokemonsQueryKey], (prev => [...prev ?? [], resp]))
    }
  })
}