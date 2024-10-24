import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { useEffect } from 'react';
import { KeyType } from '../../../shared/boxes';

interface Props {
  inProgress: boolean;
  finish?: () => void;
  networkCost?: string;
  fee?: string;
  choosenKey: KeyType;
}

export default function OrderProcess({ inProgress, finish, networkCost, fee, choosenKey }: Props) {
  //! Only made to simulate both screens, should be removed
  useEffect(() => {
    if (!finish || !inProgress) return;

    setTimeout(() => {
      finish();
    }, 5000)
  }, [])

  if (inProgress) {
    return (
      <FlexDiv $direction="column" $gap="132px" $margin="0px 0px 96px">
        <FlexDiv $direction="column" $gap="24px">
          <P>Transaction in progress</P>
          <P $fontSize="14px" $color="#CACACC">Your order completion time may vary, please wait and we’ll let you know when it’s completed.</P>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="8px" $align="center">
          {/* Animation here */}
          <P $fontSize="14px">Please wait, this may take a few seconds.</P>
        </FlexDiv>
      </FlexDiv>
    )
  }

  return (
    <FlexDiv $direction="column" $gap="40px" $margin="0px 0px 24px">
      <FlexDiv $direction="column" $gap="24px">
        <Image src={Img.CheckImg} alt="Successful Transaction" width={32} height={32} />
        <FlexDiv $direction="column">
          <P $fontSize="36px">The transaction</P>
          <P $fontSize="36px" $color="#79F8FF">was successful</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="8px" className="summary">
        <P $color="#F6F1F2">Summary</P>
        <FlexDiv $background="#262626" $padding="16px" $radius="16px" $gap="16px" $direction="column" $width="100%">
          <FlexDiv $justify="space-between">
            <P>Sent</P>
            <P $color="#E4E4E5">{choosenKey?.cost?.cntp} CNTP + {choosenKey?.cost?.tickets} Tickets</P>
          </FlexDiv>
          <FlexDiv $justify="space-between">
            <P>GAS fee</P>
            <P $color="#E4E4E5">{fee} CNTP</P>
          </FlexDiv>
          <FlexDiv $justify="space-between">
            <P>Network cost</P>
            <P $color="#E4E4E5">$ {networkCost}</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  )
}