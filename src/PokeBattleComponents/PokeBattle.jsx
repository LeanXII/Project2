import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Player from "./Player";
import Opponent from "./Opponent";
import BattleLog from "./BattleLog";
import {damageCalc} from './DamageAndStatusFunc.jsx'
import Pokemon from "./PokemonObj";
import * as APICalls from "./API_CALLS/BattleAPI.jsx";
import * as Animations from "./Animations.jsx";
import { gsap } from "gsap";

const PokeBattle = () => {
  const [player, setPlayer] = useState({});
  const [opponent, setOpponent] = useState({});
  const [canReturn, setCanReturn] = useState(false);
  const [damageMoveList, setDamageMoveList] = useState([]);

  const opponentMovesGenerated = useRef(false);
  const playerMovesGenerated = useRef(false);

  let location = useLocation();
  let selectedPokemon = location.state.fighter;

  useEffect(() => {
    if (
      Object.keys(player).length &&
      Object.keys(opponent).length
      // player.moves.length === 4 &&
      // opponent.moves.length === 4
    ) {
      setCanReturn(true);
    }
  }, [player, opponent]);

  //SET A NEW PLAYER
  useEffect(() => {
    const newPlayer = new Pokemon(
      selectedPokemon.name,
      selectedPokemon.stats,
      selectedPokemon.moves,
      selctedPokemon.types,
      selectedPokemon.sprites.front_default,
      selectedPokemon.sprites.back_default,
      {}
    );
    setPlayer(newPlayer);
  }, []);

  //SET A NEW OPPONENT
  useEffect(() => {
    const getOpponent = async () => {
      try {
        const opponentData = await APICalls.getOpponent();

        const newOpponent = new Pokemon(
          opponentData.name,
          opponentData.stats,
          opponentData.moves,
          opponentData.types,
          opponentData.sprites.front_default,
          opponentData.sprites.back_default,
          {}
        );
        setOpponent(newOpponent);
      } catch (error) {
        console.error("error fetching opponent:", error);
      }
    };
    getOpponent();
  }, []);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/move-category/damage")
      .then((res) => res.json())
      .then((data) => setDamageMoveList(data.moves));
  }, []);

  //GENERATE MOVES FOR PLAYER AND OPPONENT
  useEffect(() => {
    if (player instanceof Pokemon && opponent instanceof Pokemon) {
      if (!playerMovesGenerated.current) {
        player.generateMoves(damageMoveList);
        playerMovesGenerated.current = true;
      }
      if (!opponentMovesGenerated.current) {
        opponent.generateMoves(damageMoveList);
        opponentMovesGenerated.current = true;
      }
    }
  }, [player, opponent]);





  const handlePlayerMoveSelect = async (move) =>{
    try{
      let moveData = await APICalls.getMoveData(move)
      let damageResult = damageCalc(moveData.power, moveData.damage_class.name, moveData.type.name, opponent.types, opponent, player )


    } catch(error){
      console.error('Error fetching:', error)
    }
  }








  if (!canReturn) {
    return <div>Loading</div>;
  }

  return (
    <div className="battlefield">
      {/* <BattleLog /> */}
      <img className="battle-scenery" src="src/assets/pokemonBattle.png" />
      <Player player={player} />
      <Opponent opponent={opponent} />
    </div>
  );
};

export default PokeBattle;
