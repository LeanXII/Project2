import {useState} from 'react'


const Player = ({pokemon, playerTurn, setPlayerTurn, hp, changeOpponentHp }) =>{
 const [moveDamage, setMoveDamage] = useState('')



  const handleMoveSelect = (moveUrl) => {
    if(playerTurn){
      fetch(moveUrl)
      .then(res=>res.json())
      .then(data=> {
        // setMoveDamage(data.power)
          changeOpponentHp(data.power, data.damage_class.name, data.type.name)
          setPlayerTurn(!playerTurn)
        })
    }
  }

  return(

    <>

     <img src = {pokemon.sprites.back_default} />

    </>

      )

}













export default Player