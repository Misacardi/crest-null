import React, { useEffect, useState } from 'react';

import Winner from '../useWinner';
import './board.css'
import InfoPlayer from '../infoPlayer';
import Modal from '../modal';

const Board = () => {


  const [squeres, setSqueres] = useState(Array(9).fill(''))

  const [toggle, setToggle] = useState('')
  const [generalGame, setGeneralGame] = useState(0)
  const [turn, setTurn] = useState(0);
  const [xwins, setXwins] = useState(0)
  const [owins, setOwins] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(true) // true is x 
  const setWinner = Winner(squeres)



  useEffect(() => {
    switch (setWinner) {
      case 'o':
        setOwins(e => e + 1);
        setToggle('active')
        break;
      case 'x':
        setXwins(e => e + 1);
        setToggle('active')
        break;
      default: 
      
        break;
    }
  }, [setWinner]);


  useEffect(() => {
      if(turn > 8) {
        setToggle('active')
      }
  }, [turn])

  const newGame = () => {
    setSqueres(Array(9).fill(''))

    if(setWinner || turn > 8) {
      setGeneralGame(prevnum => prevnum + 1)
    }
      setTurn(0)
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


  return (


<>
<Modal toggle={toggle} setToggle={setToggle} winner={setWinner}/>
<div className="game">
      
        <InfoPlayer side={'X'} wins={xwins}/>
          <div className='game__inner'>


        
         
            <PlayerNow/>

            
            <div className="board">
                {res}
            </div>

            <button className='newGame' onClick={newGame}>Нова Гра</button>
              
          </div>
          <InfoPlayer side={'O'} wins={owins}/>
    </div>

</>
    
    
    
  );
};

export default Board;
