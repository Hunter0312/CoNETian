import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { rouletteResultMapping, wheelData } from '@/shared/wheelVars';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { rouletteDesign } from '@/shared/assets';
import React, { useEffect } from 'react';
import { PointerProps } from 'react-custom-roulette/dist/components/Wheel/types';

const Wheel = dynamic<any>(() =>
  import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

interface Props {
  pageState: 1 | 2 | 3 | 4 | 5;
  isSpinning: boolean;
  handleSpin: () => void;
  mustSpin: boolean;
  setMustSpin: (e: boolean) => void;
  prizeNumber: number;
}

const pointerProperties: PointerProps = {
  style: { visibility: "hidden" }
}

export default function PageState1({ pageState, isSpinning, handleSpin, mustSpin, setMustSpin, prizeNumber }: Props) {

  const { profile } = useGameContext();

  return (
    <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="40px">
      <div style={{ maxWidth: "325px" }}>
        {pageState === 1 ?
          <P className="white-text-shadow" $fontSize="24px" $align="center">Spin the wheel for a chance to win extra CNTP</P>
          :
          <>
            <P className="white-text-shadow" $fontSize="24px" $align="center">You lose!</P>
            <P className="white-text-shadow" $fontSize="24px" $align="center">Sorry, you didn&apos; t get any extra CNTP</P>
          </>
        }
      </div>
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>

        <img src={rouletteDesign.src} style={{ width: "85%", maxWidth: '483px', position: 'absolute', zIndex: 2 }} />

        <div style={{ flex: 1, position: "relative", zIndex: 1, transform: "rotate(45deg)" }}>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={rouletteResultMapping[prizeNumber] ?? 0}
            data={wheelData}
            spinDuration={0.5}
            outerBorderColor="#f5eeee"
            outerBorderWidth={1}
            radiusLineWidth={0}
            fontSize={12}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            pointerProps={pointerProperties}
          />
        </div>
      </div>

      <FlexDiv $direction="column" $gap="16px" $align='center' $justify='center'>
        {profile?.tickets?.balance !== '0' ? (
          isSpinning ? (
            <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
              Spinning...
            </Button>
          ) : (
            <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
              {pageState === 1 ? "Spin" : "Spin Again"}
            </Button>
          )
        ) : (
          <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
            {pageState === 1 ? "Spin" : "Spin Again"}
          </Button>
        )}

        <FlexDiv $align="center" $justify="center" $gap="8px">
          {profile?.tickets?.balance === '0' && !mustSpin ? (
            <P $fontSize="12px" $color='#FFDAD6' $align='center' $width='70%'>You don&apos;t have enough tickets to spin the roulette</P>
          ) : (
            <>
              <Image src={Img.Tickets} alt="Ticket" width={20} height={20} />
              <P $fontSize="12px">Use 1 ticket to Spin</P>
            </>
          )}
        </FlexDiv>
      </FlexDiv>

    </FlexDiv >
  )
}