import Image from 'next/image';
import { QuizQuestion } from '../../../shared/earnTasks'
import { Img } from '@/utilitiy/images';
import { P } from '@/components/p';
import { Div, FlexDiv } from '@/components/div';
import QuizOption from './QuizOption';
import { useEffect, useState } from 'react';
import Timer from '@/components/timer';

interface Props {
  questions: QuizQuestion[];
  answered: boolean;
  answer: (answer: string) => void;
  timeout: () => void;
}

export default function QuizQuestions({ questions, answered, answer, timeout }: Props) {
  const [choosenAnswer, setChoosenAnswer] = useState("");
  const [seconds, setSeconds] = useState(questions?.[0]?.timer);

  function handleAnswer(option: string) {
    setChoosenAnswer(option);
    answer(option);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      timeout();
    }

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [seconds, timeout]);

  return (
    <>
      <FlexDiv $padding="20px 0">
        <Image src={Img.QuizMoon} alt="Quiz" width={90} height={90} />
      </FlexDiv>
      <P $fontSize="18px">{questions?.[0]?.quest}</P>
      <Timer
        seconds={seconds}
        totalTime={questions?.[0]?.timer}
      />
      <FlexDiv $direction="column" $gap="16px">
        {
          questions?.[0]?.options.map((option, i) => (
            <QuizOption
              key={i} text={option} index={i}
              state={answered ? (
                option === questions?.[0]?.options[questions?.[0]?.answerIndex]
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