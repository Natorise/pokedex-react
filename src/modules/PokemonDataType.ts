export interface PokemonData {
  name: string;
  id: number;
  types: string[];
  genderRatio: number[];
  height: number;
  weight: number;
  hp: number;
  atk: number;
  defense: number;
  spatk: number;
  spdef: number;
  speed: number;
  description: string;
  names: string[];
  evos: string[] | undefined;
  eggGroups: string[];
  hatchTime: number;
}
