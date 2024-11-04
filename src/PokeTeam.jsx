import {useState, useEffect} from 'react';
import{useLocation} from'react-router-dom';

const PokeCard =({ team, setTeam, maxTeam})=> {
const [currPokemon, setCurrPokemon] = useState({});
const location = useLocation();
const currentUrl = location.state.pokemon.url;

useEffect(() =>{
fetch(currentUrl)
.then(res => res.json())
.then(data => setCurrPokemon(data));
}, [currentUrl]);

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

  return (
    <div className= 'poke-details'>
<img src = {currPokemon.sprites.front_default} alt= {currPokemon.name}/>
      <h2>{currPokemon.name}</h2>
    <div className='base-stats'>
    <h3>Base Stats:</h3>
    {currPokemon.stats.map(stat => (
  <div key= {stat.stat.name}>{stat.stat.name}: {stat.base_state}</div>
))}
</div>
  <div className ='move-list'>
<h3>Moves:</h3>
    {currPokemon.moves.slice (0, 4) .map (move => (
  <div key={move.move.name}className="move-card">
    {move.move.name}
</div>
))}
</div>

<button onClick= {addToTeam}>Add to Team</button>
    </div>
  );
};

export default PokeTeam