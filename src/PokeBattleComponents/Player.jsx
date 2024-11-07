import {useState} from 'react'
import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'


const Player = ({pokemon, playerTurn, setPlayerTurn, hp, changeOpponentHp}) =>{
 const [moveDamage, setMoveDamage] = useState('')












  const handleMoveSelect = (moveUrl) => {
    if(playerTurn){
      fetch(moveUrl)
      .then(res=>res.json())
      .then(data=> {
        animatePlayer()
          changeOpponentHp(data.power, data.damage_class.name, data.type.name)
          setPlayerTurn(!playerTurn)
        })
    }

  }

  return(

    <>

     <img className = "player-sprite" src = {pokemon.sprites.back_default} />

    </>

      )

}













export default Player