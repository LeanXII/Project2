import { useState } from "react";
import { gsap } from "gsap";





const Player = ({ player }) => {

  console.log(player)





  return (
    <>
      <img className="player-sprite" src={player.sprite_back} />
      {player.moves.map((move)=>(
        <p key = {move.name} className = "battle-moves">{move}</p>
      ))}
    </>
  );
};

export default Player;
