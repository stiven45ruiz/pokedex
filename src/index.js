import './styles/main.css'

const CONTENT_TYPE = 'application/json;charset=utf-8'
const API_URL = 'https://pokeapi.co/api/v2/';
const API_URL_TRENDING = 'trending/movie/day';


const api = axios.create({
  baseURL: API_URL,
  headers: {
      'Content-Type': CONTENT_TYPE,
  },
  params:{
      // 'api_key': API_KEY,
      // 'language': leng
  },
});




///Creation of models
const pokeimg = document.querySelector('#pokeimg');
const pokedescription = document.querySelector('#desc');
const pokeName = document.querySelector('#pokeName');

const createStats = (pokeStat) =>{
  const pokemonStats = document.querySelector('.pokemon__stats');
  pokemonStats.innerHTML = ''
  pokeStat.map(item => {
    const contentStat = document.createElement('div');
    const progressBar = document.createElement('div')
    const stat = document.createElement('span');
    const statValue = document.createElement('span');

    contentStat.classList.add('pokemon__stat')
    stat.classList.add('name__stat')
    statValue.classList.add('value__stat')
    progressBar.classList.add('progress__bar')
    
    progressBar.appendChild(statValue)
    contentStat.appendChild(stat)
    contentStat.appendChild(progressBar)
    pokemonStats.appendChild(contentStat)

    stat.textContent = item.stat.name
    statValue.textContent = item.base_stat
    statValue.style.width = `calc(${item.base_stat}% / 2)`
  })

}
const createPokemonScreen = (data)=>{
  pokeid = data.id
  pokeImages = Object.values(data.sprites).filter(item => typeof item == 'string')

  pokeimg.src = data.sprites.front_default;
  pokeName.innerHTML = data.name
}

let pokeid;
let pokeImages;
let pokeImagesID = 0; 





//calls to api
const getPokemon = async(id) =>{
  const {data} = await api(`pokemon/${id}`);
  // console.log(data, "-> Info api");

  const statPokemon = data.stats;
  createStats(statPokemon)
  createPokemonScreen(data)
  
}
getPokemon(1);

const getPokemonsSpecies = async(id) =>{
  const {data} = await api(`pokemon-species/${id}`);
  
  const PokemonDesc = Object.values(data.flavor_text_entries[1])[0];
  // console.log(PokemonDesc);
  pokedescription.innerHTML = PokemonDesc
}
getPokemonsSpecies(1)



//Buttons accion
const nextImg = ()=>{
  if(pokeImagesID === pokeImages.length - 1){
    pokeImagesID = 0;
  }else{
    pokeImagesID++
  } 
  pokeimg.src = pokeImages[pokeImagesID]
}

const prevImg = ()=>{
  if(pokeImagesID === 0){
    pokeImagesID = pokeImages.length - 1;
  }else{
    pokeImagesID--;
  }
  pokeimg.src = pokeImages[pokeImagesID];
}

const prevPokemon = ()=>{
  if(pokeid <= 1){
    return null
  }else{
    getPokemon(pokeid - 1)
    getPokemonsSpecies(pokeid - 1)
  }
}
const nextPokemon = ()=>{
  getPokemon(pokeid + 1)
  getPokemonsSpecies(pokeid + 1)

}