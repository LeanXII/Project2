import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Player from './Player'
import Opponent from './Opponent'



const PokeBattle = () => {
  const [opponentList, setOpponentList] = useState([])
  const [opponent, setOpponent] = useState({})
  const [playerTurn, setPlayerTurn] = useState(true)
  let location = useLocation()
  let pokemon = location.state.fighter;
  let randomOpId = Math.floor(Math.random() * 151)
  let randomOp = opponentList[randomOpId]

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res=>res.json())
    .then(data=>setOpponentList(data.results))
  }, [])

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomOpId}`)
    .then(res=>res.json())
    .then(data=>setOpponent(data))
  }, [])


  let opponentHp;

  let playerHp = pokemon.stats[0].base_stat

  if(Object.keys(opponent).length!==0){
    let opponentHp = opponent.stats[0].base_stat
  }


  const changePlayerHp = (newValue) => {
    playerHp = newValue;
  }

  const changeOpponentHp = (newValue) =>{
    opponentHp = newValue;
  }





  if(opponentList.length === 0 || Object.keys(opponent).length ===0){
    return(
      <div>
        Loading
      </div>
    )
  }




  return(
    <div className = "battlefield">

      <div className = 'your-fighter'>
        <Player pokemon = {pokemon} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp={playerHp} changeOpponentHp = {changeOpponentHp}/>

      </div>
      <div className = "opponent">
        <Opponent pokemon = {opponent} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} changePlayerHp = {changePlayerHp}/>
      </div>
    </div>
  )
}

export default PokeBattle