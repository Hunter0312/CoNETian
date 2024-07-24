import React from 'react';


type Props = {
    setContinue: (e: number) => void
}

const Lose: React.FC<Props> = ({ setContinue }) => {

    return (
        <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
            <p style={{ fontSize: "88px", color: "white", margin: 0 }}>You lose</p>
            <button style={{ fontSize: "32px", width: "250px", height: "52px", borderRadius: "16px", border: 0 }} onClick={() => setContinue(3)}>Return to game</button>
        </div>
    )
}

export default Lose;