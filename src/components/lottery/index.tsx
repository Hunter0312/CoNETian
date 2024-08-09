import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Win from './win';
import Lose from './lose';

import { doubleLose, doubleNeutral, doubleWin, pointer } from '../../shared/assets';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchRouletteResult } from '../../API/getData';
import Delay from './delay';
import { useAudioPlayer } from 'react-use-audio-player';
import { RouletteSpin, ButtonClick, loading } from '../../shared/assets';
import { toast } from 'react-toastify';

type Props = {
  setContinue: (e: number) => void,
}

const rouletteResultMapping: { [key: string]: number } = {
  '0': 0,
  '0.1': 1,
  '0.5': 3,
  '1': 5,
}

const wheelData = [
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
  { option: 'High', style: { backgroundColor: "#79F8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
  { option: 'Low', style: { backgroundColor: "#8DA8FF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
  { option: 'Medium', style: { backgroundColor: "#577DFF", textColor: 'black' }, optionSize: 1 },
  { option: 'Lose', style: { backgroundColor: "#1d1d1e", textColor: 'white' }, optionSize: 2 },
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

  const { load } = useAudioPlayer();

  const { profile, audio, setLottery, lottery } = useFlappyBirdContext();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [status, setStatus] = useState<string>("default");
  const [double, setDouble] = useState<number>(0);

  const handleSpinClick = async () => {

    if (lottery === 1)
      return;

    if (audio)
      load(ButtonClick, {
        autoplay: true,
      });

    setLottery(1);

    if (!mustSpin && profile?.keyID) {

      const rouletteResult = await fetchRouletteResult(profile?.keyID);

      if (rouletteResult && !rouletteResult?.error) {
        if (audio)
          load(RouletteSpin, {
            autoplay: true
          })
        setPrizeNumber(rouletteResult);
        setMustSpin(true);

        setTimeout(() => {
          const mappedResult = rouletteResultMapping[rouletteResult];
          if (wheelData[mappedResult].option !== "Lose") {
            setStatus("win");
          } else {
            setLottery(0);
            setStatus("lose");
          }
          setMustSpin(true);
        }, 6000);
      } else {
        toast.error(rouletteResult?.message, { autoClose: 5000 });
        setLottery(0);
        setMustSpin(true);
        setStatus('delay');
      }
    }
  }

  const handleDoubleSpinClick = async () => {
    let count = 0;
    let timerSpeedDown = 100;
    let doublePointsTimeout: NodeJS.Timeout;

    if (lottery === 2)
      return;

    if (double === 0 && profile && profile?.keyID) {
      setLottery(2);
      const rouletteResult = await fetchRouletteResult(profile?.keyID);
      if (audio)
        load(RouletteSpin, {
          autoplay: true
        })
      setPrizeNumber(rouletteResult);

      const alternateWinLose = () => {
        if (count % 2 === 0)
          // double === 1 means the user won
          setDouble(1);
        else
          // double === 2 means the user lost
          setDouble(2);
        count++;

        if (count >= 20)
          timerSpeedDown += 100;

        doublePointsTimeout = setTimeout(alternateWinLose, timerSpeedDown);
      };

      alternateWinLose();

      setTimeout(() => {
        clearTimeout(doublePointsTimeout);

        const mappedResult = rouletteResult > 0 ? 1 : 0;

        if (doubleData[mappedResult].option !== "Lose") {
          // double === 2 means the user lost, so we show the "lose" text first so the user thinks he lost, then we show the win page.
          setDouble(2);

          // wait 500ms to show the win text and build expectation on the user
          setTimeout(() => {
            setStatus("win")

            // double === 0 for the text to stop flashing
            setDouble(0);
          }, 500);
        } else {
          setLottery(3);

          // double === 1 means the user won, so we show the "win" text first so the user thinks he won, then we show the lose page.
          setDouble(1);

          // wait 500ms to show the lose text and build expectation on the user
          setTimeout(() => {
            setStatus("lose")

            // double === 0 for the text to stop flashing
            setDouble(0);
          }, 500);
        }
      }, 6000);
    }
  }

  const doubleAction = () => {
    setStatus("double");
    handleDoubleSpinClick();
  }

  return (
    <div id="roulette" className={`flex flex-col items-center ${status === "delay" ? 'delay' : "lottery"}`}
      style={{ position: "absolute", zIndex: "100", top: 0, justifyContent: "space-evenly", height: "100%", width: "100vw", overflowX: "hidden", overflowY: 'hidden', padding: "20px", boxSizing: 'border-box', gap: "16px" }}>
      {
        status === "default" ?
          <>
            <p style={{ marginBlock: 0, fontSize: "34px", color: "white" }}>Spin the wheel for a chance to win extra CNTP</p>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={rouletteResultMapping[prizeNumber]}
              data={wheelData}
              spinDuration={0.5}
              outerBorderColor={localStorage.getItem('mui-mode') === 'light' ? "#D6E3FF" : "#f5eeee"}
              outerBorderWidth={5}
              radiusLineWidth={0}
              fontSize={12}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
              pointerProps={pointerProperties}
            />
            {
              profile && profile?.keyID ?
                <button onClick={handleSpinClick} style={lottery === 1 ? { fontSize: "32px", width: "182px", height: "52px", borderRadius: "16px", border: 0, backgroundColor: "gray" } : { fontSize: "32px", width: "182px", height: "52px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }}>SPIN</button> :
                <div className='flex justify-center items-center' style={{ gap: "5px" }}>
                  <img src={loading} style={{ width: "30px" }} />
                  <p style={{ fontSize: "2rem", color: "white", marginBlock: 0 }}>Fetching Wallet Data</p>
                </div>

            }
          </> :
          status === "win" ?
            <Win
              doubleAction={() => doubleAction()}
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
                  <div className='flex flex-col items-center' style={{ justifyContent: "space-evenly", width: "100%", height: "100%" }}>
                    <p style={{ fontSize: "48px", color: "white", margin: '0 20px', marginBlock: 0 }}>Try to Double the CNTP that you earned!</p>
                    <div className='flex flex-col' style={{ gap: "16px" }}>
                      <div className='flex justify-center items-center' style={{ width: "100%" }}>
                        {double === 0 &&
                          <img src={doubleNeutral} style={{ width: "350px" }}></img>
                        }
                        {double === 1 &&
                          <img src={doubleWin} style={{ width: "350px" }}></img>
                        }
                        {double === 2 &&
                          <img src={doubleLose} style={{ width: "350px" }}></img>
                        }
                      </div>
                    </div>
                    <div style={{ gap: "16px" }} className='flex flex-col'>
                      <p style={{ margin: 0, marginBlock: 0, height: "2rem" }}></p>
                      <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, backgroundColor: "gray" }}
                      >Spin to double</button>
                      <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => {
                        setStatus("delay"); setLottery(0); if (audio) {
                          load(ButtonClick, {
                            autoplay: true,
                          });
                        }
                      }}>Keep playing</button>
                    </div>
                  </div>
                </>
      }
    </div>
  )
}

export default Lottery;