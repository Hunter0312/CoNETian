import Image from "next/image";
import { FlexDiv } from "../div";
import { GradientP } from "../p";
import { SecondLeaderBoardUserBack } from "./boardBack";
import { Img } from "@/utilitiy/images";
import styled from "styled-components";
import LeadInfo from "./leadInfo";
import { Button } from "../button";
import { useState } from "react";
import BioModal from "./bioModal";

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

const SecondLeaderUser: React.FC<Props> = ({ cntp, address }) => {
  const [bio, setBio] = useState<boolean>(false);
  return (
    <>
      <FlexDiv $justify="center">
        <SecondLeaderBoardUserBack>
          <Button $direction="row" $width="100%" onClick={() => setBio(true)}>
            <FlexDiv
              $radius="16px"
              $background="#1b1b1d"
              $width="100%"
              $height="100%"
              $align="center"
              $gap="30px"
              $padding="0 20px"
            >
              <GradientP $first="#FFFFFF" $second="#857F80" $fontSize="48px">
                2
              </GradientP>
              <FlexDiv $position="relative">
                <Image
                  width={50}
                  height={50}
                  src={Img.LeadUserDefault}
                  alt=""
                />
                <S.BadgeImg
                  src={Img.SecondLeadBadgeImg}
                  width={15}
                  height={15}
                  alt=""
                />
              </FlexDiv>
              <LeadInfo address={address} cntp={cntp} />
            </FlexDiv>
          </Button>
        </SecondLeaderBoardUserBack>
      </FlexDiv>

      {bio && <BioModal close={() => setBio(false)} />}
    </>
  );
};

export default SecondLeaderUser;
