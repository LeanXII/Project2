import {useState} from 'react'


const Player = ({pokemon, playerTurn, setPlayerTurn, hp, changeOpponentHp }) =>{
 const [moveDamage, setMoveDamage] = useState('')



  const handleMoveSelect = (moveUrl) => {
    if(playerTurn){
      fetch(moveUrl)
      .then(res=>res.json())
      .then(data=> {
        // setMoveDamage(data.power)
          changeOpponentHp(data.power)
        })
    }
  }

  return(

    <>
    {playerTurn && <p className = 'turn-checker' >Your turn!</p>}

      <p>{pokemon.name}</p>
      <img src = {pokemon.sprites.back_default} />
      <p>Current Hp: {hp}</p>

      <h3>Moves:</h3>
      {pokemon.moves.slice(0, 4).map(move => (
        <div onClick={()=>handleMoveSelect(move.move.url)} key={move.move.name} >
             {move.move.name}
        </div>))}

    </>

      )

}













export default Player