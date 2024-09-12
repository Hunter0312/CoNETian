/* eslint-disable react/no-unescaped-entities */
import { Div, FlexDiv } from '@/components/div';
import { BoxType } from '../boxes';
import Rank from '@/components/supplies/rank';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/button';
import GradientWrapper from '@/components/gradientWrapper';

interface Props {
  box: BoxType;
}

const requiredKey: Record<string, string> = {
  "normal": Img.NormalKey,
  "conet": Img.ConetKey,
  "special": Img.SpecialKey,
}

export default function Box({ box }: Props) {
  const [attendRequirements, setAttendRequirements] = useState(true);

  return (
    <FlexDiv $direction="column" $gap="28px">
      <FlexDiv className="stars-bg" $direction="column" $gap="28px" $align="center" $padding="24px 0" $margin="-24px 0 0">
        <FlexDiv $direction="column" $gap="24px" $width="100%">
          <FlexDiv $justify="space-between" $align="center">
            <Rank />
            <FlexDiv $padding="8px" $gap="8px" $radius="16px" $border="1px solid #535254" $align="center">
              <Image src={requiredKey[box.requiredKey]} alt="Key" width={32} height={32} />
              <P $fontSize="14px"><strong style={{ color: "#79F8FF" }}>1</strong> OWNED</P>
            </FlexDiv>
          </FlexDiv>
          <Div className="split" />
        </FlexDiv>
        <FlexDiv $direction="column" $gap="8px" $width="100%">
          <P $color="#ADAAAD">Requirements:</P>
          <FlexDiv $gap="12px" $align="center">
            <P>{box.minimumRank !== "Guardian" ? `${box.minimumRank} Rank or higher` : 'Only for Guardians'}</P>
            <P $fontSize="14px">•</P>
            <Image src={requiredKey[box.requiredKey]} alt="Key" width={22} height={22} />
          </FlexDiv>
        </FlexDiv>
        {
          !attendRequirements && (
            <FlexDiv $radius="16px" $padding="8px 16px" $border="1px solid #FFB4AB">
              <P $color="#FFB4AB" $fontSize="12px">You don't have the requirements to open this box</P>
            </FlexDiv>
          )
        }
        <FlexDiv $direction="column" $gap="16px" $align="center">
          <FlexDiv $background="#111113" $radius="10.29px" $position="relative" className="image-wrapper" $height="180px" $width="180px" $align="center">
            <Image src={box.icon} alt="Box" width={179} height={143} />
            <Div $width="50px" $height="30px" $radius="999px" $position="absolute" $boxShadow="0px 0px 30px 0px #79F8FF1F"></Div>
          </FlexDiv>
          <FlexDiv $direction="column" $gap="8px" $align="center">
            <P $fontSize="40px">{box.title}</P>
            <P $fontSize="12px" $align="center">{box.description}</P>
          </FlexDiv>
        </FlexDiv>
        {
          attendRequirements ? (
            <GradientWrapper className="highlight-button-wrapper" radius="8px">
              <Button $padding="14px" $width="160px" $color="#FFFFFF" $background="#111113" $radius="8px" disabled>
                Open Box
              </Button>
            </GradientWrapper>
          ) : (
            <Button $padding="14px" $width="160px" $color="#FFFFFF" $background="#474648" $radius="8px" disabled>
              Open Box
            </Button>
          )
        }
      </FlexDiv>
    </FlexDiv>
  )
}