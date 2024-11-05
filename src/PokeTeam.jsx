import {useState, useEffect} from 'react';
import{useNavigate} from'react-router-dom';

const PokeTeam =({ team, setTeam, maxTeam})=> {
  const [currPokemon, setCurrPokemon] = useState({});

  let navigate = useNavigate()



  // useEffect(() =>{
  // fetch(currentUrl)
  // .then(res => res.json())
  // .then(data => setCurrPokemon(data));
  // }, [currentUrl]);
  const handleBattleSelection = (pokemon) =>{
    navigate('/battle', {state: {fighter: pokemon}})
  }

const handleCareSelection = (pokemon) =>{
navigate('/care', {state: { pokemon, setTeam} });
};



  return (
    <div>

    <h1>Select a pokemon from your team for a battle!</h1>
    {team.map((pokemon, index)=>{

      return(
        <div key = {index}className = "team-pokemon">
          <p>{pokemon.name}</p>
          <img onClick={()=>handleBattleSelection(pokemon)} src = {pokemon.sprites.front_default}></img>
        <button onClick={() => handleCareSelection(pokemon)}> Care for{pokemon.name}</button>
        </div>
      )

    })}
    </div>
  );
};

export default PokeTeam