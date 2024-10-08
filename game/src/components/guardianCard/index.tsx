import Image from 'next/image';
import { Div, FlexDiv } from '../div';
import { P } from '../p';
import { Img } from '@/utilitiy/images';

export default function GuardianCard() {
  function becomeGuardian() {
    window.open("https://platform.conet.network", "_blank");
  }

  return (
    <Div $padding="1px" $background="linear-gradient(247.89deg, #04DAE8 -23.3%, #61C6CC 12.53%, #79F8FF 14.78%, #026D74 56.58%)" $radius="24px" onClick={becomeGuardian}>
      <FlexDiv $direction="column" $gap="12px" $background="#17181F" $position="relative" $radius="24px" $padding="30px 18px" className="guardian-wrapper">
        <P className="text-primary-gradient small-text-max-width" $fontSize="22px" $weight="700">Become a Guardian and boost your game</P>
        <P $fontSize="12px">Helping to build a real Open, Secure and Decentralized Internet</P>
        <Image className="conet-img" src={Img.LogoImg} alt="Conet" width={210} height={230} />
      </FlexDiv>
    </Div>
  )
}