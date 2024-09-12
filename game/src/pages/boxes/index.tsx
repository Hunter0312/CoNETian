import BackButton from '@/components/backButton';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import PageWrapper from '@/components/pageWrapper';
import Supplies from '@/components/supplies';
import { useState } from 'react';
import { BoxType, boxes } from './boxes';
import Image from 'next/image';

import "./styles.css";
import { Button } from '@/components/button';
import { Img } from '@/utilitiy/images';
import GradientWrapper from '@/components/gradientWrapper';
import Box from './page-components/box';
import Keys from './page-components/key';

export default function Boxes() {
  const [choosenBox, setChoosenBox] = useState<BoxType>();
  const [boxList, setBoxList] = useState<BoxType[]>(boxes);
  const [isBuyKeyOpen, setIsBuyKeyOpen] = useState<boolean>(false);

  if (isBuyKeyOpen) {
    return (
      <PageWrapper margin="32px 16px 140px 16px">
        <Keys closeKeys={() => setIsBuyKeyOpen(false)} />
      </PageWrapper>
    )
  }

  if (choosenBox) {
    return (
      <PageWrapper margin="32px 16px 140px 16px">
        <BackButton text={choosenBox.title} action={() => setChoosenBox(undefined)} />
        <Box box={choosenBox} />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Open the Box" />
      <Supplies />
      <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" $padding="18px" onClick={() => setIsBuyKeyOpen(true)}>
        Buy Key
      </Button>
      <div className="split"></div>
      <FlexDiv $direction="column" $gap="12px">
        <P $fontSize="24px">CoNET Boxes</P>
        <P $color="#C8C6C8" className="text-max-width">Buy Keys to open the boxes, each box has different prizes, from CNTP to Items and unique Skins.</P>
      </FlexDiv>
      <Div className="box-grid">
        {
          boxList.map((box, i) => box.title === "Guardian box" ? (
            <GradientWrapper key={box.title} radius="16px" className="guardian-box">
              <FlexDiv className="guardian-wrapper" $height="100%" $position="relative" $radius="16px" $padding="16px 24px" $background="#17181F" $gap="20px" $align="center" onClick={() => setChoosenBox(box)}>
                <Div $background="#111113" $radius="10.29px" $position="relative" className="image-wrapper">
                  <Image src={box.icon} alt="Box" width={104} height={83} />
                  <Div $width="50px" $height="30px" $radius="999px" $position="absolute" $boxShadow="0px 0px 30px 0px #79F8FF1F"></Div>
                </Div>
                <FlexDiv $direction="column" $gap="8px">
                  <P $fontSize="26px">{box.title}</P>
                  <P $fontSize="14px">{box.description}</P>
                </FlexDiv>
                <Image className="conet-img" src={Img.LogoImg} alt="Conet" width={210} height={230} />
              </FlexDiv>
            </GradientWrapper>
          ) : (
            <FlexDiv key={box.title} $radius="16px" $padding="16px" $border="1px solid #535254" $background="#17181F" $direction="column" $gap="8px" $align="center" onClick={() => setChoosenBox(box)}>
              <Div $background="#111113" $radius="10.29px" $position="relative" className="image-wrapper">
                <Image src={box.icon} alt="Box" width={80} height={63} />
                <Div $width="50px" $height="30px" $radius="999px" $position="absolute" $boxShadow="0px 0px 30px 0px #79F8FF1F"></Div>
              </Div>
              <FlexDiv $direction="column" $gap="8px" $align="center">
                <P $fontSize="18px">{box.title}</P>
                <P $fontSize="12px" $align="center">{box.description}</P>
              </FlexDiv>
            </FlexDiv>
          ))
        }
      </Div>
    </PageWrapper>
  )
}