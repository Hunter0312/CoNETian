import Image from "next/image";
import { FlexDiv } from "../div";
import { GradientP } from "../p";
import { FirstLeaderBoardUserBack } from "./boardBack";
import { Img } from "@/utilitiy/images";
import styled from "styled-components";
import LeadInfo from "./leadInfo";
import { Button } from "../button";

const S = {
  BadgeImg: styled(Image)`
    position: absolute;
    bottom: 0;
    right: 0;
  `,
};

type Props = {
  cntp: number;
  address: string;
};

const FirstLeaderUser: React.FC<Props> = ({ address, cntp }) => {
  return (
    <Button $direction="row">
      <FirstLeaderBoardUserBack>
        <FlexDiv
          $radius="16px"
          $background="#1b1b1d"
          $width="100%"
          $height="100%"
          $align="center"
          $gap="30px"
          $padding="0 20px"
        >
          <GradientP $first="#FEDF91" $second="#FFEEDE" $fontSize="48px">
            1
          </GradientP>
          <FlexDiv $position="relative">
            <Image width={50} height={50} src={Img.LeadUserDefault} alt="" />
            <S.BadgeImg
              src={Img.FirstLeadBadgeImg}
              width={15}
              height={15}
              alt=""
            />
          </FlexDiv>
          <LeadInfo address={address} cntp={cntp} />
        </FlexDiv>
      </FirstLeaderBoardUserBack>
    </Button>
  );
};

export default FirstLeaderUser;
