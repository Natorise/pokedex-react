import React, { useState } from 'react'
import Entries from '../components/Entries'
import Filters from '../components/Filters'

import styles from './Home.module.css'

const Home = () => {
  const [pokeName, setPokeName] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");

  
  return (
    <div className={styles.home}>
      <h1>Pokedex</h1>
      <Filters pokeName={pokeName} setPokeName={setPokeName}
      region={region} setRegion={setRegion}
      type={type} setType={setType}
      rarity={rarity} setRarity={setRarity}
      />
      <Entries pokeName={pokeName} region={region} type={type} rarity={rarity}/>
    </div>
  )
}

export default Home