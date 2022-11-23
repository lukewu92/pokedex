import { PokemonList } from '@components/PokemonList';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokémon's Pokédex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div data-ts-portal="overlay-container" className='pointer-events-none fixed left-0 top-0 bottom-0 right-0 z-10' />
      <main className='container mx-auto my-4 p-4 md:p6'>
        <PokemonList />
      </main>
    </div>
  )
}
