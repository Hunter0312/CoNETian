import BackButton from "@/components/backButton";
import { GradientButton } from "@/components/button";
import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import Image from "next/image";
import styled from "styled-components";

const S = {
  Split: styled.div`
    background-color: #989899;
    height: 1px;
  `,
};

const SkinConfirm = () => {
  const { buyItem, setRouter } = useGameContext();
  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Confirm your order" />
      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Wallet</P>
        <FlexDiv
          $background="#262626"
          $radius="16px"
          $align="center"
          $padding="5px 20px"
          $gap="10px"
        >
          <Image src={Img?.BioDefaultImg} width={24} height={24} alt="" />
          <FlexDiv $direction="column">
            <P $fontSize="14px">Anonymous User</P>
            <P $fontSize="12px" $color="#989899">
              0x412BA4...03AB46
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Sending</P>
        <FlexDiv
          $background="#262626"
          $justify="space-between"
          $radius="16px"
          $align="center"
          $padding="15px 20px"
          $gap="10px"
        >
          <FlexDiv $gap="10px" $align="center">
            <Image src={SkinImg?.Rewards} width={20} height={20} alt="" />
            <P $fontSize="16px">CNTP</P>
          </FlexDiv>
          <P>{buyItem?.price}</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Receiving</P>
        <FlexDiv
          $background="#262626"
          $justify="space-between"
          $radius="16px"
          $align="center"
          $padding="15px 20px"
          $gap="10px"
        >
          <FlexDiv $gap="10px" $align="center">
            <Image src={buyItem?.Img} width={22} height={24} alt="" />
            <P $fontSize="16px">Skin {buyItem?.title}</P>
          </FlexDiv>
          <P>1</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="5px" $margin="0 0 50px 0">
        <FlexDiv $justify="space-between">
          <P>Tax</P>
          <FlexDiv $align="center" $gap="5px">
            <Image src={Img?.AlarmImg} width={16} height={16} alt="" />
            <P $fontSize="12px" $color="#CACACC">
              Quote updates in 60s
            </P>
          </FlexDiv>
        </FlexDiv>
        <S.Split />
        <FlexDiv $justify="space-between">
          <P $fontSize="14px" $color="#989899">
            Fee (3%)
          </P>
          <P $fontSize="14px" $color="#989899">
            0.12345 $CNTP
          </P>
        </FlexDiv>
        <FlexDiv $justify="space-between">
          <P $fontSize="14px" $color="#989899">
            Network cost
          </P>
          <FlexDiv $align="center">
            <Image src={Img?.CarServiceImg} width={16} height={16} alt="" />
            <P $fontSize="14px" $color="#989899">
              $100
            </P>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $justify="space-between">
          <P $fontSize="14px" $color="#989899">
            Order routing
          </P>
          <P $fontSize="14px" $color="#989899">
            Arbitrum API
          </P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="10px">
        <GradientButton
          width="100%"
          onClick={() => setRouter?.("/confirmprogress")}
        >
          Confirm payment
        </GradientButton>
        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img?.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            Secure payment
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default SkinConfirm;
