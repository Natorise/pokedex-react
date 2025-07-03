import React from 'react'

import styles from "./PokemonImage.module.css"
import pokemonIdToUrl from "../modules/pokemonIdToUrl";

const PokemonImage = ({pokeId, size, shiny = false}: {pokeId: number, size: number, shiny?: boolean}) => {
  return (
    <img
    className={styles.pokemonImage}
    src={pokemonIdToUrl(pokeId,shiny)}
    width={size}
    height={size}
    loading="lazy"
  />
)
}

export default PokemonImage