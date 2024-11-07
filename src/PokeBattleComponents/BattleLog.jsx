import {useRef, useEffect} from 'react'


const BattleLog = ({log}) =>{

  const logContainerDiv = useRef(null)

    useEffect(()=>{
      if(logContainerDiv){
        logContainerDiv.current.scrollTop = logContainerDiv.current.scrollHeight;
      }
    })

    return(


    <div ref = {logContainerDiv} className = "log-container">
       {Object.keys(log).map((key)=>(
         <>
          <p className = "player-log" key = {key}>Player uses {log[key].playerLog[0]} to deal {log[key].playerLog[1]} damage! <span className = "special-text">{log[key].playerLog[2]}</span></p>


          {log[key].hasOwnProperty('opponentLog') && (
            <p className = "opponent-log" key = {key}>Opponent uses {log[key].opponentLog[0]} to deal {log[key].opponentLog[1]} damage! <span className = "special-text">{log[key].opponentLog[2]}</span></p>
          )}

         </>
       ))}

    </div>
  )
}


export default BattleLog

