import React from "react";
import PokemonImage from "./PokemonImage";
import Types from "./Types";
import Emoji from "./Emoji";

import styles from "./PokemonLeftCard.module.css";
import type { PokemonData } from "../modules/PokemonDataType";

const Field = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.field}>
      <h3 className={styles.centerText}>{name}</h3>
      <div className={`${styles.fieldValue} ${styles.centerText}`}>
        {children}
      </div>
    </div>
  );
};

const PokemonLeftCard = ({
  pokemonData,
  shiny,
}: {
  pokemonData: PokemonData;
  shiny: boolean;
}) => {
  return (
    <div className={styles.sidecard}>
      <p>#{pokemonData.id}</p>
      <h2 className={styles.centerText}>
        {shiny ? "✨ " : ""}
        {pokemonData.name}
      </h2>
      <PokemonImage pokeId={pokemonData.id} shiny={shiny} size={400} />

      <Types types={pokemonData.types} />
      <Field name={"Gender"}>
        {pokemonData.genderRatio.length == 2 ? (
          <p>
            <Emoji emoji="♂️" /> {pokemonData.genderRatio[0]}%
            <br />
            <Emoji emoji="♀️" /> {pokemonData.genderRatio[1]}%
          </p>
        ) : (
          <p>Unknown</p>
        )}
      </Field>
      <Field name={"Height"}>
        <p>{`${pokemonData.height} M`}</p>
      </Field>
      <Field name={"Weight"}>
        <p>{`${pokemonData.weight} Kg`}</p>
      </Field>
    </div>
  );
};

export default PokemonLeftCard;
