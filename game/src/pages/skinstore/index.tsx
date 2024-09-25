import BackButton from "@/components/backButton";
import PageWrapper from "@/components/pageWrapper";

import "./index.css";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import Image from "next/image";
import { Button, GradientButton } from "@/components/button";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { formatToken } from "@/utilitiy/functions";
import Skeleton from "react-loading-skeleton";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import styled from "styled-components";
import Skin from "./skin";
import { useState } from "react";

const S = {
  Preview: styled(Div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("/background_astronaut.png");
    background-position: center;
    background-size: 100% 100%;
    border-radius: 50%;
    width: 195px;
    height: 195px;
  `,
  BuyButton: styled(FlexDiv)`
    width: 100%;
    background-image: linear-gradient(90deg, #79f8ff 0%, #d775ff 50%);
    border-radius: 32px;
    padding: 1px;
  `,
  Skins: styled(FlexDiv)`
    overflow-y: scroll;
  `,
};

interface Skin {
  key: Number;
  Img: any;
  status: String;
  title: String;
  desc: String;
  price: Number;
}

export default function SkinStore() {
  const { setRouter, profile, setSkinBuy } = useGameContext();
  const [skins, setSkins] = useState<Skin[]>([
    {
      key: 1,
      Img: SkinImg.Fssuit,
      status: "used",
      title: "FS Suit",
      desc: "Your first suit to start your CoNETian mission.",
      price: 0,
    },
    {
      key: 2,
      Img: SkinImg.Shibnet,
      status: "mine",
      title: "ShibNET",
      desc: "Much wow, very epic—dominate in style with the iconic ShibNET skin.",
      price: 0,
    },
    {
      key: 3,
      Img: SkinImg.Grmpnet,
      status: "buy",
      title: "GrmpNET",
      desc: "Unleash your inner grump with the iconic, no-nonsense GrmpNET skin.",
      price: 2,
    },
    {
      key: 4,
      Img: SkinImg.Cofrog,
      status: "buy",
      title: "CoFROG",
      desc: "Fly through all the feels with the CoFROG skin—perfect for every mood.",
      price: 2,
    },
    {
      key: 5,
      Img: SkinImg.Johnnyet,
      status: "buy",
      title: "JohnNyET",
      desc: "Break through the game with the chilling JohnNyET skin—embrace the iconic madness.",
      price: 2,
    },
    {
      key: 6,
      Img: SkinImg.Cowave,
      status: "buy",
      title: "CoWave",
      desc: "Ride the waves of power with the CoWave skin—where classic art meets epic gameplay.",
      price: 5,
    },
    {
      key: 7,
      Img: SkinImg.Netarry,
      status: "buy",
      title: "NETarry",
      desc: "Illuminate the battlefield with the NETarry skin—bring VanG masterpiece to life.",
      price: 5,
    },
    {
      key: 8,
      Img: SkinImg.Cofry,
      status: "buy",
      title: "CoFRY",
      desc: "Stay skeptical and stylish with the CoFry skin—because things just don’t add up.",
      price: 5,
    },
    {
      key: 9,
      Img: SkinImg.Facenet,
      status: "buy",
      title: "FaceNET",
      desc: "Master frustration in style with the ultimate FaceNET skin—because some moments need no words.",
      price: 5,
    },
    {
      key: 10,
      Img: SkinImg.Cocpz,
      status: "buy",
      title: "CoCPZ",
      desc: "Channel the power of Web3 with the CoCPZ skin—innovative and unstoppable.",
      price: 10,
    },
    {
      key: 11,
      Img: SkinImg.Cotalik,
      status: "buy",
      title: "CoTalik",
      desc: "Embrace blockchain brilliance with the CoTalik skin—where innovation meets gameplay.",
      price: 10,
    },
    {
      key: 12,
      Img: SkinImg.Emco,
      status: "buy",
      title: "EMCo",
      desc: "Blast off with the EMCo skin—where visionary style meets out-of-this-world gameplay.",
      price: 10,
    },
    {
      key: 13,
      Img: SkinImg.Tconet,
      status: "buy",
      title: "T-CoNET",
      desc: "Dominate with the relentless T-CoNET skin—channeling unstoppable power from the future.",
      price: 10,
    },
    {
      key: 14,
      Img: SkinImg.Conetrix,
      status: "buy",
      title: "CoNETrix",
      desc: "Enter the digital realm with the CoNETrix skin—unlock your true potential and bend reality.",
      price: 20,
    },
    {
      key: 15,
      Img: SkinImg.Corvin,
      status: "buy",
      title: "CoRVIN",
      desc: "Embrace existential ennui with the CoRVIN skin—your stylishly pessimistic guide through the galaxy.",
      price: 20,
    },
    {
      key: 16,
      Img: SkinImg.Covdr,
      status: "buy",
      title: "CoVDR",
      desc: "Rule the galaxy with the CoVDR skin—unleash dark power and iconic presence.",
      price: 20,
    },
    {
      key: 17,
      Img: SkinImg.Vulconet,
      status: "buy",
      title: "VulCoNET",
      desc: "Channel logical prowess with the VulCONET skin—embrace calm, cool, and interstellar precision.",
      price: 20,
    },
    {
      key: 18,
      Img: SkinImg.Netwid,
      status: "buy",
      title: "NETwid",
      desc: "Strike with stealth and agility in the NETwid skin—where espionage meets epic action.",
      price: 50,
    },
    {
      key: 19,
      Img: SkinImg.Spmanet,
      status: "buy",
      title: "SPMaNET",
      desc: "Swing into action with the SPMaNET skin—bringing web-slinging heroics to the battlefield.",
      price: 50,
    },
    {
      key: 20,
      Img: SkinImg.Wwnet,
      status: "buy",
      title: "wwNET",
      desc: "Embody strength and grace with the wwNET skin—defend justice with legendary power.",
      price: 50,
    },
    {
      key: 21,
      Img: SkinImg.Batnet,
      status: "buy",
      title: "BatNET",
      desc: "Step into the shadows with the BatNET skin—strike fear into the hearts and fight for justice.",
      price: 50,
    },
  ]);

  const [selected, setSelected] = useState(() => {
    let temp = {};
    skins.forEach((skin) => {
      if (skin.status === "used") {
        temp = skin;
      }
    });
    return temp;
  });

  const select = (index: Number) => {
    setSelected(skins[index - 1]);
  };

  const choose = () => {
    const skinsCopy = skins.map((skin) => {
      if (skin.status === "used") {
        skin.status = "mine";
      }
      return skin;
    });
    skinsCopy[selected.key - 1].status = "used";
    setSkins(skinsCopy);
  };

  const buy = () => {
    setSkinBuy(selected);
    setRouter("/skinconfirm");
  };

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Skins Store" />
      <FlexDiv $gap="8px" $align="center">
        {profile ? (
          <>
            <P $fontSize="20px" style={{ lineHeight: "16px" }}>
              {formatToken(profile?.tokens?.cCNTP?.balance)}
            </P>
            <P $fontSize="12px" style={{ lineHeight: "16px" }}>
              CNTP EARNED
            </P>
          </>
        ) : (
          <Skeleton width={200} />
        )}
      </FlexDiv>
      <div className="split"></div>
      <FlexDiv>
        <FlexDiv $width="50%" $direction="column">
          <FlexDiv>
            <S.Preview $margin="0 0 30px 0">
              <Image
                src={selected.Img}
                width={116}
                height={127}
                alt={selected.desc}
              />
            </S.Preview>
          </FlexDiv>
          <FlexDiv
            $direction="column"
            $background="#FFFFFF0A"
            $justify="center"
            $align="center"
            $padding="15px 10px"
            $radius="16px"
          >
            <P $fontSize="18px">{selected.title}</P>
            <Div $margin="20px 0">
              <P $fontSize="12px" $align="center">
                {selected.desc}
              </P>
            </Div>
            {selected.price === 0 ? (
              <P $color="#79f8ff" $fontSize="14px">
                Purchased
              </P>
            ) : (
              <FlexDiv $align="center" $gap="5px" $margin="10px 0">
                <Image
                  src={SkinImg.Rewards}
                  width={24}
                  height={24}
                  alt="rewards"
                />
                <P $fontSize="14px">{selected.price} CNTP</P>
              </FlexDiv>
            )}
            <FlexDiv $width="100%" $padding="10px">
              {selected.price === 0 ? (
                <GradientButton flex={1} height="36px" onClick={choose}>
                  <P>Choose</P>
                </GradientButton>
              ) : (
                <S.BuyButton>
                  <Button
                    $background="#17181F"
                    $fontSize="16px"
                    $width="100%"
                    $radius="16px"
                    $padding="5px 0"
                    onClick={buy}
                  >
                    Buy Skin
                  </Button>
                </S.BuyButton>
              )}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $width="50%">
          <S.Skins
            $justify="flex-end"
            $wrap="wrap"
            $gap="10px"
            $height="80vh"
            className="scroll"
            $padding="0 5px 0 0 "
          >
            {skins.map((e) => {
              return (
                <div key={e.key}>
                  <Skin
                    data={e}
                    index={selected.key}
                    selected={(index) => select(index)}
                  />
                </div>
              );
            })}
          </S.Skins>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
}
