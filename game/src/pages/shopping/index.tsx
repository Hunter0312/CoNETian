import BackButton from '@/components/backButton';
import PageWrapper from '@/components/pageWrapper';

import "./index.css";
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import { Button } from '@/components/button';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { formatToken } from '@/utilitiy/functions';
import Supplies from '@/components/supplies';

const shoppingOptions = [
  {
    key: 1,
    title: "Spin the Wheel",
    caption: "Spin the Roulette and try to earn CNTP",
    image: Img.RouletteIcon,
    link: "/roulette",
  },
]

const comingSoonOptions = [
  {
    key: 1,
    image: Img.BoxBlurImg,
    title: 'Open the Box',
    caption: "Try your luck and receive special perks",
    link: '/box'
  },
  {
    key: 2,
    image: Img.SkinStoreBlurImg,
    title: 'Skin Store',
    caption: 'Fly through the CoNETian galaxy in style',
    link: '/skinstore'
  },
  {
    key: 3,
    image: Img.ItemsBlurImg,
    title: 'On game items'
  },
]

export default function Shopping() {
  const { setRouter } = useGameContext();

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Shop" />
      <Supplies />
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
            <div key={option.key} style={{ position: 'relative', width: '100%', height: '104px', cursor: 'not-allowed', display: 'flex', border: '1px solid #535254', alignItems: 'center', borderRadius: '16px', backgroundColor: '#262527', justifyContent: 'space-between', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}>
                <Image src={option.image} alt="Coming Soon" width={50} height={50} />
                <div>
                  <p style={{ color: '#ADAAAD', fontSize: '24px', lineHeight: '28px' }}>{option.title}</p>
                  <p style={{ color: '#ADAAAD', fontSize: '12px', lineHeight: '20px' }}>Coming soon</p>
                </div>
              </div>
              <Image src={Img.Lock} alt='lock' width={30} height={30} />
            </div>
          ))
        }
      </FlexDiv>
    </PageWrapper>
  )
}