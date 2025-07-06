import styles from "./Types.module.css";

import { pokemonTypes, getTypePath } from "../modules/pokemonTypes";

const Type = ({ type }: { type: string }) => {
  return (
    <img
      className={styles.type}
      src={getTypePath(type)}
      width={40}
      height={40}
    />
  );
};
const Types = ({ types }: { types: string[] }) => {
  const validTypes = types.filter((type) =>
    pokemonTypes.includes(type.toLowerCase())
  );
  return (
    <div className={styles.types}>
      {validTypes.map((type) => (
        <Type key={type} type={type} />
      ))}
    </div>
  );
};

export default Types;
