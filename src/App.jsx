import {Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import PokeHome from'./PokeHome'
import PokeCard from './PokeCard'
import PokeTeam from './PokeTeam'
import PokeBattle from './PokeBattleComponents/PokeBattle'
import PokeCare from './PokeCare'
import PokeBallIndicator from './PokeBallIndicator'

function App() {
  const[team, setTeam]= useState([])
  const max_team_size = 6

  return(
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#242424',
        padding: '1rem',
        zIndex: 1000
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '20px',
          width: '100%'
        }}>
          <Link to="/" className="nav-button" style={{ marginLeft: '20px' }}>Home</Link>
          <Link to="/team" className="nav-button" style={{ marginLeft: '20px' }}>
            My Team ({team.length}/{max_team_size})
          </Link>
          <div style={{ marginLeft: '10px', display: 'flex', gap: '4px' }}>
            {[...Array(max_team_size)].map((_, index) => (
              <PokeBallIndicator 
                key={index} 
                isFilled={index < team.length}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="main-content" style={{ paddingTop: '80px' }}>
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
      </div>
    </>
  )
}

export default App
