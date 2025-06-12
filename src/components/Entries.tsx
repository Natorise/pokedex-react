import React from "react";
import styles from "./Entries.module.css";

import typeColors from "../../data/typeColors.json";
import { Link, useNavigate} from "react-router-dom";
import { normalize } from "../modules/normalize";
import pokemonIdToUrl from "../modules/pokemonIdToUrl";


import { pokedex } from "../modules/pokedexHandler";

type propsType = {pokeName: string}

const Entries = ({pokeName}: propsType) => {
  const navigate = useNavigate();
  
  let filteredPokedex = pokedex
  if(pokeName) filteredPokedex = filteredPokedex.filter(x=>x.names.map(x=>normalize(x)).some(x=>x.includes(pokeName)))

  return (
    <div className={styles.entries}>      
      {filteredPokedex.map((pokemonData) => {
        const color = getColorFromTypes(pokemonData.types);

        return (
          <div onClick={() => navigate(`/dex/${pokemonData.id}`)} className={styles.entry} style={{ background: color }}>
            <h1>{pokemonData.name}</h1>
            <p>stats</p>
            <p>type: {pokemonData.types.join(" | ")}</p>
            <img
              className={styles.pokemonImage}
              src={pokemonIdToUrl(pokemonData.id as number)}
              width={475}
              height={475}
              alt={pokemonData.name}
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Entries;




// react-window use this for scroll pagination

function getColorFromType(type: string): string {
  type = type.toLowerCase();
  if (type in typeColors) {
    return typeColors[type as keyof typeof typeColors];
  } else return "#aaaaaa";
}

function getColorFromTypes(types: string[]): string {
  const [type1, type2] = types;

  if (!type2) return getColorFromType(type1);

  // old ${getColorFromType(type1)}, ${getColorFromType(type2)})

  return `linear-gradient(
    to bottom, 
    ${getColorFromType(type1)} 0%,
    ${getColorFromType(type1)} 10%,
    ${getColorFromType(type2)} 90%,
    ${getColorFromType(type2)} 100%
  )`;
}

