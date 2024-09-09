import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { rouletteResultMapping, wheelData } from '@/shared/wheelVars';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Wheel } from 'react-custom-roulette';

interface Props {
  pageState: 1 | 2 | 3 | 4 | 5;
  handleSpin: () => void;
  mustSpin: boolean;
  setMustSpin: (e: boolean) => void;
  prizeNumber: number;
}

const pointerProperties = {
  style: {
    width: "1%",
    transform: "rotate(-45deg)",
    right: "14%",
    top: "16%"
  }
}

export default function PageState1({ pageState, handleSpin, mustSpin, setMustSpin, prizeNumber }: Props) {

  const { profile } = useGameContext();

  return (
    <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="40px">
      <div style={{ maxWidth: "325px" }}>
        {pageState === 1 ?
          <P className="white-text-shadow" $fontSize="24px" $align="center">Spin the wheel for a chance to win extra CNTP</P>
          :
          <>
            <P className="white-text-shadow" $fontSize="24px" $align="center">You lose!</P>
            <P className="white-text-shadow" $fontSize="24px" $align="center">Sorry, you didn't get any extra CNTP</P>
          </>
        }
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={rouletteResultMapping[prizeNumber] ?? 0}
          data={wheelData}
          spinDuration={0.5}
          outerBorderColor={localStorage.getItem('mui-mode') === 'light' ? "#D6E3FF" : "#f5eeee"}
          outerBorderWidth={1}
          radiusLineWidth={0}
          fontSize={12}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          pointerProps={pointerProperties}
        />
      </div>

      <FlexDiv $direction="column" $gap="16px">
        {profile?.tickets?.balance !== '0' && !mustSpin ? (
          <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
            {pageState === 1 ? "Spin" : "Spin Again"}
          </Button>) : (
          <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
            {pageState === 1 ? "Spin" : "Spin Again"}
          </Button>
        )}

        <FlexDiv $align="center" $justify="center" $gap="8px">
          <Image src={Img.Tickets} alt="Ticket" width={20} height={20} />
          <P $fontSize="12px">Use 1 ticket to Spin</P>
        </FlexDiv>
      </FlexDiv>

    </FlexDiv >
  )
}