import { Button } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  data: object;
};

const S = {
  Img: styled(Image)`
    box-shadow: 0 0 19px 4px #a34eb77d;
    border-radius: 50%;
  `,
};

const GameItem: React.FC<Props> = ({ data }) => {
  const { setRouter, setBuyItem } = useGameContext();

  return (
    <Button
      $width="190px"
      $height="154px"
      $border="1px solid #535254"
      $radius="16px"
      $background="#17181F"
      $gap="10px"
      style={{ position: "relative" }}
      onClick={() => {
        setBuyItem?.(data);
        setRouter?.("/buyitem");
      }}
    >
      <FlexDiv
        $width="72px"
        $height="72px"
        $background="#111113"
        $radius="10px"
        $direction="column"
        $justify="center"
        $align="center"
      >
        <S.Img src={data.img} height={52} width={52} alt="" />
      </FlexDiv>
      <FlexDiv $direction="column" $gap="5px">
        <P $fontSize="18px" $align="center">
          {data.title}
        </P>
        <P $fontSize="10px" $align="center">
          {data.desc}
        </P>
      </FlexDiv>
      <FlexDiv $position="absolute" $top="15px" $right="15px" $gap="5px">
        <P $color="#79F8FF" $fontSize="14px">
          x
        </P>
        <P $color="#79F8FF" $fontSize="14px">
          {data.count < 10 ? `0${data.count}` : data.count}
        </P>
      </FlexDiv>
    </Button>
  );
};

export default GameItem;
