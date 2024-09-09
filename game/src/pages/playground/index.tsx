import React, { useEffect, useRef, useState } from 'react';

import Game from '../game';
import GameOver from '../over';
import { useGameContext } from '../../utilitiy/providers/GameProvider';
import { FlexDiv } from '@/components/div';
import Image from 'next/image';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import { formatNumberWithLeadingZeros } from '@/shared/functions';
// import { loading, rouletteImg } from '../../shared/assets';
// import Lottery from '../lottery';

const Playground: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const { profile, mining, onlineMiners, miningRate, gameStatus, setGameStatus, miningError, highScore, setHighScore } = useGameContext();
  const [roulette, setRoulette] = useState<boolean>(false);
  const [stateRoulette, setStateRoulette] = useState<boolean>(false);

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

  return (
    <>
      {
        gameStatus === 1 ?
          <GameOver setRestart={() => gameStatusHandle(0)} score={score} hScore={highScore} /> :
          <>
            <Game
              setGameStatus={(event: number) => gameStatusHandle(event)} gameStatus={gameStatus}
              setScores={(score: number) => setScore(score)}
              setRoulette={(event: boolean) => setRoulette(true)}
            />

            <div style={{ "display": "flex", "flexDirection": "row", alignItems: 'center', justifyContent: 'center', width: '100%', height: '10%', position: 'absolute', top: 0, }}>
              <div style={{ display: 'flex' }}>
                <p style={{ color: "white", fontSize: "3rem" }}>{score}</p>
              </div>
            </div>

            <div style={{ "display": "flex", "flexDirection": "row", alignItems: 'center', justifyContent: 'flex-end', width: '100%', height: '10%', position: 'absolute', top: 0, right: 20 }}>
              <FlexDiv $direction='column' $align='center'>
                <Image src={Img.Tickets} alt="Tickets" width={42.15} height={32} />
                <P>x {profile?.tickets?.balance}</P>
              </FlexDiv>
            </div>

            {
              !profile || profile?.keyID === '' ?
                <div style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, color: "white" }} className='flex flex-col justify-end'>
                  <div style={{ position: "absolute", bottom: 20, right: 20, color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                    {/* <img src={loading} style={{ width: "30px" }} /> */}
                    <p style={{ fontSize: "1rem" }}>Fetching Wallet Data</p>
                  </div>
                </div> :
                mining ? (
                  <div style={{ position: "absolute", bottom: 20, right: 20, color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                    <p style={{ fontSize: "1rem", margin: 0 }}>Mining Rate: {miningRate.toFixed(7)}</p>
                    <p style={{ fontSize: "1rem", margin: 0, marginBottom: "10px" }}>Online Miners: {onlineMiners}</p>
                  </div>
                )
                  : (
                    miningError ? (
                      <div style={{ position: "absolute", bottom: 20, right: 20, color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                        <p style={{ fontSize: "1rem" }}>Failed to start mining</p>
                      </div>
                    ) : (
                      <div style={{ position: "absolute", bottom: 20, right: 20, color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                        <p style={{ fontSize: "1rem" }}>Initiating Mining...</p>
                      </div>
                    )
                  )
            }
          </>
      }
    </>
  )
}

export default Playground;