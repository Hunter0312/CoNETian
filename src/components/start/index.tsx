import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { birdImg, birdFly, birdFlyImg } from '../../shared/assets';
import { loading } from '../../shared/assets';
import { audioImage } from '../../shared/assets';

const StartMessage: React.FC = () => {

  const buttonStyle = {
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    padding: "10px 20px",
    borderRadius: "15px",
    width: "240px"
  }


  const { setPath, walletAddress, setGameStatus, miningError, miningRate, onlineMiners, mining, audio, setAudio } = useFlappyBirdContext();

  const [bird, setBird] = useState<number>(0);

  useEffect(() => {
    const init = setInterval(() => {
      setBird(prev => prev + 1)
    }, 100);

    return () => {
      clearInterval(init);
    };
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", position: "relative" }}>
      <div className='floating-top-container'>
        <button className={audio ? 'audioButton' : 'audioMute'} onClick={() => setAudio(audio ? false : true)}>
          <img src={audioImage} style={{ width: "20px" }} />
        </button>

        {
          walletAddress === '' ?
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

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "30px" }}>
        <h1 style={{ color: "white", fontFamily: "FlappyBird", fontSize: "3rem", margin: 0 }}>The CoNETian</h1>
        <img src={bird % 3 === 0 ? birdImg : bird % 3 === 1 ? birdFlyImg : birdFly} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
          <button style={buttonStyle} className='startButton' onClick={() => { setPath('/start'); setGameStatus(0) }}>Start</button>
          <button style={buttonStyle} onClick={() => setPath('/difficulty')}>Change Difficulty</button>
          <button style={buttonStyle} onClick={() => setPath('/wallet')}>My Wallet</button>
          <button style={buttonStyle} onClick={() => setPath('/about')}>About</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "row", padding: "10px" }}>
        <button className='leaderboard' style={{
          color: "white",
          fontSize: "32px",
          backgroundColor: "transparent",
          border: 0,

        }}
          onClick={() => setPath('/leaderboard')}>
          {"Leaderboard >"}
        </button>
      </div>
    </div >
  )
}

export default StartMessage;