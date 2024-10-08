import { Div, FlexDiv } from '@/components/div'
import { KeyType } from '../../../shared/boxes'
import { useGameContext } from '@/utilitiy/providers/GameProvider'
import { P } from '@/components/p';
import UserData from '@/components/userData';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import Tax from './tax';

interface Props {
  currentKey: KeyType,
}

export default function ConfirmOrder({ currentKey }: Props) {
  return (
    <FlexDiv $direction="column" $gap="24px">
      <FlexDiv $direction="column" $gap="16px">
        <FlexDiv $direction="column" $gap="8px">
          <P>Wallet</P>
          <FlexDiv $background="#262626" $padding="12px 16px" $radius="16px" $align="center">
            <UserData />
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="8px">
          <P>Sending</P>
          <FlexDiv $background="#262626" $padding="12px 16px" $radius="16px" $align="center" $justify="space-between" $gap="20px">
            <FlexDiv $gap="8px" $align="center">
              <Div $position="relative" $width="30px" $height="30px">
                <Image src={Img.Coin} alt="Coin" fill />
              </Div>
              <P>CNTP</P>
            </FlexDiv>
            <P>{currentKey?.cost?.cntp}</P>
          </FlexDiv>
          <FlexDiv $background="#262626" $padding="12px 16px" $radius="16px" $align="center" $justify="space-between" $gap="20px">
            <FlexDiv $gap="8px" $align="center">
              <Div $position="relative" $width="30px" $height="30px">
                <Image src={Img.Tickets} alt="Tickets" fill />
              </Div>
              <P>Tickets</P>
            </FlexDiv>
            <P>{currentKey?.cost?.tickets}</P>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="8px">
          <P>Receiving</P>
          <FlexDiv $background="#262626" $padding="12px 16px" $radius="16px" $align="center" $justify="space-between" $gap="20px">
            <FlexDiv $gap="8px" $align="center">
              <Div $position="relative" $width="30px" $height="30px">
                <Image src={currentKey?.icon} alt="Key" fill />
              </Div>
              <P>{currentKey?.name.charAt(0).toUpperCase() + currentKey?.name.slice(1)} Key</P>
            </FlexDiv>
            <P>1</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
      <Tax fee="0.12345" networkCost="100" />
    </FlexDiv>
  )
}