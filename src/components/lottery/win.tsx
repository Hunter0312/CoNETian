import React from 'react';


type Props = {
    setContinue: (e: number) => void
}

const Win: React.FC<Props> = ({setContinue}) => {


    return (
        <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
            <p style={{fontSize: "88px", color: "white", margin: 0}}>You Won!</p>
            <p style={{fontSize: "56px", color: "white", marginTop: 0}}>100.029748</p>
            <button style={{ fontSize: "32px", width: "230px", height: "52px", borderRadius: "16px", border: 0 }} onClick={() => setContinue(3)}>keep</button>
        </div>
    )
}

export default Win;