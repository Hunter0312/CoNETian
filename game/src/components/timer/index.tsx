import { useRef } from 'react';
import { Div, FlexDiv } from '../div';
import { P } from '../p';

import "./styles.css";

interface Props {
  seconds: number;
  totalTime: number;
}

export default function Timer({ seconds, totalTime }: Props) {
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const percentage = 100 - ((seconds / totalTime) * 100);

  return (
    <FlexDiv $align="center" $gap="10px" $width="100%" $margin="15px 0 30px">
      <P>Time</P>
      <Div $flex={1} $border="0.5px solid #FFFFFF1A" $height="10px" $radius="10px" $background="#FFFFFF0D">
        <Div
          className="fill-bar"
          $height="100%"
          $width={`${percentage}%`} // Set the width based on the passed time
          $radius="10px"
          $background="linear-gradient(90.9deg, #79F8FF 0.47%, #D775FF 101.18%);" // Diagonal gradient
        ></Div>
      </Div>
      <P>{formatTime(seconds)}</P>
    </FlexDiv>
  )
}