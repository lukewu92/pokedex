import { getPokemonDetailAPI } from '@api/pokemon/getPokemonDetailsAPI';
import { IGetPokemonDetailsAPIParams, IGetPokemonDetailsAPIResponse } from '@api/pokemon/types';
import { useQuery } from '@tanstack/react-query';

const getPokemonDetailsQueryKey = "get-pokemon-details"

export const useGetPokemonDetails = ({
  nDex,
  name,
}: IGetPokemonDetailsAPIParams) => {
  return useQuery<IGetPokemonDetailsAPIResponse>(
    [getPokemonDetailsQueryKey, nDex ?? name],
    async () => await getPokemonDetailAPI({ nDex, name })
  )
}
