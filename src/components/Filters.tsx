import React from 'react'

import regions from "../../data/regions.json";
import typeColors from "../../data/typeColors.json";
import rarities from "../../data/rarities.json";
import upperCaseFirst from '../modules/upperCaseFirst';
import styles from "./Filters.module.css";
const types = Object.keys(typeColors)

export type FiltersType = {
  name: string;
  region: string;
  type: string;
  rarity: string;
};

type propsType = {
  filters: FiltersType, setFilters: React.Dispatch<React.SetStateAction<FiltersType>>,
}



const Filters = ({filters, setFilters}: propsType) => {

  const updateFilters = (key: keyof FiltersType, value: string) => {
    setFilters((prev)=> ({
      ...prev,
      [key]: value
    }))
  }

  const onNameChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    updateFilters("name",e.target.value)
  }

  const onSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    updateFilters(e.target.id as keyof FiltersType,e.target.value)


    // console.log
    // let changeFunc
    // if(e.target.id === "region") changeFunc = setRegion
    // else if(e.target.id === "type") changeFunc = setType
    // else if(e.target.id === "rarity") changeFunc = setRarity

    // if(!changeFunc) return

    //   if(!e.target.value) changeFunc("")
    //   else changeFunc(e.target.value)

  }

  return (
    <div className={styles.filters}>
      <input type="text" placeholder='Name' value={filters.name} onChange={onNameChange}/>
      <select id="region" onChange={onSelectChange} value={filters.region}>
        <option value="">Select Region</option>
        {regions.map(x=><option value={x}>{upperCaseFirst(x)}</option>)}
      </select>
      <select id="type" onChange={onSelectChange} value={filters.type}>
        <option value="">Select Type</option>
        {types.map(x=><option value={x}>{upperCaseFirst(x)}</option>)}
      </select>
      <select id="rarity" onChange={onSelectChange} value={filters.rarity}>
        <option value="">Select Rarity</option>
        {rarities.map(x=><option>{x}</option>)}
      </select>

    </div>
  )
}

export default Filters