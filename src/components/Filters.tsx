import React from 'react'

import regions from "../../data/regions.json";
import typeColors from "../../data/typeColors.json";
import rarities from "../../data/rarities.json";
import upperCaseFirst from '../modules/upperCaseFirst';
import styles from "./Filters.module.css";
const types = Object.keys(typeColors)
type propsType = {
  pokeName: string, setPokeName: React.Dispatch<React.SetStateAction<string>>,
  region: string, setRegion: React.Dispatch<React.SetStateAction<string>>,
  type: string, setType: React.Dispatch<React.SetStateAction<string>>,
  rarity: string, setRarity: React.Dispatch<React.SetStateAction<string>>,
 }



const Filters = ({pokeName, setPokeName, setRegion, setType,setRarity}: propsType) => {

  const onNameChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setPokeName(e.target.value)
  }

  const onSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    console.log("CHANGE:",e.target.id)
    let changeFunc
    if(e.target.id === "region") changeFunc = setRegion
    else if(e.target.id === "type") changeFunc = setType
    else if(e.target.id === "rarity") changeFunc = setRarity

    if(!changeFunc) return

      if(!e.target.value) changeFunc("")
      else changeFunc(e.target.value)

  }

  return (
    <div className={styles.filters}>
      <input type="text" placeholder='Name' value={pokeName} onChange={onNameChange}/>
      <select id="region" onChange={onSelectChange}>
        <option value="">Select Region</option>
        {regions.map(x=><option value={x}>{upperCaseFirst(x)}</option>)}
      </select>
      <select id="type" onChange={onSelectChange}>
        <option value="">Select Type</option>
        {types.map(x=><option value={x}>{upperCaseFirst(x)}</option>)}
      </select>
      <select id="rarity" onChange={onSelectChange}>
        <option value="">Select Rarity</option>
        {rarities.map(x=><option>{x}</option>)}
      </select>

    </div>
  )
}

export default Filters