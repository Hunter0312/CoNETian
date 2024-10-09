import BackButton from "@/components/backButton";
import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import Rank from "@/components/supplies/rank";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import Image from "next/image";
import styled from "styled-components";

const S = {
  Back: styled(FlexDiv)`
    background-image: url("/stars-bg.png");
  `,
  Img: styled(Image)`
    box-shadow: 0 0 38px 10px #a34eb77d;
    border-radius: 50%;
  `,
  Button: styled(FlexDiv)`
    background-image: linear-gradient(45deg, #79f8ff 0%, #d775ff 75%);
    box-shadow: 0 0 17px 1px #faebfd52;
    padding: 1px;
    border-radius: 8px;
  `,
};

const BuyItem = () => {
  const { buyItem, setRouter } = useGameContext();
  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text={buyItem?.title} to="/gameitem" />
      <Rank />
      <div className="split"></div>
      <S.Back $direction="column" $margin="-32px 0 0 0" $padding="32px 0 0 0">
        <P $color="#ADAAAD">Requirements:</P>
        <P>Capitain Rank or higher</P>
      </S.Back>
      <S.Back
        $direction="column"
        $align="center"
        $gap="20px"
        $margin="-32px 0 0 0"
        $padding="32px 0 0 0"
      >
        <FlexDiv
          $width="180px"
          $height="180px"
          $background="#111113"
          $radius="24px"
          $direction="column"
          $justify="center"
          $align="center"
        >
          <S.Img src={buyItem?.img} height={124} width={130} alt="" />
        </FlexDiv>
        <P $fontSize="24px" $align="center">
          {buyItem?.buyTitle}
        </P>
        <P $fontSize="14px" $width="212px" $align="center">
          {buyItem?.buyDesc}
        </P>
        <FlexDiv $gap="10px">
          <Image src={SkinImg.Rewards} width={24} height={24} alt="" />
          <P>{buyItem?.price} CNTP</P>
        </FlexDiv>
        <S.Button>
          <Button
            $background="#111113"
            $width="160px"
            $height="45px"
            $radius="8px"
            onClick={() => {
              setRouter?.("/itemconfirm");
            }}
          >
            Buy item
          </Button>
        </S.Button>
      </S.Back>
    </PageWrapper>
  );
};

export default BuyItem;
