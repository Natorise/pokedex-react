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
  pokesLoaded: number;  
};

const Entry = ({ types, name, id, filters,pokesLoaded }: propsType) => {
  const navigate = useNavigate();

  const color = getColorFromTypes(types);

  const onClick = ()=>{
    const navOptions = { state: { filters, pokesLoaded, scrollY:window.scrollY} }
    navigate(`/dex/${id}`, navOptions)
  }

  return (
    <div
      onClick={onClick}
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
