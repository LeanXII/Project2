import {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

const PokeCard =({team, setTeam, maxTeam}) =>{
    const [currPokemon, setCurrPokemon] = useState({})
    const location = useLocation();
    const currentUrl = location.state.pokemonUrl;
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(currentUrl)
        .then(res=>res.json())
        .then(data=> {
            setCurrPokemon(data);
        })
    }, [currentUrl])

    const isInTeam = team.some(pokemon => pokemon.id === currPokemon.id);

const handleTeamAction = () => {
    if(isInTeam) {
        const newTeam = team.filter(pokemon => pokemon.id !== currPokemon.id);
        setTeam(newTeam);
        alert(`${currPokemon.name} was removed from your team`)
    } else{
        if (team.length >= maxTeam) {
            alert('Team is full');
                return;
        }
        setTeam([...team, {
    ...currPokemon,
    health:100,
    happiness: 100,
    hunger: 100
    }]);
alert (`${currPokemon.name} was added to your team`);
   }
};











    if(Object.keys(currPokemon).length===0) {

        return(
            <div>
                Loading
            </div>
        )
    }

 return (
<div>
    <div className='poke-details'>
    <div className='poke-img'>
      <img src={currPokemon.sprites.front_default} alt={currPokemon.name}/>
    </div>
       <h2>{currPokemon.name}</h2>
    <div className='base-stats'>
        <h3>Base Stats:</h3>
        {currPokemon.stats.map(stat => (
            <div key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</div>

        ))}
      </div>
      <div className='move-list'>
        <h3>Moves:</h3>
        {currPokemon.moves.slice(0, 4).map(move => (
            <div key={move.move.name} className="move-card">
             {move.move.name}
        </div>
   ))}
      </div>
    </div>
    <button
    onClick={handleTeamAction}
className ={isInTeam ? 'remove-team-btn' : 'add-team-btn'}
>
{isInTeam ? 'Remove from Team' : 'Add to Team'}
</button>
</div>


 );
};

export default PokeCard;
