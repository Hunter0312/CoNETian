import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { Button } from '../button';
import { useEffect, useRef, useState } from 'react';
import { FlexDiv } from '../div';
import { P } from '../p';

import "./index.css";

interface Props {
  message: string;
}

export default function Tooltip({ message }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (tooltipOpen && buttonRef.current) {

    }
  }, [tooltipOpen])

  return (
    <>
      {
        tooltipOpen && (
          <div className="tooltip-overlay" onClick={() => setTooltipOpen(false)} />
        )
      }
      <FlexDiv className="tooltip-wrapper">
        <Button $background="#474648" $padding="4px" $radius="999px" onClick={() => setTooltipOpen(true)} ref={buttonRef}>
          <Image src={Img.Tooltip} alt={message} width={24} height={24} />
        </Button>
        <FlexDiv
          onClick={(e) => e.stopPropagation()}
          $padding="16px"
          $radius="8px"
          $border="1px solid #e5e5e580"
          $width="300px"
          className={`tooltip-box ${tooltipOpen ? 'open' : 'closed'}`}
        >
          <P>{message}</P>
          <Button onClick={() => setTooltipOpen(false)}>
            <Image src={Img.X} alt="Close button" width={15} height={15} />
          </Button>
        </FlexDiv>
      </FlexDiv>
    </>
  )
}