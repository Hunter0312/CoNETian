import React, { useEffect, useState } from 'react';

type Props = {
  setContinue: (e: number) => void;
}

const Delay: React.FC<Props> = ({ setContinue }) => {

  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    if (counter === 0) {
      setContinue(3);
    }
    setTimeout(() => {
      setCounter(e => e - 1);
    }, 1000);
  }, [counter])

  return (
    <div className='flex flex-col justify-center items-center' style={{ height: "100%", width: "100%" }}>
      <p style={{ color: "white", fontSize: "36px" }}>{counter}</p>
    </div>
  )
}

export default Delay;