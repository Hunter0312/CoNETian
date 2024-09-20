import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import { Img } from "@/utilitiy/images";
import Image from "next/image";
import "./index.css";
import { useEffect } from "react";
import { Button } from "@/components/button";

type Props = {
  data: object;
  index: Number;
  selected: (index: Number) => void;
};

const Skin: React.FC<Props> = ({ data, index, selected }) => {
  return (
    <Button onClick={() => selected(data.key)}>
      <FlexDiv
        $width="84px"
        $border="1px solid #363E59"
        $radius="12px"
        $background="#1C1C1C"
        $justify="center"
        $align="center"
        $padding="20px 0"
        $direction="column"
        $position="relative"
        className={data.key === index ? "selected" : ""}
      >
        <Image src={data.Img} width={46} height={48} alt={data.title} />
        <P $fontSize="12px">{data.title}</P>
        <Div $position="absolute" $right="7px" $top="5px">
          {data.status === "used" && (
            <Image src={Img.SkinUseImg} width={12} height={11} alt="used" />
          )}
          {data.status === "buy" && (
            <Image src={Img.SkinLockImg} width={12} height={11} alt="used" />
          )}
        </Div>
      </FlexDiv>
    </Button>
  );
};

export default Skin;
