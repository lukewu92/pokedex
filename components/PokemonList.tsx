import { IPokemonType, PokemonTypes } from '@api/pokemon/types';
import { AddPokemonPopup } from '@components/AddPokemonPopup';
import { useGetAddedPokemons } from '@hooks/pokemon/useGetAddedPokemons';
import { useGetPokemonDetails } from '@hooks/pokemon/useGetPokemonDetails';
import { useGetPokemons } from '@hooks/pokemon/useGetPokemons';
import { PlusIcon } from '@icons/PlusIcon';
import { getSrcFromBase64Image } from '@utils/getSrcFromBase64Image';
import Image from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';

import { Loading } from './Loading';

type ILinkWrapper = HTMLAttributes<HTMLDivElement> & {
  link?: string
}

const LinkWrapper = ({ link, children }: ILinkWrapper) => {
  if (link) {
    return <Link href={link}>{children}</Link>
  }
  return <React.Fragment>{children}</React.Fragment>
}
/* Response from api for pokemon type is in this format, however the one stored in indexedDB is a little different */
type IPokemonListItem = HTMLAttributes<HTMLDivElement> & {
  name: string
  imageData?: string
  types?: IPokemonType[]
  pokemonId?: string
}

const PokemonListItem = ({
  name,
  imageData,
  types,
  pokemonId,
}: IPokemonListItem) => {
  // Don't query if imageData already exist since we can assumate it's from indexedDB if imageData is already there
  const { data, isLoading: fetchingPokemonDetails } = useGetPokemonDetails({
    name: imageData ? undefined : name,
  })
  const imageSrc = imageData
    ? getSrcFromBase64Image(imageData)
    : data?.sprites.front_default

  const isLoading = !imageSrc ? fetchingPokemonDetails : false

  const pokemonType = useMemo(() => {
    return types
      ? types.map((typeName, slot) => ({
          slot,
          type: {
            name: typeName,
            url: (() => {
              //@ts-ignore
              const typeNdex = PokemonTypes.findIndex((t) => t === typeName)
              return `https://pokeapi.co/api/v2/type/${typeNdex}/`
            })(),
          },
        }))
      : data?.types
  }, [types, data])

  const pokeId = pokemonId ?? data?.id

  return (
    <LinkWrapper link={data?.name ? `/pokemons/${data?.name}` : undefined}>
      <div className={`transition-all group relative flex flex-col items-center justify-center rounded sm:rounded-lg border border-slate-400 p-4 gap-4 aspect-square ${data?.name ? 'hover:outline hover:outline-4 hover:outline-slate-50' : ''}`}>
        <div className="relative w-full max-w-[200px] aspect-square bg-slate-900/50 flex items-center justify-center rounded-xl overflow-hidden group-hover:scale-110 transition-all">
          {imageSrc && (
            <Image width={200} height={200} src={imageSrc} alt={name} />
          )}
          {isLoading && <Loading overlay />}
        </div>
        {pokeId && (
          <span
            className={`absolute -top-3 -left-3 ${
              pokemonId ? "bg-blue-300 text-black" : "bg-white text-black"
            } rounded px-3 py-3 flex items-center justify-center leading-none text-center text-xs`}
          >
            # {pokeId}
          </span>
        )}
        <span className="font-medium text-white text-xs sm:text-sm">
          {name.toUpperCase()}
        </span>
        {pokemonType && (
          <div className="flex gap-2">
            {pokemonType.map((t) => (
              <span
                key={t.slot}
                className="text-slate-900 bg-white/80 p-1 rounded text-[8px]"
              >
                {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </LinkWrapper>
  )
}

export const AddedPokemonList = () => {
  const { data: addedPokemons, isLoading: isLoadingAddedPokemons } =
    useGetAddedPokemons()

  if (!addedPokemons || !addedPokemons?.length) return null
  return (
    <div className="flex flex-col gap-4">
      <span className="bg-white w-full h-[2px] my-6" />
      <div className="flex items-center gap-4 whitespace-nowrap text-base">
        <span>{`Added Pokemons:`}</span>
        <span>{addedPokemons?.length ?? "0"}</span>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {isLoadingAddedPokemons && <Loading />}
        {addedPokemons &&
          addedPokemons?.map(({ name, imageData, types }, index) => (
            <PokemonListItem
              key={name}
              name={name}
              imageData={imageData}
              types={types}
              pokemonId={String(index + 1)}
            />
          ))}
      </div>
      <span className="bg-white w-full h-[2px] my-6" />
    </div>
  )
}

export const AddPokemonPopupContainer = () => {
  const [addPokemonPopupVisible, setAddPokemonPopupVisible] = useState(false)
  const togglePopupVisibility = useCallback(
    () => setAddPokemonPopupVisible((prev) => !prev),
    [],
  )
  return (
    <React.Fragment>
      <div className="flex items-center gap-4 p-4 sticky top-0 z-10">
        <button
          onClick={togglePopupVisibility}
          className="w-12 h-12 flex items-center justify-center rounded bg-white text-slate-900 ml-auto hover:opacity-70 active:opacity-90 active:scale-95"
        >
          <PlusIcon className="text-4xl" />
        </button>
      </div>
      {addPokemonPopupVisible && (
        <AddPokemonPopup onClosePopup={togglePopupVisibility} />
      )}
    </React.Fragment>
  )
}

export const PokemonList = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetPokemons()

  // Observe load more button
  useEffect(() => {
    const loadMoreButton = document.querySelector<HTMLButtonElement>(
      `[data-js-component="load-more-button"]`,
    )
    let loadMoreObserver: IntersectionObserver
    if (Boolean(data)) {
      if (loadMoreButton) {
        loadMoreObserver = new IntersectionObserver(
          (e) => {
            //@ts-ignore
            if (e?.[0]?.isIntersecting) {
              fetchNextPage()
            }
          },
          {
            root: null,
            threshold: 0.5,
          },
        )
        loadMoreObserver.observe(loadMoreButton)
      }
    }
    return () => {
      if (loadMoreObserver && loadMoreButton)
        loadMoreObserver.unobserve(loadMoreButton)
    }
  }, [data, isFetchingNextPage, fetchNextPage])

  const showLoadMoreButton =
    data?.count && !isLoading && hasNextPage && !isFetchingNextPage

  return (
    <React.Fragment>
      <AddPokemonPopupContainer />
      <div className="flex flex-col gap-4 p-4">
        <AddedPokemonList />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[400px] sm:gap-6">
          {isLoading && <Loading overlay />}
          {data &&
            data?.results.map(({ name }) => (
              <PokemonListItem key={name} name={name} />
            ))}
        </div>
        {showLoadMoreButton && (
          <button
            className={`bg-white text-black rounded p-4 mx-auto text-lg hover:opacity-70 ${
              !showLoadMoreButton ? "hidden" : ""
            }`}
            onClick={() => fetchNextPage()}
            data-js-component="load-more-button"
          >
            LOAD MORE
          </button>
        )}

        {isFetchingNextPage && <Loading className="my-4" />}
        {isError && (
          <span className="bg-red-100 text-red-500">{error?.message}</span>
        )}
      </div>
    </React.Fragment>
  )
}
