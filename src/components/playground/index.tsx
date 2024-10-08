import React, { useEffect, useRef, useState } from 'react';

import Game from '../game';
import GameOver from '../over';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { loading } from '../../shared/assets';
import Lottery from '../lottery';
import Pause from '../pause';

const Playground: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const { profile, mining, onlineMiners, miningRate, gameStatus, setGameStatus, miningError } = useFlappyBirdContext();
  const [highScore, setHighScore] = useState<number>(0);
  const [roulette, setRoulette] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const rouletteBtnTimeout = useRef<NodeJS.Timeout>();

  const gameStatusHandle = (event: number) => {
    setGameStatus(event);
  }

  useEffect(() => {

    if (gameStatus === 1) {
      setRoulette(false);
      const hScore = localStorage.getItem('hScore');
      if (hScore) {
        if (parseInt(hScore) < score)
          localStorage.setItem('hScore', score.toString());
      } else {
        localStorage.setItem('hScore', score.toString());
      }
      const temp = localStorage.getItem('hScore');
      if (temp)
        setHighScore(parseInt(temp));
    }
  }, [gameStatus])

  useEffect(() => {
    if (roulette) {
      rouletteBtnTimeout.current && clearTimeout(rouletteBtnTimeout.current);

      rouletteBtnTimeout.current = setTimeout(() => {
        setRoulette(false);
      }, 10000)
    }
  }, [roulette])

  return (
    <>
      {
        gameStatus === 1 ?
          <GameOver setRestart={() => gameStatusHandle(0)} score={score} hScore={highScore} /> :
          <>
            {
              gameStatus === 2 &&
              <Lottery setContinue={() => gameStatusHandle(3)} />
            }
            {
              gameStatus === 4 &&
              <Pause setContinue={() => gameStatusHandle(3)} />
            }
            <Game
              setGameStatus={(event: number) => gameStatusHandle(event)} gameStatus={gameStatus}
              setScores={(score: number) => setScore(score)}
              setRoulette={(event: boolean) => setRoulette(true)}
            />
            <p style={{ position: "fixed", color: "white", top: "20px", fontSize: "3rem", left: "50%" }}>{score}</p>

            {
              !profile || profile?.keyID === '' ?
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                  <div className='flex justify-center items-center' style={{ gap: "5px" }}>
                    <img src={loading} style={{ width: "30px" }} />
                    <p style={{ fontSize: "2rem" }}>Fetching Wallet Data</p>
                  </div>
                </div> :
                mining ?
                  <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                    <p style={{ fontSize: "1.5rem", margin: 0 }}>Mining Rate: {miningRate.toFixed(7)}</p>
                    <p style={{ fontSize: "1.5rem", margin: 0, marginBottom: "10px" }}>Online Miners: {onlineMiners}</p>
                  </div> : (miningError ? <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end blink_me'>
                    <p style={{ fontSize: "2rem" }}>Failed to start mining</p>
                  </div> :
                    <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                      <p style={{ fontSize: "2rem" }}>Initiating Mining...</p>
                    </div>)
            }
          </>
      }
    </>
  )
}

export default Playground;
