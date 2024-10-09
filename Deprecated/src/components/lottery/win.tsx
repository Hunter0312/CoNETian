import React, { useEffect, useState } from 'react';
import { RouletteWin, ButtonClick, doubleWin } from '../../shared/assets';
import { useAudioPlayer } from 'react-use-audio-player';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: string) => void,
  prizeNumber: number,
  doubleAction: () => void
}

const buttonStyle = {
  fontSize: "2rem",
  width: "240px",
  padding: "10px 20px",
  borderRadius: "16px",
  border: 0
}

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)"
}

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: "gray",
}


const Win: React.FC<Props> = ({ setContinue, prizeNumber, doubleAction }) => {

  const { load } = useAudioPlayer();

  const { lottery, setLottery, audio } = useFlappyBirdContext();
  const [counter, setCounter] = useState<number>(20);

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
    if (!audio)
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
    <div className='flex flex-col items-center'
      style={{
        height: "100%",
        justifyContent: 'space-evenly',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        gap: '16px'
      }}>
      <div>
        <p style={{ color: "white", fontSize: "48px", margin: '0 20px' }}>Try to Double the CNTP that you earned!</p>
        <p style={{ fontSize: "40px", color: "white", margin: 0 }}>You won {prizeNumber} CNTP!</p>
      </div >

      <div className='flex justify-center items-center' style={{ width: "100%" }}>
        <img src={doubleWin} style={{ width: "350px" }} />
      </div>

      <div className='flex flex-col' style={{ gap: '16px' }}>
        {counter !== 0 &&
          <p style={{ margin: 0, color: "white", fontSize: "40px", height: "2rem", }}>{counter}</p>
        }
        <button style={lottery === 2 ? disabledButtonStyle : primaryButtonStyle}
          onClick={() => {
            if (counter > 0) {
              doubleAction(); setLottery(0);
            }
          }}>Try to double</button>
        <button style={buttonStyle} onClick={() => { setContinue("delay"); setLottery(0) }}>Keep playing</button>
      </div>
    </div >
  )
}

export default Win;