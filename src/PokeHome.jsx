import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import PokeList  from './PokeList';

const PokeHome = ({team, setTeam, maxTeam}) => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=500")
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
        <div style={{
            position: 'fixed',
            top: '-70px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000
        }}>
            <input
                type="text"
                placeholder="Search By Name"
                className="search-input"
                style={{
                    padding: '10px',
                    borderRadius: '25px',
                    border: 'none',
                    width: '200px',
                    fontSize: '16px',
                    height: '20px'
                }}
                value={searchValue}
                onChange={(event) => handleSearch(event.target.value)}
            />
        </div>

        <div style={{ marginTop: '60px' }}>
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
    </div>
  )
}

export default PokeHome