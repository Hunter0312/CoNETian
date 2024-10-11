import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import styled from "styled-components";

const S = {
  DelayDiv: styled(FlexDiv)`
    z-index: 100;
  `,
};

type Props = {
  number: number;
};

const Delay: React.FC<Props> = ({ number }) => {
  return (
    <S.DelayDiv
      $direction="column"
      $justify="center"
      $align="center"
      $width="100%"
      $height="100%"
      $position="absolute"
      $top="0"
      $left="0"
      $background="#000000b8"
    >
      <P>{number}</P>
    </S.DelayDiv>
  );
};

export default Delay;
