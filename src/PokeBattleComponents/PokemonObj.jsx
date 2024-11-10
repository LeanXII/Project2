

export class Pokemon {
  constructor(name, stats, moves, statusConditions ){
    this.name = name;
    this.hp = stats[0].base_stat;
    this.attack = stats[1].base_stat;
    this.defense = stats[2].base_stat;
    this.specialAttack = stats[3].base_stat;
    this.specialDefense = stats[4].base_stat;
    this.moves = moves;
    this.statusConditions = statusConditions;
  }





  takeDamage(power, attackType, multiplier){

    let finalDamage;

    switch(attackType){
      case "special":
        finalDamage = (((2/5 +2)*power *opponent.stats[3].base_stat/this.specialDefense/50)+2)*multiplier

      break;
      case "physical":
        finalDamage = (((2/5 +2)*power *opponent.stats[1].base_stat/this.defense/50)+2)*multiplier
      break;
    }

    this.hp = this.hp-finalDamage;
  }

   generateMoves(moveOptions){
    let flattenedArray = this.moves.map((move)=>move.move.name);
    moveOptions = moveOptions.map((move=>move.name));

    let learnableAttackMoves = flattenedArray.filter((move)=>moveOptions.includes(move))

    let selectedMoves = [];
    while(selectedMoves.length<4){
      let randomIndex = Math.floor(Math.random()*learnableAttackMoves.length);
      let randomMove = learnableAttackMoves[randomIndex].charAt(0).toUpperCase() + learnableAttackMoves[randomIndex].slice(1);
      if(!selectedMoves.includes(randomMove)){
        selectedMoves.push(randomMove)
      }
    }
    this.moves = selectedMoves;
  }
}



