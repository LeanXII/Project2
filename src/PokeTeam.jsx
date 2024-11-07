import {useState, useEffect} from 'react';
import{useNavigate} from'react-router-dom';
import PokeCare from './PokeCare';


const PokeTeam =({ team, setTeam, maxTeam})=> {
  let navigate = useNavigate()

  const loadTeamFromStorage = () => {
    const storedTeam = localStorage.getItem('pokemonTeam');
    return storedTeam ? JSON.parse(storedTeam) :[];

  };

useEffect(() => {
 if (team.length === 0) {
  const storedTeam = loadTeamFromStorage();
  setTeam(storedTeam);
 }
}, [setTeam]);

useEffect(() => {
  if (team.length > 0) {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }
}, [team]);



  const handleBattleSelection = (pokemon) =>{
    navigate('/battle', {state: {fighter: pokemon}})
  }

  const handleRemoveFromTeam = (pokemonId, e) => {
    e.stopPropagation(); // Prevent battle selection when clicking remove button
    const newTeam = team.filter(pokemon => pokemon.id !== pokemonId);
    setTeam(newTeam);
    localStorage.setItem('pokemonTeam', JSON.stringify(newTeam));
  };




  return (
    <div>

    <h1>Select a pokemon from your team for a battle!</h1>
    {team.map((pokemon, index)=>{

      return(
        <div key = {index}className = "team-pokemon">

 




          <div className="team-pokemon-header">
            <p>{pokemon.name}</p>
            <button
              className="remove-button"
              onClick={(e) => handleRemoveFromTeam(pokemon.id, e)}
            >
              Remove from Team
            </button>
          </div>
          <img onClick={()=>handleBattleSelection(pokemon)} src = {pokemon.sprites.front_default} alt={pokemon.name}></img>






        <PokeCare
          pokemon={pokemon}
          setTeam={setTeam}
         />
        </div>
      )

    })}
    </div>
  );
};

export default PokeTeam