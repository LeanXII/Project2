import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
//import PokeCard from './PokeCard';

const PokeList = ({currIndex, currentSearch, team, setTeam, maxTeam }) =>{
  const [currentPokemon, setCurrPokemon] = useState(null)
  const navigate = useNavigate()

  // const handleClick = (url, index) =>{
  //   navigate(`/pokemon/${index+1}`, {state: {pokemonUrl: url}})
  // }


  useEffect(()=>{
    const currUrl = `https://pokeapi.co/api/v2/pokemon/${currIndex}`
    fetch(currUrl)
    .then(res=>res.json())
    .then(data=>setCurrPokemon(data))
  }, [currIndex])


  if(!currentPokemon || (currentSearch && !currentPokemon.name.includes(currentSearch.toLowerCase()))){
    return null
  }

const handleTeamAction = (e) => {
  e.stopPropagation()

  const isInteam = team.some(pokemon => pokemon.id === currentPokemon.id)

if (isInTeam){
  setTeam (team.filter (pokemon => pokemon.id !== currentPokemon.id))
    } else {
        if(team.length >= maxTeam) {
            alert ('Team is full')
  return
}
setTeam ([...team, {
    ...currentPokemon,
      health: 100,
      happiness: 50,
      hunger: 100
    }])
  }
}


  //if(Object.keys(currentPokemon).length===0){
    return(
      <div className ="list-pokemon">
        <button
          className={`team-toggle-btn ${team.some(p => p.id === currentPokemon.id) ?'remove' :'add' }`}
          onClick = {handleTeamAction}>
          {team.some(p => p.id === currentPokemon.id) ? '-' : '+'}
        </button>
        <img
        onClick ={() => navigate (`/pokemon/${currentPokemon.id}`,{
          state: {
          pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${currentPokemon.id}`
          }
        })}
        src ={currentPokemon.sprites.front_default}
        alt = {currentPokemon.name}/>
<h3>{currentPokemon.name}</h3>
</div>
    )
  }

  // return(
  //     <div
  //     className = "list-pokemon">
{/* //       onClick ={() => navigate ( `/pokemon/${currPokemon.id}`,
//   {
//      state: { pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${currPokemon.id}`}
//  })}
//  >
//    <button
//      className = { `team-toggle-btn ${isInTeam ? 'remove' : 'add'}`}
//        onClick = {handleTeamAction}
//  >
//      {isInTeam ? '-' : '+'}
//  </button> */}

{/* <img onClick ={() => navigate( `/pokemon/${currentPokemon.id}`, {state: { pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${currentPokemon.id}`} })} src ={currentPokemon.sprites.front_default} alt ={currentPokemon.name} />
<h3> {currentPokemon.name}</h3>
</div>
  ) */}


export default PokeList;