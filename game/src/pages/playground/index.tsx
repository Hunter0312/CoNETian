import { Div, FlexDiv } from "@/components/div";
//import Game from "../game";
import { P } from "@/components/p";
import Image from "next/image";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { Img } from "@/utilitiy/images";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";
import GamePause from "./gamePause";
import GameRestart from "./gameRestart";
import dynamic from "next/dynamic";

const Game = dynamic<any>(() =>
  import("../game").then((mod) => mod.default),
  { ssr: false }
);

const Playground = () => {
  const { profile, miningRate, onlineMiners, mining, highScore, setHighScore } = useGameContext();
  const [pause, setPause] = useState<boolean>(false);
  const [restart, setRestart] = useState<Boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (restart) {
      const hScore = localStorage?.getItem('hScore');
      if (hScore) {
        if (parseInt(hScore) < score)
          localStorage?.setItem('hScore', score.toString());
      } else {
        localStorage?.setItem('hScore', score.toString());
      }
      const temp = localStorage?.getItem('hScore');
      if (temp)
        setHighScore?.(parseInt(temp));
    } else {
      setScore(0);
    }
  }, [restart]);

  return (
    <Div $position="relative">
      {!restart && (
        <>
          <Game
            restart={restart}
            setRestart={(e: any) => setRestart(true)}
            setScore={(score: any) => setScore(score)}
          />
          <FlexDiv
            $position="absolute"
            $top="0"
            $left="0"
            $direction="column"
            $justify="space-between"
            $height="100%"
            $width="100%"
          >
            <FlexDiv $justify="space-between" $padding="20px 10px">
              {/* this first empty FlexDiv exists only to allow us to align the score to the center and the tickets balance to the right */}
              <FlexDiv
                $padding="8px"
                $width="42.15px"
                $boxSizing="content-box"
                style={{ opacity: 0 }}
              ></FlexDiv>

              <P $fontSize="48px">{score}</P>

              <FlexDiv
                $direction="column"
                $align="center"
                $gap="8px"
                $background="#26252766"
                $padding="8px"
                $radius="8px"
                style={profile?.tickets?.balance ? { opacity: 100 } : { opacity: 0 }}
              >
                <Image
                  src={Img.Tickets}
                  alt="Tickets"
                  width={42.15}
                  height={32}
                />
                <P>x {profile?.tickets?.balance}</P>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv
              $justify="space-between"
              $margin="0 0 20px 0"
              $padding="0 20px 0 20px"
              $align="center"
            >
              <FlexDiv $gap="10px">
                <Image
                  src={Img.VolumnSquareImg}
                  width={40}
                  height={40}
                  alt=""
                />
                <Button id="game-pause" onClick={() => setPause(true)}>
                  <Image
                    src={Img.PauseSquareImg}
                    width={40}
                    height={40}
                    alt=""
                  />
                </Button>
              </FlexDiv>
              <FlexDiv $direction="column" $align="flex-end" $gap="10px">
                <P>Mining Rate: {mining && miningRate?.toFixed(10)}</P>
                <P>Online Miners: {mining && onlineMiners}</P>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <GamePause zindex={pause} resume={() => setPause(false)} />
        </>
      )}

      {restart && (
        <GameRestart
          score={score}
          highScore={highScore || 0}
          restart={() => setRestart(false)}
        />
      )}
    </Div>
  );
};

export default Playground;
