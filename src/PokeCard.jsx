import {useEffect, useState} from 'react';

import { useLocation } from 'react-router-dom';

const PokeCard =() =>{
    const [currPokemon, setCurrPokemon] = useState({})
    const location = useLocation();
    const currentUrl = location.state.pokemonUrl;
    console.log(currentUrl)


    useEffect(()=>{
        fetch(currentUrl)
        .then(res=>res.json())
        .then(data=>setCurrPokemon(data))
    }, [currentUrl])

    if(Object.keys(currPokemon).length===0) {

        return(
            <div>
                Loading
            </div>
        )
    }

 return (

    <div className='poke-details'>
        <img src={currPokemon.sprites.front_default} alt={currPokemon.name}/>
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
 );
};

export default PokeCard;
