import React from 'react'

type propsType = {pokeName: string, setPokeName: React.Dispatch<React.SetStateAction<string>> }


const Filters = ({pokeName, setPokeName}: propsType) => {

  const onNameChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setPokeName(e.target.value)
  }

  return (
    <div>
      <input type="text" name="" id="" value={pokeName} onChange={onNameChange}/>

    </div>
  )
}

export default Filters