import React from "react";
import Types from "./Types";
import PokemonImage from "./PokemonImage";

import { useNavigate } from "react-router-dom";

import styles from "./Entry.module.css";
import { getColorFromTypes } from "../modules/getColorFromTypes";
import type { FiltersType } from "./Filters";

type propsType = {
  types: string[];
  id: number;
  name: string;
  filters: FiltersType;
};

const Entry = ({ types, name, id,filters}: propsType) => {
  const navigate = useNavigate();

  
  const color = getColorFromTypes(types);


  return (
    <div
    onClick={() => navigate(`/dex/${id}`, { state: { filters } })}
      className={styles.entry}
      style={{ background: color }}
    >
      <p style={{ fontSize: "1.3em" }}>#{id}</p>
      <h2>{name}</h2>
      <PokemonImage pokeId={id} size={475} />

      <Types types={types} />
    </div>
  );
};

export default Entry;
