import { ReactNode } from 'react'
import { Div } from '../div';

interface Props {
  children: ReactNode;
  className: string;
  radius: string;
}

export default function GradientWrapper({ children, className, radius }: Props) {
  return (
    <Div $padding="1px" $background="linear-gradient(90.9deg, #79F8FF 0.47%, #D775FF 101.18%);" className={className} $radius={radius}>
      {children}
    </Div>
  )
}