import Image from "next/image";
import { FlexDiv } from "../div";
import { Img } from "@/utilitiy/images";
import { slice } from "@/utilitiy/functions";
import { P } from "../p";

const UserData = () => {
  return (
    <FlexDiv $gap="8px">
      <Image
        width={32}
        height={32}
        src={Img.UserDefaultImg}
        alt="user default image"
      />
      <FlexDiv $direction="column" $gap="2px">
        <P $fontSize="14px">Anonymous User</P>
        <P $fontSize="12px" $color="#B1B1B2">
          {slice("0x38219e9b4ACc22f7c6fA14682a4A2386D8856677")}
        </P>
      </FlexDiv>
    </FlexDiv>
  );
};

export default UserData;
