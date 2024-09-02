import { Button } from '@/components/button';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  handleDouble: () => void;
  backToRoulette: () => void;
  doubleFinished: boolean;
  doubleFailed: boolean;
}

type ImageStateType = 'normal' | 'win' | 'lose';

const ImageScheme: Record<ImageStateType, any> = {
  normal: [Img.DoubleWin, Img.DoubleLose],
  win: [Img.DoubleWinHighlight, Img.DoubleLose],
  lose: [Img.DoubleWin, Img.DoubleLoseHighlight],
}

export default function PageState2({ handleDouble, backToRoulette, doubleFinished, doubleFailed }: Props) {
  const [imageState, setImageState] = useState<ImageStateType>('normal');

  useEffect(() => {
    if (!doubleFinished) return;

    if (doubleFailed) {
      setImageState('lose');
    } else {
      setImageState('win');
    }
  }, [doubleFinished, doubleFailed])

  return (
    <>
      <FlexDiv $direction="column" $align="center" $margin="20px 0 0 0" $padding="20px 0 0 0" $gap="40px" $height="400px" className="stars-bg">
        <FlexDiv $direction="column" $gap="24px" $width="296px" $align="center">
          {
            doubleFinished ? (
              doubleFailed ? (
                // eslint-disable-next-line react/no-unescaped-entities
                <P $fontSize="24px" $align="center">Sorry, you didn't get any extra CNTP</P>
              ) : (
                <>
                  <P $fontSize="24px" className="white-text-shadow">You won!</P>
                  <P $fontSize="32px" className="white-text-shadow">20 extra CNTP!</P>
                </>
              )
            ) : (
              <>
                <P $fontSize="24px" $align="center" className="white-text-shadow">Try to Double your current Prize!</P>
                <P $fontSize="18px" $align="center">You won 10 CNTP!</P>
              </>
            )
          }
        </FlexDiv>
        <FlexDiv $gap="20px" $width="100%" $height="400px">
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme[imageState][0]} alt="Win" fill style={{ objectFit: "contain" }} />
          </FlexDiv>
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme[imageState][1]} alt="Lose" fill style={{ objectFit: "contain" }} />
          </FlexDiv>
        </FlexDiv>
        {
          !doubleFinished && (
            <P>18</P>
          )
        }
      </FlexDiv>
      <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="20px">
        {
          !doubleFinished && (
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