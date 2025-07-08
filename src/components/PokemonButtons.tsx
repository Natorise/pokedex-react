import React from "react";

import { IoSparkles } from "react-icons/io5";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

import styles from "./PokemonButtons.module.css";
import { pokedex } from "../modules/pokedexHandler";
import { useLocation, useNavigate } from "react-router-dom";

type PropsType = {
  pokeId: number;
  shiny: boolean;
  setShiny: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokemonButtons = ({ pokeId, shiny, setShiny }: PropsType) => {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;


  const [previousPokeData, nextPokeData] = getPreviousNextPokeData(pokeId);

  const toggleShiny = () => {
    setShiny(!shiny);
  };

  return (
    <div className={styles.buttons}>
      <div
        className={`${styles.button} ${styles.leftButton}`}
        onClick={() => {
          navigate(`/dex/${previousPokeData.id}`, { state });
        }}
      >
        <IoArrowBackOutline size={50} color="white" />
        {previousPokeData.name}
      </div>
      <div
        className={`${styles.button} ${styles.centerButton} ${
          shiny ? styles.true : styles.false
        }`}
        onClick={toggleShiny}
      >
        <IoSparkles color="white" size={50} />
      </div>
      <div
        className={`${styles.button} ${styles.rightButton}`}
        onClick={() => {
          navigate(`/dex/${nextPokeData.id}`, { state });
        }}
      >
        {nextPokeData.name}
        <IoArrowForwardOutline color="white" size={50} />
      </div>
    </div>
  );
};

export default PokemonButtons;

function wraparoundIndex(newIndex: number) {
  if (newIndex >= pokedex.length) newIndex = 0;
  else if (newIndex < 0) newIndex = pokedex.length - 1;

  return newIndex;
}

function findPokeIndex(pokeId: number) {
  return pokedex.findIndex((x) => x.id === pokeId);
}

function getPreviousNextPokeData(pokeId: number) {
  const index = findPokeIndex(pokeId);
  let previousIndex = wraparoundIndex(index - 1);
  let nextIndex = wraparoundIndex(index + 1);

  let newPokeDatas = [pokedex[previousIndex], pokedex[nextIndex]];
  return newPokeDatas;
}