import React from 'react';

type Props = {
  setRestart: () => void,
  score: number
}

const GameOver: React.FC<Props> = ({ setRestart, score }) => {

  return (
    <div>
      <button onClick={setRestart} style={{fontSize: "40px"}}>restart</button>
      <div>{score}</div>
    </div>
  )
}

export default GameOver;
