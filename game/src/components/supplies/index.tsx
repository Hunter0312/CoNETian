import Image from 'next/image';
import { FlexDiv } from '../div';
import { P } from '../p';
import Tooltip from '../tooltip';
import { Img } from '@/utilitiy/images';
import { formatToken } from '@/utilitiy/functions';
import { useGameContext } from '@/utilitiy/providers/GameProvider';

export default function Supplies() {
  const { profile } = useGameContext();

  return (
    <FlexDiv $direction="column" $gap="22px">
      <FlexDiv $align="center" $justify="space-between">
        <FlexDiv $gap="12px" $align="center">
          <P $fontSize="24px">Supplies</P>
          <Tooltip message="Each ticket is a valuable asset. Keep playing The CoNETian to earn more tickets!" />
        </FlexDiv>
        <FlexDiv $align="center" $gap="8px" $background="#262527" $padding="8px" $radius="8px">
          <Image src={Img.Tickets} alt="Tickets" width={42.15} height={32} />
          <P>x {profile?.tickets?.balance}</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="4px">
        <P $color="#ADAAAD" $fontSize="14px">Your rank:</P>
        <FlexDiv $gap="12px" $align="center">
          <P className="white-text-shadow">Lieutenant Colonel</P>
          <P $color="#ADAAAD" $fontSize="12px"><strong style={{ color: "#FFFFFF" }}>6</strong>/12</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $gap="8px" $align="center">
        <P $fontSize="20px">{formatToken(profile?.tokens.cCNTP.balance)}</P>
        <P $fontSize="12px">CNTP EARNED</P>
      </FlexDiv>
    </FlexDiv>
  )
}