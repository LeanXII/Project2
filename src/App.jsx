import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import PokeHome from'./PokeHome'
import PokeCard from './PokeCard'
import PokeTeam from './PokeTeam'


function App() {
  const[team, setTeam]= useState([])

  return(

    <Routes>
      <Route path = '/' element = {<PokeHome />} />
      <Route path = '/pokemon/:id' element = {<PokeCard team={team}
      setTeam={setTeam} />} />
      <Route path='/team' element={ <PokeTeam team={team}
      setTeam={setTeam} />}/>
      </Routes>

    //   {/* <Route path = '/team' element = {} ></Route> */}
    // </Routes>

  )

}

export default App
