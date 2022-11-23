export type IAddPokemon = {
  imageUrl: string,
  name: string,
  types: string[]
}

// export const addPokemon = async ({ name, imageUrl, types }: IAddPokemon) => {
//   // const resp = await axios.post<IGetPokemonDetailsAPIResponse>("https://pokeapi.co/api/v2/pokemon")
//   // return resp.data
// }
