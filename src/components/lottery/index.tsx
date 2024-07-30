import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Win from './win';
import Lose from './lose';

import { pointer } from '../../shared/assets';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchRouletteResult, fetchstopMining } from '../../API/getData';
import Delay from './delay';

type Props = {
  setContinue: (e: number) => void,
}

const rouletteResultMapping: { [key: string]: number } = {
  '0': 0,
  '0.1': 1,
  '0.5': 3,
  '1': 5,
}

const doubleRouletteResultMapping: { [key: string]: number } = {
  '0': 0,
  '0.2': 1,
  '1': 1,
  '2': 1,
}

const wheelData = [
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 2 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
]

const doubleData = [
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 4 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 4 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'black' }, optionSize: 4 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
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

  const { walletAddress, mining, setMining, setLottery } = useFlappyBirdContext();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [status, setStatus] = useState<string>("default");

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

  const handleSpinClick = async () => {
    if (!mustSpin && walletAddress) {
      const rouletteResult = await fetchRouletteResult(walletAddress);
      setPrizeNumber(rouletteResult);
      setMustSpin(true);

      setTimeout(() => {
        setLottery(false);
        const mappedResult = rouletteResultMapping[rouletteResult]
        if (wheelData[mappedResult].option !== "Lose") {
          setStatus("win");
        } else {
          setStatus("lose");
        }
      }, 6000);
    }
  }

  const handleDoubleSpinClick = async () => {
    if (!mustSpin && walletAddress) {
      const rouletteResult = await fetchRouletteResult(walletAddress);
      setPrizeNumber(rouletteResult);
      setMustSpin(true);

      setTimeout(() => {
        setLottery(false);
        const mappedResult = doubleRouletteResultMapping[rouletteResult]
        if (doubleData[mappedResult].option !== "Lose") {
          setStatus("win");
        } else {
          setStatus("lose");
        }
      }, 6000);
    }
  }

  return (
    <div className={`flex flex-col justify-center items-center ${status === "delay" ? 'delay' : "lottery"}`}
      style={{ height: "100%", width: "100vw", position: "fixed", zIndex: "100", top: 0 }}>
      {
        status === "default" ?
          <>
            <p style={{ fontSize: "56px", color: "white" }}>Spin the Wheel</p>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={rouletteResultMapping[prizeNumber]}
              data={wheelData}
              spinDuration={0.5}
              outerBorderColor={localStorage.getItem('mui-mode') === 'light' ? "#D6E3FF" : "#f5eeee"}
              outerBorderWidth={20}
              radiusLineWidth={0}
              fontSize={12}
              onStopSpinning={() => {
                setMustSpin(false);
              }}

              // pointerRoullete
              pointerProps={pointerProperties}
            />
            <button onClick={handleSpinClick} style={{ fontSize: "32px", width: "182px", height: "52px", borderRadius: "16px", border: 0, marginTop: "20px" }}>SPIN</button>
          </> :
          status === "win" ?
            <Win
              setContinue={(e: string) => setStatus(e)}
              prizeNumber={prizeNumber}
            /> :
            status === "lose" ?
              <Lose
                setContinue={(e: string) => setStatus(e)}
              /> :
              status === "delay" ?
                <Delay
                  setContinue={() => setContinue(3)}
                /> :
                <>
                  <p style={{ fontSize: "56px", color: "white" }}>Spin the Wheel</p>
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={doubleRouletteResultMapping[prizeNumber]}
                    data={doubleData}
                    spinDuration={0.5}
                    outerBorderColor={localStorage.getItem('mui-mode') === 'light' ? "#D6E3FF" : "#f5eeee"}
                    outerBorderWidth={20}
                    radiusLineWidth={0}
                    fontSize={12}
                    onStopSpinning={() => {
                      setMustSpin(false);
                    }}

                    // pointerRoullete
                    pointerProps={pointerProperties}
                  />
                  <button onClick={handleDoubleSpinClick} style={{ fontSize: "32px", width: "182px", height: "52px", borderRadius: "16px", border: 0, marginTop: "20px" }}>SPIN</button>
                </>
      }
    </div>
  )
}

export default Lottery;