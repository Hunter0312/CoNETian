import BackButton from "@/components/backButton";
import { Button, GradientButton } from "@/components/button";
import CurrentBalance from "@/components/currentBalance";
import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SendImg } from "@/utilitiy/send";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const S = {
  ToInput: styled.input`
    background: none;
    border: none;
    outline: none;
    width: 80%;
    color: #989899;
    padding: 5px;
  `,
  BalanceInput: styled.input`
    color: white;
    background: none;
    border: none;
    outline: none;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  Split: styled.div`
    background-color: #989899;
    height: 1px;
  `,
};

const SendCNTP = () => {
  const [balance, setBalance] = useState<number>(0);
  const { setRouter, setBuyItem } = useGameContext();

  return (
    <PageWrapper>
      <BackButton text="Send CNTP" to="/send" />
      <CurrentBalance asset="cntp" />
      <div className="split"></div>
      <Button $background="#262626" $padding="12px 16px" $radius="16px">
        <FlexDiv $justify="space-between" $width="100%" $align="center">
          <FlexDiv $direction="column" $grow="1">
            <P>To</P>
            <S.ToInput placeholder="Select or paste receiver wallet address" />
          </FlexDiv>
          <Image src={SendImg.ArrowDownImg} width={12} height={8} alt="" />
        </FlexDiv>
      </Button>
      <FlexDiv
        $background="#262626"
        $padding="12px 16px"
        $radius="16px"
        $justify="space-between"
      >
        <S.BalanceInput
          value={balance}
          onChange={(e) => setBalance(parseInt(e.target.value))}
          type="number"
        />
        <Button
          $background="#30333b"
          $color="#8DA8FF"
          $padding="10px 16px"
          $radius="8px"
        >
          MAX
        </Button>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="5px">
        <P>Tax</P>
        <S.Split />
        <FlexDiv $justify="space-between">
          <P $fontSize="14px" $color="#989899">
            Gas fee
          </P>
          <FlexDiv $align="center" $gap="3px">
            <Image src={SendImg.GasFeeImg} height={11} width={12} alt="" />
            <P $fontSize="14px" $color="#989899">
              $CNTP 100
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $margin="0 0 100px 0" $width="100%" $direction="column">
        <GradientButton
          width="100%"
          onClick={() => {
            setBuyItem?.({ price: balance, sendCNTP: true });
            setRouter?.("/sendCNTPConfirm");
          }}
        >
          Send
        </GradientButton>
      </FlexDiv>
    </PageWrapper>
  );
};

export default SendCNTP;
