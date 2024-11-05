import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import PokeList  from './PokeList';

const PokeHome = ({team, setTeam, maxTeam}) => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=151")
  const [currPokeList, setCurrPokeList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const[searchTerm, setSearchTerm] = useState("")

  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>setCurrPokeList(data.results))
  }, [])

  const handleSearch = (input) =>{
    setSearchValue(input);

  }
  if(!currPokeList){
    return (
    <div>
      Loading...
    </div>
    )
  }

  return(
    <div>
<input
    className = "search-input"
    type="text"
    value={searchValue}
    onChange={(event) => handleSearch(event.target.value)}
    placeholder="Search By Name"
/>

    <div className = "poke-container">
      {currPokeList.map((pokemon, index)=> {
      return(
          <PokeList
          key = {index+1}
          currIndex = {index+1}
          currentSearch = {searchValue}
          team = {team}
          setTeam = {setTeam}
          maxTeam = {maxTeam}
          />
      );
        })}
      </div>
    </div>
  )
}

export default PokeHome