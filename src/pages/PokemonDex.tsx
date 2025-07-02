import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./Pokemon.module.css";
import pokemonIdToUrl from "../modules/pokemonIdToUrl";
import { pokedex } from "../modules/pokedexHandler";
import stats from "../../data/stats"
import Types from "../components/Types";
import PokemonImage from "../components/PokemonImage";
import Entry from "../components/Entry";
import { getColorFromTypes } from '../modules/getColorFromTypes';

const notFound = "Pokemon not found.";



const SideCardField = ({name, children}: {name: string, children: React.ReactNode})=> {
  return <div className={styles.field}>
    <h3 className={styles.centerText}>{name}</h3>
    <div className={`${styles.fieldValue} ${styles.centerText}`}>
      {children}
    </div>
  </div>

}


const RightField = ({name,children}: {name: string, children: React.ReactNode}) =>{
  return <div className={styles.field}>
    <h3>{name}</h3>
    <div className={`${styles.rightValue} ${styles.fieldValue}`}>
      {children}
    </div>
  </div>

}



const Stat = ({name,value}: {name: string, value: string}) =>{
  return          <div>
  <h4>{name}</h4>
  <p>{value}</p>
</div>

}


const Emoji = ({emoji}: {emoji: string}) => <span className={styles.emoji}>{emoji}</span>
const Names = ({names}: {names: string[]}) =>{
  const emojis = [
    "🇯🇵",
    "🇬🇧",
    "🇩🇪",
    "🇫🇷",
  ]

  let emojiMap: number[] | undefined
  if(names.length === 1) emojiMap = [1] 
  if(names.length === 2) emojiMap = [1,1] 
  else if(names.length === 5) emojiMap = [0,0,1,2,3] 
  else if(names.length === 6) emojiMap = [0,0,0,1,2,3] 
  
  if(!emojiMap) return 

return <div className={styles.statsValue}>
      {
        names.map((x:string,i: number)=>
        <p>
        <Emoji emoji={emojis[emojiMap[i]]}/> {x}
        </p>
        )
      }

  </div>
}



const PokemonDex = () => {
  const { id } = useParams<{ id: string }>();

  const pokeId = Number(id);
  if (isNaN(pokeId)) return notFound;

  const pokemonData = pokedex.find((x) => x.id === pokeId);
  if (!pokemonData) return notFound;

  console.log(pokemonData);
  const navigate = useNavigate();

  const [shiny, setShiny] = useState(false);
  const color = getColorFromTypes(pokemonData.types);

  
  return (
    <div>
      <button style={{position:"absolute"}}onClick={() => navigate(-1)}>Back</button>

      
      <div className={styles.center}>

        <div className={styles.main} style={{ background: color }}>
        <div className={styles.sidecard}>
          <p>#{id}</p>
          <h2>{pokemonData.name}</h2>
          <PokemonImage pokeId={pokemonData.id} size={400}/>

          <Types types={pokemonData.types}/>
          <SideCardField name={"Gender"}>
            {
            pokemonData.genderRatio.length ==2 
            ? <p>
              <Emoji emoji="♂️" /> {pokemonData.genderRatio[0]}%
              <br />
              <Emoji emoji="♀️" /> {pokemonData.genderRatio[1]}%
            </p>
            : <p>Unknown</p>
          }
          </SideCardField>
          <SideCardField name={"Height"}><p>{`${pokemonData.height} M`}</p></SideCardField>
          <SideCardField name={"Weight"}><p>{`${pokemonData.weight} Kg`}</p></SideCardField>

        </div>
        <div className={styles.pokemonInfo}>
        {/* <Field name={"About"} value=/> */}
        <RightField name={"About"}>
        <p>{pokemonData.description}</p>
        </RightField>

        <RightField name={"Stats"}>
          <div className={styles.statsValue}>
            <Stat name={"HP"} value={pokemonData.hp}/>        
            <Stat name={"Attack"} value={pokemonData.atk}/>        
            <Stat name={"Defense"} value={pokemonData.defense}/>        
            <Stat name={"Sp. Atk"} value={pokemonData.spatk}/>        
            <Stat name={"Sp. Def"} value={pokemonData.spdef}/>        
            <Stat name={"Speed"} value={pokemonData.speed}/>        

          </div>
        </RightField>
        <RightField name="Names">
          <Names names={pokemonData.names}/>
        </RightField>

        <RightField name="Breeding">
          <div className={styles.breedingValue}>
          <Stat name={"Egg Groups"} value={pokemonData.eggGroups.join("\n")}/>        
          <Stat name={"Hatch Time"} value={`${pokemonData.hatchTime} Cycles`}/>        


          </div>
        </RightField>

        {pokemonData.evos ? <RightField name={"Evolutions"}>{pokemonData.evos.join("　•　")}</RightField> : ""}
        </div>

        </div>

      <div className={styles.buttons}>
      <button onClick={() => navigate(`/dex/${getPreviousPokeId(pokeId)}`)}>back</button> 
      <button onClick={() => navigate(`/dex/${getNextPokeId(pokeId)}`)}>next</button> 
      <button
          onClick={() => {
            setShiny(!shiny);
          }}
        >
          Toggle Shiny
        </button>

      </div>
      </div>


      {/* </div> */}
    </div>
  );
};

export default PokemonDex;

function wraparoundIndex(newIndex: number) {
  if(newIndex >= pokedex.length) newIndex = 0
  else if(newIndex < 0) newIndex = pokedex.length-1

  return newIndex

}


function findPokeIndex(pokeId: number) {
  return pokedex.findIndex(x=>x.id === pokeId)
}

function getNextPokeId(pokeId: number) {
  const index = findPokeIndex(pokeId)
  let newIndex = index + 1

  newIndex = wraparoundIndex(newIndex)
  let newPokeData = pokedex[newIndex]

  return newPokeData.id
}

function getPreviousPokeId(pokeId: number) {
  const index = findPokeIndex(pokeId)
  let newIndex = index - 1

  newIndex = wraparoundIndex(newIndex)
  let newPokeData = pokedex[newIndex]

  return newPokeData.id
}



