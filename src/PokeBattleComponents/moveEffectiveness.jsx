




export const multiplierAndConditionsCheck = (typeArray, moveType) => {

  let multiplierText = '';
  let multiplier = 1;
  let freezeChance = 0;
  let paralyzeChance = 0;

  switch (moveType) {
    case "normal":
      if (
        typeArray.includes("rock") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (typeArray.includes("ghost")) {
        multiplier = 0;
      }
      break;
    case "fire":
      if (
        typeArray.includes("fire") ||
        typeArray.includes("water") ||
        typeArray.includes("rock") ||
        typeArray.includes("dragon")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("grass") ||
        typeArray.includes("ice") ||
        typeArray.includes("bug") ||
        typeArray.includes("steel")
      ) {
        multiplier = 2;
      }
      break;
    case "water":
      if (
        typeArray.includes("water") ||
        typeArray.includes("grass") ||
        typeArray.includes("dragon")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("fire") ||
        typeArray.includes("ground") ||
        typeArray.includes("rock")
      ) {
        multiplier = 2;
      }
      break;
    case "electric":
      if (
        typeArray.includes("electric") ||
        typeArray.includes("grass") ||
        typeArray.includes("dragon")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("water") ||
        typeArray.includes("flying")
      ) {
        multiplier = 2;
      }
      if (typeArray.includes("ground")) {
        multiplier = 0;
      }
      paralyzeChance = 10;
      break;
    case "grass":
      if (
        typeArray.includes("fire") ||
        typeArray.includes("steel") ||
        typeArray.includes("grass") ||
        typeArray.includes("poison") ||
        typeArray.includes("flying") ||
        typeArray.includes("bug") ||
        typeArray.includes("dragon")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("water") ||
        typeArray.includes("ground") ||
        typeArray.includes("rock")
      ) {
        multiplier = 2;
      }
      break;
    case "ice":
      if (
        typeArray.includes("water") ||
        typeArray.includes("ice") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("grass") ||
        typeArray.includes("ground") ||
        typeArray.includes("flying") ||
        typeArray.includes("dragon")
      ) {
        multiplier = 2;
      }
      freezeChance = 100;
      break;
    case "fighting":
      if (
        typeArray.includes("poison") ||
        typeArray.includes("flying") ||
        typeArray.includes("psychic") ||
        typeArray.includes("bug")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("normal") ||
        typeArray.includes("ice") ||
        typeArray.includes("rock") ||
        typeArray.includes("steel") ||
        typeArray.includes("dark")
      ) {
        multiplier = 2;
      }
      if (typeArray.includes("ghost")) {
        multiplier = 0;
      }
      break;
    case "poison":
      if (
        typeArray.includes("poison") ||
        typeArray.includes("ground") ||
        typeArray.includes("rock") ||
        typeArray.includes("ghost")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("grass") ||
        typeArray.includes("bug")
      ) {
        multiplier = 2;
      }
      if (typeArray.includes("steel")) {
        multiplier = 0;
      }
      break;
    case "ground":
      if (
        typeArray.includes("grass") ||
        typeArray.includes("bug")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("fire") ||
        typeArray.includes("electric") ||
        typeArray.includes("poison") ||
        typeArray.includes("rock") ||
        typeArray.includes("steel")
      ) {
        multiplier = 2;
      }
      if (typeArray.includes("flying")) {
        multiplier = 0;
      }
      break;
    case "flying":
      if (
        typeArray.includes("electric") ||
        typeArray.includes("rock") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("grass") ||
        typeArray.includes("fighting") ||
        typeArray.includes("bug")
      ) {
        multiplier = 2;
      }
      break;
    case "psychic":
      if (
        typeArray.includes("psychic") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("fighting") ||
        typeArray.includes("poison")
      ) {
        multiplier = 2;
      }
      if (typeArray.includes("dark")) {
        multiplier = 0;
      }
      break;
    case "bug":
      if (
        typeArray.includes("fire") ||
        typeArray.includes("steel") ||
        typeArray.includes("fighting") ||
        typeArray.includes("flying") ||
        typeArray.includes("ghost")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("grass") ||
        typeArray.includes("poison") ||
        typeArray.includes("psychic") ||
        typeArray.includes("dark")
      ) {
        multiplier = 2;
      }
      break;
    case "rock":
      if (
        typeArray.includes("fighting") ||
        typeArray.includes("steel") ||
        typeArray.includes("ground")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("fire") ||
        typeArray.includes("ice") ||
        typeArray.includes("flying") ||
        typeArray.includes("bug")
      ) {
        multiplier = 2;
      }
      break;
    case "ghost":
      if (
        typeArray.includes("steel") ||
        typeArray.includes("dark")
      ) {
        multiplier = 0.5;
      }
      if (typeArray.includes("ghost")) {
        multiplier = 2;
      }
      if (typeArray.includes("normal")) {
        multiplier = 0;
      }

      break;
    case "dragon":
      if (typeArray.includes("steel")) {
        multiplier = 0.5;
      }
      if (typeArray.includes("dragon")) {
        multiplier = 2;
      }
      break;
    case "dark":
      if (
        typeArray.includes("fighting") ||
        typeArray.includes("dark") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("psychic") ||
        typeArray.includes("ghost")
      ) {
        multiplier = 2;
      }
      break;
    case "steel":
      if (
        typeArray.includes("fire") ||
        typeArray.includes("water") ||
        typeArray.includes("electric") ||
        typeArray.includes("steel")
      ) {
        multiplier = 0.5;
      }
      if (
        typeArray.includes("ice") ||
        typeArray.includes("rock")
      ) {
        multiplier = 2;
      }
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

  const multAndCondObject = {
    mulitiplier: multiplier,
    multiplierText: multiplierText,
    pararlyzeChance: paralyzeChance,
    freezeChace: freezeChance
  }
  
  return multAndCondObject
};
