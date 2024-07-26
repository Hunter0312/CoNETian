import React from 'react';


type Props = {
  setContinue: (e: string) => void
}

const Win: React.FC<Props> = ({ setContinue }) => {
  
  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
      <p style={{ fontSize: "75px", color: "white", margin: "20px" }}>You won {100.029748} CNTP!</p>
      <button style={{ fontSize: "32px", width: "230px", height: "52px", marginBottom: "20px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }} onClick={() => setContinue("double")}>Spin to double</button>
      <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0, backgroundImage: "linear-gradient(to right, #D775FF , #8DA8FF)" }} onClick={() => setContinue("delay")}>Keep playing</button>
    </div>
  )
}

export default Win;