import { PokemonList } from '@components/PokemonList';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokémon</title>
        <meta name="description" content="Pokémon's Pokédex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto my-4'>
        <h1 className='text-4xl mx-auto my-4 text-center w-fit'>Pokédex</h1>
        <PokemonList />
      </main>
    </div>
  )
}
