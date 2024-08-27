import styled from "styled-components";
import { FlexDiv } from "../div";
import { P } from "../p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Skeleton from "react-loading-skeleton";

const S = {
  SuccessStatusBadge: styled.div`
    background-color: green;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
  FailedStatusBadge: styled.div`
    background-color: red;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
};

const MiningStatus = () => {
  const { mining, miningRate, onlineMiners } = useGameContext();

  return (
    <FlexDiv $align="center" $padding="0 15px" $justify="space-between">
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        {mining ? <S.SuccessStatusBadge /> : <S.FailedStatusBadge />}
        <P $fontSize="10px">Mining UP</P>
      </FlexDiv>
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        <P $fontSize="10px">Mining Rate: {mining && miningRate.toFixed(10)}</P>
        {!mining && <Skeleton width={40} />}
      </FlexDiv>
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="8px 10px"
        $radius="16px"
        $gap="8px"
      >
        <P $fontSize="10px">Online Miners: {mining && onlineMiners}</P>
        {!mining && <Skeleton width={40} />}
      </FlexDiv>
    </FlexDiv>
  );
};

export default MiningStatus;
