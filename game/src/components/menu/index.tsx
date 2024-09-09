import { FlexDiv } from "../div";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import { Button } from "../button";
import { P } from "../p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

const Menu = () => {
  const { router, setRouter } = useGameContext();

  return (
    <FlexDiv $position="fixed" $width="100%" $bottom="50px" $justify="center" $index="10">
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
        <Button onClick={() => setRouter("/wallet")}>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={router === "/wallet" ? Img.ActiveWalletImg : Img.WalletImg}
              alt="wallet image"
            />
            <P $color={router === "/wallet" ? "#C4A6EA" : "white"} >My Wallet</P>
          </FlexDiv>
        </Button>
        <Button onClick={() => setRouter("/earn")}>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={router === "/earn" ? Img.ActiveEarnImg : Img.EarnImg}
              alt="round image"
            />
            <P $color={router === "/earn" ? "#6AE092" : "white"}>Earn</P>
          </FlexDiv>
        </Button>
        <Button onClick={() => setRouter("/settings")}>
          <FlexDiv $direction="column" $justify="center" $align="center">
            <Image
              width={29}
              height={29}
              src={router === "/settings" || router === "/about" ? Img.ActiveSettingImg : Img.SettingImg}
              alt="settings image"
            />
            <P $color={router === "/settings" || router === "/about" ? "#E39DFF" : "white"}>Settings</P>
          </FlexDiv>
        </Button>
      </FlexDiv>
    </FlexDiv>
  );
};

export default Menu;
