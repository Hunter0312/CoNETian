import Image from "next/image";
import { FlexDiv } from "../div";
import { P } from "../p";
import { LeaderBoardUserDefaultBack } from "./boardBack";
import { Img } from "@/utilitiy/images";
import styled from "styled-components";
import LeadInfo from "./leadInfo";
import { Button } from "../button";
import BioModal from "./bioModal";
import { useState } from "react";

type Props = {
  cntp: number;
  address: string;
  index: number;
};

const LeaderUser: React.FC<Props> = ({ address, cntp, index }) => {
  const [bio, setBio] = useState<boolean>(false);
  return (
    <>
      <FlexDiv $justify="center">
        <LeaderBoardUserDefaultBack>
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
              <P $fontSize="48px">{index + 1}</P>
              <FlexDiv $position="relative">
                <Image
                  width={50}
                  height={50}
                  src={Img.LeadUserDefault}
                  alt=""
                />
              </FlexDiv>
              <LeadInfo address={address} cntp={cntp} />
            </FlexDiv>
          </Button>
        </LeaderBoardUserDefaultBack>
      </FlexDiv>
      {bio && <BioModal close={() => setBio(false)} />}
    </>
  );
};

export default LeaderUser;
