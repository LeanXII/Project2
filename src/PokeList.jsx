import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PokeCard from './PokeCard';

const PokeList = ({currentList, currentSearch}) =>{
  const navigate = useNavigate();

  const handleClick = (url, index) =>{
    navigate(`/pokemon/${index+1}`, {state: {pokemonUrl: url}})
  }

  console.log(currentList)
  console.log(currentSearch)
  let filteredList = currentList
  if(currentSearch !== ''){
    filteredList = currentList.filter((elm=>elm.name.toLowerCase().includes(currentSearch.toLowerCase())))
   
  }

  return(
    filteredList.map((pokemon, index)=>{
      return(

      <div key = {index}>
        <h1>{pokemon.name}</h1>
        <img onClick = {()=>handleClick(pokemon.url, index)}src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} />
      </div>

      )
    })
  )


}

export default PokeList;