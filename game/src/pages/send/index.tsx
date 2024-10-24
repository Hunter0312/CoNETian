import BackButton from "@/components/backButton";
import { Button } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SendImg } from "@/utilitiy/send";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import Image from "next/image";
import styled from "styled-components";

const actives = [
  {
    key: 1,
    img: SkinImg.Rewards,
    title: "CNTP",
    router: "/sendCNTP",
  },
];

const locks = [
  {
    key: 1,
    img: SendImg.SkinBlurImg,
  },
  {
    key: 2,
    img: SendImg.KeyBlurImg,
  },
  {
    key: 3,
    img: SendImg.ItemBlurImg,
  },
  {
    key: 4,
    img: SendImg.TicketBlurImg,
  },
  {
    key: 5,
    img: SendImg.NftBlurImg,
  },
];

const S = {
  BuyButton: styled(FlexDiv)`
    background-image: linear-gradient(90deg, #79f8ff 0%, #d775ff 50%);
    border-radius: 16px;
    padding: 1px;
  `,
};
const Send = () => {
  const { setRouter } = useGameContext();
  return (
    <PageWrapper>
      <BackButton text="Send" to="/wallet" />
      <Div $padding="0 10px">
        <P $color="#C8C6C8">
          Send CNTP or select an asset to exchange with someone, enter
          recipient&apos;s wallet and make your offer.
        </P>
      </Div>
      <div className="split"></div>
      <FlexDiv $wrap="wrap" $align="center" $justify="center" $gap="10px">
        {actives.map((active) => {
          return (
            <S.BuyButton key={active.key}>
              <Button
                $background="#17181F"
                $fontSize="16px"
                $width="191px"
                $height="118px"
                $radius="16px"
                $padding="5px 0"
                onClick={() => setRouter?.(active.router)}
              >
                <FlexDiv
                  $align="start"
                  $gap="5px"
                  $width="100%"
                  $height="100%"
                  $direction="column"
                  $justify="flex-start"
                  $padding="0 0 0 10px"
                >
                  <FlexDiv $direction="column" $align="center" $gap="10px">
                    <Image src={active.img} width={60} height={60} alt="" />
                    <P>{active.title}</P>
                  </FlexDiv>
                </FlexDiv>
              </Button>
            </S.BuyButton>
          );
        })}

        {locks.map((lock) => {
          return (
            <div key={lock.key} style={{ cursor: "not-allowed" }}>
              <Image src={lock.img} width={191} height={120} alt="" />
            </div>
          );
        })}
      </FlexDiv>
      {/* Substitute the following lines for the implementation of transaction history */}
      {/* <Button
        $margin="0 20px 100px 20px"
        $border="1px solid #535254"
        $direction="row"
        $radius="16px"
        $padding="24px"
      >
        <FlexDiv $justify="space-between" $width="100%" $align="center">
          <P>Transaction history</P>
          <Image src={SendImg.ArrowDownImg} width={12} height={8} alt="" />
        </FlexDiv>
      </Button> */}
    </PageWrapper>
  );
};

export default Send;
