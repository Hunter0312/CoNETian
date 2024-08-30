import styled from "styled-components";
import { FlexDiv } from "../div";

export const LeaderBoardUserDefaultBack = styled(FlexDiv)`
  width: 398px;
  height: 94px;
  padding: 1px;
  border-radius: 16px;
  border: 1px solid #ffffff33;
`;

export const FirstLeaderBoardUserBack = styled(LeaderBoardUserDefaultBack)`
  background-image: linear-gradient(
    90deg,
    #ffe092 0%,
    #ffe456 50%,
    #fff3b4 75%
  );
  padding: 2px;
`;

export const SecondLeaderBoardUserBack = styled(LeaderBoardUserDefaultBack)`
  background-image: linear-gradient(
    90deg,
    #e2e2e2bf 0%,
    #ffffffbf 50%,
    #717171bf 75%
  );
`;

export const ThirdLeaderBoardUserBack = styled(LeaderBoardUserDefaultBack)`
  background-image: linear-gradient(
    90deg,
    #e08b40bf 0%,
    #ff8111bf 25%,
    #ffbf86bf 50%,
    #88470dbf 75%
  );
`;
