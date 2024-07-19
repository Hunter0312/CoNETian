import React, { useEffect } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchCNTPBalance } from '../../API/getData';
type Props = {
  setRestart: () => void,
  score: number,
  hScore: number,
}

const GameOver: React.FC<Props> = ({ setRestart, score, hScore }) => {

  const { setPath, balance, setBalance, publicKey, privateKey } = useFlappyBirdContext();

  useEffect(() => {
    const init = async (address: string) => {
      const response = await fetchCNTPBalance(address);
      if (response && response.length >= 2) {
        if (response[0] === 'SUCCESS') {
          setBalance(response[1][0]);
        }
      }
    }
    if (publicKey && privateKey) {
      init(publicKey);
    }
  }, [publicKey, privateKey]);

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
          MAIN MENU
        </button>
      </div>

    </div>
  )
}

export default GameOver;
