import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';

interface Props {
  handleSpin: () => void;
}

export default function PageState1({ handleSpin }: Props) {
  return (
    <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="40px">
      <div style={{ maxWidth: "325px" }}>
        <P className="white-text-shadow" $fontSize="24px" $align="center">Spin the wheel for a chance to win extra CNTP</P>
      </div>
      <div style={{ flex: 1, position: "relative", width: "100%", minHeight: "400px" }}>
        <Image src={Img.Roulette} alt="Roulette" fill={true} />
      </div>
      <FlexDiv $direction="column" $gap="16px">
        <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
          Spin
        </Button>
        <FlexDiv $align="center" $justify="center" $gap="8px">
          <Image src={Img.Tickets} alt="Ticket" width={20} height={20} />
          <P $fontSize="12px">Use 1 ticket to Spin</P>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  )
}