import styles from "./Types.module.css";

import { pokemonTypes, getTypePath } from "../modules/pokemonTypes";

const typeIcon = (type: string) => {
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
  return <div className={styles.types}>{validTypes.map(typeIcon)}</div>;
};

export default Types;
