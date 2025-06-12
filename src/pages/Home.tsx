import React, { useState } from 'react'
import Entries from '../components/Entries'
import Filters from '../components/Filters'

const Home = () => {
  const [pokeName, setPokeName] = useState("");

  
  return (
    <div>
      <h1>Pokedex</h1>
      <Filters pokeName={pokeName} setPokeName={setPokeName}/>
      <Entries pokeName={pokeName}/>
    </div>
  )
}

export default Home