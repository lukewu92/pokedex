import { getPokemonsAPI } from '@api/pokemon/getPokemonsAPI';
import { IGetPokemonsAPIResponse, IGetPokemonsItem } from '@api/pokemon/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getPokemonsQueryKey = "get-pokemons"
const limit = 100;

type IUseGetPokemons = { limit: number }

export const useGetPokemons = (props?: IUseGetPokemons) => {
  const { data, isLoading, ...rest } = useInfiniteQuery<IGetPokemonsAPIResponse, Error | AxiosError>(
    [getPokemonsQueryKey],
    async ({ pageParam = 0 }) =>
      await getPokemonsAPI({ limit: props?.limit ?? limit, page: pageParam + 1 }),
    {
      keepPreviousData: true,
      getNextPageParam: (resp, allResp) =>
        resp.next ? allResp.length : undefined,
    }
  )

  if(!data || isLoading) {
    return {
      data,
      isLoading,
      ...rest,
    }
  }
  
  // Combine results
  const results = data.pages.reduce((acc, curr) => acc = [...acc, ...curr.results],[] as IGetPokemonsItem[])
  const currentData = data.pages[data.pages.length - 1]

  return {
    data: {
      ...currentData,
      results
    },
    isLoading,
    ...rest
  }
}
