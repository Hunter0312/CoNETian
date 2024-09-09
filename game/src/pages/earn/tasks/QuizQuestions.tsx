import Image from 'next/image';
import { QuizQuestion } from '../data'
import { Img } from '@/utilitiy/images';
import { P } from '@/components/p';
import { Div, FlexDiv } from '@/components/div';
import QuizOption from './QuizOption';
import { useState } from 'react';

interface Props {
  questions: QuizQuestion[];
  answered: boolean;
  answer: (answer: string) => void;
}

export default function QuizQuestions({ questions, answered, answer }: Props) {
  const [choosenAnswer, setChoosenAnswer] = useState("");

  function handleAnswer(option: string) {
    setChoosenAnswer(option);
    answer(option);
  }

  return (
    <>
      <FlexDiv $padding="20px 0">
        <Image src={Img.QuizMoon} alt="Quiz" width={90} height={90} />
      </FlexDiv>
      <P $fontSize="18px">{questions[0].quest}</P>
      <FlexDiv $align="center" $gap="10px" $width="100%" $margin="15px 0 30px">
        <P>Time</P>
        <Div $flex={1} $border="0.5px solid #FFFFFF1A" $height="10px" $radius="10px" $background="#FFFFFF0D"></Div>
        <P>00:00</P>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="16px">
        {
          questions[0].options.map((option, i) => (
            <QuizOption
              key={i} text={option} index={i}
              state={answered ? (
                option === questions[0].options[questions[0].answerIndex]
                  ? "correct"
                  : option === choosenAnswer
                    ? "incorrect"
                    : "default"
              ) : "default"}
              action={() => handleAnswer(option)} />
          ))
        }
      </FlexDiv>
    </>
  )
}