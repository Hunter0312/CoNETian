import React, { useEffect, useState } from 'react';

import Game from '../game';
import GameOver from '../over';

const Playground: React.FC = () => {

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const gameOverHandle = (event: boolean) => {
    setGameOver(event);
  }

  useEffect(() => {
    console.log(gameOver, score);
  }, [gameOver])

  return (
    <>
      {
        gameOver ?
          <GameOver setRestart={() => gameOverHandle(false)} score={score} /> :
          <Game 
            setGameOver={(event: boolean) => gameOverHandle(event)} gameOver={gameOver}
            setScores={(score: number) => setScore(score)} />
      }
    </>
  )
}

export default Playground;
