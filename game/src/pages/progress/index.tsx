import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import Image from "next/image";
import "./index.css";
import { Button } from "@/components/button";
import { useEffect } from "react";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

const ConfirmProgress = () => {
  const { setRouter } = useGameContext();
  useEffect(() => {
    setTimeout(() => {
      setRouter?.("/transactionsuccess");
    }, 5000);
  }, []);

  return (
    <PageWrapper>
      <P $fontSize="24px">Transaction in progress</P>
      <P $fontSize="14px" $color="#CACACC" $width="321px" $weight="400">
        Your order completion time may vary, please wait and we’ll let you know
        when it’s completed.
      </P>
      <FlexDiv $justify="center">
        <FlexDiv $position="relative" $width="140px" $height="140px">
          <Image
            src={Img.ConfirmSpinImg1}
            height={90}
            width={90}
            alt=""
            className="spin spin1"
          />
          <Image
            src={Img.ConfirmSpinImg2}
            height={120}
            width={120}
            alt=""
            className="spin spin2"
          />
          <Image
            src={Img.ConfirmSpinImg3}
            height={96}
            width={96}
            alt=""
            className="spin spin3"
          />
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $justify="center">
        <P $fontSize="14px" $align="center" $width="178px">
          Please wait, this may take a few seconds.
        </P>
      </FlexDiv>
      <FlexDiv
        $justify="center"
        $direction="column"
        $align="center"
        $gap="5px"
        $margin="50px 0 100px 0"
      >
        <Button
          $width="296px"
          $height="56px"
          $background="#363E59"
          $radius="16px"
        >
          <FlexDiv $align="center" $gap="5px">
            <Image
              src={Img.ProgressImg}
              width={21}
              height={20}
              alt=""
              className="progress"
            />
            <P>Processing</P>
          </FlexDiv>
        </Button>
        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            Secure payment
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default ConfirmProgress;
