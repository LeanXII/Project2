import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Player from './Player'
import Opponent from './Opponent'



const PokeBattle = () => {
  const [opponentList, setOpponentList] = useState([])
  const [opponent, setOpponent] = useState({})
  const [playerTurn, setPlayerTurn] = useState(true)
  const [playerHp, setPlayerHp] = useState('')
  const [opponentHp, setOpponentHp] = useState('')

  let location = useLocation()
  let pokemon = location.state.fighter;
  let randomOpId = Math.floor(Math.random() * 151)


  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res=>res.json())
    .then(data=>setOpponentList(data.results))
  }, [])

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomOpId}`)
    .then(res=>res.json())
    .then(data=>{
      setOpponent(data)
      setOpponentHp(data.stats[0].base_stat)
      setPlayerHp(pokemon.stats[0].base_stat)})

  }, [])




  const changeOpponentHp = (damage) =>{
    setOpponentHp((prevState=>{
      console.log(opponent.stats[2].base_stat)
      let finalDamage = (((2/5 +2)*damage *pokemon.stats[1].base_stat/opponent.stats[2].base_stat/50)+2)
      return prevState-finalDamage
  }))


  




  if(opponentList.length === 0 || Object.keys(opponent).length ===0 ) {
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
        <Opponent pokemon = {opponent} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp = {opponentHp} changePlayerHp = {setPlayerHp}/>
      </div>
    </div>
  )
}
}

export default PokeBattle