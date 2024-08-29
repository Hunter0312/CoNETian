import { FlexDiv } from "../div";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import { Button } from "../button";
import { P } from "../p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

const Menu = () => {
  const { router, setRouter } = useGameContext();
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
        <Button onClick={() => setRouter("/")}>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={router === "/" ? Img.ActiveHomeImg : Img.HomeImg}
              alt="home image"
            />
            <P $color={router === "/" ? "#79F8FF" : "white"}>Home</P>
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
            <P>Earn</P>
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
