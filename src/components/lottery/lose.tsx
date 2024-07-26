import React from 'react';


type Props = {
  setContinue: (e: string) => void
}

const Lose: React.FC<Props> = ({ setContinue }) => {

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
      <p style={{ fontSize: "60px", color: "white", margin: 0 }}>You lose</p>
      <p style={{ color: "white", fontSize: "36px" }}>Sorry, you didn't get any extra CNTP.</p>
      <button style={{ fontSize: "32px", width: "250px", height: "52px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }} onClick={() => setContinue("delay")}>Return to game</button>
    </div>
  )
}

export default Lose;