import React, { useEffect, useState } from 'react';
import { RouletteWin, ButtonClick } from '../../shared/assets';
import { useAudioPlayer } from 'react-use-audio-player';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: string) => void,
  prizeNumber: number,
  doubleAction: () => void
}

const firstWin = {
  margin: 0, marginRight: "20px"
}

const win = {
  margin: 0, marginRight: "20px", opacity: 0.5
}

const Win: React.FC<Props> = ({ setContinue, prizeNumber, doubleAction }) => {

  const { load } = useAudioPlayer();

  const { lottery, setLottery, audio } = useFlappyBirdContext();
  const [counter, setCounter] = useState<number>(5);

  useEffect(() => {
    if (audio)
      load(RouletteWin, {
        autoplay: true,
      })
  }, [audio])

  useEffect(() => {
    if (counter === 0) {
      setContinue("delay");
      setLottery(0);
    }

    if (counter > 0)
      setTimeout(() => {
        setCounter(e => e - 1);
      }, 1000);
  }, [counter])

  useEffect(() => {
    if(!audio)
      return;

    const container = document.getElementsByTagName("button");
    const buttonArray = Array.from(container);
    const init = () => {
      load(ButtonClick, {
        autoplay: true,
      })
    }
    buttonArray.map(element => {
      element.addEventListener("click", init);
    });
  }, [audio])

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
      {
        <>
          <div className='flex flex-col justify-between items-center' style={{ width: "100%", height: "100%" }}>
            <p style={{ fontSize: "48px", color: "white", margin: 0, marginTop: "130px" }}>Try to Double the CNTP that you earn!</p>
            <div className='flex flex-col'>
              <p style={{ color: "white", fontSize: "36px" }}>You won {prizeNumber} CNTP!</p>
              <div className='flex justify-center items-center' style={{ width: "100%", gap: "20px" }}>
                <p className='double-lottery'>
                  Win
                  {
                    lottery !== 1 &&
                    <span>Win</span>
                  }
                </p>
                <p style={lottery === 1 ? firstWin : win} className='double-lottery'>Lose</p>
              </div>
            </div>
            <div style={{ marginBottom: "130px" }} className='flex flex-col'>
              <p style={{ margin: 0, color: "white", fontSize: "40px", height: "2rem", marginBottom: "10px" }}>{counter !== 0 && counter}</p>
              <button style={lottery === 2 ? { fontSize: "32px", width: "230px", height: "52px", marginBottom: "16px", borderRadius: "16px", border: 0, backgroundColor: "gray" } : { fontSize: "32px", width: "230px", height: "52px", marginBottom: "16px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }}
                onClick={() => {
                  if (counter > 0) {
                    doubleAction(); setLottery(0);
                  }
                }}>Spin to double</button>
              <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => { setContinue("delay"); setLottery(0) }}>Keep playing</button>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default Win;