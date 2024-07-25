import React, { useEffect, useState } from 'react';
import { fetchStartMining } from '../../API/getData';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: number) => void
}

const Delay: React.FC<Props> = ({ setContinue }) => {

  const [counter, setCounter] = useState<number>(3);
  const { walletAddress, setOnlineMiners, setMiningRate, setMining, mining } = useFlappyBirdContext();

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress && mining === false) {
        const response = await fetchStartMining(walletAddress);
        if (response) {
          setOnlineMiners(response?.online);
          setMiningRate(response?.rate);
          setMining(true);
        }
      }
    }

    if (counter === 0) {
      setContinue(3);
      init(walletAddress);
    }
    setTimeout(() => {
      setCounter(e => e - 1);
    }, 1000);
  }, [counter])

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%", width: "100%" }}>
      <p style={{ color: "white", fontSize: "36px" }}>{counter}</p>
    </div>
  )
}

export default Delay;