import React, { useEffect, useState } from 'react';

import Winner from '../useWinner';
import './board.css'
import InfoPlayer from '../infoPlayer';
import Modal from '../modal';
import Timer from '../timer';

const Board = () => {


  const [squeres, setSqueres] = useState(Array(9).fill(''))

  const [toggle, setToggle] = useState('')
  const [generalGame, setGeneralGame] = useState(0)
  const [turn, setTurn] = useState(0);
  const [xwins, setXwins] = useState(0)
  const [owins, setOwins] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(true) // true is x 
  const setWinner = Winner(squeres)


  const [sec, setSec] = useState(0);
  const [oSec, setOsec] = useState(0);
  





  const openModal = () => {
    setTimeout(() => {
      setToggle('active')
    }, 2000);
  }
  useEffect(() => {
    switch (setWinner) {
      case 'o':
        setOwins(e => e + 1);
        openModal()
        setCurrentPlayer('twoStop');
        break;
      case 'x':
        setXwins(e => e + 1);
        openModal()
        setCurrentPlayer('twoStop');
        break;
      default: 
      
        break;
    }
  }, [setWinner]);


  useEffect(() => {
      if(turn > 8) {
        openModal()
        setCurrentPlayer('twoStop');
      }
  }, [turn])

  const newGame = () => {
    setSqueres(Array(9).fill(''))

    if(setWinner || turn > 8) {
      setGeneralGame(prevnum => prevnum + 1)
    }
      setTurn(0)
      setSec(0)
      setOsec(0)
    setCurrentPlayer(true)
  }


  const clickOnSquere = (data) => {
      const squeresCopy = [...squeres]

      if (setWinner || squeresCopy[data] ) {return}
      

      squeresCopy[data] = currentPlayer ? 'x' : 'o'

      setSqueres(squeresCopy)
      setCurrentPlayer(!currentPlayer)
      setTurn(e => e + 1)
      
  }
  const res = squeres ? squeres.map((data, i) => {
    return (
      <div key={i} onClick={e => clickOnSquere(i)} className="squere">{data}</div>  
    )
   }): null



   const PlayerNow = () => {

    const res = currentPlayer ? 'X' : 'O'

      return (
        <div className="currentPlayer">

          
            Хід: {res}
            <div className="general">
             Загальна кількість ігор: {generalGame}
           </div>

           
        </div>
      )
   }



   // timer

   useEffect(() => {
    let interval;
    if (currentPlayer === true) {
      interval = setInterval(() => {
        setSec((e) => e + 1);
      }, 1000);
    } else if(!currentPlayer) {
      interval = setInterval(() => {
        setOsec((e) => e + 1);
      }, 1000);
      
    }else {
        setCurrentPlayer('twoStop')
    }
  
    return () => clearInterval(interval);
  }, [currentPlayer])
  




const renderSeconds = (playerSec) => {

  const seconds = Math.floor(playerSec % 60)

  if (seconds < 10) {
    return `0${seconds}`
  }
  return seconds
}


const renderMinutes = (playerSec) => {
  const minutes = Math.floor(playerSec / 60)

  if (minutes < 10) {
    return `0${minutes}`
  }
  return minutes
}

const xtime = `${renderMinutes(sec)}:${  renderSeconds(sec)}`
const otime = `${renderMinutes(oSec)}:${  renderSeconds(oSec)}`

const winnerTime = setWinner === 'x'
  ? xtime
  : setWinner === 'o'
    ? otime
    : `${renderMinutes(sec + oSec)}:${renderSeconds(sec + oSec)}`;
  return (


<>
<Modal toggle={toggle} setToggle={setToggle} winner={setWinner} timer={winnerTime}/>
<div className="game">
      
        <InfoPlayer side={'X'} wins={xwins} timer={<Timer time={xtime}/>}/>
        
          <div className='game__inner'>


        
         
            <PlayerNow/>

            
            <div className="board">
                {res}
            </div>

            <button className='newGame' onClick={newGame}>Нова Гра</button>
              
          </div>
          <InfoPlayer side={'O'} wins={owins} timer={<Timer time={otime}/>}/>
    </div>

</>
    
    
    
  );
};

export default Board;
