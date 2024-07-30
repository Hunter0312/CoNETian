import React, { useEffect } from 'react';
import { RouletteLose } from '../../shared/assets';
import { useAudioPlayer } from 'react-use-audio-player';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';

type Props = {
  setContinue: (e: string) => void
}

const Lose: React.FC<Props> = ({ setContinue }) => {

  const { load } = useAudioPlayer();
  const { lottery } = useFlappyBirdContext();

  useEffect(() => {
    load(RouletteLose, {
      autoplay: true,
    })
  }, [])

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
      {
        lottery === 0 ?
          <>
            <p style={{ fontSize: "60px", color: "white", margin: 0 }}>You lose</p>
            <p style={{ color: "white", fontSize: "36px" }}>Sorry, you didn't get any extra CNTP</p>
            <button style={{ fontSize: "32px", width: "250px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => setContinue("delay")}>Return to game</button>
          </> :
          <>
            <div className='flex flex-col justify-between items-center' style={{ width: "100%", height: "100%" }}>
              <p style={{ fontSize: "48px", color: "white", margin: 0, marginTop: "130px" }}>Try to Double the CNTP that you earn!</p>
              <div className='flex flex-col'>
                <p style={{ color: "white", fontSize: "36px" }}>Sorry, you didn't get any extra CNTP</p>
                <div className='flex justify-center items-center' style={{ width: "100%", gap: "10px" }}>
                  <p className='double-lottery' style={{opacity: 0.5}}>Win</p>
                  <p style={{ margin: 0, marginRight: "20px" }} className='double-lottery double-lose'>
                    Lose
                    <span>Lose</span>
                  </p>
                </div>
              </div>
              <div style={{ marginBottom: "130px" }} className='flex flex-col'>
                <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, }} onClick={() => { setContinue("delay"); }}>Keep playing</button>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default Lose;