import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./PokemonDex.module.css";
import { pokedex } from "../modules/pokedexHandler";
import Types from "../components/Types";
import PokemonImage from "../components/PokemonImage";
import { getColorFromTypes } from "../modules/getColorFromTypes";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import PokemonButtons from "../components/PokemonButtons";
import ScrollToTop from "../components/ScrollToTop";
import PokemonLeftCard from "../components/PokemonLeftCard";
import PokemonRightCard from "../components/PokemonRightCard";

const notFound = "Pokemon not found.";

const PokemonDex = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const state = location.state;
  const pokeId = Number(id);
  if (isNaN(pokeId)) return notFound;

  const pokemonData = pokedex.find((x) => x.id === pokeId);
  if (!pokemonData) return notFound;
  const navigate = useNavigate();

  const [shiny, setShiny] = useState(false);
  const color = getColorFromTypes(pokemonData.types);

  return (
    <div>
      <ScrollToTop />
      <IoArrowBackCircleOutline
        className={styles.backButton}
        size={70}
        onClick={() => navigate("/", { state })}
      />
      <div className={styles.center}>
        <PokemonButtons
          pokeId={pokemonData.id}
          shiny={shiny}
          setShiny={setShiny}
        />
        <div className={styles.main} style={{ background: color }}>
          <PokemonLeftCard pokemonData={pokemonData} shiny={shiny} />
          <PokemonRightCard pokemonData={pokemonData} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDex;
