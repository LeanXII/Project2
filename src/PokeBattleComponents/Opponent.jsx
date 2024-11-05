

const Opponent = ({pokemon}) =>{

  return(
    <>
      <p>{pokemon.name}</p>
      <img src = {pokemon.sprites.front_default} />
      <div style = {{display: 'none'}}>
      <h3>Moves:</h3>
      {pokemon.moves.slice(0, 4).map(move => (
        <div key={move.move.name} >
             {move.move.name}
        </div>))}
      </div>
    </>
  )

}

export default Opponent