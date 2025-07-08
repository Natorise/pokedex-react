import React from "react";

import styles from "./PokemonRightCard.module.css";
import Emoji from "./Emoji";
import type { PokemonData } from "../modules/PokemonDataType";
const Names = ({ names }: { names: string[] }) => {
  const emojis = ["🇯🇵", "🇬🇧", "🇩🇪", "🇫🇷"];

  let emojiMap: number[] | undefined;
  if (names.length === 1) emojiMap = [1];
  if (names.length === 2) emojiMap = [1, 1];
  else if (names.length === 5) emojiMap = [0, 0, 1, 2, 3];
  else if (names.length === 6) emojiMap = [0, 0, 0, 1, 2, 3];
  else if (names.length === 7) emojiMap = [0, 0, 0, 1, 1, 2, 3];

  if (!emojiMap) return;

  return (
    <div className={styles.statsValue}>
      {names.map((x: string, i: number) => (
        <p key={i}>
          <Emoji emoji={emojis[emojiMap[i]]} /> {x}
        </p>
      ))}
    </div>
  );
};

const Field = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className={styles.fieldTitle}>{name}</h3>
      <div className={`${styles.fieldValue}`}>{children}</div>
    </div>
  );
};

const Stat = ({ name, value }: { name: string; value: string | number }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{value}</p>
    </div>
  );
};

const PokemonRightCard = ({
  pokemonData,
}: {
  pokemonData: PokemonData;
}) => {
  return (
    <div className={styles.pokemonInfo}>
      <Field name={"About"}>
        <p>{pokemonData.description}</p>
      </Field>

      <Field name={"Stats"}>
        <div className={styles.statsValue}>
          <Stat name={"HP"} value={pokemonData.hp} />
          <Stat name={"Attack"} value={pokemonData.atk} />
          <Stat name={"Defense"} value={pokemonData.defense} />
          <Stat name={"Sp. Atk"} value={pokemonData.spatk} />
          <Stat name={"Sp. Def"} value={pokemonData.spdef} />
          <Stat name={"Speed"} value={pokemonData.speed} />
        </div>
      </Field>
      <Field name="Names">
        <Names names={pokemonData.names} />
      </Field>

      <Field name="Breeding">
        <div className={styles.breedingValue}>
          <Stat name={"Egg Groups"} value={pokemonData.eggGroups.join("\n")} />
          <Stat name={"Hatch Time"} value={`${pokemonData.hatchTime} Cycles`} />
        </div>
      </Field>

      {pokemonData.evos ? (
        <Field name={"Evolutions"}>{pokemonData.evos.join("　•　")}</Field>
      ) : (
        ""
      )}
    </div>
  );
};

export default PokemonRightCard;
