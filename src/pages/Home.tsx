import { useState } from "react";
import Entries, { pokesPerPage } from "../components/Entries";
import Filters, {
  type FiltersType,
  defaultFilters,
} from "../components/Filters";

import styles from "./Home.module.css";

const Home = () => {
  const [filters, setFilters] = useState<FiltersType>({ ...defaultFilters });
  const [pokesLoaded, setPokesLoaded] = useState(pokesPerPage);

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
    setPokesLoaded(pokesPerPage)
  };

  return (
    <div className={styles.home}>
      <img
        className={styles.title}
        src="/Pokedex.png"
        height={100}
        onClick={resetFilters}
      />
      <Filters
        filters={filters}
        setFilters={setFilters}
        setPokesLoaded={setPokesLoaded}
      />
      <Entries
        filters={filters}
        setFilters={setFilters}
        pokesLoaded={pokesLoaded}
        setPokesLoaded={setPokesLoaded}
      />
    </div>
  );
};

export default Home;
