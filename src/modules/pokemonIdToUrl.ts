export default (id: number, shiny = false): string =>
  `https://cdn.poketwo.net/${shiny ? "shiny" : "images"}/${id}.png`;
