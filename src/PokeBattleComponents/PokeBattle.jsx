import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Player from './Player'
import Opponent from './Opponent'
import BattleLog from './BattleLog'
import {gsap} from 'gsap'



const PokeBattle = () => {
  const [opponentList, setOpponentList] = useState([])
  const [opponent, setOpponent] = useState({})
  const [playerTurn, setPlayerTurn] = useState(true)
  const [playerHp, setPlayerHp] = useState('')
  const [opponentHp, setOpponentHp] = useState('')
  const [attackMoves, setAttackMoves] = useState('')
  const [randomPlayerMoves, setRandomPlayerMoves] = useState([]);
  const [randomOpponentMoves, setRandomOpponentMoves] = useState([]);
  const [turnLog, setTurnLog] = useState({})
  const [playerVictory, setPlayerVictory] = useState(false)
  const [opponentVictory, setOpponentVictory] = useState(false)
  const [turnNumber, setTurnNumber] = useState(0)
  const [turnAction, setTurnAction] = useState(true)
  const [opponentStatus, setOpponentStatus] = useState({status: ''})
  const [opponentStatusText, setOpponentStatusText] = useState('')
  const [playerStatus, setPlayerStatus] = useState({status: ''})
  const [playerStatusText, setPlayerStatusText] = useState('')
  const [triggerForAnotherTrigger, setTriggerForAnotherTrigger] = useState(true)


  let location = useLocation()
  let pokemon = location.state.fighter;
  let randomOpId = Math.floor(Math.random() * 500)




  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=500")
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

  useEffect(()=>{
    fetch('https://pokeapi.co/api/v2/move-category/damage')
    .then(res=>res.json())
    .then(data=> setAttackMoves(data.moves))
  }, [])

  useEffect(() => {
    if (attackMoves.length > 0) {

      let fullPlayerMovesArray = pokemon.moves;
      let fullOpponentMovesArray = opponent.moves;
      let flattenedPlayerMovesArray = fullPlayerMovesArray.map((move) => move.move.name);
      let flattenedOpponentMovesArray = fullOpponentMovesArray.map((move) => move.move.name);
      let attackArray = attackMoves.map(move => move.name);



      let playerAttackMovesArray = flattenedPlayerMovesArray.filter((move) => attackArray.includes(move));
      let opponentAttackMovesArray = flattenedOpponentMovesArray.filter((move) => attackArray.includes(move));


      const getRandomMoves = (movesArray) => {
        let selectedMoves = [];
        while (selectedMoves.length < 4) {
          let randomIndex = Math.floor(Math.random() * movesArray.length);
          let randomMove = movesArray[randomIndex].charAt(0).toUpperCase() + movesArray[randomIndex].slice(1);

          if (!selectedMoves.includes(randomMove)) {
            selectedMoves.push(randomMove);
          }
        }
        return selectedMoves;
      };


      setRandomPlayerMoves(getRandomMoves(playerAttackMovesArray));
      setRandomOpponentMoves(getRandomMoves(opponentAttackMovesArray));
    }
  }, [attackMoves, opponent, pokemon]);

  useEffect(()=>{


    switch(opponentStatus.status){
      case 'paralyzed':
        setOpponentStatusText(`${opponent.name.charAt(0) + opponent.name.slice(1)} is paralyzed!`)
      break;
      case 'frozen':
        setOpponentStatusText(`${opponent.name.charAt(0) + opponent.name.slice(1)} is frozen!`)
    }
    setTurnAction(!turnAction)
  }, [triggerForAnotherTrigger])

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
                        opponentLog: `${opponent.name.charAt(0).toUpperCase() + opponent.name.slice(1)} is paralyzed! It can't move!`
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
                            opponentLog: `${opponent.name.charAt(0).toUpperCase() + opponent.name.slice(1)} is frozen! It can't move!`
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

    let paralyzeChance = 0;
    let freezeChance = 0;
    // let burnChance = 0;
    // let poisonChance = 0;



    let multiplier = 1;
    let multiplierText = '';

      switch(moveType){

        case "normal":
          if (opponentTypeArray.includes('rock')|| opponentTypeArray.includes('steel')){
            multiplier = 0.5
           }
           if(opponentTypeArray.includes('ghost')){
            multiplier = 0;
           }
        break;
        case "fire":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('water') || opponentTypeArray.includes('rock') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5
           }
          if(opponentTypeArray.includes('grass')|| opponentTypeArray.includes('ice')||opponentTypeArray.includes('bug') || opponentTypeArray.includes('steel')){
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
          if(opponentTypeArray.includes('ground')){
            multiplier = 0;
          }
          paralyzeChance = 10;
        break;
        case "grass":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('steel') || opponentTypeArray.includes('grass') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('bug') || opponentTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('water') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "ice":
          if(opponentTypeArray.includes('water') || opponentTypeArray.includes('ice') || opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('dragon')){
            multiplier = 2;
          }
          freezeChance = 100;
        break;
        case "fighting":
          if(opponentTypeArray.includes('poison') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('psychic') || opponentTypeArray.includes('bug') ){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('normal') || opponentTypeArray.includes('ice') || opponentTypeArray.includes('rock')|| opponentTypeArray.includes('steel') || opponentTypeArray.includes('dark')){
            multiplier = 2;
          }
          if(opponentTypeArray.includes('ghost')){
            multiplier = 0;
          }
        break;
        case "poison":
          if(opponentTypeArray.includes('poison') || opponentTypeArray.includes('ground') || opponentTypeArray.includes('rock') || opponentTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
          if(opponentTypeArray.includes('steel')){
            multiplier = 0;
          }
        break;
        case "ground":
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('bug')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('electric') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('rock') || opponentTypeArray.includes('steel')){
            multiplier = 2;
          }
          if(opponentTypeArray.includes('flying')){
            multiplier = 0;
          }
        break;
        case "flying":
          if(opponentTypeArray.includes('electric') || opponentTypeArray.includes('rock')|| opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('fighting') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "psychic":
          if(opponentTypeArray.includes('psychic')|| opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fighting') || opponentTypeArray.includes('poison')){
            multiplier = 2;
          }
          if(opponentTypeArray.includes('dark')){
            multiplier = 0;
          }
        break;
        case "bug":
          if(opponentTypeArray.includes('fire')|| opponentTypeArray.includes('steel') || opponentTypeArray.includes('fighting') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('grass') || opponentTypeArray.includes('poison') || opponentTypeArray.includes('psychic') || opponentTypeArray.includes('dark')){
            multiplier = 2;
          }
        break;
        case "rock":
          if(opponentTypeArray.includes('fighting') || opponentTypeArray.includes('steel') || opponentTypeArray.includes('ground')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('ice') || opponentTypeArray.includes('flying') || opponentTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "ghost":
          if(opponentTypeArray.includes('steel') || opponentTypeArray.includes('dark')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('ghost')){
            multiplier = 2;
          }
          if(opponentTypeArray.includes('normal')){
            multiplier = 0;
          }

        break;
        case "dragon":
          if(opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('dragon')){
            multiplier  = 2;
          }
        break;
        case "dark":
          if(opponentTypeArray.includes('fighting') || opponentTypeArray.includes('dark') || opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('psychic') || opponentTypeArray.includes('ghost')){
            multiplier = 2;
          }
        break;
        case "steel":
          if(opponentTypeArray.includes('fire') || opponentTypeArray.includes('water') || opponentTypeArray.includes('electric') || opponentTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(opponentTypeArray.includes('ice') || opponentTypeArray.includes('rock')){
            multiplier = 2;
          }


        }






    let finalDamage;

    switch(attackType){
      case "special":
         finalDamage = (((2/5 +2)*damage *pokemon.stats[3].base_stat/opponent.stats[4].base_stat/50)+2)*multiplier

      break;
      case "physical":
         finalDamage = (((2/5 +2)*damage *pokemon.stats[1].base_stat/opponent.stats[2].base_stat/50)+2)*multiplier
      break;
    }

    switch(multiplier){
      case 2:
        multiplierText = "Super Effective!"
      break;
      case 0.5:
        multiplierText = "Not Very Effective..."
      break;
      case 0:
        multiplierText = "No Effect..."
    }

    let randomNumber = Math.floor(Math.random() * 100)
    if(randomNumber<=paralyzeChance && opponentStatus.status === ''){
      setOpponentStatus({status: 'paralyzed'})
      setTriggerForAnotherTrigger(!triggerForAnotherTrigger)
    }
    else{
      setTriggerForAnotherTrigger(!triggerForAnotherTrigger)
    }
    if(randomNumber<=freezeChance && opponentStatus.status === ''){
      setOpponentStatus({status: 'frozen'})
      setTriggerForAnotherTrigger(!triggerForAnotherTrigger)
    }
    else{
      setTriggerForAnotherTrigger(!triggerForAnotherTrigger)
    }

    setOpponentHp((prevState=>{
      let newHp = prevState-finalDamage;

        setTurnLog(prevState=>({
          ...prevState,
          [turnNumber]: {playerLog: `${playerStatusText} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} uses ${move} to deal ${Math.floor(finalDamage)} damage! ${multiplierText}`}
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

  if(playerVictory){
    return
  }
  else{


    let paralyzeChance = 0;
    let freezeChance = 0;

    let multiplier = 1;
    let multiplierText = '';

      switch(moveType){

        case "normal":
          if (playerTypeArray.includes('rock')|| playerTypeArray.includes('steel')){
            multiplier = 0.5
           }
           if(playerTypeArray.includes('ghost')){
            multiplier = 0;
           }
        break;
        case "fire":
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('water') || playerTypeArray.includes('rock') || playerTypeArray.includes('dragon')){
            multiplier = 0.5
           }
          if(playerTypeArray.includes('grass')|| playerTypeArray.includes('ice')||playerTypeArray.includes('bug') || playerTypeArray.includes('steel')){
            multiplier = 2;
          }
        break;
        case "water":
          if(playerTypeArray.includes('water')|| playerTypeArray.includes('grass') || playerTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('ground') || playerTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "electric":
          if(playerTypeArray.includes('electric') || playerTypeArray.includes('grass') || playerTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('water') || playerTypeArray.includes('flying')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('ground')){
            multiplier = 0;
          }
          paralyzeChance = 100;
        break;
        case "grass":
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('steel') || playerTypeArray.includes('grass') || playerTypeArray.includes('poison') || playerTypeArray.includes('flying') || playerTypeArray.includes('bug') || playerTypeArray.includes('dragon')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('water') || playerTypeArray.includes('ground') || playerTypeArray.includes('rock')){
            multiplier = 2;
          }
        break;
        case "ice":
          if(playerTypeArray.includes('water') || playerTypeArray.includes('ice') || playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('grass') || playerTypeArray.includes('ground') || playerTypeArray.includes('flying') || playerTypeArray.includes('dragon')){
            multiplier = 2;
          }
          freezeChance = 100
        break;
        case "fighting":
          if(playerTypeArray.includes('poison') || playerTypeArray.includes('flying') || playerTypeArray.includes('psychic') || playerTypeArray.includes('bug') ){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('normal') || playerTypeArray.includes('ice') || playerTypeArray.includes('rock')|| playerTypeArray.includes('steel') || playerTypeArray.includes('dark')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('ghost')){
            multiplier = 0;
          }
        break;
        case "poison":
          if(playerTypeArray.includes('poison') || playerTypeArray.includes('ground') || playerTypeArray.includes('rock') || playerTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('grass') || playerTypeArray.includes('bug')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('steel')){
            multiplier = 0;
          }
        break;
        case "ground":
          if(playerTypeArray.includes('grass') || playerTypeArray.includes('bug')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('electric') || playerTypeArray.includes('poison') || playerTypeArray.includes('rock') || playerTypeArray.includes('steel')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('flying')){
            multiplier = 0;
          }
        break;
        case "flying":
          if(playerTypeArray.includes('electric') || playerTypeArray.includes('rock')|| playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('grass') || playerTypeArray.includes('fighting') || playerTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "psychic":
          if(playerTypeArray.includes('psychic')|| playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('fighting') || playerTypeArray.includes('poison')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('dark')){
            multiplier = 0;
          }
        break;
        case "bug":
          if(playerTypeArray.includes('fire')|| playerTypeArray.includes('steel') || playerTypeArray.includes('fighting') || playerTypeArray.includes('flying') || playerTypeArray.includes('ghost')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('grass') || playerTypeArray.includes('poison') || playerTypeArray.includes('psychic') || playerTypeArray.includes('dark')){
            multiplier = 2;
          }
        break;
        case "rock":
          if(playerTypeArray.includes('fighting') || playerTypeArray.includes('steel') || playerTypeArray.includes('ground')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('ice') || playerTypeArray.includes('flying') || playerTypeArray.includes('bug')){
            multiplier = 2;
          }
        break;
        case "ghost":
          if(playerTypeArray.includes('steel') || playerTypeArray.includes('dark')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('ghost')){
            multiplier = 2;
          }
          if(playerTypeArray.includes('normal')){
            multiplier = 0;
          }

        break;
        case "dragon":
          if(playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('dragon')){
            multiplier  = 2;
          }
        break;
        case "dark":
          if(playerTypeArray.includes('fighting') || playerTypeArray.includes('dark') || playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('psychic') || playerTypeArray.includes('ghost')){
            multiplier = 2;
          }
        break;
        case "steel":
          if(playerTypeArray.includes('fire') || playerTypeArray.includes('water') || playerTypeArray.includes('electric') || playerTypeArray.includes('steel')){
            multiplier = 0.5;
          }
          if(playerTypeArray.includes('ice') || playerTypeArray.includes('rock')){
            multiplier = 2;
          }




      }






      let finalDamage;

      switch(attackType){
        case "special":
          finalDamage = (((2/5 +2)*damage *opponent.stats[3].base_stat/pokemon.stats[4].base_stat/50)+2)*multiplier

        break;
        case "physical":
          finalDamage = (((2/5 +2)*damage *opponent.stats[1].base_stat/pokemon.stats[2].base_stat/50)+2)*multiplier
        break;
      }

      switch(multiplier){
        case 2:
          multiplierText = "Super Effective!"
        break;
        case 0.5:
          multiplierText = "Not Very Effective..."
        break;
        case 0:
          multiplierText = "No Effect..."
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
                    opponentLog: `${opponentStatusText} ${opponent.name.charAt(0).toUpperCase()+opponent.name.slice(1)} uses ${move} to deal ${Math.floor(finalDamage)} damage! ${multiplierText}`
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
}


export default PokeBattle