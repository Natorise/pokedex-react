import React from 'react'

import styles from "./PokemonImage.module.css"
import pokemonIdToUrl from "../modules/pokemonIdToUrl";

const PokemonImage = ({pokeId, size}: {pokeId: number, size: number}) => {
  return (
    <img
    className={styles.pokemonImage}
    src={pokemonIdToUrl(pokeId)}
    width={size}
    height={size}
    loading="lazy"
  />
)
}

export default PokemonImage