export default (value:string) =>{

  let newValue = value.split("")
  newValue[0] = value[0].toUpperCase()


  return newValue.join("")
}