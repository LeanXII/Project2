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




  const changeOpponentHp = (damage, attackType, moveType) =>{

    let opponentTypeArrayObject = opponent.types;
    let opponentTypeArray = opponentTypeArrayObject.map((elm => elm.type.name))



    let multiplier = 1;

      switch(moveType){

        case "normal":
          if (opponentTypeArray.includes('rock')){
            multiplier = 0.5
           }
        break;
        case "fire":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('water') || opponentTypeArray.includes('rock') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5
           }
          if(opponentTypeArray.includes('grass')|| opponentTypeArray.includes('ice')||opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "water":
          if(opponentTypeArray.includes('water')|| opponentTypeArray.includes('grass') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "electric":
          if(opponentTypeArray.includes('electric') || opponentTypeArray.includes('grass') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('water') || opponentTypeArray.includes('flying')){
            multiplier = 2;
          }
        break;
        case "grass":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('grass') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('bug') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('water') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "ice":
          if(opponentTypeArray.includes('water') || opponentTypeArray.includes('ice')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('dragon')){
            multiplier = 2;
          }
        break;
        case "fighting":
          if(opponentTypeArray.includes('poison') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('psychic') || opponentTypeArray.includes('bug')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('normal') || opponentTypeArray.includes('ice') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "poison":
          if(opponentTypeArray.includes('poison') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('rock') || opponentTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "ground":
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('bug')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('electric') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "flying":
          if(opponentTypeArray.includes('electric') || opponentTypeArray.includes('rock')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('fighting') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "psychic":
          if(opponentTypeArray.includes('psychic')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fighting') || opponentTypeArray.includes('poison')){
            multiplier = 2;
          }
        break;
        case "bug":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('fighting') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('psychic')){
            multiplier = 2;
          }
        break;
        case "rock":
          if(opponentTypeArray.includes('fighting') || opponentTypeArray.includes('ground')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('ice') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "ghost":
          if(opponentTypeArray.includes('ghost')){
            multiplier = 2;
          }
        break;
        case "dragon":
          if(opponentTypeArray.includes('dragon')){
            multiplier  = 2;
          }
        break;


        }






    let finalDamage;

    switch(attackType){
      case "special":
         finalDamage = (((2/5 +2)*damage *pokemon.stats[3].base_stat/opponent.stats[4].base_stat/50)+2)*multiplier
         console.log(finalDamage)
      break;
      case "physical":
         finalDamage = (((2/5 +2)*damage *pokemon.stats[1].base_stat/opponent.stats[2].base_stat/50)+2)*multiplier
        //  console.log('with multiplier: ', finalDamage)
        //  console.log('without multiplier:', finalDamage/multiplier)
      break;

    }
    setOpponentHp((prevState=>{
      return Math.floor(prevState-finalDamage)
  }))
}






  if(opponentList.length === 0 || Object.keys(opponent).length ===0 ) {
    return(
      <div>
        Loading
      </div>
    )
  }




  return(
    <div className = "battlefield">
      <img className = 'battle-scenery' src = "src/assets/pokemonBattle.webp" />
    {playerTurn && <p className = 'turn-checker' >Your turn!</p>}
    {!playerTurn && <p className = 'turn-checker'>Opponents turn!</p>}

      <div className = 'your-fighter'>
        <Player pokemon = {pokemon} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp={playerHp} changeOpponentHp = {changeOpponentHp}/>
      </div>
      <div className = "your-fighters-info">

      <p>Current Hp: {playerHp}</p>

      <h3>Moves:</h3>
      {pokemon.moves.slice(0, 4).map(move => (
        <div className = "battle-moves" onClick={()=>handleMoveSelect(move.move.url)} key={move.move.name} >
             {move.move.name}
        </div>))}
     </div>


      <div className = "opponent">
        <Opponent pokemon = {opponent} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp = {opponentHp} changePlayerHp = {setPlayerHp}/>
      </div>
      <div className = "opponent-info">
      <p>Current Hp: {opponentHp}</p>
      <h3>Moves:</h3>
      {opponent.moves.slice(0, 4).map(move => (
        <div key={move.move.name} >
             {move.move.name}
        </div>))}
      </div>
    </div>
  )
}


export default PokeBattle