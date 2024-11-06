import {useState, useEffect} from 'react'

const Opponent = ({pokemon, playerTurn, setPlayerTurn, hp, changePlayerHp }) =>{
  const [attackMoves, setAttackMoves] = useState([])











  const handleOpponentTurn = () =>{
    if(!playerTurn){
      
    }
  }


  return(
    <>

      <img src = {pokemon.sprites.front_default} />
      <div style = {{}}>

      </div>
    </>
  )

}

export default Opponent