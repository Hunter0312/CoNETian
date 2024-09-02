import { ReactNode } from 'react';
import { FlexDiv } from '../div';
import MiningStatus from '../miningStatus';

interface Props {
  children: ReactNode;
  margin?: string;
}

export default function PageWrapper({ children, margin }: Props) {
  return (
    <FlexDiv $direction="column" $gap="32px" $margin={margin || "32px 0 0 0"}>
      <MiningStatus />
      {children}
    </FlexDiv>
  )
}