import Image from 'next/image';
import { Button } from '../button';
import { FlexDiv } from '../div';
import { P } from '../p';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';

interface Props {
  text: string;
  to?: string;
}

export default function BackButton({ text, to = "/" }: Props) {
  const { setRouter } = useGameContext();

  return (
    <FlexDiv $flex={1} $direction="column" $align="flex-start" $width='100%'>
      <Button onClick={() => setRouter?.(to)}>
        <FlexDiv $align="center" >
          <Image width={32} height={32} alt="Arrow" src={Img.ArrowImg} />
          <P $fontSize="32px" $color="#F6F1F2">
            {text}
          </P>
        </FlexDiv>
      </Button>
    </FlexDiv>
  )
}