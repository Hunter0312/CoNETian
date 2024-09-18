import BackButton from '@/components/backButton';
import PageWrapper from '@/components/pageWrapper';

import "./index.css";
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import Tooltip from '@/components/tooltip';
import { Button } from '@/components/button';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { formatToken } from '@/utilitiy/functions';

const shoppingOptions = [
  {
    key: 1,
    title: "Spin the Wheel",
    caption: "Spin the Roulette and try to earn CNTP",
    image: Img.RouletteIcon,
    link: "/roulette",
  }
]

const comingSoonOptions = [
  {
    key: 1,
    image: Img.ComingSoon1,
  },
  {
    key: 2,
    image: Img.ComingSoon2,
  },
  {
    key: 3,
    image: Img.ComingSoon3,
  },
]

export default function Shopping() {
  const { setRouter, profile } = useGameContext();

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Shop" />
      <FlexDiv $align="center" $justify="space-between">
        <FlexDiv $gap="12px" $align="center">
          <P $fontSize="24px">Supplies</P>
          <Tooltip message="Each ticket is a valuable asset. Keep playing The CoNETian to earn more tickets!" />
        </FlexDiv>
        <FlexDiv $align="center" $gap="8px" $background="#262527" $padding="8px" $radius="8px">
          <Image src={Img.Tickets} alt="Tickets" width={42.15} height={32} />
          <P $fontSize='20px'>x {profile?.tickets?.balance ?? 0}</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $gap="8px" $align="center">
        <P $fontSize="20px">{formatToken(profile?.tokens.cCNTP.balance)}</P>
        <P $fontSize="12px">CNTP EARNED</P>
      </FlexDiv>
      <div className="split"></div>
      <FlexDiv $direction="column" $gap="12px">
        <P $fontSize="24px">Storage and lounge</P>
        <P $color="#C8C6C8" className="text-max-width">Use your supplies to unlock different items or rest in the lounge and try to earn CNTP</P>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="16px">
        {
          shoppingOptions.map((option) => (
            <Button key={option.key} $padding="16px" $radius="16px" $height="104px" className="option-button" $background="#262527" $border="1px solid #79F8FF" onClick={() => setRouter?.(option.link)}>
              <FlexDiv $justify="space-between" $width="100%" $align="center">
                <FlexDiv $gap="14px" $align="center">
                  <FlexDiv $align="center">
                    <Image src={option.image} alt={option.title} width={55} height={55} />
                  </FlexDiv>
                  <FlexDiv $direction="column" $gap="6px">
                    <P $fontSize="24px">{option.title}</P>
                    <P $fontSize="12px">{option.caption}</P>
                  </FlexDiv>
                </FlexDiv>
                <Image src={Img.RightArrowImg} alt="Arrow" width={32} height={32} />
              </FlexDiv>
            </Button>
          ))
        }
        {
          comingSoonOptions.map((option) => (
            <div key={option.key} className="coming-soon-wrapper">
              <Image src={option.image} alt="Coming Soon" fill />
            </div>
          ))
        }
      </FlexDiv>
    </PageWrapper>
  )
}