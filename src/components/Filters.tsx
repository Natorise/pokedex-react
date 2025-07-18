import React from "react";

import regions from "../../data/regions.json";
import typeColors from "../../data/typeColors.json";
import rarities from "../../data/rarities.json";
import upperCaseFirst from "../modules/upperCaseFirst";
import styles from "./Filters.module.css";
import { pokedex } from "../modules/pokedexHandler";
import { normalize } from "../modules/normalize";
import { pokesPerPage } from "./Entries";

const types: string[] = Object.keys(typeColors);

export type FiltersType = {
  name: string;
  region: string;
  type: string;
  rarity: string;
};

type PropsType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setPokesLoaded: React.Dispatch<React.SetStateAction<number>>;
};

export const defaultFilters = {
  name: "",
  region: "",
  type: "",
  rarity: "",
};

const Filters = ({
  filters,
  setFilters,
  setPokesLoaded,
}: PropsType) => {
  const updateFilters = (key: keyof FiltersType, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPokesLoaded(pokesPerPage);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters("name", e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters(e.target.id as keyof FiltersType, e.target.value);
  };

  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Name"
        value={filters.name}
        onChange={onNameChange}
      />
      <select id="region" onChange={onSelectChange} value={filters.region}>
        <option value="">Select Region</option>
        {regions.map((x) => (
          <option value={x} key={x}>
            {upperCaseFirst(x)}
          </option>
        ))}
      </select>
      <select id="type" onChange={onSelectChange} value={filters.type}>
        <option value="">Select Type</option>
        {types.map((x) => (
          <option value={x} key={x}>
            {upperCaseFirst(x)}
          </option>
        ))}
      </select>
      <select id="rarity" onChange={onSelectChange} value={filters.rarity}>
        <option value="">Select Rarity</option>
        {rarities.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;

export function filterPokedex(filters: FiltersType) {
  let filteredPokedex = pokedex;
  filteredPokedex = filteredPokedex.filter((pokemon) => {
    let passed = true;
    if (filters.name)
      passed =
        passed &&
        pokemon.names
          .map((name: string) => normalize(name))
          .some((name: string) => name.includes(filters.name));

    if (filters.region)
      passed = passed && pokemon.region.toLowerCase() === filters.region;
    if (filters.type)
      passed =
        passed &&
        pokemon.types.some((x: string) => x.toLowerCase() === filters.type);
    if (filters.rarity)
      passed = passed && pokemon.rarity?.includes(filters.rarity);
    return passed;
  });

  return filteredPokedex;
}
