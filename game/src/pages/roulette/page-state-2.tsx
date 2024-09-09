import { Button } from '@/components/button';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  pageState: 1 | 2 | 3 | 4 | 5;
  prizeNumber: number;
  double: ImageStateType;
  handleDouble: () => void;
  backToRoulette: () => void;
  doubleFinished: boolean;
  doubleRunning: boolean;
}

type ImageStateType = 'off' | 'win' | 'lose';

const ImageScheme: Record<ImageStateType, any> = {
  off: [Img.DoubleWin, Img.DoubleLose],
  win: [Img.DoubleWinHighlight, Img.DoubleLose],
  lose: [Img.DoubleWin, Img.DoubleLoseHighlight],
}

export default function PageState2({ pageState, double, prizeNumber, handleDouble, backToRoulette, doubleFinished, doubleRunning }: Props) {
  const [counter, setCounter] = useState(20);
  const interval = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    interval.current = setInterval(() => {
      setCounter(counter => counter - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      clearInterval(interval.current);
      backToRoulette();
    }
  }, [counter])

  return (
    <>
      <FlexDiv $direction="column" $align="center" $margin="20px 0 0 0" $padding="20px 0 0 0" $gap="40px" $height="400px" className="stars-bg">
        <FlexDiv $direction="column" $gap="24px" $width="296px" $align="center">
          {
            doubleFinished ? (
              pageState === 4 ? (
                <P $fontSize="24px" $align="center">Sorry, you didn't get any extra CNTP</P>
              ) : (
                <>
                  <P $fontSize="24px" className="white-text-shadow">You won!</P>
                  <P $fontSize="32px" className="white-text-shadow">{prizeNumber || 0} extra CNTP!</P>
                </>
              )
            ) : (
              doubleRunning ? (
                <>
                </>
              ) : (
                <>
                  <P $fontSize="24px" $align="center" className="white-text-shadow">Try to Double your current Prize!</P>
                  <P $fontSize="18px" $align="center">You won {prizeNumber || 0} CNTP!</P>
                </>
              )
            )
          }
        </FlexDiv>

        <FlexDiv $gap="20px" $width="100%" $height="400px">
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme[double][0]} alt="Win" fill style={{ objectFit: "contain" }} />
          </FlexDiv>
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme[double][1]} alt="Lose" fill style={{ objectFit: "contain" }} />
          </FlexDiv>
        </FlexDiv>

        {
          !doubleFinished && (
            <P>{counter}</P>
          )
        }

      </FlexDiv>
      <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="20px">
        {
          pageState !== 4 && (
            <div className="highlight-button-wrapper">
              <Button $background="#111113" $width="196px" $height="45px" $radius="8px" onClick={handleDouble}>
                Try to double
              </Button>
            </div>
          )
        }
        <Button $color="#79F8FF" $width="196px" $height="45px" $padding="12px 0" $radius="8px" onClick={backToRoulette}>
          Spin again
        </Button>
      </FlexDiv>
    </>
  )
}