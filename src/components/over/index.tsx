import React, { useEffect, useRef } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { BackgroundAudio } from '../../shared/assets';

type Props = {
  setRestart: () => void,
  score: number,
  hScore: number,
}

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px"
}

const GameOver: React.FC<Props> = ({ setRestart, score, hScore }) => {

  const { setPath, balance } = useFlappyBirdContext();


  return (
    <div className='flex flex-col justify-between items-center' style={{ height: "100%" }}>
      <div className='flex flex-col justify-between'>
        <p style={{ color: "white", fontSize: "5rem" }}>{score}</p>
        {
          balance !== 0 &&
          <>
            <p style={{ color: "white", fontSize: "2.5rem", margin: 0 }}>CNTP Balance:</p>
            <p style={{ color: "white", fontSize: "3rem", margin: 0, marginBottom: "2rem" }}>{balance}</p>
          </>
        }
        <p style={{ color: "white", fontSize: "2.5rem", margin: 0 }}>Highest Score:</p>
        <p style={{ color: "white", fontSize: "3rem", margin: 0 }}>{hScore}</p>
      </div>
      <div className='flex flex-col align-center justify-between' style={{ gap: "16px" }}>
        <button onClick={setRestart} style={buttonStyle} className='startButton'>Restart</button>
        <button onClick={() => setPath('/')} style={{ ...buttonStyle, marginBottom: "5rem" }}>
          Main Menu
        </button>
      </div>
    </div>
  )
}

export default GameOver;
