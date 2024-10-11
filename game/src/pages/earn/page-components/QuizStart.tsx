import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';

interface Props {
  title: string;
  caption: string;
  reward: number;
  start: () => void;
}

export default function QuizStart({ title, caption, reward, start }: Props) {
  return (
    <>
      <FlexDiv $gap="5px" $align="center">
        <Image src={Img.Coin} alt="Reward" width={36} height={36} />
        <P $fontSize="14px">{reward} CNTP</P>
      </FlexDiv>
      <Image src={Img.QuizMoon} alt="Quiz" width={90} height={90} />
      <FlexDiv $direction="column" $gap="20px" $align="center" $padding="20px 0">
        <P $fontSize="18px">{title}</P>
        <P $lineHeight="24px">{caption}</P>
      </FlexDiv>
      <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={start} $padding="18px">
        Answer quiz
      </Button>
    </>
  )
}