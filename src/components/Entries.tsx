import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Entries.module.css";

import Entry from "./Entry";
import { filterPokedex, type FiltersType } from "./Filters";
import { useLocation } from "react-router-dom";
type propsType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

const Entries = ({ filters, setFilters }: propsType) => {
  const location = useLocation();
  useEffect(() => {
    const filters: FiltersType | undefined = location.state?.filters;

    if (!filters) return;
    setFilters(filters);
  }, [location.state]);

  const perPage = 20;
  const [pokesLoaded, setPokesLoaded] = useState(perPage);

  const filteredPokedex = useMemo(() => {
    return filterPokedex(filters);
  }, [filters]);

  const slicedPokedex = useMemo(() => {
    return filteredPokedex.slice(0, pokesLoaded);
  }, [filteredPokedex, pokesLoaded]);

  const lengthRef = useRef(filteredPokedex.length);
  useEffect(() => {
    lengthRef.current = filteredPokedex.length;
    setPokesLoaded(perPage);
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
      {slicedPokedex.map((pokemonData) => (
        <Entry
          key={pokemonData.id}
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
