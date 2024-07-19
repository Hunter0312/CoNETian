import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { birdImg, birdFly, birdFlyImg } from '../../shared/assets';
import { loading } from '../../shared/assets';

const StartMessage: React.FC = () => {

  const buttonStyle = {
    padding: "0",
    border: "0",
    backgroundColor: "transparent",
    color: "white",
    fontFamily: "FlappyBird",
    fontSize: "2.5rem"
  }

  const { setPath, publicKey } = useFlappyBirdContext();
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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "20px" }}>
      <h1 style={{color: "white", fontFamily: "FlappyBird", fontSize: "3rem"}}>The CoNETian</h1>
      <img src={bird % 3 === 0 ? birdImg : bird % 3 === 1 ? birdFlyImg :  birdFly} />
      <button style={buttonStyle} onClick={() => setPath('/start')}>Start</button>
      <button style={buttonStyle} onClick={() => setPath('/wallet')}>My Wallet</button>
      <button style={buttonStyle} onClick={() => setPath('/about')}>About</button>
      {
        !publicKey &&
          <div style={{position: "fixed", bottom: "3rem", width: "100%", gap: "5px"}} className='flex justify-center items-center'>
            <img src={loading} style={{width: "30px"}} />
            <p style={{color: "white", fontSize: "2rem"}}>fetching wallet data</p>
          </div>
      }
    </div>
  )
}

export default StartMessage;