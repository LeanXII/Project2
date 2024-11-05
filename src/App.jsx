import {Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import PokeHome from'./PokeHome'
import PokeCard from './PokeCard'
import PokeTeam from './PokeTeam'
import PokeBattle from './PokeBattleComponents/PokeBattle'
import PokeCare from './PokeCare'


function App() {
  const[team, setTeam]= useState([])
  const max_team_size = 6


  console.log(team)
  return(
<>
<nav style = {{
    padding: '1rem',
    // backgroundColor: '#f0f0f0',
    marginBottom: '2rem'
}}>
  <div className='home-link'>
    <Link to="/">Home</Link>
  </div>
  <div className = "team-link">
    <Link to="/team">My Team({team.length}/{max_team_size})</Link>
  </div>

</nav>


    <Routes>
      <Route path ="/" element ={
<PokeHome
team = {team}
setTeam = {setTeam}
maxTeam = {max_team_size}
/>
      }/>
      <Route path = '/' element = {<PokeHome />} />
      <Route path = '/pokemon/:id' element = {<PokeCard team={team}
      setTeam={setTeam} maxTeam={max_team_size} />} />
      <Route path='/team' element={ <PokeTeam team={team}
      setTeam={setTeam} />}/>
      <Route path= '/battle' element={<PokeBattle />} />
      <Route path= '/care' element={<PokeCare />}/>
    </Routes>
</>
    //   {/* <Route path = '/team' element = {} ></Route> */}
    //</Routes>

  )

}

export default App
