import { Button, GradientButton } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import MiningStatus from "@/components/miningStatus";
import { GradientP, P } from "@/components/p";
import UserData from "@/components/userData";
import { Img } from "@/utilitiy/images";
import Image from "next/image";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { formatToken } from "@/utilitiy/functions";

const S = {
  PlayButton: styled(Div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(135deg, black 0%, #3a3a3a 100%);
    border-radius: 50%;
    width: 308px;
    height: 308px;
    box-shadow: 0 0px 25px 0 rgba(0, 0, 0, 0.2), 0 0px 40px 0 rgba(0, 0, 0, 0.6);
  `,
};

export default function Home() {
  const { profile, setRouter, highScore } = useGameContext();

  function handleOpenPlatform() {
    window.open("https://platform.conet.network", "_blank");
  }

  return (
    <FlexDiv $direction="column" $gap="32px" $margin="32px 0 0 0">
      <MiningStatus />
      <FlexDiv $justify="space-between" $padding="0 15px">
        <FlexDiv $gap="16px">
          <UserData />
          <Button
            $width="32px"
            $height="32px"
            $background="#474648"
            $radius="50%"
            onClick={() => setRouter('/profile')}
          >
            <Image
              width={16}
              height={16}
              src={Img.RightArrowImg}
              alt="right arrow image"
            />
          </Button>
        </FlexDiv>
        <Button
          $width="32px"
          $height="32px"
          $background="#474648"
          $radius="50%"
        >
          <Image
            width={16}
            height={16}
            src={Img.VolumeImg}
            alt="volume image"
          />
        </Button>
      </FlexDiv>
      <FlexDiv $justify="space-between" $padding="0 15px" $gap="16px">
        <GradientButton
          flex={2}
          onClick={() => {
            setRouter("/leaderboard");
          }}
        >
          <FlexDiv $align="center" $gap="8px">
            <Image
              width={24}
              height={24}
              src={Img.UserGroupImg}
              alt="user group image"
            />
            Leaderboard
          </FlexDiv>
        </GradientButton>

        <GradientButton flex={1}>
          <FlexDiv $align="center" $gap="8px">
            <Image
              width={24}
              height={24}
              src={Img.Shop}
              alt="shop page"
            />
            Shop
          </FlexDiv>
        </GradientButton>
      </FlexDiv>
      <FlexDiv $justify="space-between" $padding="0 15px" $align="center">
        <P $fontSize="32px" $color="#F6F1F2">
          The CoNETian
        </P>
        <FlexDiv
          $padding="8px 0"
          $border="1px solid #CFCFCF1A"
          $radius="16px"
          $direction="column"
          $justify="space-between"
          $align="center"
          $width="146px"
          $height="74px"
        >
          <P>Highest Score</P>
          <GradientP $first="#79F8FF" $second="#499599" $fontSize="24px">
            {highScore}
          </GradientP>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $justify="center">
        <Button $radius="50%">
          <S.PlayButton onClick={() => setRouter('/playground')}>
            <Image
              width={289}
              height={289}
              src={Img.PlayImg}
              alt="play image"
            />
          </S.PlayButton>
        </Button>
      </FlexDiv>
      <FlexDiv $justify="center" $gap="24px" $align="center">
        <FlexDiv $direction="column" $align="center" $gap="4px">
          <P $fontSize="12px">CNTP earned</P>
          <P $fontSize="20px">
            {profile ? (
              formatToken(profile?.tokens?.cCNTP?.balance)
            ) : (
              <Skeleton width={100} />
            )}
          </P>
        </FlexDiv>
        <GradientButton onClick={handleOpenPlatform}>Open Platform</GradientButton>
      </FlexDiv>
      <FlexDiv $justify="center" $gap="8px" $margin="0 0 150px 0">
        <Image width={16} height={16} src={Img.ArbitrumLogo} alt="logo" />
        <P $fontSize="14px">built on Arbitrum</P>
      </FlexDiv>
    </FlexDiv>
  );
}
