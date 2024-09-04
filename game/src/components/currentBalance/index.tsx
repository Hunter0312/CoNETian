import Image from 'next/image';
import { FlexDiv } from '../div';
import { Img } from '@/utilitiy/images';
import { P } from '../p';

interface Props {
  small?: boolean;
}

export default function CurrentBalance({ small }: Props) {
  const fontSize = small ? 16 : 20;

  return (
    <FlexDiv $direction="column" $gap="12px" $width="100%">
      <FlexDiv $gap="8px" $align="center">
        {!small && (<Image src={Img.LogoImg} width={32} height={32} alt="Conet" />)}
        <P $fontSize={`${fontSize}px`}>Current balance</P>
      </FlexDiv>
      <FlexDiv $gap="8px" $align="center" $justify={small ? "flex-start" : "space-between"}>
        <P $fontSize={`${fontSize + 4}px`}>1645.000645</P>
        <P $fontSize="12px">CNTP EARNED</P>
      </FlexDiv>
    </FlexDiv>
  )
}