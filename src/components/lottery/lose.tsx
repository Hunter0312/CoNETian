import React from 'react';


type Props = {
    setContinue: (e: number) => void
}

const Lose: React.FC<Props> = ({setContinue}) => {

    return (
        <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
            <p>lose</p>
            <button style={{color: "white", fontSize: "40px"}} onClick={() => setContinue(3)}>keep</button>
        </div>
    )
}

export default Lose;