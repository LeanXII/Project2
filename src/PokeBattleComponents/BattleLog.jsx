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
          <p className = "player-log" key = {key}>{log[key].playerLog}</p>


          {log[key].hasOwnProperty('opponentLog') && (

            <p className = "opponent-log" key = {key}>{log[key].opponentLog}</p>
          )}


         </>
       ))}

    </div>
  )
}


export default BattleLog

