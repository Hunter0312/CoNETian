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

  const { setPath, profile } = useFlappyBirdContext();

  return (
    <div className='flex flex-col' style={{
      height: '100%',
      justifyContent: 'space-evenly',
      padding: '20px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'auto',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div className='flex flex-col justify-between' style={{ gap: "4px" }}>
        <div>
          <p style={{ color: "white", fontSize: "2.5rem", margin: 0 }}>Current Score:</p>
          <p style={{ color: "white", fontSize: "3rem", marginBlock: 0 }}>{score}</p>
        </div>
        <div>
          <p style={{ color: "white", fontSize: "2.5rem", margin: 0, marginBlock: 0 }}>Highest Score:</p>
          <p style={{ color: "white", fontSize: "3rem", margin: 0, marginBlock: 0 }}>{hScore}</p>
        </div>
        {
          profile && profile?.tokens?.CNTP?.balance >= 0 &&
          <>
            <p style={{ color: "white", fontSize: "2.5rem", margin: 0 }}>CNTP Balance:</p>
            <p style={{ color: "white", fontSize: "3rem", margin: 0, marginBottom: "2rem" }}>{profile?.tokens?.CNTP?.balance}</p>
          </>
        }
      </div>
      <div className='flex flex-col align-center justify-between' style={{ gap: "16px" }}>
        <button onClick={setRestart} style={buttonStyle} className='startButton'>Restart</button>
        <button onClick={() => setPath('/')} style={buttonStyle}>
          Main Menu
        </button>
      </div>
    </div>
  )
}

export default GameOver;
