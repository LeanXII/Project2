import {multiplierAndConditionsCheck} from './moveEffectivness'


export const damageCalc = (moveName, power, damageType, moveType, targetTypes, target, source) =>{
  let targetTypeArray = targetTypes.map((type)=>type.type.name)

  let multAndCondObject = multiplierAndConditionsCheck(targetTypeArray, moveType)



  let totalDamage;

  switch(damageType){
    case "special":
      totalDamage = (((2/5 +2)*power *target.specialDefense/source.specialAttack/50)+2)*multAndCondObject.multiplier

    break;
    case "physical":
      totalDamage = (((2/5 +2)*power *target.defense/source.attack/50)+2)*multAndCondObject.multiplier
    break;
  }

  return [totalDamage, multAndCondObject]
}