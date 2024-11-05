


const Player = ({pokemon, playerTurn, setPlayerTurn, hp}) =>{




  const handleMoveSelect = () => {
    if(playerTurn){

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
        <div key={move.move.name} >
             {move.move.name}
        </div>))}

    </>

      )

}













export default Player