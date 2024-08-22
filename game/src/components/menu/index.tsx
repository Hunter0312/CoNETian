import { FlexDiv } from "../div";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import { Button } from "../button";
import { P } from "../p";

const Menu = () => {
  return (
    <FlexDiv $position="fixed" $width="100%" $bottom="50px" $justify="center">
      <FlexDiv
        $justify="space-between"
        $padding="0 32px"
        $width="412px"
        $height="72px"
        $background="#31313473"
        $radius="40px"
      >
        <Button>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image width={29} height={29} src={Img.HomeImg} alt="home image" />
            <P $color="#79F8FF">Home</P>
          </FlexDiv>
        </Button>
        <Button>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={Img.WalletImg}
              alt="wallet image"
            />
            <P>My Wallet</P>
          </FlexDiv>
        </Button>
        <Button>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={Img.RoulletImg}
              alt="roullet image"
            />
            <P>Bet</P>
          </FlexDiv>
        </Button>
        <Button>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={Img.SettingImg}
              alt="settings image"
            />
            <P>Settings</P>
          </FlexDiv>
        </Button>
      </FlexDiv>
    </FlexDiv>
  );
};

export default Menu;
