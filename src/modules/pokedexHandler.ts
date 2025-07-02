import pokedex from "../../data/pokedex.json";


function hasNumberId(pokemonData: any) {
  return typeof pokemonData.id === "number" && pokemonData.id >0;
}

const newPokedex = pokedex
  .filter(hasNumberId)
  .sort((a, b) => Number(a.id) - Number(b.id));


export { newPokedex as pokedex }