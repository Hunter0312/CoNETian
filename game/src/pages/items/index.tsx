import BackButton from "@/components/backButton";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import Rank from "@/components/supplies/rank";
import { formatToken } from "@/utilitiy/functions";
import { Img } from "@/utilitiy/images";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Skeleton from "react-loading-skeleton";
import GameItem from "./item";

const items = [
  {
    img: Img.ExtraItemImg,
    title: "Extra Life",
    desc: "Adds an extra life",
    count: 0,
    price: 5,
    buyTitle: "Add an extra life",
    buyDesc: "Allows the CoNETian one respawn once after crashing.",
  },
  {
    img: Img.InvincibilityItemImg,
    title: "Invincibility",
    desc: "Temporarily shielded from damage",
    count: 0,
    price: 5,
    buyTitle: "Temporarily shielded from damage",
    buyDesc: "Temporarily makes the CoNETian invincible to asteroids.",
  },
  {
    img: Img.SpeedItemImg,
    title: "Speed Boost",
    desc: "Temporarily increases speed",
    count: 0,
    price: 2,
    buyTitle: "Temporarily increases speed",
    buyDesc:
      "Temporarily increases speed for a short distance, allowing to dodge obstacles faster.",
  },
  {
    img: Img.SlowItemImg,
    title: "SLow Motion",
    desc: "Slows down the gravity",
    count: 0,
    price: 2,
    buyTitle: "Slows down the gravity",
    buyDesc: "Slows down the speed of the game for a few seconds.",
  },
  {
    img: Img.MiniItemImg,
    title: "Mini-CoNETian",
    desc: "Reduces the size of the CoNeTian",
    count: 0,
    price: 5,
    buyTitle: "Reduces the size of the CoNETian",
    buyDesc:
      "Shrinks the CoNETian temporarily, making it easier to pass through asteroids.",
  },
  {
    img: Img.RandomItemImg,
    title: "Random Item",
    desc: "Receive a random item",
    count: 0,
    price: 1,
    buyTitle: "Receive a random item",
    buyDesc: "During the gameplay you will receive an random item.",
  },
];

const GameItems = () => {
  const { profile } = useGameContext();

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="On game items" to="/shopping" />
      <Rank />
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
      <Div>
        <P $fontSize="24px">CoNET Items</P>
        <P $color="#C8C6C8">
          Traveling through the galaxy can be challenging, buy items and reach
          greater distances and rewards.
        </P>
      </Div>
      <FlexDiv $justify="center" $wrap="wrap" $align="center" $gap="10px">
        {items.map((item, index) => {
          return <GameItem key={index} data={item} />;
        })}
      </FlexDiv>
    </PageWrapper>
  );
};

export default GameItems;
