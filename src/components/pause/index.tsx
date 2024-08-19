import { useState } from 'react';
import Delay from '../delay';
import { FaPause } from 'react-icons/fa6';

type Props = {
  setContinue: (e: number) => void;
}

const textStyle = {
  color: "white",
  fontSize: "3rem",
  margin: "0",
  width: "100%"
}

const Pause: React.FC<Props> = ({setContinue}) => {
  const [keepPlaying, setKeepPlaying] = useState<boolean>(false);

  return (
    <div
      id="roulette"
      className={`flex flex-col items-center delay`}
      style={{ position: "absolute", zIndex: "100", top: 0, justifyContent: "center", height: "100%", width: "100vw", overflowX: "hidden", overflowY: 'hidden', padding: "20px", boxSizing: 'border-box', gap: "16px" }}
    >
      {
        keepPlaying ? (
          <Delay
            setContinue={() => setContinue(3)}
          />
        ) : (
          <>
            <p style={{...textStyle}}>Game Paused</p>
            <button
              onClick={() => setKeepPlaying(true)}
              style={{
                background: "none",
                border: "2px solid #ffffff",
                borderRadius: "1rem",
                padding: "1rem .8rem .8rem"
              }}
            >
              <FaPause color="#ffffff" size={42} />
            </button>
          </>
        )
      }
    </div>
  )
}

export default Pause;