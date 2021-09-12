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

  //   typeof typeTwo === 'String'
  //     ? typeTwo
  //     : (document.querySelector('.type-2').style.display = 'none');

  console.log(typeTwo ? typeTwo : '');

  data.abilities.forEach(ability => console.log(ability.ability.name));

  const res1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${data.species.name}/`
  );
  const data1 = await res1.json();
  console.log(data1);

  const html = `<div class="poke-card">
                <img class="poke-img"
                src="https://img.pokemondb.net/sprites/home/normal/${pokemonName.toLowerCase()}.png" alt="${pokemonName}"/>
        <div class="poke-id">#${number}</div>
        <div class="poke-name">${pokemonName}</div>
        <p class="description">
          ${data1.flavor_text_entries[0].flavor_text.replaceAll('\f', ' ')}
        </p>
        <div class="abilities">
       
          <div class="ability-1"> ${data.abilities[0].ability.name}</div>
          <div class="ability-2">${data.abilities[1].ability.name}</div>
        </div>
        <div class="types">
        <div class="type-1">${typeOne}</div>
        <div class="type-2">${typeTwo ? typeTwo : '-'}</div>
            </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
};

const logPokemon = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  const pokemons = data.results;
  //   if (data.next) {
  pokemons.forEach(pokemon => logPokemonData(pokemon.url));
  //   logPokemon(data.next);
  //   }
};

logPokemon('https://pokeapi.co/api/v2/pokemon/?limit=150');
// logPokemon('https://pokeapi.co/api/v2/pokemon/?limit=5');
