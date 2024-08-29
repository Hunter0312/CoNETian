import Image from "next/image";
import { FlexDiv } from "../div";
import { GradientP } from "../p";
import { ThirdLeaderBoardUserBack } from "./boardBack";
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

const ThirdLeaderUser: React.FC<Props> = ({ cntp, address }) => {
  return (
    <Button $direction="row">
      <ThirdLeaderBoardUserBack>
        <FlexDiv
          $radius="16px"
          $background="#1b1b1d"
          $width="100%"
          $height="100%"
          $align="center"
          $gap="30px"
          $padding="0 20px"
        >
          <GradientP $first="#FCCB9E" $second="#9B4C05" $fontSize="48px">
            3
          </GradientP>
          <FlexDiv $position="relative">
            <Image width={50} height={50} src={Img.LeadUserDefault} alt="" />
            <S.BadgeImg
              src={Img.ThirdLeadBadgeImg}
              width={15}
              height={15}
              alt=""
            />
          </FlexDiv>
          <LeadInfo address={address} cntp={cntp} />
        </FlexDiv>
      </ThirdLeaderBoardUserBack>
    </Button>
  );
};

export default ThirdLeaderUser;
