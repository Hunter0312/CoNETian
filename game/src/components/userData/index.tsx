import Image from "next/image";
import { FlexDiv } from "../div";
import { Img } from "@/utilitiy/images";
import { slice } from "@/utilitiy/functions";
import { P } from "../p";
import Skeleton from "react-loading-skeleton";
import { useGameContext } from "@/utilitiy/providers/GameProvider";

const UserData = () => {
  const { profile } = useGameContext();

  return (
    <FlexDiv $gap="8px">
      <Image
        width={32}
        height={32}
        src={Img.UserDefaultImg}
        alt="user default image"
      />
      <FlexDiv $direction="column" $gap="2px">
        <P $fontSize="14px">{profile?.game?.username || "Anonymous User"}</P>
        <P $fontSize="12px" $color="#B1B1B2">
          {slice(profile?.keyID)}
          {!profile?.keyID && <Skeleton />}
        </P>
      </FlexDiv>
    </FlexDiv>
  );
};

export default UserData;
