import React, { useEffect } from "react";
import styles from "./Entries.module.css";

import { normalize } from "../modules/normalize";

import { pokedex } from "../modules/pokedexHandler";
import Entry from "./Entry";
import type { FiltersType } from "./Filters";
import { useLocation } from "react-router-dom";
import Filters from "./Filters";

type propsType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

const Entries = ({ filters,setFilters }: propsType) => {
  const location = useLocation();
  useEffect(()=>{
    const filters: FiltersType | undefined = location.state?.filters;

    console.log("USE EFFECT.......", Filters)
    
    if(!filters) return
    setFilters(filters) 
  },[location.state])

  let filteredPokedex = pokedex;
  filteredPokedex = filteredPokedex.filter((pokemon) => {
    let passed = true;
    if (filters.name)
      passed =
        passed &&
        pokemon.names
          .map((name: string) => normalize(name))
          .some((name: string) => name.includes(filters.name));

    if (filters.region) passed = passed && pokemon.region.toLowerCase() === filters.region;
    if (filters.type)
      passed =
        passed && pokemon.types.some((x: string) => x.toLowerCase() === filters.type);
    if (filters.rarity) passed = passed && pokemon.rarity?.includes(filters.rarity);
    return passed;
  });
  filteredPokedex = filteredPokedex.slice(0, 20);
  return (
    <div className={styles.entries}>
      {filteredPokedex.map((pokemonData) => (
        <Entry
          types={pokemonData.types}
          name={pokemonData.name}
          id={pokemonData.id}
          filters={filters}
        />
      ))}
    </div>
  );
};

export default Entries;
