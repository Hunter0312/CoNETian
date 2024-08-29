import MiningStatus from "@/components/miningStatus";
import { FlexDiv } from "@/components/div";
import React, { useState } from "react";
import { Button } from "@/components/button";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import { P } from "@/components/p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import LeaderUser from "@/components/leaderUser";
import FirstLeaderUser from "@/components/leaderUser/firstUser";
import SecondLeaderUser from "@/components/leaderUser/secondUser";
import ThirdLeaderUser from "@/components/leaderUser/thirdUser";

const Leaderboard = () => {
  const [filter, setFilter] = useState<number>(0);
  const { setRouter, leaderboard } = useGameContext();

  const next = () => {
    if (filter !== 3) {
      setFilter(filter + 1);
    }
  };

  const prev = () => {
    if (filter !== 0) {
      setFilter(filter - 1);
    }
  };

  return (
    <FlexDiv $direction="column" $gap="32px" $margin="32px 0 150px 0">
      <MiningStatus />
      <FlexDiv $padding="0 15px">
        <Button $direction="row" $gap="10px" onClick={() => setRouter("/")}>
          {filter === 0 ? (
            <Image height={11} width={7} src={Img.BlueLeftArrow} alt="" />
          ) : (
            <Image height={11} width={7} src={Img.PinkLeftArrow} alt="" />
          )}

          <P $fontSize="32px">Leaderboard</P>
        </Button>
      </FlexDiv>
      <FlexDiv $justify="space-between" $padding="0 30px">
        <Button onClick={() => prev()}>
          <Image src={Img.LeadLeftArrow} width={16} height={32} alt="" />
        </Button>
        {filter === 0 ? (
          <Image src={Img.AllImg} width={232} height={202} alt="" />
        ) : filter === 1 ? (
          <Image src={Img.MonthlyImg} width={232} height={202} alt="" />
        ) : filter === 2 ? (
          <Image src={Img.WeeklyImg} width={232} height={202} alt="" />
        ) : (
          <Image src={Img.DailyImg} width={232} height={202} alt="" />
        )}

        <Button onClick={() => next()}>
          <Image src={Img.LeadRightArrow} width={16} height={32} alt="" />
        </Button>
      </FlexDiv>
      <P $align="center" $fontSize="24px">
        {filter === 0
          ? "All Time"
          : filter === 1
          ? "Monthly"
          : filter === 2
          ? "Weekly"
          : "Daily"}
      </P>
      {filter === 0 &&
        leaderboard.allTime &&
        leaderboard.allTime.map((item, index) => {
          if (index === 0)
            return (
              <FirstLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 1)
            return (
              <SecondLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 2)
            return (
              <ThirdLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          return (
            <LeaderUser
              index={index}
              address={item.wallet}
              cntp={item.win_cntp}
            />
          );
        })}
      {filter === 1 &&
        leaderboard.monthly &&
        leaderboard.monthly.map((item, index) => {
          if (index === 0)
            return (
              <FirstLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 1)
            return (
              <SecondLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 2)
            return (
              <ThirdLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          return (
            <LeaderUser
              index={index}
              address={item.wallet}
              cntp={item.win_cntp}
            />
          );
        })}
      {filter === 2 &&
        leaderboard.weekly &&
        leaderboard.weekly.map((item, index) => {
          if (index === 0)
            return (
              <FirstLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 1)
            return (
              <SecondLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 2)
            return (
              <ThirdLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          return (
            <LeaderUser
              index={index}
              address={item.wallet}
              cntp={item.win_cntp}
            />
          );
        })}
      {filter === 3 &&
        leaderboard.daily &&
        leaderboard.daily.map((item, index) => {
          if (index === 0)
            return (
              <FirstLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 1)
            return (
              <SecondLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          if (index === 2)
            return (
              <ThirdLeaderUser address={item.wallet} cntp={item.win_cntp} />
            );
          return (
            <LeaderUser
              index={index}
              address={item.wallet}
              cntp={item.win_cntp}
            />
          );
        })}
    </FlexDiv>
  );
};

export default Leaderboard;
