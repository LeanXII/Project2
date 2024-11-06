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



  console.log(team)

  return (
    <div>

    <h1>Select a pokemon from your team for a battle!</h1>
    {team.map((pokemon, index)=>{

      return(
        <div key = {index}className = "team-pokemon">
          <p>{pokemon.name}</p>
          <img onClick={()=>handleBattleSelection(pokemon)} src = {pokemon.sprites.front_default}></img>
  
          

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