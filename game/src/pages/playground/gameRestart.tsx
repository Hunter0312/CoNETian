import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import styled from "styled-components";
import { Img } from "@/utilitiy/images";
import { Button, GradientButton, GradientImage } from "@/components/button";
import Image from "next/image";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { formatToken } from "@/utilitiy/functions";

const S = {
  GameRestartDiv: styled(FlexDiv)`
    background-image: url("/assets/bgconetian.png");
  `,
  GradientImage: styled(GradientImage)`
    border-radius: 8px;

    button {
      border-radius: 8px;
    }
  `,
  MainMenu: styled(Button)`
    color: #79f8ff;
    font-size: 16px;
  `,
};

type Props = {
  restart: () => void;
  score: number;
  highScore: number;
};

const GameRestart: React.FC<Props> = ({ restart, score, highScore }) => {
  const { profile, setRouter } = useGameContext();

  return (
    <S.GameRestartDiv
      $direction="column"
      $justify="space-between"
      $align="center"
      $width="100%"
      $height="100vh"
      $top="0"
      $left="0"
      $background="#000000b8"
    >
      <Div></Div>
      <FlexDiv $direction="column" $align="center" $gap="5px">
        <P $fontSize="32px">Current Score</P>
        <P $fontSize="32px">{score}</P>
        <P $fontSize="32px">Hightest Score</P>
        <P $fontSize="32px">{highScore}</P>
        <P $fontSize="32px">CNTP Balance</P>
        <P $fontSize="32px">{formatToken(profile?.tokens?.cCNTP?.balance)}</P>
      </FlexDiv>
      <FlexDiv $direction="column" $margin="0 0 30px 0" $gap="20px">
        <S.GradientImage>
          <GradientButton width="160px" onClick={() => restart()}>
            Restart
          </GradientButton>
        </S.GradientImage>
        <S.MainMenu onClick={() => setRouter?.("/")}>Main Menu</S.MainMenu>
      </FlexDiv>
    </S.GameRestartDiv>
  );
};

export default GameRestart;
