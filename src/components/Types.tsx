import styles from "./Types.module.css"

import { pokemonTypes, getTypePath } from "../modules/pokemonTypes";

const Types = ({types}: {types: string[]}) => {
  return <div className={styles.types}>
  {
  types.map((type: string)=>{
    if(!pokemonTypes.includes(type.toLowerCase())) return 
    return <img className={styles.type} src={getTypePath(type)} width={40} height={40} />
  })
  }
</div>

}

export default Types