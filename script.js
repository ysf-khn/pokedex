'use strict';

const logPokemon = async function () {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const data = await res.json();
  console.log(data);
  console.log(...data.results);
  console.log(`#${data.results[0].url.slice(-2, -1)}`);
};

// logPokemon();
