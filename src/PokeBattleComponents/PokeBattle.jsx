import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Player from './Player'
import Opponent from './Opponent'
import BattleLog from './BattleLog'
import multiplierAndConditionsCheck from './moveEffectiveness.jsx'
import Pokemon from './PokemonObj'
import * as APICalls from './API_CALLS/BattleAPI.jsx'
import {gsap} from 'gsap'



const PokeBattle = () => {
  const [player, setPlayer] = useState({})
  const [opponent, setOpponent] = useState({})



  let location = useLocation()
  let selectedPokemon = location.state.fighter;


  useEffect(()=>{
    const newPlayer = new Pokemon(selectedPokemon.name, selectedPokemon.stats, selectedPokemon.moves, {})
    setPlayer(newPlayer)
  }, [])


  useEffect(()=>{
    const getOpponent = async () =>{
      try{
        const opponentData = await APICalls.getOpponent();

        const newOpponent = new Pokemon(opponentData.name, opponentData.stats, opponentData.moves, {})
        setOpponent(newOpponent)

      } catch(error) {
        console.error('error fetching opponent:', error)
      }
    }
    getOpponent()
  }, [])


  useEffect(()=>{
    fetch('https://pokeapi.co/api/v2/move-category/damage')
    .then(res=>res.json())
    .then(data=> setAttackMoves(data.moves))
  }, [])

  useEffect(()=>{
    player.generateMoves()
  }, [player])

  useEffect(()=>{
    opponent.generateMoves()
  }, [opponent])



  const animatePlayer = () =>{

    gsap.to(".player-sprite", {
      ease: "none",
      y: -60,
      x: 80,

      duration: 0.2,
      yoyo: true,
      repeat: 1
    })

  }

  const animateOpponent = () =>{

    gsap.to(".opponent-sprite", {
      ease: "none",
      y: 60,
      x:-80,

      duration: 0.2,
      yoyo: true,
      repeat: 1,

    })
  }


  useEffect(()=>{
    setTimeout(()=>{
      if(opponentStatus.status==='paralyzed'){

        console.log('inside if statement')
        let randomChance = Math.floor(Math.random()*100)
        if(randomChance<=25){
          setTurnLog(prevState =>({
            ...prevState,
            [turnNumber]: {...prevState[turnNumber],
                        opponentLog: `${opponent.name} is paralyzed! It can't move!`
            }
          }))
          setTurnNumber((prevState)=>prevState +1)

          setPlayerTurn(true)
          return;
        }
      }

      if(opponentStatus.status === 'frozen'){
        let randomChance = Math.floor(Math.random()*100)
        if(randomChance<=20){
          setOpponentStatus({status: ''})
          setOpponentStatusText('')
        }
        else{
          setTurnLog((prevState)=>({
            ...prevState,
            [turnNumber]: {...prevState[turnNumber],
                            opponentLog: `${opponent.name} is frozen! It can't move!`
            }
          }))
          setTurnNumber((prevState)=>prevState+1)

          setPlayerTurn(true)
          return;
        }
      }
        let move = randomOpponentMoves[Math.floor(Math.random()*4)]
        move = move.toLowerCase()
        fetch(`https://pokeapi.co/api/v2/move/${move}`)
        .then(res=>res.json())
        .then(data=>{

          animateOpponent()
          changePlayerHp(data.power, data.damage_class.name, data.type.name, move)
          setPlayerTurn(true)

        })
    }, 2000)

  }, [turnAction])


  const handleMoveSelect = (move) => {
    if(!playerTurn) return
    let randomNumber
    switch(playerStatus.status){
      case 'paralyzed':
        randomNumber = Math.floor(Math.random()*100)
        if(randomNumber<=25){
          setTurnLog(prevState=>({
            ...prevState,
            [turnNumber]: {playerLog: `${pokemon.name} is paralyzed! It can't move!`}
          }))

          setTurnAction(!turnAction)
          return
        }
      break;
      case 'frozen':
        randomNumber = Math.floor(Math.random()*100)
        if(randomNumber<=20){
          opponentStatus.status = ''
          setPlayerStatusText('')
        }
        else{
          setTurnLog((prevState)=>({
            ...prevState,
            [turnNumber]: {playerLog: `${pokemon.name} is frozen! It can't move!`}
          }))

          setTurnAction(!turnAction)
          return
        }
    }


      move = move.toLowerCase();
      fetch( `https://pokeapi.co/api/v2/move/${move}`)
      .then(res=>res.json())
      .then(data=> {
         animatePlayer()
          changeOpponentHp(data.power, data.damage_class.name, data.type.name, move)
          setPlayerTurn(!playerTurn)
        })
  }




  const changeOpponentHp = (damage, attackType, moveType, move) =>{

    let opponentTypeArrayObject = opponent.types;
    let opponentTypeArray = opponentTypeArrayObject.map((elm => elm.type.name))

    let multAndCondObject = multiplierAndConditionsCheck(opponentTypeArray, moveType)


    setOpponentHp((prevState=>{
      let newHp = prevState-finalDamage;

        setTurnLog(prevState=>({
          ...prevState,
          [turnNumber]: {playerLog: `${playerStatusText} ${pokemon.name} uses ${move} to deal ${Math.floor(finalDamage)} damage! ${multiplierText}`}
        }))
        if(newHp<=0){
          newHp = 0
          setPlayerVictory(true)
        }
        return Math.floor(newHp)
    }))

  }




  const changePlayerHp = (damage, attackType, moveType, move) =>{

  let playerTypeArrayObject = pokemon.types;
  let playerTypeArray = playerTypeArrayObject.map((elm => elm.type.name))

  let multAndCondObject = multiplierAndConditionsCheck(playerTypeArray, moveType)



      let finalDamage;

      switch(attackType){
        case "special":
          finalDamage = (((2/5 +2)*damage *opponent.stats[3].base_stat/pokemon.stats[4].base_stat/50)+2)*multiplier

        break;
        case "physical":
          finalDamage = (((2/5 +2)*damage *opponent.stats[1].base_stat/pokemon.stats[2].base_stat/50)+2)*multiplier
        break;
      }


      let randomNumber = Math.floor(Math.random() * 100)
      if(randomNumber<=paralyzeChance && playerStatus.status === ''){
        setPlayerStatus({status: 'paralyzed'})
        setPlayerStatusText(`${pokemon.name} is paralyzed!`)
      }
      if(randomNumber<=freezeChance && playerStatus.status ===''){
        setPlayerStatus({status: 'frozen'})
        setPlayerStatusText(`${pokemon.name} is frozen!`)
      }


      setTurnLog(prevState =>({
        ...prevState,
        [turnNumber]: {...prevState[turnNumber],
                    opponentLog: `${opponentStatusText} ${opponent.name} uses ${move} to deal ${Math.floor(finalDamage)} damage! ${multiplierText}`
        }
      }))

      setPlayerHp((prevState=>{
        let newHp = prevState-finalDamage;

        setTurnNumber(prevState => (
          prevState + 1
        ))

        if(newHp<=0){
          newHp = 0;
          setOpponentVictory(true)
        }
        return Math.floor(newHp)
      }
   ))
  }

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
      <BattleLog log = {turnLog} />
      {playerVictory && <h1 className = "vic-banner">You Win!</h1>}
      {opponentVictory && <h1 className = "vic-banner">You Lose!</h1>}
      <img className = 'battle-scenery' src = "src/assets/pokemonBattle.png" />
    {playerTurn && !playerVictory && !opponentVictory && <p className = 'turn-checker' >Your turn!</p>}
    {!playerTurn && !playerVictory && !opponentVictory && <p className = 'turn-checker'>Opponents turn!</p>}

      <div className = 'your-fighter'>
        <Player pokemon = {pokemon} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp={playerHp} changeOpponentHp = {changeOpponentHp}/>
      </div>
      <div className = "your-fighters-info">

      <p>Current Hp:</p>
      <p className = "hp-bar" style={{width: `${playerHp/pokemon.stats[0].base_stat*100}%`}}>{playerHp}/{pokemon.stats[0].base_stat}</p>
      <h3>Moves:</h3>
      {randomPlayerMoves.map(move => (
        <div className = {`battle-moves`} onClick={()=>{handleMoveSelect(move)}}  key={move} >
             <span className = 'move' >{move}</span>

        </div>))}
     </div>


      <div className = "opponent">
        <Opponent pokemon = {opponent} playerTurn = {playerTurn} setPlayerTurn = {setPlayerTurn} hp = {opponentHp} changePlayerHp = {setPlayerHp}/>
      </div>
      <div className = "opponent-info">
      <p>Current Hp:</p>
      <p className = "hp-bar" style = {{width: `${opponentHp/opponent.stats[0].base_stat*100}%`}}>{opponentHp}/{opponent.stats[0].base_stat}</p>
      <h3>Moves:</h3>
      {randomOpponentMoves.map(move => (
        <div key={move} className = "battle-moves">
             <span className = "move">{move}</span>
        </div>))}
      </div>
    </div>
  )



export default PokeBattle