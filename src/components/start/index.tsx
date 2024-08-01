import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { birdImg, birdFly, birdFlyImg } from '../../shared/assets';
import { loading } from '../../shared/assets';

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

  const { setPath, walletAddress, setGameStatus, miningError, miningRate, onlineMiners, mining } = useFlappyBirdContext();
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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "80px" }}>
      <h1 style={{ color: "white", fontFamily: "FlappyBird", fontSize: "3rem", margin: 0 }}>The CoNETian</h1>
      <img src={bird % 3 === 0 ? birdImg : bird % 3 === 1 ? birdFlyImg : birdFly} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
        <button style={buttonStyle} className='startButton' onClick={() => { setPath('/start'); setGameStatus(0) }}>Start</button>
        <button style={buttonStyle} onClick={() => setPath('/wallet')}>My Wallet</button>
        <button style={buttonStyle} onClick={() => setPath('/about')}>About</button>
      </div>

      {
        !walletAddress &&
        <div style={{ bottom: "3rem", width: "100%", gap: "5px" }} className='flex justify-center items-center'>
          <img src={loading} style={{ width: "30px" }} />
          <p style={{ color: "white", fontSize: "2rem" }}>Fetching Wallet Data</p>
        </div>
      }
      {
        walletAddress === '' ?
          <div style={{ bottom: "3rem", width: "100%", gap: "5px" }} className='flex justify-center items-center'>
            <img src={loading} style={{ width: "30px" }} />
            <p style={{ color: "white", fontSize: "2rem" }}>Fetching Wallet Data</p>
          </div> :
          mining ?
            <div style={{ bottom: "3rem", width: "100%", gap: "5px" }} className='flex justify-center items-center'>
              <p style={{ fontSize: "1.5rem", margin: 0 }}>Mining Rate: {miningRate.toFixed(7)}</p>
              <p style={{ fontSize: "1.5rem", margin: 0, marginBottom: "10px" }}>Online Miners: {onlineMiners}</p>
            </div> : (miningError ? <div style={{ bottom: "3rem", width: "100%", gap: "5px" }} className='flex justify-center items-center'>
              <img src={loading} style={{ width: "30px" }} />
              <p style={{ color: "white", fontSize: "2rem" }}>Mining Error</p>
            </div> :
              <div style={{ bottom: "3rem", width: "100%", gap: "5px" }} className='flex justify-center items-center'>
                <img src={loading} style={{ width: "30px" }} />
                <p style={{ color: "white", fontSize: "2rem" }}>Initiating Mining</p>
              </div>)
      }
    </div >
  )
}

export default StartMessage;