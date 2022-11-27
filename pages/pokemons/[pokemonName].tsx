import { Loading } from '@components/Loading';
import { useGetPokemonDetails } from '@hooks/pokemon/useGetPokemonDetails';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const maximumStat = 255

export default function PokemonDetail() {
  const router = useRouter()
  const { pokemonName } = router.query
  const { data, isLoading } = useGetPokemonDetails({
    name: pokemonName as string,
  })

  const goBack = useCallback(() => router.back(), [])

  return (
    <div>
      <Head>
        <title>Pokémon Details</title>
        <meta name="description" content="Pokémon's Pokédex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto my-4 relative flex flex-col">
        <h1 className="text-4xl mx-auto my-4 text-center w-fit">Pokédex</h1>
        {isLoading && <Loading overlay />}
        <button className='my-4 text-lg hover:opacity-70' onClick={goBack}>Back</button>
        <div className="rounded border border-slate-50 flex-1 flex flex-col gap-6 p-7">
          <h2 className="text-3xl capitalize">{data?.name}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 flex-col sm:flex-row">
              <div className="flex flex-col gap-4 w-fit">
                <Image
                  width={300}
                  height={300}
                  alt={data?.name}
                  src={data?.sprites.front_default}
                  className="rounded-xl bg-slate-900"
                />
                <div className="flex flex-col gap-3 mx-auto w-full max-w-[160px]">
                  <div className="flex gap-3">
                    {data?.types?.map((t) => (
                      <span
                        key={t.type.name}
                        className="p-3 bg-slate-50 text-black rounded text-xs uppercase"
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                  <span className="flex justify-between items-center w-full">
                    <span>{`HT:`}</span>
                    <span>{`${data?.height}cm`}</span>
                  </span>
                  <span className="flex justify-between items-center w-full">
                    <span>{`WT:`}</span>
                    <span>{`${data?.weight}kg`}</span>
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 p-4 ml-auto border border-slate-50 flex-1 rounded-lg">
                {data?.stats.map((stat) => (
                  <div  key={stat.stat.name} className="flex items-center gap-4">
                    <span className='w-[120px] uppercase'>{stat.stat.name}:</span>
                    <div className="h-10 w-full bg-slate-100 p-2 rounded ">
                      <div className='animate-fade-grow-exp origin-left w-full h-full'><div style={{ transform: `scaleX(${Number(stat.base_stat/maximumStat).toFixed(2)})`, transformOrigin: 'left'}} className={`w-full h-full bg-slate-900 rounded`} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl rounded w-fit mt-4 underline">
                Abilities
              </h3>
              <div className="flex gap-4 flex-wrap">
                {data?.abilities?.map((ab) => (
                  <span
                    key={ab?.ability?.name}
                    className={
                      "bg-slate-900 rounded text-center py-3 px-4 text-xs"
                    }
                  >
                    {ab?.ability?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl rounded w-fit mt-4 underline">Moves</h3>
              <div className='overflow-auto max-h-[400px]'>
              <div className="flex gap-4 flex-wrap">
                {data?.moves?.map((mov) => (
                  <span
                    key={mov?.move?.name}
                    className={
                      "bg-slate-900 rounded text-center py-3 px-4 text-xs"
                    }
                  >
                    {mov?.move?.name}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* <PokemonList /> */}
      </main>
    </div>
  )
}
