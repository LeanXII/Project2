import { useState, useEffect } from "react";

const Opponent = ({opponent}) => {
  const [attackMoves, setAttackMoves] = useState([]);


  console.log(opponent)
  return (
    <>
      <img className="opponent-sprite" src={opponent.sprite_front} />
    </>
  );
};

export default Opponent;
