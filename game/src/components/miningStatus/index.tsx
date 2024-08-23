import styled from "styled-components";
import { FlexDiv } from "../div";
import { P } from "../p";

const S = {
  statusBadge: styled.div`
    background-color: green;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
};

const MiningStatus = () => {
  return (
    <FlexDiv $align="center" $padding="0" $justify="space-between">
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        <S.statusBadge />
        <P $fontSize="10px">Mining UP</P>
      </FlexDiv>
      <FlexDiv
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        <P $fontSize="10px">Mining Rate: 0.0004594345</P>
      </FlexDiv>
      <FlexDiv
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        <P $fontSize="10px">Online Miners: 6358</P>
      </FlexDiv>
    </FlexDiv>
  );
};

export default MiningStatus;
