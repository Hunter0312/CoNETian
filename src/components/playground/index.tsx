import React, { useEffect, useState } from 'react';

import Game from '../game';
import GameOver from '../over';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchStartMining, fetchstopMining } from '../../API/getData';
import { loading } from '../../shared/assets';

const Playground: React.FC = () => {

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const { publicKey, mining, setMining } = useFlappyBirdContext();
  const [online, setOnline] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const gameOverHandle = (event: boolean) => {
    setGameOver(event);
  }

  useEffect(() => {
    const init = async (walletAddress: string) => {
      const response = await fetchStartMining(walletAddress);
      if (response) {
        setOnline(response?.online);
        setRate(response?.rate);
        setMining(true);
      }

    }
    if (publicKey && score === 3 && mining === false)
      init(publicKey);
  }, [score]);

  useEffect(() => {
    const init = async (walletAddress: string) => {
      const response = await fetchstopMining(walletAddress);
      if (response === 'SUCCESS') {
        setMining(false);
      }
    }

    if (gameOver && mining) {
      init(publicKey);
    }

    if (gameOver) {
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
  }, [gameOver])

  return (
    <>
      {
        gameOver ?
          <GameOver setRestart={() => gameOverHandle(false)} score={score} hScore={highScore} /> :
          <>
            <Game
              setGameOver={(event: boolean) => gameOverHandle(event)} gameOver={gameOver}
              setScores={(score: number) => setScore(score)} />
            <p style={{ position: "fixed", color: "white", top: "20px", fontSize: "3rem", left: "50%" }}>{score}</p>
            {
              publicKey === '' ?
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                  <div className='flex justify-center items-center' style={{ gap: "5px" }}>
                    <img src={loading} style={{ width: "30px" }} />
                    <p style={{ fontSize: "2rem" }}>Fetching Wallet Data</p>
                  </div>
                </div> :
                mining ?
                  <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                    <p style={{ fontSize: "1.5rem", margin: 0 }}>Mining Rate: {rate.toFixed(7)}</p>
                    <p style={{ fontSize: "1.5rem", margin: 0, marginBottom: "10px" }}>Online Miners: {online}</p>
                  </div> :
                  <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                    <p style={{ fontSize: "2rem" }}>Initiating Mining...</p>
                  </div>
            }
          </>
      }
    </>
  )
}

export default Playground;
