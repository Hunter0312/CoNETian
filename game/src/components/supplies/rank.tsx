import { FlexDiv } from '../div';
import { P } from '../p';

export default function Rank() {
  return (
    <FlexDiv $direction="column" $gap="4px">
      <P $color="#ADAAAD" $fontSize="14px">Your rank:</P>
      <FlexDiv $gap="12px" $align="center">
        <P className="white-text-shadow">Lieutenant Colonel</P>
        <P $color="#ADAAAD" $fontSize="12px"><strong style={{ color: "#FFFFFF" }}>6</strong>/12</P>
      </FlexDiv>
    </FlexDiv>
  )
}