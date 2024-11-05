import {useState, useEffect} from 'react';
import{useLocation} from'react-router-dom';

const PokeTeam =({ team, setTeam, maxTeam})=> {
  const [currPokemon, setCurrPokemon] = useState({});



  // useEffect(() =>{
  // fetch(currentUrl)
  // .then(res => res.json())
  // .then(data => setCurrPokemon(data));
  // }, [currentUrl]);
  console.log(team)
  const addToTeam = () => {
    if (team.length >= maxTeam) {
      alert('Team is Full');
      return;
    }
    if(team.some(pokemon => pokemon.id === currPokemon.id)) {
      alert('This Pokemon is already in your team!');
      return;
    }
    setTeam([...team, {
      ...currPokemon,
      health: 100,
      happiness:100,
      hunger: 100
    }]);
  }
  console.log(team)
  return (

    team.map((pokemon, index)=>{

      return(
        <div key = {index}className = "team-pokemon">
          <p>{pokemon.name}</p>
          <img src = {pokemon.sprites.front_default}></img>
        </div>
      )

    })
  );
};

export default PokeTeam