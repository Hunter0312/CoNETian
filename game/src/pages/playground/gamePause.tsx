import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import styled from "styled-components";
import { Img } from "@/utilitiy/images";
import { Button } from "@/components/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Delay from "./delay";

const S = {
  GamePauseDiv: styled(FlexDiv)`
    background-size: 100% 100%;
  `,
};

type Props = {
  resume: () => void;
  zindex: boolean;
};

const GamePause: React.FC<Props> = ({ resume, zindex }) => {
  const [delay, setDelay] = useState<Boolean>(false);
  const [number, setNumber] = useState<number>(3);
  useEffect(() => {
    if (number === 0) {
      setDelay(false);
      setNumber(4);
    }

    if (delay) {
      setTimeout(() => {
        setNumber(e => e - 1);
      }, 1000);
    }
  }, [delay, number]);

  return (
    <>
      <S.GamePauseDiv
        $direction="column"
        $justify="center"
        $align="center"
        $position="absolute"
        $width="100%"
        $height="100%"
        $top="0"
        $left="0"
        $background="#000000b8"
        style={{ zIndex: zindex ? "10" : "-10" }}
      >
        <P $fontSize="32px">Game Paused</P>
        <Button
          id="game-resume"
          onClick={() => {
            setDelay(true);
            resume();
          }}
        >
          <Image src={Img.ResumeImg} width={56} height={56} alt="" />
        </Button>
      </S.GamePauseDiv>
      {delay && <Delay number={number} />}
    </>
  );
};

export default GamePause;
