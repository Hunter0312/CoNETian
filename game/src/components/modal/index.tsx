import { ReactNode } from 'react';
import { Div, FlexDiv } from '../div';

import "./styles.css"

interface Props {
  align?: "center" | "flex-end";
  close: () => void;
  children: ReactNode;
}

export default function Modal({ align = "center", close, children }: Props) {
  return (
    <FlexDiv className="modal-overlay" $position="fixed" $background="#000000AA" $width="100vw" $height="100vh" $align={align} $justify="center" onClick={close}>
      <Div $width="100%" onClick={(e) => e.stopPropagation()} className="modal-content-wrapper">
        {children}
      </Div>
    </FlexDiv>
  )
}