import React, { useEffect } from 'react';
import { RouletteLose, ButtonClick, doubleLose } from '../../shared/assets';
import { useAudioPlayer } from 'react-use-audio-player';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: string) => void
}

const Lose: React.FC<Props> = ({ setContinue }) => {

  const { load } = useAudioPlayer();
  const { lottery, audio } = useFlappyBirdContext();

  useEffect(() => {
    if (audio)
      load(RouletteLose, {
        autoplay: true,
      })
  }, [audio])

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
    <div className='flex flex-col items-center' style={{ height: "100%", overflowX: 'hidden', overflowY: 'auto', justifyContent: 'space-evenly', padding: '20px', boxSizing: 'border-box', gap: '16px' }}>
      {
        lottery === 0 ?
          <>
            <div>
              <p style={{ fontSize: "60px", color: "white", margin: 0 }}>You lose</p>
              <p style={{ color: "white", fontSize: "36px", marginBlock: '0' }}>Sorry, you didn't get any extra CNTP</p>
            </div>
            <button style={{ fontSize: "32px", width: "250px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => setContinue("delay")}>Return to game</button>
          </> :
          <>
            <p style={{ fontSize: "48px", color: "white", marginBlock: 0 }}>Sorry, you didn't get any extra CNTP</p>
            <div className='flex justify-center items-center' style={{ width: "100%", gap: "10px" }}>
              <img src={doubleLose} style={{ width: "350px" }}></img>
            </div>
            <div className='flex flex-col'>
              <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => { setContinue("delay"); }}>Keep playing</button>
            </div>
          </>
      }

    </div>
  )
}

export default Lose;