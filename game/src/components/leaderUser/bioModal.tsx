import styled from "styled-components";
import { FlexDiv } from "../div";
import { P } from "../p";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import React from "react";

const S = {
  BioContent: styled(FlexDiv)`
    border-top: 2px solid #e5e5e580;
    border-radius: 16px 16px 0 0;
    height: 55vh;
    width: 100%;
    background-color: #111113e5;
  `,
};

type Props = {
  close: () => void;
};

const BioModal: React.FC<Props> = ({ close }) => {
  return (
    <FlexDiv
      $width="100%"
      $height="100vh"
      $background="#00000099"
      $position="fixed"
      $top="0"
      $left="0"
      $index="20"
      $align="flex-end"
      onClick={() => close()}
    >
      <S.BioContent $align="center" $direction="column">
        <FlexDiv
          $width="60px"
          $border="3px solid #F6F1F2"
          $radius="50px"
          $margin="20px 0 20px 0"
        />
        <P $fontSize="20px">Anonymous User</P>
        <FlexDiv
          $justify="center"
          $gap="20px"
          $width="400px"
          $align="center"
          $margin="20px 0 0 0"
        >
          <Image src={Img.BioDefaultImg} width={100} height={100} alt="" />
          <P $lineHeight="1.7">
            Ground Control to Major Tom! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </P>
        </FlexDiv>
      </S.BioContent>
    </FlexDiv>
  );
};

export default BioModal;
