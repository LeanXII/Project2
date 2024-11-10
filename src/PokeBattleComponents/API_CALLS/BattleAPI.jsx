const BASE_URL = 'https://pokeapi.co/api/v2/'

export const getMoveData = async (move) =>{
  try {

    const response = await fetch(`${BASE_URL}/move/${move}`)
    if(!response.ok){
      throw new Error(`There was an error! status: ${response.status}`)
    }
    return await response.json();

  } catch(error) {
    console.error('Error fetching:', error);
  }
}


export const getPokemonData = async (randomId) =>{
  try{
    const response = await fetch(`${BASE_URL}/pokemon/${randomId}`)
    if(!response.ok){
      throw new Error(`There was an error! status: ${response.status}`)
    }
    return await response.json()

  } catch(error){
    console.error('There was an error fetching', error)
  }
}

export const getDamageMoves = async () => {
  try{
    const response = await fetch(`${BASE_URL}/move-category/damage`)
    if(!response.ok){
      throw new Error(`There was an error. Status: ${response.status}`)
    }
    return await response.json()
  } catch(error){
    console.error('There was an error fetching:', error)
  }
}

export const getOpponent = async () =>{
  try{

    let randomId = Math.floor(Math.random() *500)
    const response = await fetch(`${BASE_URL}/pokemon/${randomId}`)
    if(!response.ok){
      throw new Error(`There was a server error. Status: ${response.status}`)
    }

    return await response.json();

  } catch(error){
    console.error('There was an error:', error)
  }
}


