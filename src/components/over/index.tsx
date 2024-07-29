import React from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setRestart: () => void,
  score: number,
  hScore: number,
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
      <div className='flex flex-col'>
        <button onClick={setRestart} style={{ color: "white", padding: 0, backgroundColor: "transparent", border: 0, fontFamily: "FlappyBird", fontSize: "2.5rem", marginBottom: "2rem" }}>Restart</button>
        <button onClick={() => setPath('/')} style={{ color: "white", padding: 0, backgroundColor: "transparent", border: 0, fontFamily: "FlappyBird", fontSize: "2.5rem", marginBottom: "6rem" }}>
          Main Menu
        </button>
      </div>

    </div>
  )
}

export default GameOver;
