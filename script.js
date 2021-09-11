'use strict';

const container = document.querySelector('.container');

let i = 1;
const logPokemonData = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const number = i++;
  const pokemonName =
    data.species.name[0].toUpperCase() + data.species.name.slice(1);
  const typeOne =
    data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
  const typeTwo =
    data.types[1]?.type.name[0].toUpperCase() +
    data.types[1]?.type.name.slice(1);

  const html = `<div class="poke-card">
                <img class="poke-img"
                src="https://img.pokemondb.net/sprites/home/normal/${pokemonName.toLowerCase()}.png" alt="${pokemonName}"/>
        <div class="poke-id">#${number}</div>
        <div class="poke-name">${pokemonName}</div>
        <div class="abilities">
        <div class="grass">${typeOne}</div>
        <div class="poison">${typeTwo}</div>
            </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
};

const logPokemon = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  const pokemons = data.results;
  if (data.next) {
    pokemons.forEach(pokemon => logPokemonData(pokemon.url));
    logPokemon(data.next);
  }
};

logPokemon('https://pokeapi.co/api/v2/pokemon/');
