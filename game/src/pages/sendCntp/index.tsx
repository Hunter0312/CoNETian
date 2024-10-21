import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import BackButton from "@/components/backButton";
import { Button, GradientButton } from "@/components/button";
import CurrentBalance from "@/components/currentBalance";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SendImg } from "@/utilitiy/send";
import { formatToken } from "@/utilitiy/functions";
import { fetchIsAddress } from "@/API/getData";

const S = {
  ToInput: styled.input`
    background: none;
    border: none;
    outline: none;
    width: 95%;
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
  const assetName = "cCNTP";

  const [amount, setAmount] = useState<string>("0");
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [toAddress, setToAddress] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [isAddressChecking, setIsAddressChecking] = useState<boolean>(false);

  const { setRouter, setTransferTokenDetails, profile } = useGameContext();

  const balance = formatToken(profile?.tokens?.cCNTP?.balance);

  const handleToAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setToAddress(e.target.value);
    try {
      setIsAddressChecking(true);
      const isAddress = await fetchIsAddress(e.target.value);
      if (isAddress[0]) setIsValidAddress(true);
      else setIsValidAddress(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAddressChecking(false);
    }
  };

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // If the initial value is "0", replace it with the typed value
    const cutZeroString =
      e.target.value[0] === "0" &&
      e.target.value[1] >= "1" &&
      e.target.value[1] <= "9"
        ? e.target.value.slice(1)
        : e.target.value;

    if (Number(cutZeroString) > Number(balance) || Number(cutZeroString) < 0) {
      return;
    } else {
      setAmount(cutZeroString);
    }

    if (cutZeroString === "0" || cutZeroString === "") setIsValidAmount(false);
    else setIsValidAmount(true);
  };

  const handleSend = async () => {
    // return if amount is 0
    if (!isValidAddress || !isValidAmount) {
      return;
    }

    // set transfer token details for confirmation page
    setTransferTokenDetails?.({
      assetName,
      toAddress,
      amount,
    });

    setRouter?.("/sendCNTPConfirm");
  };

  return (
    <PageWrapper>
      <BackButton text="Send CNTP" to="/send" />
      <Div $padding="0 10px">
        <CurrentBalance asset="cntp" />
      </Div>
      <div className="split"></div>
      <FlexDiv $direction="column" $padding="0 10px" $gap="32px">
        <Button
          $background="#262626"
          $padding="12px 16px"
          $radius="16px"
          $width="100%"
        >
          <FlexDiv $justify="space-between" $width="100%" $align="center">
            <FlexDiv $direction="column" $grow="1">
              <P>To</P>
              <S.ToInput
                placeholder="Select or paste receiver wallet address"
                value={toAddress}
                onChange={handleToAddressChange}
              />
            </FlexDiv>
            {isAddressChecking ? (
              <Image src={SendImg.LoadingImg} width={20} height={20} alt="" />
            ) : isValidAddress ? (
              <Image src={SendImg.CheckedImg} width={20} height={20} alt="" />
            ) : (
              <></>
            )}
          </FlexDiv>
        </Button>
        <FlexDiv
          $background="#262626"
          $padding="12px 16px"
          $radius="16px"
          $justify="space-between"
        >
          <S.BalanceInput
            value={amount}
            onChange={handleAmountInputChange}
            type="number"
          />
          <Button
            $background="#30333b"
            $color="#8DA8FF"
            $padding="10px 16px"
            $radius="8px"
            onClick={() => setAmount(balance)}
          >
            MAX
          </Button>
        </FlexDiv>
        {/* <FlexDiv $direction="column" $gap="5px">
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
        </FlexDiv> */}
        <FlexDiv $margin="0 0 100px 0" $width="100%" $direction="column">
          <GradientButton
            width="100%"
            onClick={handleSend}
            disabled={!isValidAddress || !isValidAmount}
          >
            Estimate Gas
          </GradientButton>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default SendCNTP;
