import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import { pointer } from '../../shared/assets';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchstopMining, fetchStartMining } from '../../API/getData';

type Props = {
  setContinue: (e: number) => void,
}

const wheelData = [
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#303032", textColor: 'black' }, optionSize: 2 },
]

const pointerProperties = {
  src: pointer,
  style: {
    width: "8%",
    transform: "rotate(-45deg)",
    right: "10%",
    top: "16%"
  }
}

const Lottery: React.FC<Props> = ({ setContinue }) => {

  const { walletAddress, mining, setOnlineMiners, setMiningRate, setMining } = useFlappyBirdContext();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress && mining === true) {
        const response = await fetchstopMining(walletAddress);
        if (response) {
          setMining(false)
        }
      }
    }
    init(walletAddress);
  }, [walletAddress])

  const handleSpinClick = () => {
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

    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);

      setTimeout(() => {
        
        init(walletAddress);
        setContinue(3);

      }, 6000);
    }
  }

  return (
    <div className='flex flex-col justify-between items-center lottery'
      style={{ height: "100%", width: "100vw", position: "fixed", zIndex: "100", top: 0 }}>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        spinDuration={0.5}
        outerBorderColor={localStorage.getItem('mui-mode') === 'light' ? "#D6E3FF" : "#000"}
        outerBorderWidth={20}
        radiusLineWidth={0}
        fontSize={12}
        onStopSpinning={() => {
          setMustSpin(false);
        }}

        // pointerRoullete
        pointerProps={pointerProperties}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  )
}

export default Lottery;