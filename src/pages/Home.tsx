import React, { useState } from 'react'
import Entries from '../components/Entries'
import Filters, { type FiltersType } from '../components/Filters'

import styles from './Home.module.css'



const Home = () => {
  const [filters, setFilters] = useState<FiltersType>({
    name: "",
    region: "",
    type: "",
    rarity: "",
  });

  return (
    <div className={styles.home}>
      <img className={styles.title} src="/Pokedex.png" height={100}></img>
      <Filters filters={filters} setFilters={setFilters}
      />
      <Entries filters={filters} setFilters={setFilters} />
    </div>
  )
}

export default Home