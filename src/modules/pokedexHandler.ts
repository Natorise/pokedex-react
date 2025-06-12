import pokedex from "../../data/pokedex.json";


function hasNumberId(pokemonData: any) {
  return typeof pokemonData.id === "number";
}

const newPokedex = pokedex
  .filter(hasNumberId)
  .sort((a, b) => Number(a.id) - Number(b.id));


export { newPokedex as pokedex }