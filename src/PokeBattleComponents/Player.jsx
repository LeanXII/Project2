import {useState} from 'react'
import {gsap} from 'gsap'



const Player = ({pokemon, playerTurn, setPlayerTurn, hp, changeOpponentHp}) =>{
 const [moveDamage, setMoveDamage] = useState('')




  return(

    <>

     <img className = "player-sprite" src = {pokemon.sprites.back_default} />

    </>

      )

}













export default Player