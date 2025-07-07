import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./PokemonDex.module.css";
import { pokedex } from "../modules/pokedexHandler";
import Types from "../components/Types";
import PokemonImage from "../components/PokemonImage";
import { getColorFromTypes } from "../modules/getColorFromTypes";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import PokemonButtons from "../components/PokemonButtons";
import type { FiltersType } from "../components/Filters";
import ScrollToTop from "../components/ScrollToTop";

const notFound = "Pokemon not found.";

const SideCardField = ({
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

const RightField = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.field}>
      <h3 className={styles.rightFieldTitle}>{name}</h3>
      <div className={`${styles.rightFieldValue} ${styles.fieldValue}`}>
        {children}
      </div>
    </div>
  );
};

const Stat = ({ name, value }: { name: string; value: string }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{value}</p>
    </div>
  );
};

const Emoji = ({ emoji }: { emoji: string }) => (
  <span className={styles.emoji}>{emoji}</span>
);
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

const PokemonDex = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const state = location.state
  const pokeId = Number(id);
  if (isNaN(pokeId)) return notFound;

  const pokemonData = pokedex.find((x) => x.id === pokeId);
  if (!pokemonData) return notFound;
  const navigate = useNavigate();

  const [shiny, setShiny] = useState(false);
  const color = getColorFromTypes(pokemonData.types);

  return (
    <div>
      <ScrollToTop />
      <IoArrowBackCircleOutline
        className={styles.backButton}
        size={70}
        onClick={() => navigate("/", { state })}
      />
      <div className={styles.center}>
        <PokemonButtons
          pokeId={pokemonData.id}
          shiny={shiny}
          setShiny={setShiny}
        />
        <div className={styles.main} style={{ background: color }}>
          <div className={styles.sidecard}>
            <p>#{id}</p>
            <h2 className={styles.centerText}>
              {shiny ? "✨ " : ""}
              {pokemonData.name}
            </h2>
            <PokemonImage pokeId={pokemonData.id} shiny={shiny} size={400} />

            <Types types={pokemonData.types} />
            <SideCardField name={"Gender"}>
              {pokemonData.genderRatio.length == 2 ? (
                <p>
                  <Emoji emoji="♂️" /> {pokemonData.genderRatio[0]}%
                  <br />
                  <Emoji emoji="♀️" /> {pokemonData.genderRatio[1]}%
                </p>
              ) : (
                <p>Unknown</p>
              )}
            </SideCardField>
            <SideCardField name={"Height"}>
              <p>{`${pokemonData.height} M`}</p>
            </SideCardField>
            <SideCardField name={"Weight"}>
              <p>{`${pokemonData.weight} Kg`}</p>
            </SideCardField>
          </div>
          <div className={styles.pokemonInfo}>
            <RightField name={"About"}>
              <p>{pokemonData.description}</p>
            </RightField>

            <RightField name={"Stats"}>
              <div className={styles.statsValue}>
                <Stat name={"HP"} value={pokemonData.hp} />
                <Stat name={"Attack"} value={pokemonData.atk} />
                <Stat name={"Defense"} value={pokemonData.defense} />
                <Stat name={"Sp. Atk"} value={pokemonData.spatk} />
                <Stat name={"Sp. Def"} value={pokemonData.spdef} />
                <Stat name={"Speed"} value={pokemonData.speed} />
              </div>
            </RightField>
            <RightField name="Names">
              <Names names={pokemonData.names} />
            </RightField>

            <RightField name="Breeding">
              <div className={styles.breedingValue}>
                <Stat
                  name={"Egg Groups"}
                  value={pokemonData.eggGroups.join("\n")}
                />
                <Stat
                  name={"Hatch Time"}
                  value={`${pokemonData.hatchTime} Cycles`}
                />
              </div>
            </RightField>

            {pokemonData.evos ? (
              <RightField name={"Evolutions"}>
                {pokemonData.evos.join("　•　")}
              </RightField>
            ) : (
              ""
            )}            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDex;