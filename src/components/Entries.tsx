import React from "react";
import styles from "./Entries.module.css";

import { normalize } from "../modules/normalize";


import { pokedex } from "../modules/pokedexHandler";
import Entry from "./Entry";

type propsType = {pokeName: string,region: string,type: string, rarity: string}



const Entries = ({pokeName, region, type, rarity}: propsType) => {
  console.log(region,type)
  let filteredPokedex = pokedex
  console.log(filteredPokedex.filter(x=>!x.names || typeof x.names.length !== "number"))
    filteredPokedex = filteredPokedex
    .filter(pokemon=>{
      let passed = true
      if(pokeName) passed = passed && 
        pokemon.names.map((name: string) =>normalize(name))
        .some((name:string)=>name.includes(pokeName))
      
      if(region) passed = passed && pokemon.region.toLowerCase() === region
      if(type) passed = passed && pokemon.types.some((x:string)=>x.toLowerCase() === type)
      if(rarity) passed = passed && pokemon.rarity?.includes(rarity)
      return passed
   })
  filteredPokedex = filteredPokedex.slice(0,20)
  return (
    <div className={styles.entries}>      
      {
      filteredPokedex.map((pokemonData) =>
        <Entry types={pokemonData.types} name={pokemonData.name} id={pokemonData.id}/>
      )
      }
    </div>
  );
};

export default Entries;