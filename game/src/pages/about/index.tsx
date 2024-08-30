/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import PageWrapper from '@/components/pageWrapper';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';

export default function About() {
  const { setRouter } = useGameContext();

  function handleOpenPlatform() {
    window.open("https://platform.conet.network", "_blank");
  }

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <FlexDiv $direction="column" $align="flex-start" $width='100%'>
        <Button onClick={() => setRouter("/")}>
          <FlexDiv $align="center" >
            <Image width={32} height={32} alt="Arrow" src={Img.ArrowImg} />
            <P $fontSize="32px" $color="#F6F1F2">
              About The CoNETian
            </P>
          </FlexDiv>
        </Button>
      </FlexDiv>

      <FlexDiv $direction="column" $width="100%" $gap="64px">
        <FlexDiv $direction="column" $gap="16px">
          <P $fontSize="20px">Welcome to The CoNETian!</P>
          <P $fontSize="15px" $lineHeight="24px">The CoNETian isn't just a game – it's your gateway to joining the revolutionary CoNET ecosystem.</P>
          <P $fontSize="15px" $lineHeight="24px">We've developed this mining mini-game on Telegram as an innovative way to let everyone participate in our decentralized network.</P>
          <P $fontSize="15px" $lineHeight="24px">Why did we build this game? We created The CoNETian to make it easy for anyone, anywhere in the world, to join our project.</P>
          <P $fontSize="15px" $lineHeight="24px">By playing this game, you’re not just having fun – you’re actively participating in a decentralized future.</P>
          <P $fontSize="15px" $lineHeight="24px">The CoNETian uses Blockchain technology for rewards distribution, emphasizing our commitment to decentralization.</P>
          <P $fontSize="15px" $lineHeight="24px">As you play, you’ll start mining and earning $CNTP.</P> <P>We’re also introducing exciting features like box openings for bigger prizes and more interactive gameplay.</P>
          <P $fontSize="15px" $lineHeight="24px">Every day, 200k $CNTP are up for grabs through spinning and other in-game activities.</P>
          <P $fontSize="15px" $lineHeight="24px">This isn’t just about rewards – it’s about giving you a chance to be part of something bigger.</P>
          <P $fontSize="15px" $lineHeight="24px">Soon, this game will allow players to mine in our DePIN network simply by sharing bandwidth, all while enjoying the gameplay.</P>
          <P $fontSize="15px" $lineHeight="24px">What’s Next? As we prepare to launch our main-net, The CoNETian will evolve, allowing users to contribute to and benefit from our decentralized infrastructure just by playing and sharing their bandwidth.</P>
          <P $fontSize="15px" $lineHeight="24px">No complicated setups – just your mobile device and the game.</P>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="16px">
          <P $fontSize="20px">About CoNET:</P>
          <P $fontSize="15px" $lineHeight="24px">CoNET is a DePIN project focused on Decentralization, Privacy, and Rewards. Our unique Layer Minus protocol replaces traditional IP addresses with wallet addresses, ensuring your online activities remain private and secure.</P>
          <P $fontSize="15px" $lineHeight="24px">Additionally, we've launched Silent Pass, a fast and secure privacy tool, as part of our commitment to protecting your online presence.Join us in building the future of the internet – decentralized, secure, and rewarding.</P>
          <P $fontSize="15px" $lineHeight="24px">Welcome to The CoNETian and the new era of online participation!</P>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $margin="32px 0 0 0" $direction="column" $align="center" $gap="13px">
        <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleOpenPlatform}>
          Open Platform
        </Button>
        <Button $width="196px" $height="45px" $radius="8px" $color="rgba(121, 248, 255, 1)" onClick={() => setRouter("/")}>
          Main Menu
        </Button>
      </FlexDiv>
    </PageWrapper>
  )
}