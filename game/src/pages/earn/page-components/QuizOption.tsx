import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';

interface Props {
  text: string;
  index: number;
  state: "default" | "correct" | "incorrect";
  action?: () => void;
}

const colorPerState: Record<string, any> = {
  "default": {
    "background": "#17181F",
    "border": "#FFFFFF40",
  },
  "correct": {
    "background": "#4AD03E1A",
    "border": "#65FD57",
  },
  "incorrect": {
    "background": "#FFDAD633",
    "border": "#FF7461",
  },
}

const letter = ["A", "B", "C", "D", "E"];

export default function QuizOption({ text, index, state, action }: Props) {
  return (
    <FlexDiv className={action ? "pointer" : ""} $padding="8px 16px" $height="56px" $align="center" $justify="space-between" $background={colorPerState[state]?.background} $border={`1px solid ${colorPerState?.[state]?.border}`} $radius="8px" onClick={action}>
      <FlexDiv $gap="12px" $align="center">
        <P>{letter?.[index]}</P>
        <Div $width="2px" $height="22px" $background="#FFFFFF40"></Div>
        <P>{text}</P>
      </FlexDiv>
      {
        (state === "correct" || state === "incorrect") && (
          <Image src={state === "correct" ? Img.TaskCheckGreen : Img.TaskCheckRed} alt="TaskCheck" width={24} height={24} />
        )
      }
    </FlexDiv>
  )
}