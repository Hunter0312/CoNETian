import React, { useEffect, useState } from 'react';
import { RouletteWin } from '../../shared/assets';
import { useAudioPlayer } from 'react-use-audio-player';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: string) => void
}

const Win: React.FC<Props> = ({ setContinue }) => {

  const { load } = useAudioPlayer();

  const { lottery, setLottery } = useFlappyBirdContext();
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    load(RouletteWin, {
      autoplay: true,
    })
  }, [])

  useEffect(() => {
    if (counter > 0)
      setTimeout(() => {
        setCounter(e => e - 1);
      }, 1000);
  }, [counter])

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
      {
        lottery == 1 ?
          <>
            <p style={{ fontSize: "75px", color: "white", margin: "20px" }}>You won {100.029748} CNTP!</p>
            <p style={{ margin: 0, color: "white", fontSize: "40px" }}>{counter !== 0 && counter}</p>
            <button style={{ fontSize: "32px", width: "230px", height: "52px", marginBottom: "16px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }}
              onClick={() => {
                if (counter > 0) {
                  setContinue("double"); setLottery(0);
                }
              }}>Spin to double</button>

            <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => { setContinue("delay"); setLottery(0) }}>Keep playing</button>
          </> :
          <>
            <div className='flex flex-col justify-between items-center' style={{ width: "100%", height: "100%" }}>
              <p style={{ fontSize: "48px", color: "white", margin: 0, marginTop: "130px" }}>Try to Double the CNTP that you earn!</p>
              <div className='flex flex-col'>
                <p style={{ color: "white", fontSize: "36px" }}>You won 100.029748 CNTP!</p>
                <div className='flex justify-center items-center' style={{ width: "100%", gap: "10px" }}>
                  <p className='double-lottery'>
                    Win
                    <span>Win</span>
                  </p>
                  <p style={{ margin: 0, marginRight: "20px", opacity: 0.5 }} className='double-lottery'>Lose</p>
                </div>
              </div>
              <div style={{ marginBottom: "130px" }} className='flex flex-col'>
                <p style={{ margin: 0, color: "white", fontSize: "40px" }}>{counter !== 0 && counter}</p>
                <button style={{ fontSize: "32px", width: "230px", height: "52px", marginBottom: "16px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }}
                  onClick={() => {
                    if (counter > 0) {
                      setContinue("double"); setLottery(0);
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