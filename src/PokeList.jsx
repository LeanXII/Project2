import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PokeCard from './PokeCard';

const PokeList = ({currIndex, currentSearch, team, setTeam, maxTeam }) =>{
  const [currentPokemon, setCurrPokemon] = useState({})
  const navigate = useNavigate()

  const handleClick = (url, index) =>{
    navigate(`/pokemon/${index+1}`, {state: {pokemonUrl: url}})
  }
  let currUrl = `https://pokeapi.co/api/v2/pokemon/${currIndex}`

  useEffect(()=>{
    fetch(currUrl)
    .then(res=>res.json())
    .then(data=>setCurrPokemon(data))
  }, [currIndex])


  if(currentSearch && !currentPokemon.name.toLowerCase().includes(currentSearch.toLowerCase())){
    return null;
  }

if(Object.keys(currentPokemon).length===0){
  return(
    <div>
      Loading
    </div>
  )
}

  return(

      <div className = "list-pokemon">
        <p>{currentPokemon.name}</p>
        <img onClick={()=>handleClick(currUrl, currentPokemon.id)}src={currentPokemon.sprites.front_default} />
      </div>

  )


}

export default PokeList;