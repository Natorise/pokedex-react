import typeColors from "../../data/typeColors.json";

function getColorFromType(type: string): string {
  type = type.toLowerCase();
  if (type in typeColors) {
    return typeColors[type as keyof typeof typeColors];
  } else return "#aaaaaa";
}

export function getColorFromTypes(types: string[]): string {
  const [type1, type2] = types;

  if (!type2) return getColorFromType(type1);

  // old ${getColorFromType(type1)}, ${getColorFromType(type2)})

  return `linear-gradient(
    to bottom, 
    ${getColorFromType(type1)} 0%,
    ${getColorFromType(type1)} 10%,
    ${getColorFromType(type2)} 90%,
    ${getColorFromType(type2)} 100%
  )`;
}

// const flags = ["]