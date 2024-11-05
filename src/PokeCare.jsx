import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PokeCare = ({pokemon}) =>{
// const location = useLocation();
const navigate = useNavigate();


const [hunger, setHunger] = useState(50);
const [happiness, setHappiness] = useState(50);
// const [level, setLevel] = useState(pokemon.level || 1);

const feedPokemon = () => {
    if (hunger === 100) {
        alert('Your Pokemon is already full!');
    } else {
        setHunger((prevHunger) => Math.min(prevHunger + 20, 100));
        setHappiness((prevHappy) =>Math.min(prevHappy + 5, 100));
    }

};

const petPokemon = () => {
    setHappiness((prevHappy) => Math.min(prevHappy + 15, 100));

};

const playWithPoke = () => {
    setHappiness((prevHappy) => Math.min(prevHappy + 20, 100));
    setHunger((prevHunger) => Math.max(prevHunger - 10, 0));

};

// const levelUp = () => {
//     setLevel(level + 1, 100);

// };

const saveChanges = () => {
const updatedPokemon = { ...pokemon, hunger, happiness, };

setTeam((prevTeam) =>
prevTeam.map((p) => (p.name === pokemon.name ? updatedPokemon : p))
);

navigate('/team');

};

useEffect(() => {
const interval = setInterval(() => {
    setHunger((prevHunger) =>
    Math.max(prevHunger -5, 0));
}, 20000);

return () =>
    clearInterval(interval);

}, []);

useEffect(() => {
const interval = setInterval(() => {
    setHappiness((prevHappy) =>
    Math.max(prevHappy - 5, 0));

}, 25000);

return () =>
    clearInterval(interval);
}, []);


return (
<div className='poke-care'>
    <h2>Care for {pokemon.name}</h2>

    <div className='meter'>
        <span>Hunger</span>
        <div className='progress-bar' style={{width:
                    `${hunger}%`, backgroundColor: hunger > 50 ?
                    '#4caf50' : '#ff9800'}}>
                {hunger}%

    </div>
    </div>

    <div className="meter">
        <span>Happiness</span>
        <div className="progress-bar" style={{width:
                    `${happiness}%`, backgroundColor: happiness> 50 ?
                    '#4caf50' : '#ff9800'}}>
                {happiness}%

    </div>
    </div>


<button onClick={feedPokemon}>Feed Pokemon</button>
<button onClick={petPokemon}>Pet Pokemon</button>
<button onClick={playWithPoke}>Play with Poke</button>
<button onClick={saveChanges}>Save Changes</button>





</div>


);
}

export default PokeCare;