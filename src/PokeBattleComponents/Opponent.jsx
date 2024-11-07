import {useState, useEffect} from 'react'

const Opponent = ({pokemon, playerTurn, setPlayerTurn, hp, changePlayerHp }) =>{
  const [attackMoves, setAttackMoves] = useState([])














  return(
    <>

      <img className = "opponent-sprite" src = {pokemon.sprites.front_default} />
      <div style = {{}}>

      </div>
    </>
  )

}

export default Opponent