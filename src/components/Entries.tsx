import React, { useEffect } from "react";
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

  let filteredPokedex = filterPokedex(filters);
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
