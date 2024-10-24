import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';

import "./tax.css";

interface Props {
  fee: string;
  networkCost: string;
}

export default function Tax({ fee, networkCost }: Props) {
  return (
    <FlexDiv $direction="column" $gap="8px" className="tax">
      <FlexDiv $justify="space-between" className="heading">
        <P $color="#FFFFFF">Tax</P>
        <FlexDiv $gap="4px">
          <P $fontSize="12px" $color="#CACACC">Quote updates in 60s</P>
        </FlexDiv>
      </FlexDiv>
      <Div $width="100%" $height="1px" $background="#989899"></Div>
      <FlexDiv $justify="space-between">
        <P>Fee (3%)</P>
        <P>{fee} $CNTP</P>
      </FlexDiv>
      <FlexDiv $justify="space-between">
        <P>Network cost</P>
        <FlexDiv $gap="4px">
          <P>$ {networkCost}</P>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  )
}