export type IPokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export type IPokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export type IPokemonSprite = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;

}

export type IPokemon = {
  id: number;
  order: number;
  name: string;
  weight: number;
  height: number;
  types: IPokemonType[];
  stats: IPokemonStat[];
  sprites: IPokemonSprite;
}