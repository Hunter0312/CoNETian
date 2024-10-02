import Image from "next/image"
import { FlexDiv } from "../div"
import { Img } from "@/utilitiy/images"

const Loading = () => {
  return <FlexDiv $justify="center">
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
}

export default Loading