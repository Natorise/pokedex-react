import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Entries.module.css";

import Entry from "./Entry";
import { filterPokedex, type FiltersType } from "./Filters";
import { useLocation } from "react-router-dom";
import LoadHomeState from "./LoadHomeState";
type PropsType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  pokesLoaded: number;
  setPokesLoaded: React.Dispatch<React.SetStateAction<number>>;
};

export const pokesPerPage = 20;

const Entries = ({ filters, setFilters,pokesLoaded, setPokesLoaded }: PropsType) => {

  const filteredPokedex = useMemo(() => {
    return filterPokedex(filters);
  }, [filters]);

  const slicedPokedex = useMemo(() => {
    return filteredPokedex.slice(0, pokesLoaded);
  }, [filteredPokedex, pokesLoaded]);

  const lengthRef = useRef(filteredPokedex.length);
  useEffect(() => {
    lengthRef.current = filteredPokedex.length;
    // setPokesLoaded(perPage)
  }, [filteredPokedex]);

  useEffect(() => {
    const handleScroll = () => {
      if (pokesLoaded >= lengthRef.current) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPokesLoaded((prev) => prev + 20);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll",handleScroll);
  }, []);

  return (
    <div className={styles.entries}>
      <LoadHomeState setFilters={setFilters} pokesLoaded={pokesLoaded} setPokesLoaded={setPokesLoaded}/>
      {slicedPokedex.map((pokemonData) => (
        <Entry
          key={pokemonData.id}
          types={pokemonData.types}
          name={pokemonData.name}
          id={pokemonData.id}
          filters={filters}
          pokesLoaded={pokesLoaded}
        />
      ))}
    </div>
  );
};

export default Entries;
