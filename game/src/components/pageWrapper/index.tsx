import { ReactNode } from 'react';
import { FlexDiv } from '../div';
import MiningStatus from '../miningStatus';

interface Props {
  children: ReactNode;
  margin?: string;
  gap?: string;
}

export default function PageWrapper({ children, margin, gap }: Props) {
  return (
    <FlexDiv $justify="space-evenly" $direction="column" $gap={gap || "32px"} $margin={margin || "32px 0 0 0"}>
      <MiningStatus />
      {children}
    </FlexDiv>
  )
}