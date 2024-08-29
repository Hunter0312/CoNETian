import Image from "next/image";
import { FlexDiv } from "../div";
import { P } from "../p";
import { LeaderBoardUserDefaultBack } from "./boardBack";
import { Img } from "@/utilitiy/images";
import styled from "styled-components";
import LeadInfo from "./leadInfo";
import { Button } from "../button";

type Props = {
  cntp: number;
  address: string;
  index: number;
};

const LeaderUser: React.FC<Props> = ({ address, cntp, index }) => {
  return (
    <Button $direction="row">
      <LeaderBoardUserDefaultBack>
        <FlexDiv
          $radius="16px"
          $background="#1b1b1d"
          $width="100%"
          $height="100%"
          $align="center"
          $gap="30px"
          $padding="0 20px"
        >
          <P $fontSize="48px">{index + 1}</P>
          <FlexDiv $position="relative">
            <Image width={50} height={50} src={Img.LeadUserDefault} alt="" />
          </FlexDiv>
          <LeadInfo address={address} cntp={cntp} />
        </FlexDiv>
      </LeaderBoardUserDefaultBack>
    </Button>
  );
};

export default LeaderUser;
