import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./Pokemon.module.css";
import pokemonIdToUrl from "../modules/pokemonIdToUrl";
import { pokedex } from "../modules/pokedexHandler";

const notFound = "Pokemon not found.";
const PokemonDex = () => {
  const { id } = useParams<{ id: string }>();

  const pokeId = Number(id);
  if (isNaN(pokeId)) return notFound;

  const pokemonData = pokedex.find((x) => x.id === pokeId);
  if (!pokemonData) return notFound;

  console.log(pokemonData);
  const navigate = useNavigate();

  const [shiny, setShiny] = useState(false);
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div className={styles.pokemonInfo}>
        <button
          onClick={() => {
            setShiny(!shiny);
          }}
        >
          Toggle Shiny
        </button>
        <h1>{pokemonData.name}</h1>
        <p>
          {pokemonData.description ? (
            <>
              {pokemonData.description}
              <br />
              <br />
            </>
          ) : (
            ""
          )}
          {"Type" + (pokemonData.types.length === 1 ? "" : "s")}:{" "}
          {pokemonData.types.join(" | ")}
          <br />
          HP: {pokemonData.hp ?? "???"}
          <br />
          Atk: {pokemonData.atk ?? "???"}
          <br />
          Def: {pokemonData.defense ?? "???"}
          <br />
          Sp. Atk: {pokemonData.spatk ?? "???"}
          <br />
          Sp. Def: {pokemonData.spdef ?? "???"}
          <br />
          Speed: {pokemonData.speed ?? "???"}
          <br />
        </p>
        <img
          // className={styles.pokemonImage}
          src={pokemonIdToUrl(pokemonData.id as number,shiny)}
          width={475}
          height={475}
          alt={pokemonData.name}
          loading="lazy"
        />
      </div>

      {/* eventually we need to change next function so that it detects what the next poke id is to account for gaps in ids */}
      {/* also need support for loop around when at id 0 */}
      <button onClick={() => navigate(`/dex/${getPreviousPokeId(pokeId)}`)}>back</button> 
      <button onClick={() => navigate(`/dex/${getNextPokeId(pokeId)}`)}>next</button> 
    </div>
  );
};

export default PokemonDex;

function wraparoundIndex(newIndex: number) {
  if(newIndex >= pokedex.length) newIndex = 0
  else if(newIndex < 0) newIndex = pokedex.length-1

  return newIndex

}


function findPokeIndex(pokeId: number) {
  return pokedex.findIndex(x=>x.id === pokeId)
}

function getNextPokeId(pokeId: number) {
  const index = findPokeIndex(pokeId)
  let newIndex = index + 1

  newIndex = wraparoundIndex(newIndex)
  let newPokeData = pokedex[newIndex]

  return newPokeData.id
}

function getPreviousPokeId(pokeId: number) {
  const index = findPokeIndex(pokeId)
  let newIndex = index - 1

  newIndex = wraparoundIndex(newIndex)
  let newPokeData = pokedex[newIndex]

  return newPokeData.id
}
