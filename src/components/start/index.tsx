import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { useConetianHighFire, useConetianLowFire, useConetianMediumFire } from '../../hooks/useConetianHooks';
import { loading } from '../../shared/assets';
import { audioImage, arbitrumLogo } from '../../shared/assets';

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "1.8rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px"
}

const StartMessage: React.FC = () => {
  const { setPath, profile, setGameStatus, miningError, miningRate, onlineMiners, mining, audio, setAudio, gameDifficulty } = useFlappyBirdContext();

  const [bird, setBird] = useState<number>(0);

  const conetianHighFireImage = useConetianHighFire();
  const conetianMediumFireImage = useConetianMediumFire();
  const conetianLowFireImage = useConetianLowFire();

  useEffect(() => {
    const init = setInterval(() => {
      setBird(prev => prev + 1)
    }, 100);

    return () => {
      clearInterval(init);
    };
  }, [])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative"
    }}>
      <div className='floating-top-container'>
        <button className={audio ? 'audioButton' : 'audioMute'} onClick={() => setAudio(audio ? false : true)}>
          <img src={audioImage} style={{ width: "20px" }} />
        </button>

        {
          !profile || profile?.keyID === '' ?
            <div className='info-message'>
              <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                <img src={loading} style={{ width: "15px" }} />
                <p>Fetching Wallet Data</p>
              </div>
            </div> :
            mining ?
              <div className='info-message'>
                <p>Mining Rate: {miningRate.toFixed(7)}</p>
                <p>Online Miners: {onlineMiners}</p>
              </div> : (!miningError ? <div className='info-message'>
                <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                  <img src={loading} style={{ width: "15px" }} />
                  <p>Initiating Mining</p>
                </div>
              </div> : <div className={'info-message blink_me'} >
                <p>Failed to start mining</p>
              </div>
              )
        }
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ color: "white", fontFamily: "FlappyBird", fontSize: "3rem", margin: 0 }}>The CoNETian</h1>
          <h2 style={{ color: "white", fontFamily: "FlappyBird", margin: 0 }}>{gameDifficulty === 1 ? 'Easy' : gameDifficulty === 2 ? 'Medium' : 'Hard'} Mode</h2>
        </div>

        <img src={bird % 3 === 0 ? conetianHighFireImage : bird % 3 === 1 ? conetianLowFireImage : conetianMediumFireImage} width={120} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "12px" }}>
          <button style={buttonStyle} className='startButton' onClick={() => { setPath('/start'); setGameStatus(0) }}>Start</button>
          <button style={buttonStyle} onClick={() => setPath('/difficulty')}>Difficulty</button>
          <button style={buttonStyle} onClick={() => setPath('/wallet')}>My Wallet</button>
          <button style={buttonStyle} onClick={() => setPath('/leaderboard')}>Leaderboard</button>
          <button style={buttonStyle} onClick={() => setPath('/about')}>About</button>
        </div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        fontSize: "1rem",
        color: "white",
        fontFamily: "FlappyBird",
        padding: "10px",
      }}>
        <img src={arbitrumLogo} style={{ width: "20px" }} />
        <p>built on Arbitrum</p>
      </div>
    </div >
  )
}

export default StartMessage;