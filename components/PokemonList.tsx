import { useGetPokemonDetails } from '@hooks/pokemon/useGetPokemonDetails';
import { useGetPokemons } from '@hooks/pokemon/useGetPokemons';
import Image from 'next/image';
import React from 'react';

import { Loading } from './Loading';

const PokemonListItem = ({ name }: { name: string }) => {
  const { data, isLoading } = useGetPokemonDetails({ name })

  return (
    <div className="relative flex flex-col items-center justify-center rounded sm:rounded-lg border border-slate-400 p-4 gap-4 aspect-square">
      <div className="relative w-full max-w-[200px] aspect-square bg-slate-900/50 flex items-center justify-center rounded-xl">
        {data && (
          <Image
            width={200}
            height={200}
            src={data.sprites.front_default}
            alt={name}
          />
        )}
        {isLoading && <Loading overlay />}
      </div>
      {data && (
        <span className="absolute -top-3 -left-3 bg-white text-black rounded px-3 py-3 flex items-center justify-center leading-none text-center text-xs">
          # {data?.id}
        </span>
      )}
      <span className="font-medium text-white text-xs sm:text-sm">
        {name.toUpperCase()}
      </span>
      {data && (
        <div className='flex gap-2'>
          {data.types.map((t) => (
            <span key={t.slot} className='text-slate-900 bg-white/80 p-1 rounded text-[8px]'>{t.type.name.toUpperCase()}</span>
          ))}
          </div>
      )}
    </div>
  )
}

export const PokemonList = () => {
  const { data, isLoading, isFetchingNextPage, isError, error, hasNextPage, fetchNextPage } =
    useGetPokemons()

    
  return (
    <div className='flex flex-col gap-4'>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 min-h-[400px] sm:p-6 sm:gap-6">
        {isLoading && <Loading overlay />}
        {data &&
          data?.results.map(({ name }) => (
            <PokemonListItem key={name} name={name} />
          ))}
      </div>
      {hasNextPage && !isFetchingNextPage && (
        <button className="bg-white text-black rounded p-4 mx-auto text-lg hover:opacity-70" onClick={() => fetchNextPage()}>
          LOAD MORE
        </button>
      )}
      {isFetchingNextPage && <Loading className='my-4' />}
      {isError && <span className='bg-red-100 text-red-500'>{error?.message}</span>}
    </div>
  )
}
